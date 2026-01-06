# Signals and State Management - Preact Signals Integration

## Overview
This document details the design for integrating Preact Signals as a first-class citizen in the Scala Preact bindings. Signals provide automatic fine-grained reactivity that eliminates unnecessary re-renders and serves as the primary state management solution.

See also:
- [Library General](./library-general.md) - Core architecture
- [Component Implementation](./component-implementation.md) - Component approaches
- [HTML DSL Design](./html-dsl-design.md) - Unified modifier API

---

## What are Preact Signals?

Preact Signals is a performant state management library that provides:
- **Fine-grained reactivity**: Components only re-render when signals they actually read change
- **Automatic tracking**: No need to declare dependencies, the system tracks them automatically
- **Optimal performance**: Bypasses Virtual DOM diffing when possible, updates DOM directly
- **Simple API**: `signal()`, `computed()`, and `effect()` primitives
- **Framework integration**: Deep integration with Preact for optimal performance

**Key advantage**: When a component reads a signal value, only that specific component re-renders when the signal changes, not the entire parent tree.

---

## Design Goals

1. **First-class integration**: Signals should feel natural in Scala, not like a JS wrapper
2. **Type-safe**: Full Scala type safety for signal values
3. **Idiomatic Scala**: Use Scala patterns (apply/update, for-comprehensions if appropriate)
4. **Zero-cost abstraction**: Minimal overhead over raw JS signals
5. **Composable**: Easy to combine and derive signals
6. **Context integration**: Global state via Preact Context API
7. **Interop with modifiers**: Signals should work naturally in the HTML DSL

---

## Core Signal Types

### JavaScript Facades

First, define facades for Preact Signals:

```scala
package preact.bindings.signals

import scala.scalajs.js
import scala.scalajs.js.annotation.*

// Core Signal type from @preact/signals
@js.native
trait ReadonlySignal[+A] extends js.Object:
  def value: A = js.native
  // Signals can be called directly in JSX/h() and track automatically
  // In our DSL, we'll use .value or conversions

@js.native
trait Signal[A] extends ReadonlySignal[A]:
  override var value: A = js.native

// Computed signals (derived values)
@js.native
trait Computed[+A] extends ReadonlySignal[A]

// Effect for side effects
@js.native
trait EffectHandle extends js.Object:
  def dispose(): Unit = js.native

// Signal creation functions
@js.native
@JSImport("@preact/signals", JSImport.Namespace)
object SignalsJS extends js.Object:
  def signal[A](initialValue: A): Signal[A] = js.native
  def computed[A](fn: js.Function0[A]): Computed[A] = js.native
  def effect(fn: js.Function0[Unit]): EffectHandle = js.native
  def batch(fn: js.Function0[Unit]): Unit = js.native
```

---

## Scala Signal Wrappers

Provide idiomatic Scala wrappers:

```scala
package preact.bindings

import scala.scalajs.js

// Read-only signal (covariant)
trait ReadSignal[+A]:
  protected def underlying: signals.ReadonlySignal[A]

  // Get current value
  def now: A = underlying.value

  // Alias for now (more readable in some contexts)
  inline def apply(): A = now

  // Map to create derived signal
  def map[B](f: A => B): ReadSignal[B] =
    Computed(signals.SignalsJS.computed(() => f(underlying.value)))

// Writable signal
trait WriteSignal[A] extends ReadSignal[A]:
  override protected def underlying: signals.Signal[A]

  // Set new value
  def set(value: A): Unit = underlying.value = value

  // Update via function
  def update(f: A => A): Unit = set(f(now))

  // Scala-style update syntax: signal() = value
  inline def update(value: A): Unit = set(value)

// Concrete implementations
final class Var[A](protected val underlying: signals.Signal[A]) extends WriteSignal[A]
final class Computed[A](protected val underlying: signals.Computed[A]) extends ReadSignal[A]

// Signal creation
object Signal:
  // Create mutable signal
  def apply[A](initialValue: A): Var[A] =
    new Var(signals.SignalsJS.signal(initialValue))

  // Create computed signal (derived value)
  def computed[A](computation: => A): Computed[A] =
    new Computed(signals.SignalsJS.computed(() => computation))

  // Run side effect that tracks signal dependencies
  def effect(body: => Unit): EffectHandle =
    signals.SignalsJS.effect(() => body)

  // Batch multiple signal updates
  def batch(updates: => Unit): Unit =
    signals.SignalsJS.batch(() => updates)
```

---

## Integration with HTML DSL

Signals should work seamlessly in the modifier system:

```scala
package preact.bindings

// Add signal-specific modifiers
object SignalModifiers:

  // Convert signal to child modifier (text content)
  given Conversion[ReadSignal[String], Modifier] =
    signal => ChildModifier(signal.underlying.value.asInstanceOf[Child])

  given Conversion[ReadSignal[Int], Modifier] =
    signal => ChildModifier(signal.underlying.value.asInstanceOf[Child])

  given Conversion[ReadSignal[Double], Modifier] =
    signal => ChildModifier(signal.underlying.value.asInstanceOf[Child])

  // Signal of VNode
  given Conversion[ReadSignal[VNode], Modifier] =
    signal => ChildModifier(signal.underlying.value.asInstanceOf[Child])

  // Reactive attributes: attribute value is a signal
  extension [A](key: String)
    infix def <~(signal: ReadSignal[A]): Modifier =
      PropModifier(key, signal.underlying.value.asInstanceOf[js.Any])

  // Reactive class names
  def classNameSignal(signal: ReadSignal[String]): Modifier =
    PropModifier("className", signal.underlying.value.asInstanceOf[js.Any])

  // Reactive styles
  def styleSignal(styles: (String, ReadSignal[Any])*): Modifier =
    StyleModifier(styles.map((k, sig) => (k, sig.now)))

// Include in main DSL
object Dsl:
  export Tags.*
  export Modifiers.{*, given}
  export SignalModifiers.{*, given}
```

**Note on reactivity**: Preact Signals automatically tracks when components read signal values. When you use `signal.underlying.value` in a component's render function, Preact tracks it and only re-renders that component when the signal changes.

---

## Usage Examples

### Basic Signal Usage

```scala
import preact.bindings.*
import scala.scalajs.js

// Create a signal
val count = Signal(0)

// Read value
println(count.now) // 0
println(count())   // 0

// Update value
count.set(5)
count.update(_ + 1) // now 6
count() = 10        // Scala update syntax

// Component using signal
val Counter = component: () =>
  div(
    h2("Counter"),
    p(s"Count: ${count.now}"),
    button(
      onClick := (_ => count.update(_ + 1)),
      "Increment"
    )
  )
```

**Important**: Reading `count.now` in a component automatically subscribes that component to changes. Only that component re-renders when the signal changes.

### Computed Signals

```scala
import preact.bindings.*

val firstName = Signal("John")
val lastName = Signal("Doe")

// Derived value - automatically recomputes when dependencies change
val fullName = Signal.computed:
  s"${firstName.now} ${lastName.now}"

val NameDisplay = component: () =>
  div(
    p(s"Full name: ${fullName.now}"),
    input(
      value := firstName.now,
      onInput := (e => firstName() = e.target.value)
    ),
    input(
      value := lastName.now,
      onInput := (e => lastName() = e.target.value)
    )
  )
```

### Effects

```scala
import preact.bindings.*

val count = Signal(0)

// Side effect that runs when count changes
val handle = Signal.effect:
  println(s"Count changed to: ${count.now}")

// Later: cleanup
handle.dispose()
```

### Batch Updates

```scala
import preact.bindings.*

val x = Signal(1)
val y = Signal(2)

// Batch multiple updates - only triggers one recomputation
Signal.batch:
  x() = 10
  y() = 20
```

### Complex Component with Signals

```scala
import preact.bindings.*
import scala.scalajs.js

case class Todo(id: Int, text: String, completed: Boolean)

// Application state as signals
val todos = Signal(Seq.empty[Todo])
val filter = Signal("all") // "all", "active", "completed"
val nextId = Signal(1)

// Computed values
val filteredTodos = Signal.computed:
  filter.now match
    case "active" => todos.now.filter(!_.completed)
    case "completed" => todos.now.filter(_.completed)
    case _ => todos.now

val activeCount = Signal.computed:
  todos.now.count(!_.completed)

// Actions
def addTodo(text: String): Unit =
  val todo = Todo(nextId.now, text, false)
  Signal.batch:
    todos.update(_ :+ todo)
    nextId.update(_ + 1)

def toggleTodo(id: Int): Unit =
  todos.update(_.map(t =>
    if t.id == id then t.copy(completed = !t.completed) else t
  ))

def deleteTodo(id: Int): Unit =
  todos.update(_.filter(_.id != id))

// Components
val TodoItem = component[Todo]: todo =>
  li(
    className := (if todo.completed then "completed" else ""),
    input(
      `type` := "checkbox",
      checked := todo.completed,
      onChange := (_ => toggleTodo(todo.id))
    ),
    span(todo.text),
    button(
      onClick := (_ => deleteTodo(todo.id)),
      "Delete"
    )
  )

val TodoList = component: () =>
  div(
    h1("Todo App"),
    p(s"${activeCount.now} items left"),
    ul(
      filteredTodos.now.map(todo => TodoItem(todo))
    ),
    div(
      button(
        className := (if filter.now == "all" then "active" else ""),
        onClick := (_ => filter() = "all"),
        "All"
      ),
      button(
        className := (if filter.now == "active" then "active" else ""),
        onClick := (_ => filter() = "active"),
        "Active"
      ),
      button(
        className := (if filter.now == "completed" then "active" else ""),
        onClick := (_ => filter() = "completed"),
        "Completed"
      )
    )
  )
```

---

## Context API for Global State

Use Preact's Context API to provide signals throughout the component tree.

### Context Definition

```scala
package preact.bindings

import scala.scalajs.js
import scala.scalajs.js.annotation.*

// Preact Context facade
@js.native
@JSImport("preact", "createContext")
def createContext[A](defaultValue: A): Context[A] = js.native

@js.native
trait Context[A] extends js.Object:
  val Provider: js.Any = js.native
  val Consumer: js.Any = js.native

// Hook to use context (requires hooks support)
@js.native
@JSImport("preact/hooks", "useContext")
def useContext[A](context: Context[A]): A = js.native
```

### Scala Context Wrapper

```scala
package preact.bindings

import scala.scalajs.js

// Type-safe context wrapper
class SignalContext[A](private val ctx: Context[A]):

  // Provider component
  def Provider(value: A)(children: Modifier*): VNode =
    val builder = html.ElementBuilder()
    builder.addModifiers(children)
    val (props, childs) = builder.buildParts()

    val propsWithValue = js.Dynamic.literal("value" -> value.asInstanceOf[js.Any])
    if props != js.undefined then
      val p = props.asInstanceOf[js.Dynamic]
      p.selectDynamic("children") = js.Array(childs*)

    Preact.h(ctx.Provider, propsWithValue, childs*)

  // Use in component (requires hooks)
  def use(): A = useContext(ctx)

object SignalContext:
  def apply[A](defaultValue: A): SignalContext[A] =
    new SignalContext(createContext(defaultValue))
```

### Global State Pattern

Define application state in a case class, create signals for it, and provide via context:

```scala
import preact.bindings.*
import scala.scalajs.js

// Define app state structure
case class TodoState(
  todos: Var[Seq[Todo]],
  filter: Var[String],
  nextId: Var[Int]
):
  // Computed values
  val filteredTodos: Computed[Seq[Todo]] = Signal.computed:
    filter.now match
      case "active" => todos.now.filter(!_.completed)
      case "completed" => todos.now.filter(_.completed)
      case _ => todos.now

  val activeCount: Computed[Int] = Signal.computed:
    todos.now.count(!_.completed)

  // Actions
  def addTodo(text: String): Unit =
    val todo = Todo(nextId.now, text, false)
    Signal.batch:
      todos.update(_ :+ todo)
      nextId.update(_ + 1)

  def toggleTodo(id: Int): Unit =
    todos.update(_.map(t =>
      if t.id == id then t.copy(completed = !t.completed) else t
    ))

  def deleteTodo(id: Int): Unit =
    todos.update(_.filter(_.id != id))

object TodoState:
  def create(): TodoState = TodoState(
    todos = Signal(Seq.empty),
    filter = Signal("all"),
    nextId = Signal(1)
  )

// Create context
val TodoContext = SignalContext(TodoState.create())

// Root app with provider
val App = component: () =>
  val state = TodoState.create()

  TodoContext.Provider(state)(
    TodoList()
  )

// Component that uses context (with hooks)
val TodoList = component: () =>
  val state = TodoContext.use()

  div(
    h1("Todo App"),
    p(s"${state.activeCount.now} items left"),
    ul(
      state.filteredTodos.now.map(todo => TodoItem(todo))
    ),
    FilterButtons()
  )

val FilterButtons = component: () =>
  val state = TodoContext.use()

  div(
    button(
      className := (if state.filter.now == "all" then "active" else ""),
      onClick := (_ => state.filter() = "all"),
      "All"
    ),
    button(
      className := (if state.filter.now == "active" then "active" else ""),
      onClick := (_ => state.filter() = "active"),
      "Active"
    ),
    button(
      className := (if state.filter.now == "completed" then "active" else ""),
      onClick := (_ => state.filter() = "completed"),
      "Completed"
    )
  )
```

---

## Advanced Patterns

### Signal Collections

Manage collections efficiently:

```scala
import preact.bindings.*

// Each item has its own signal for fine-grained updates
case class TodoWithSignal(
  id: Int,
  text: Var[String],
  completed: Var[Boolean]
)

val todos = Signal(Seq.empty[TodoWithSignal])

// When you update a specific todo's text, only that item re-renders
def updateText(id: Int, newText: String): Unit =
  todos.now.find(_.id == id).foreach(_.text() = newText)
```

### Async State

Handle async operations with signals:

```scala
import preact.bindings.*
import scala.scalajs.js
import scala.concurrent.Future
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue

enum LoadingState[+A]:
  case Idle extends LoadingState[Nothing]
  case Loading extends LoadingState[Nothing]
  case Success(data: A) extends LoadingState[A]
  case Error(message: String) extends LoadingState[Nothing]

val userState = Signal[LoadingState[User]](LoadingState.Idle)

def fetchUser(id: Int): Unit =
  userState() = LoadingState.Loading

  Future:
    // Simulated API call
    js.Dynamic.global.fetch(s"/api/users/$id")
      .asInstanceOf[js.Promise[js.Any]]
  .foreach: response =>
    // Parse and update
    userState() = LoadingState.Success(parseUser(response))
  .recover:
    case ex => userState() = LoadingState.Error(ex.getMessage)

val UserProfile = component: () =>
  userState.now match
    case LoadingState.Idle =>
      div("Click to load user")
    case LoadingState.Loading =>
      div("Loading...")
    case LoadingState.Success(user) =>
      div(
        h2(user.name),
        p(user.email)
      )
    case LoadingState.Error(msg) =>
      div(s"Error: $msg")
```

### Local Component State with Hooks

For local state, use the `useSignal` hook:

```scala
import preact.bindings.*
import scala.scalajs.js

// Facade for useSignal hook
@js.native
@JSImport("@preact/signals", "useSignal")
def useSignalJS[A](initialValue: A): signals.Signal[A] = js.native

// Scala wrapper
def useSignal[A](initialValue: A): Var[A] =
  new Var(useSignalJS(initialValue))

// Component with local state
val Counter = component: () =>
  val count = useSignal(0)

  div(
    h2("Local Counter"),
    p(s"Count: ${count.now}"),
    button(
      onClick := (_ => count.update(_ + 1)),
      "Increment"
    )
  )
```

---

## Type Safety and Inference

The signal system maintains full type safety:

```scala
val stringSignal: Var[String] = Signal("hello")
val intSignal: Var[Int] = Signal(42)

// Type inference works
val s1 = Signal("hello") // Var[String]
val s2 = Signal(42)      // Var[Int]

// Computed signals preserve types
val length: Computed[Int] = Signal.computed:
  stringSignal.now.length

// Map preserves types
val doubled: ReadSignal[Int] = intSignal.map(_ * 2)

// Type errors caught at compile time
// stringSignal() = 42 // ERROR: type mismatch
```

---

## Performance Characteristics

### Why Signals are Fast

1. **Fine-grained reactivity**: Only components that read a signal re-render
2. **Automatic dependency tracking**: No manual dependency arrays
3. **Batched updates**: Multiple signal changes batch into one render
4. **Direct DOM updates**: For simple text updates, bypasses VDOM entirely
5. **Efficient diffing**: When VDOM is used, only changed parts diff

### Benchmarks (Expected)

Compared to traditional state management:
- **Small updates**: 2-10x faster (direct DOM updates)
- **Large lists**: 3-5x faster (fine-grained updates)
- **Derived state**: 2-3x faster (automatic memoization)
- **Memory**: Slightly higher (tracking overhead)

### Best Practices

1. **Group related state**: Use case classes for related signals
2. **Use computed for derived values**: Don't manually sync state
3. **Batch related updates**: Use `Signal.batch` for multiple changes
4. **Local vs Global**: Use hooks for local state, context for global
5. **Avoid over-granularity**: Don't create signals for every tiny piece of data

---

## Implementation Files

### File Structure

1. **src/scala/preact/bindings/signals/Facades.scala**
   - JavaScript facades for @preact/signals

2. **src/scala/preact/bindings/Signal.scala**
   - Scala wrappers: ReadSignal, WriteSignal, Var, Computed
   - Signal object with creation methods

3. **src/scala/preact/bindings/SignalModifiers.scala**
   - Integration with HTML DSL
   - Conversions for signals in modifiers

4. **src/scala/preact/bindings/Context.scala**
   - Context API facades
   - SignalContext wrapper

5. **src/scala/preact/bindings/hooks/Hooks.scala** (future)
   - useSignal and other hooks
   - Type-safe wrappers

---

## Dependencies

Add to project.scala:

```scala
//> using dep "org.scala-js::scalajs-dom::2.8.0"

// Note: @preact/signals is a JavaScript dependency
// Add to package.json:
// "@preact/signals": "^1.2.0"
```

---

## Future Enhancements

### Short-term
- [ ] Signal-aware list rendering (keyed updates)
- [ ] Signal debugging utilities
- [ ] DevTools integration for signal tracking
- [ ] More hooks: useComputed, useSignalEffect

### Medium-term
- [ ] Persistent signals (localStorage sync)
- [ ] Signal middleware (logging, time-travel)
- [ ] Undo/redo with signals
- [ ] Signal-based routing

### Advanced
- [ ] Remote signals (sync with backend)
- [ ] Conflict-free replicated data types (CRDTs) with signals
- [ ] Signal-based animation system
- [ ] Real-time collaboration primitives

---

## Comparison with Other Approaches

### Signals vs useState (React/Preact hooks)

| Aspect | Signals | useState |
|--------|---------|----------|
| Granularity | Fine-grained | Component-level |
| Dependency tracking | Automatic | Manual (useEffect deps) |
| Performance | Excellent | Good |
| Learning curve | Low | Medium |
| Global state | Natural | Needs Context + hooks |
| Outside components | Yes | No (hooks rules) |

### Signals vs External State (Redux, Zustand)

| Aspect | Signals | Redux/Zustand |
|--------|---------|---------------|
| Boilerplate | Minimal | Medium-High |
| Reactivity | Built-in | Via subscriptions |
| Derived state | Automatic | Manual selectors |
| Performance | Excellent | Good |
| DevTools | Basic | Excellent |
| Middleware | Limited | Extensive |

**Recommendation**: Use Signals as the primary state management solution. The performance benefits and API simplicity make it ideal for most use cases.

---

## Summary

This design provides:
- ✅ Type-safe Scala API for Preact Signals
- ✅ Idiomatic Scala syntax (apply/update)
- ✅ Seamless HTML DSL integration
- ✅ Context API for global state
- ✅ Computed signals for derived values
- ✅ Effects for side effects
- ✅ Zero-cost abstraction over JS signals
- ✅ First-class state management solution

Signals + Components + HTML DSL = Complete Scala Preact bindings with excellent performance characteristics.
