# Component Implementation - Design Approaches

## Overview

This document explores different approaches for implementing Scala 3 Preact component bindings, with their performance characteristics and implementation tradeoffs.

See also:

- [Library General](./library-general.md) - Core architecture and facades
- [HTML DSL Design](./html-dsl-design.md) - Laminar-inspired modifier API

---

## Design Constraints

1. Support case class props (immutable by default)
2. Leverage immutability for automatic performance optimization
3. Compile to idiomatic JavaScript that Preact understands
4. Be function-based and hooks-compatible (uses useSignal, useSignalEffect)
5. Use braceless Scala 3 syntax
6. Have zero or minimal runtime overhead

---

## Component Implementation Approaches

### Preferred Approach: Unified Component-as-Case-Class

**Concept**: Define components as case classes where the fields are the props and a `render` method defines the output. This unifies the component and its props into a single definition.

**How it works**:

```scala
// Single definition - component IS its props
case class Button(
  label: String,
  disabled: Boolean = false,
  className: ClassName = ClassName.empty,
  children: Children = Children.empty
):
  def render: VNode =
    button(
      disabled := disabled,
      className := className,
      children,
      label
    )

// Companion extends ComponentCompanion for modifier support
object Button extends ComponentCompanion[Button]
```

**Usage**:

```scala
// Identical syntax to HTML elements!
Button(
  Button.label := "Click me",
  Button.disabled := true,
  cls := "btn",
  cls := "btn-primary",
  span("Icon"),
  "Button text"
)

// Or with imports
import Button.*
Button(
  label := "Click me",
  disabled := true,
  cls := "btn",
  span("Icon")
)
```

**Advantages**:

- **Single definition point**: Props and component are unified - the case class fields ARE the props
- **Natural Scala OOP**: Component instance = props, `render` method has direct field access
- **Standard Scala 3**: Uses `derives` mechanism and standard companion object patterns
- **Unified syntax**: Components and HTML elements use identical modifier syntax
- **Zero boilerplate**: Just define a case class with a render method
- **Full hooks compatibility**: Compiles to memoized functional components
- **Special types work naturally**: `Children` and `ClassName` are just fields

**Implementation**:

The `ComponentCompanion[T]` trait uses Scala 3 derivation to:
1. Extract case class fields and generate prop modifiers (`Button.label`, `Button.disabled`, etc.)
2. Generate `apply(modifiers: Modifier*)` method that builds component from modifiers
3. Handle special types (`Children`, `ClassName`) with automatic accumulation
4. Convert to Preact functional component: `memo((props: Button) => props.render)`

**Compilation to Preact**:

```scala
// Scala definition
case class Button(label: String, disabled: Boolean = false):
  def render: VNode = button(label)

// Compiles to JavaScript (conceptual)
const Button = memo((props) => {
  return h("button", {}, props.label);
});
```

**External JS Components**:

```scala
// For existing Preact components from JS libraries
@js.native
@JSImport("some-library", "ExternalButton")
object ExternalButtonJS extends js.Object

case class ExternalButton(
  label: String,
  onClick: js.Function0[Unit]
) derives ExternalComponent

object ExternalButton extends ExternalComponentCompanion[ExternalButton](ExternalButtonJS)

// Usage - same syntax!
ExternalButton(
  ExternalButton.label := "Click",
  ExternalButton.onClick := (() => println("clicked"))
)
```

**Implementation complexity**: MEDIUM-HIGH
- Requires Scala 3 derivation mechanism for typeclass
- Companion object pattern to generate modifiers
- Builder logic to construct case class from modifiers
- Integration with Preact's `h()` and `memo()`

**Key technical challenges**:

1. Generating companion object members (prop modifiers) via derivation
2. Building case class instance from accumulated modifiers with defaults
3. Converting case class instance to JS object for Preact
4. Handling special types (Children, ClassName) with automatic accumulation

---

### Alternative Approach: Functional Components + memo() Wrapper

**Concept**: Wrap Scala component functions with Preact's `memo()` at runtime through a helper function.

**How it works**:

```scala
val MyButton = component[ButtonProps]: props =>
  button(onClick := props.onClick, props.label)
```

The `component` helper wraps the function:

```javascript
export const MyButton = memo((props) => {
  return h("button", { onClick: props.onClick }, props.label);
});
```

**Advantages**:

- **Simple implementation**: No macros needed, just inline helper functions
- **Easy to understand**: Transparent runtime behavior
- **Flexible**: Easy to add custom comparison functions
- **Standard Preact pattern**: Uses official Preact memoization API

**Disadvantages**:

- **Slightly slower than classes**: `memo()` adds a small wrapper overhead (~5-10%)
- **Runtime wrapping**: Component wrapping happens at runtime
- **Less performant**: Benchmarks show class components are faster

**Implementation complexity**: LOW

**Key technical challenges**:

1. Proper JavaScript function wrapping
2. Ensuring memo() is imported from preact/compat
3. Handling optional custom comparison functions

**Implementation**:

**File: src/scala/preact/bindings/Component.scala**

```scala
package preact.bindings

import scala.scalajs.js

object ComponentHelpers:

  // Components with props (case class)
  inline def component[P <: Props](f: Component[P]): ComponentFunction[P] =
    val jsFunc: ComponentFunction[P] = (props: P) => f(props)
    memo(jsFunc, js.undefined)

  // Components without props
  inline def component(f: SimpleComponent): ComponentFunction[NoProps.type] =
    val jsFunc: ComponentFunction[NoProps.type] = (_: NoProps.type) => f()
    memo(jsFunc, js.undefined)

  // Custom comparison for advanced cases
  inline def componentWithCompare[P <: Props](
    f: Component[P],
    areEqual: (P, P) => Boolean
  ): ComponentFunction[P] =
    val jsFunc: ComponentFunction[P] = (props: P) => f(props)
    val jsCompare: js.Function2[P, P, Boolean] =
      (prev: P, next: P) => areEqual(prev, next)
    memo(jsFunc, jsCompare)
```

## Performance Considerations

### memo() Performance Characteristics

The `memo()` wrapper provides excellent performance for functional components:

**Benefits**:

- **Shallow prop comparison**: Automatically prevents re-renders when props haven't changed
- **Immutable case classes**: Scala's case classes provide efficient equality checks
- **Hooks compatibility**: Works seamlessly with Preact Signals hooks (`useSignal`, `useSignalEffect`)

**Further optimization with Signals**:
Preact Signals provides **fine-grained reactivity** that bypasses Virtual DOM diffing entirely:

- When a component reads a signal value, only that specific component re-renders when the signal changes
- Signal updates can directly mutate the DOM, skipping the reconciliation phase
- This makes signals + memo() a highly performant combination

**Benchmark expectations**:

- memo() functional components: ~90-95% of class component performance
- With Signals: Often faster than class components due to fine-grained updates
- Unmemoized functional: ~10-20% (re-renders everything unnecessarily)

---

## Approach Comparison

### When to Use Each Approach

**Unified Component-as-Case-Class (Preferred)**:
- ✅ Most components - this is the recommended default
- ✅ Components with multiple props
- ✅ Components that accept children or className
- ✅ When you want unified syntax with HTML elements
- ✅ External JS components that need Scala facades

**Functional Components + memo() (Alternative)**:
- ✅ Very simple components without props
- ✅ Quick prototyping or examples
- ✅ When you prefer separating props from render logic
- ✅ Compatibility with existing functional component patterns

**Comparison Table**:

| Aspect | Component-as-Case-Class | Functional + memo() |
|--------|------------------------|---------------------|
| Definition | Single case class with render | Separate props + function |
| Props access | `field` or `this.field` | `props.field` |
| Syntax | Unified with HTML DSL | Traditional function call |
| Boilerplate | Minimal (case class + render) | Low (function only) |
| Children/ClassName | Natural fields | Manual handling |
| External components | Same pattern | Requires wrapper |
| Mental model | OOP (component is object) | FP (function of props) |
| Implementation | MEDIUM-HIGH complexity | LOW complexity |

**Recommendation**: Start with Component-as-Case-Class for most use cases. Both compile to the same Preact functional components, but the unified approach provides better ergonomics and consistency.

---

## Why Not Class Components?

While Preact supports class components, this library focuses exclusively on functional components for several key reasons:

1. **Hooks Requirement**: Preact Signals provides hooks like `useSignal()` and `useSignalEffect()` that only work with functional components. Since signals are the primary state management solution, functional components are required.

2. **Automatic Signal Tracking**: Functional components integrate seamlessly with Preact's automatic signal dependency tracking. Class components would require manual subscription management.

3. **Simpler Implementation**: Functional components with `memo()` are straightforward to implement and maintain, avoiding the complexity of macro-generated classes or manual lifecycle methods.

4. **Modern Preact Patterns**: The Preact ecosystem has moved toward functional components and hooks as the recommended approach.

The combination of functional components + `memo()` + signals provides excellent performance with a simple, maintainable API.

---

## Implementation Strategy

The implementation follows a straightforward path:

1. **Implement functional components with memo() wrapper** - This provides the core component functionality with good performance and full hooks compatibility

2. **Leverage Preact Signals for state management** - Use `useSignal()` for local state and global signals for shared state, enabling fine-grained reactivity

3. **Optimize with immutable case classes** - Scala's case classes provide efficient shallow equality checks, making `memo()` highly effective

4. **(Optional) Consider inline macro optimization** - If performance profiling reveals bottlenecks, the `component:` syntax could be transparently upgraded to an inline macro (see "Future: Inline Macro Optimization" below)

---

## Props Design: Derived Modifier Pattern

### Overview

Component props use a **derived modifier pattern** that provides:
- ✅ **Zero boilerplate** - Define props as case classes (same as before)
- ✅ **Unified syntax** - Components and HTML elements use identical modifier syntax
- ✅ **Automatic derivation** - Macro generates modifier schema from case class
- ✅ **Type safety** - Compile-time validation of required props
- ✅ **Special types** - `Children` and `ClassName` accumulate automatically
- ✅ **Default values** - Case class defaults work naturally

### The Key Insight

Props are defined as case classes, but **usage** is identical to HTML DSL modifiers:

```scala
// HTML element
div(
  cls := "container",
  span("Hello")
)

// Custom component - SAME SYNTAX!
Button(
  ButtonProps.label := "Click",
  span("Icon")
)
```

This creates a **unified markup language** where built-in and custom components are indistinguishable.

### Special Types: Children

**The `Children` type** accumulates child modifiers automatically:

```scala
// Opaque type for children
opaque type Children = Seq[Child]

object Children:
  def empty: Children = Seq.empty
  def apply(children: Child*): Children = children.toSeq
```

**Usage:**

```scala
case class ButtonProps(
  label: String,
  children: Children = Children.empty
) extends Props

val Button = component[ButtonProps]: props =>
  button(
    props.label,
    props.children  // Renders accumulated children
  )

// Children accumulate automatically
Button(
  ButtonProps.label := "Click me",
  span("Icon "),       // Child 1
  "Button text"        // Child 2
)
```

### Special Types: ClassName

**The `ClassName` type** accumulates `cls` modifiers automatically:

```scala
// Opaque type for class names
opaque type ClassName = String

object ClassName:
  def empty: ClassName = ""
  def apply(classes: String*): ClassName =
    classes.filter(_.nonEmpty).mkString(" ")
```

**Usage:**

```scala
case class ButtonProps(
  label: String,
  className: ClassName = ClassName.empty
) extends Props

val Button = component[ButtonProps]: props =>
  button(
    className := props.className,  // Converts to string
    props.label
  )

// cls modifiers accumulate into className
Button(
  ButtonProps.label := "Click",
  cls := "btn",
  cls := "btn-primary",
  cls := "btn-large"
)
// Component receives: className = "btn btn-primary btn-large"
```

**Conditional classes:**

```scala
extension (s: String)
  def when(condition: Boolean): String =
    if condition then s else ""

Button(
  ButtonProps.label := "Click",
  cls := "btn",
  cls := "active".when(isActive),
  cls := "disabled".when(isDisabled)
)
```

### Complete Example: Card Component

```scala
case class CardProps(
  title: String,
  variant: String = "default",
  className: ClassName = ClassName.empty,
  children: Children = Children.empty
) extends Props

val Card = component[CardProps]: props =>
  div(
    cls := "card",
    cls := s"card-${props.variant}",
    cls := props.className,
    div(cls := "card-title", props.title),
    div(cls := "card-content", props.children)
  )

// Usage - natural and consistent!
Card(
  CardProps.title := "Welcome",
  CardProps.variant := "primary",
  cls := "shadow-lg",
  cls := "rounded-xl",
  p("This is the card content"),
  button("Click me")
)

// Renders to:
// <div class="card card-primary shadow-lg rounded-xl">
//   <div class="card-title">Welcome</div>
//   <div class="card-content">
//     <p>This is the card content</p>
//     <button>Click me</button>
//   </div>
// </div>
```

### How It Works

A Scala 3 macro derives the modifier schema from your case class:

```scala
// You write:
case class ButtonProps(
  label: String,
  disabled: Boolean = false
) extends Props

val Button = component[ButtonProps]: props => button(props.label)

// Macro generates (conceptual):
object ButtonProps:
  val label = RequiredProp[String]("label")
  val disabled = OptionalProp[Boolean]("disabled", default = false)

object Button:
  def apply(modifiers: Modifier*): VNode =
    // Accumulate modifiers, validate required props, construct case class
    // Then call render function
```

### Benefits

| Feature | Traditional Props | Modifier Pattern |
|---------|------------------|------------------|
| Syntax consistency | ❌ Different from HTML | ✅ Identical to HTML DSL |
| Children handling | ⚠️ Manual field | ✅ Automatic accumulation |
| ClassName handling | ⚠️ Manual concatenation | ✅ Automatic with `cls` |
| Default values | ✅ Case class defaults | ✅ Case class defaults |
| Type safety | ✅ Good | ✅ Excellent (required validation) |
| Definition | ✅ Simple case class | ✅ Same case class |
| Performance | ✅ Excellent | ✅ Good (small overhead) |

---

## Component Usage Patterns

### Component with Props

```scala
case class ButtonProps(
  label: String,
  onClick: js.Function0[Unit],
  disabled: Boolean = false
) extends Props

val Button = component[ButtonProps]: props =>
  button(
    onClick := props.onClick,
    disabled := props.disabled,
    props.label
  )

// Usage - Modifier syntax (recommended)
Button(
  ButtonProps.label := "Click me",
  ButtonProps.onClick := (() => println("Clicked!")),
  ButtonProps.disabled := true
)

// Or with imports
import ButtonProps.*
Button(
  label := "Click me",
  onClick := (() => println("Clicked!"))
)

// Traditional syntax (also works)
Button(ButtonProps(
  label = "Click me",
  onClick = () => println("Clicked!")
))
```

### Component without Props

```scala
val Header = component: () =>
  header(
    h1("My Application"),
    nav(
      a(href := "/", "Home"),
      a(href := "/about", "About")
    )
  )

// Usage
Header()
```

### Component with Custom Comparison

```scala
case class ExpensiveListProps(
  items: Seq[Item],
  config: Config
) extends Props

val ExpensiveList = componentWithCompare[ExpensiveListProps](
  props => div(props.items.map(renderItem)*),
  // Only re-render if items reference changed (Seq is immutable)
  (prev, next) => prev.items eq next.items
)
```

### Component Composition

```scala
case class CardProps(
  title: String,
  content: String,
  className: ClassName = ClassName.empty,
  children: Children = Children.empty
) extends Props

val Card = component[CardProps]: props =>
  div(
    cls := "card",
    cls := props.className,
    h3(props.title),
    p(props.content),
    props.children
  )

val Dashboard = component: () =>
  div(
    cls := "dashboard",
    Card(
      CardProps.title := "Welcome",
      CardProps.content := "Hello user!",
      cls := "featured"
    ),
    Card(
      CardProps.title := "Stats",
      CardProps.content := "42 items"
    )
  )
```

---

## Future: Inline Macro Optimization

The `component:` syntax could potentially be upgraded to use a Scala 3 inline macro if performance profiling reveals that the runtime `memo()` wrapper introduces unacceptable overhead.

### Key Insight: Syntax Unification

The current `component:` helper is already an inline function:

```scala
inline def component[P <: Props](f: Component[P]): ComponentFunction[P] = ...
```

Scala 3 inline macros are also inline functions, just with compile-time code generation using quotes and splices. This means the user-facing syntax could remain **identical**, with only the internal implementation changing.

**Current (runtime wrapping)**:

```scala
val MyButton = component[ButtonProps]: props =>
  button(onClick := props.onClick, props.label)
```

**Future (macro, same syntax)**:

```scala
val MyButton = component[ButtonProps]: props =>
  button(onClick := props.onClick, props.label)
```

### What Would Change

The inline macro version would generate optimized code at compile time instead of wrapping at runtime:

- **Current**: Wraps the function with `memo()` at runtime
- **Future**: Could generate a Preact class component or optimized functional component at compile time
- **User code**: No changes required - the syntax stays the same

### When to Consider This

Only implement the inline macro optimization if:

1. **Performance profiling** shows the `memo()` wrapper overhead is significant (>10% in critical paths)
2. **Real-world benchmarks** demonstrate that the optimization provides measurable benefits
3. **Development resources** are available for macro implementation and maintenance

### Benefits of Deferring

- **Simpler implementation**: Focus on getting the core bindings working first
- **Easier debugging**: Runtime code is more transparent than macro-generated code
- **Future-proof**: Can always add the optimization later without breaking existing code
- **Pragmatic**: The memo() approach is already very performant, especially with signals

---

## Implementation Phases

The component and props system will be implemented in phases:

### Phase 1: Core Component System
1. Implement `component[Props]` helper with `memo()` wrapper
2. Support basic case class props (traditional syntax)
3. Type system for `Props`, `Component`, `ComponentFunction`
4. Basic memoization with shallow prop comparison

**Deliverable**: Functional components work with case class props

### Phase 2: Special Types (Children & ClassName)
1. Define `Children` opaque type
2. Define `ClassName` opaque type
3. Components can accept and use these special types
4. Manual construction (not yet automatic accumulation)

**Deliverable**: Components can use `Children` and `ClassName` explicitly

### Phase 3: Modifier Pattern Derivation
1. Implement Scala 3 macro to derive modifier schema from case class
2. Generate prop modifier objects in companion object
3. Generate component `apply` method accepting `Modifier*`
4. Basic props builder (accumulates modifiers, constructs case class)

**Deliverable**: Modifier syntax works for component props

### Phase 4: Automatic Accumulation
1. Special handling for `ChildModifier` → accumulate into `children` prop
2. Special handling for `ClsModifier` (`cls := "x"`) → accumulate into `className` prop
3. Type-level detection of `Children`/`ClassName` fields in props
4. Automatic construction of special types from accumulated modifiers

**Deliverable**: Children and className accumulate automatically

### Phase 5: Type-Level Validation
1. Match types to extract required vs optional fields
2. Compile-time validation that required props are provided
3. Clear error messages for missing required props
4. Error when children/className modifiers used without corresponding prop field

**Deliverable**: Compile-time safety for required props

### Phase 6: Polish & Optimization
1. Optimize builder to reduce allocations
2. Inline builder logic where possible
3. Support complex default value expressions
4. Better error messages with source positions
5. Documentation and examples

**Deliverable**: Production-ready component system

---

## Summary

This document defines the component implementation approach for Scala 3 Preact bindings:

**Preferred Design - Unified Component-as-Case-Class**:
- ✅ **Single definition**: Component and props unified - case class fields ARE the props
- ✅ **Natural Scala**: Component instance = props, `render` method for output
- ✅ **Zero boilerplate**: Just define `case class MyComponent(...): def render = ...`
- ✅ **Unified syntax**: Components and HTML elements use identical modifier syntax
- ✅ **Standard Scala 3**: Uses `derives` mechanism and companion object patterns
- ✅ **Hooks-compatible**: Compiles to memoized functional components for `useSignal()`, `useSignalEffect()`

**Core Design Principles**:
- Component case class fields define the props (immutable by default)
- `render` method returns VNode using HTML DSL
- Companion object extends `ComponentCompanion[T]` for modifier generation
- Special types (`Children`, `ClassName`) work naturally as fields
- Compiles to Preact's `h()` calls with `memo()` wrapping

**Props Innovation with Derived Modifier Pattern**:
- ✅ **Automatic derivation**: Companion generates prop modifiers from case class fields
- ✅ **Special types**: `Children` and `ClassName` accumulate automatically
- ✅ **Type safety**: Compile-time validation of required props
- ✅ **Default values**: Case class defaults work naturally
- ✅ **External components**: Same pattern works for imported JS components

**Key Benefits**:
- ✅ Excellent performance (compiles to memoized functional components)
- ✅ Full compatibility with Preact Signals hooks
- ✅ Unified markup language (components = HTML elements)
- ✅ Idiomatic Scala 3 OOP style (component is a case class with render method)
- ✅ Automatic child and className accumulation
- ✅ Works with both internal and external (JS) components

**Implementation Status**:
- Component-as-case-class pattern designed as preferred approach
- Alternative functional component pattern available for simpler cases
- Props modifier pattern designed with automatic derivation
- Signals integration detailed in [signals-design.md](./signals-design.md)
- Class components excluded due to hooks incompatibility
