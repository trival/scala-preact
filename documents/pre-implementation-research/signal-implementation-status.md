# Preact Signals Integration with `Var` and Scala 3 Context

All features are successfully implememted and tested. See `src/scala/preact/signals/**/*` for the actual implementation and `src/scala/preact/test.scala` for usage examples.
This document was a sketch pre implementation. see the concrete implementation in `src/scala/preact/**/*` and related files for the actual design and API.

## Overview

Integrate Preact Signals into the Scala Preact bindings using `Var` naming (not `Signal`) and Scala 3's `given`/`using` contextual abstractions to automatically dispatch between `signal()` (global) and `useSignal()` (component-local).

## Key Design Decision

Use Scala 3's `given`/`using` to provide different `VarContext` implementations:

- **Global context**: Uses `signal()` from `@preact/signals` for global reactive state
- **Component context**: Uses `useSignal()` hook for component-local reactive state

The `component` macro injects `ComponentVarContext` when calling the render function, enabling automatic dispatch without runtime overhead.

## API Design

```scala
// Global state (uses signal())
import preact.signals.*

val count = Var(0)
val double = Var.memo(count() * 2)
Var.effect { println(s"Count: ${count()}") }

// Read value
val x = count()

// Write value
count(5)

// Update with function
count(_ + 1)

// Component-local state (uses useSignal())
val Counter = component[CounterProps]: props =>
  val localCount = Var(0)  // automatically uses useSignal()
  val double = Var.memo(localCount() * 2)

  div(
    p(s"Count: ${localCount()}"),
    button("onClick" := (_ => localCount(_ + 1)), "Increment")
  )
```

## Implementation Plan

### 1. JavaScript Facades for Preact Signals

**File**: `src/scala/preact/signals/SignalsJS.scala` (NEW)

Create facades for `@preact/signals`:

```scala
package preact.signals

import scala.scalajs.js
import scala.scalajs.js.annotation.*

// Core signal types
@js.native
trait ReadonlySignal[+A] extends js.Object:
  def value: A = js.native

@js.native
trait Signal[A] extends ReadonlySignal[A]:
  override var value: A = js.native

@js.native
trait Computed[+A] extends ReadonlySignal[A]

@js.native
trait EffectHandle extends js.Object:
  def dispose(): Unit = js.native

// Signal creation functions
@js.native
@JSImport("@preact/signals", JSImport.Namespace)
object SignalsJS extends js.Object:
  // Global variants
  def signal[A](initialValue: A): Signal[A] = js.native
  def computed[A](fn: js.Function0[A]): Computed[A] = js.native
  def effect(fn: js.Function0[Unit]): EffectHandle = js.native
  def batch(fn: js.Function0[Unit]): Unit = js.native

  // Hook variants (must be called during component render)
  @JSImport("@preact/signals", "useSignal")
  def useSignal[A](initialValue: A): Signal[A] = js.native

  @JSImport("@preact/signals", "useComputed")
  def useComputed[A](fn: js.Function0[A]): Computed[A] = js.native

  @JSImport("@preact/signals", "useSignalEffect")
  def useSignalEffect(fn: js.Function0[Unit]): EffectHandle = js.native
```

### 2. VarContext Trait and Implementations

**File**: `src/scala/preact/signals/VarContext.scala` (NEW)

```scala
package preact.signals

trait VarContext:
  def createVar[A](initialValue: A): Var[A]
  def createMemo[A](computation: => A): ReadVar[A]
  def createEffect(body: => Unit): EffectHandle

object GlobalVarContext extends VarContext:
  def createVar[A](initialValue: A): Var[A] =
    new Var(SignalsJS.signal(initialValue))

  def createMemo[A](computation: => A): ReadVar[A] =
    new Memo(SignalsJS.computed(() => computation))

  def createEffect(body: => Unit): EffectHandle =
    SignalsJS.effect(() => body)

object ComponentVarContext extends VarContext:
  def createVar[A](initialValue: A): Var[A] =
    new Var(SignalsJS.useSignal(initialValue))

  def createMemo[A](computation: => A): ReadVar[A] =
    new Memo(SignalsJS.useComputed(() => computation))

  def createEffect(body: => Unit): EffectHandle =
    SignalsJS.useSignalEffect(() => body)
```

### 3. Var API

**File**: `src/scala/preact/signals/Var.scala` (NEW)

```scala
package preact.signals

import scala.scalajs.js

object Var:
  def apply[A](initialValue: A)(using ctx: VarContext): Var[A] =
    ctx.createVar(initialValue)

  def memo[A](computation: => A)(using ctx: VarContext): ReadVar[A] =
    ctx.createMemo(computation)

  def effect(body: => Unit)(using ctx: VarContext): EffectHandle =
    ctx.createEffect(body)

  def batch(updates: => Unit): Unit =
    SignalsJS.batch(() => updates)

trait ReadVar[+A]:
  protected def underlying: SignalsJS.ReadonlySignal[A]

  /** Read the current value */
  def apply(): A = underlying.value

  def map[B](f: A => B)(using ctx: VarContext): ReadVar[B] =
    ctx.createMemo(f(underlying.value))

class Var[A](protected val underlying: SignalsJS.Signal[A]) extends ReadVar[A]:
  /** Write a new value */
  def apply(value: A): Unit = underlying.value = value

  /** Update via function */
  def apply(f: A => A): Unit = underlying.value = f(underlying.value)

class Memo[A](protected val underlying: SignalsJS.Computed[A]) extends ReadVar[A]
```

### 4. Default Global Context

**File**: `src/scala/preact/signals/package.scala` (NEW)

```scala
package preact

package object signals:
  given globalVarContext: VarContext = GlobalVarContext
```

### 5. Modify Component to Inject Context

**File**: `src/scala/preact/component.scala` (MODIFY)

In `ComponentBase.apply()`, wrap the render function call to inject `ComponentVarContext`:

```scala
abstract class ComponentBase[P <: JS](renderFn: P => VNode):
  type Modifier

  def apply(ms: Modifier*): VNode =
    val attrs = js.Dynamic.literal()
    val children = js.Array[Child]()
    ms.foreach {
      case am: AttributeModifier[?, ?] =>
        am(attrs)
      case cm: ChildModifier =>
        cm(children)
    }

    // NEW: Wrap render function to inject ComponentVarContext
    val wrappedRenderFn: P => VNode = (props: P) =>
      given preact.signals.VarContext = preact.signals.ComponentVarContext
      renderFn(props)

    h(wrappedRenderFn, attrs, children)
```

**Import addition at top of file**:

```scala
import preact.signals.{VarContext, ComponentVarContext}
```

### 6. Signal Modifiers for HTML DSL

**File**: `src/scala/preact/signals/SignalModifiers.scala` (NEW)

Integration with the modifier system for using signals directly in HTML:

```scala
package preact.signals

import preact.component.ChildModifier
import preact.bindings.{Child, VNode}

// Convert signals to child modifiers
given Conversion[ReadVar[String], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given Conversion[ReadVar[Int], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given Conversion[ReadVar[Double], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given Conversion[ReadVar[VNode], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])
```

## Critical Files Summary

1. **src/scala/preact/signals/SignalsJS.scala** - NEW: JS facades for @preact/signals
2. **src/scala/preact/signals/VarContext.scala** - NEW: Context trait and implementations
3. **src/scala/preact/signals/Var.scala** - NEW: Var API using context
4. **src/scala/preact/signals/package.scala** - NEW: Default global context
5. **src/scala/preact/signals/SignalModifiers.scala** - NEW: HTML DSL integration
6. **src/scala/preact/component.scala** - MODIFY: Inject ComponentVarContext in ComponentBase.apply()

## Testing Strategy

### Unit Tests

1. **Global Var creation** (`test/scala/preact/signals/VarTest.scala`):

   ```scala
   val v = Var(42)
   assert(v() == 42)
   v(50)
   assert(v() == 50)
   v(_ + 10)
   assert(v() == 60)
   ```

2. **Memo values**:

   ```scala
   val a = Var(2)
   val b = Var(3)
   val sum = Var.memo(a() + b())
   assert(sum() == 5)
   a(10)
   assert(sum() == 13)
   ```

3. **Batch updates**:
   ```scala
   val x = Var(1)
   val y = Var(2)
   Var.batch {
     x(10)
     y(20)
   }
   assert(x() == 10 && y() == 20)
   ```

### Integration Tests

Update `src/scala/preact/test.scala` to add signal examples:

```scala
// Test component with local state
trait CounterProps extends JS

val SignalCounter = component[CounterProps]: _ =>
  val count = Var(0)
  val double = Var.memo(count() * 2)

  div(
    h3("Signal Counter"),
    p(s"Count: ${count()}"),
    p(s"Double: ${double()}"),
    button(
      "onClick" := (_ => count(_ + 1)),
      "Increment"
    )
  )

// Test global state
val globalTheme = Var("light")

val ThemeDisplay = component[CounterProps]: _ =>
  div(
    p(s"Theme: ${globalTheme()}"),
    button(
      "onClick" := (_ => globalTheme(if globalTheme() == "light" then "dark" else "light")),
      "Toggle"
    )
  )
```

### Manual Verification

1. Run the test app: `scala-cli run .`
2. Open browser to test page
3. Verify:
   - Signal counter increments correctly
   - Computed value updates automatically
   - Global theme changes affect all components
   - No console errors about hook violations

## Dependencies

Add to `project.scala`:

```scala
//> using jsModuleKind "es"

// JavaScript dependency (add to package.json):
// "@preact/signals": "^1.3.0"
```

## Benefits of This Approach

1. **Zero runtime overhead**: Context resolution is compile-time via implicit resolution
2. **Type-safe**: Full Scala type inference and checking
3. **Idiomatic Scala 3**: Uses given/using and apply/update methods
4. **Respects Preact hooks rules**: Hooks are called unconditionally
5. **Clean API**:
   - `Var(0)` automatically does the right thing based on context
   - `count()` to read, `count(value)` to write, `count(fn)` to update
   - Consistent with SolidJS naming (`memo` not `computed`)
6. **No breaking changes**: Existing component code continues to work

## Edge Cases Handled

1. **Nested components**: Each component render gets its own ComponentVarContext
2. **Mixed global/local**: Can use both in same component by explicit context
3. **Context escape**: Vars created with hooks are persistent; context only matters at creation
4. **Conditional initialization**: `Var(if cond then 0 else 1)` works correctly (one hook call)

## Implementation Order

1. Create SignalsJS.scala facades
2. Create VarContext.scala with trait and implementations
3. Create Var.scala with API
4. Create package.scala with default context
5. Modify component.scala to inject context
6. Create SignalModifiers.scala for HTML DSL integration
7. Add tests to test.scala
8. Verify in browser
