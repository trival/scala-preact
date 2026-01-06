# Component Implementation - Design Approaches

## Overview
This document explores different approaches for implementing Scala 3 Preact component bindings, with their performance characteristics and implementation tradeoffs.

See also:
- [Library General](./library-general.md) - Core architecture and facades
- [HTML DSL Design](./html-dsl-design.md) - Laminar-inspired modifier API

---

## Design Constraints

All component approaches must:
1. Support case class props (immutable by default)
2. Leverage immutability for automatic performance optimization
3. Compile to idiomatic JavaScript that Preact understands
4. Be function-based (user writes functions, not classes)
5. Use braceless Scala 3 syntax
6. Have zero or minimal runtime overhead

---

## Alternative Approaches

### Approach 1: @component Macro + Preact Component Classes

**BEST PERFORMANCE - HIGHEST COMPLEXITY**

**Concept**: Use a Scala 3 macro annotation `@component` that transforms a Scala function into a Preact component class with automatic `shouldComponentUpdate` implementation.

**How it works**:
```scala
@component
def MyButton(props: ButtonProps): VNode =
  button(onClick := props.onClick, props.label)
```

The macro generates JavaScript code equivalent to:
```javascript
class MyButton extends preact.Component {
  shouldComponentUpdate(nextProps) {
    // Shallow comparison of all props
    return !shallowEqual(this.props, nextProps)
  }

  render() {
    return h('button', {onClick: this.props.onClick}, this.props.label)
  }
}
```

**Advantages**:
- **Best performance**: Preact component classes with `shouldComponentUpdate` are faster than `memo()` functional components
- **No wrapper overhead**: Direct class generation, no runtime wrapping
- **Fine-grained control**: Can customize comparison logic per component if needed
- **True zero-cost abstraction**: Macro expands at compile time

**Disadvantages**:
- **Complex macro implementation**: Requires sophisticated compile-time code generation
- **Harder to debug**: Macro-generated code can be opaque
- **Scala 3 macro expertise required**: Non-trivial to implement correctly
- **Potential compilation overhead**: Macros can slow down compile times

**Implementation complexity**: HIGH

**Key technical challenges**:
1. Generating JavaScript class syntax from Scala.js
2. Implementing shallow equality comparison for case class props
3. Handling children props correctly
4. Ensuring proper `this` binding in methods
5. Type-safe macro that preserves type information

---

### Approach 2: Functional Components + memo() Wrapper

**GOOD PERFORMANCE - LOW COMPLEXITY (RECOMMENDED FOR INITIAL IMPLEMENTATION)**

**Concept**: Wrap Scala component functions with Preact's `memo()` at runtime through a helper function.

**How it works**:
```scala
val MyButton = component[ButtonProps]: props =>
  button(onClick := props.onClick, props.label)
```

The `component` helper wraps the function:
```javascript
export const MyButton = memo((props) => {
  return h('button', {onClick: props.onClick}, props.label)
})
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

---

### Approach 3: Manual Component Classes (No Macro)

**Concept**: Provide a base `Component` trait that users extend manually, implementing Scala traits that compile to JavaScript classes.

**How it works**:
```scala
class MyButton extends Component[ButtonProps]:
  def render(): VNode =
    button(onClick := props.onClick, props.label)
```

**Advantages**:
- **No macro magic**: Explicit class definition
- **Full control**: Users can override any lifecycle method
- **Performance**: Direct class components

**Disadvantages**:
- **Verbose**: Users write more boilerplate
- **Not function-based**: Deviates from desired functional API
- **Manual shouldComponentUpdate**: Users must implement optimization themselves

**Implementation complexity**: MEDIUM

**Not recommended**: Doesn't meet the requirement for function-based API.

---

### Approach 4: Hybrid - Simple Wrapper + Optional @component

**Concept**: Start with simple `component()` wrapper (Approach 2) but provide optional `@component` macro for performance-critical components.

**How it works**:
```scala
// Simple wrapper for most components
val SimpleButton = component[ButtonProps]: props =>
  button(props.label)

// Macro annotation for performance-critical components
@component
def ComplexList(props: ListProps): VNode =
  div(props.items.map(item => renderItem(item))*)
```

**Advantages**:
- **Progressive optimization**: Start simple, optimize later
- **Flexibility**: Choose per-component
- **Easier migration**: Can switch approaches without rewriting everything

**Disadvantages**:
- **Two APIs to maintain**: More surface area
- **Confusion**: Users must understand when to use which approach

**Implementation complexity**: HIGH (both approaches)

**Potentially valuable**: Provides escape hatch for performance-critical code while keeping simple cases simple.

---

## Performance Considerations

### Preact Component Classes vs memo()

**Why classes are faster**:
1. **Direct lifecycle method**: `shouldComponentUpdate` is called directly by Preact's reconciler
2. **No wrapper function**: Classes don't need the memo wrapper closure
3. **Simpler call stack**: Fewer function calls during rendering
4. **Better JIT optimization**: JavaScript engines optimize classes well

**Benchmark expectations**:
- Class components: ~100% baseline
- memo() functional: ~90-95% (small overhead from wrapper)
- Unmemoized functional: ~10-20% (re-renders everything)

**For this project**: Since we're leveraging immutability, the shallow comparison in `shouldComponentUpdate` will be extremely effective, making any memoization approach highly beneficial.

---

## Recommended Implementation Strategy

Given the goal of exploring alternatives with minimal initial complexity:

### Phase 1: Implement Approach 2 (memo wrapper) FIRST

**Why?**
1. **Fastest to test**: Can validate the core bindings design quickly
2. **Still performant**: ~90-95% performance is good enough for initial testing
3. **Foundation for macros**: The core type system will be reused in macro approach
4. **Easy comparison**: Can later implement Approach 1 and benchmark differences

### Phase 2: Evaluate and Decide

Once the basic bindings work:
1. Benchmark the memo() approach in real-world scenarios
2. Determine if performance is acceptable for target use cases
3. If needed, implement the @component macro approach
4. Compare performance in real-world scenarios
5. Decide which to use as the primary API (or keep both for Approach 4)

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

// Usage
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
  content: String
) extends Props

val Card = component[CardProps]: props =>
  div(
    className := "card",
    h3(props.title),
    p(props.content)
  )

val Dashboard = component: () =>
  div(
    className := "dashboard",
    Card(CardProps("Welcome", "Hello user!")),
    Card(CardProps("Stats", "42 items"))
  )
```

---

## Future: Macro Implementation (Approach 1)

If we decide to implement the @component macro approach, here are the key considerations:

### Macro Structure

**File: src/scala/preact/bindings/ComponentMacro.scala**

```scala
package preact.bindings

import scala.annotation.{Annotation, StaticAnnotation}
import scala.quoted.*

class component extends StaticAnnotation:
  // Macro implementation outline:
  // 1. Extract function definition (name, parameters, return type, body)
  // 2. Validate: must take Props or Unit, must return VNode
  // 3. Generate JavaScript class extending Preact.Component
  // 4. Generate shouldComponentUpdate with shallow comparison
  // 5. Transform function body into render() method
  // 6. Preserve type information for type-safe usage
```

### Technical Challenges

1. **Class generation**: Scala.js doesn't directly support emitting JavaScript class syntax
   - Solution: Use @JSExportTopLevel and @JSExport with careful structuring
   - Alternative: Generate factory function that creates class at runtime

2. **Shallow comparison**: Need to compare all fields of case class props
   - Solution: Use Scala 3 deriving to generate equality check
   - Must handle nested case classes, collections, etc.

3. **Props extraction**: Component class has `this.props`, function has parameter
   - Solution: Transform all references to props parameter into `this.props`

4. **Type preservation**: Macro must maintain full type information
   - Solution: Use TypeRepr and Symbol APIs carefully

5. **Debugging**: Generated code needs good source maps
   - Solution: Preserve position information in macro expansion

### Example Macro Output

Input:
```scala
@component
def MyButton(props: ButtonProps): VNode =
  button(onClick := props.onClick, props.label)
```

Conceptual output (actual implementation would be more complex):
```scala
object MyButton extends js.Object:
  private class Component extends Preact.Component:
    def shouldComponentUpdate(nextProps: js.Any, nextState: js.Any): Boolean =
      val current = this.props.asInstanceOf[ButtonProps]
      val next = nextProps.asInstanceOf[ButtonProps]
      current != next // Case class equality

    def render(): VNode =
      val props = this.props.asInstanceOf[ButtonProps]
      button(onClick := props.onClick, props.label)

  val instance: ComponentFunction[ButtonProps] = Component.asInstanceOf[ComponentFunction[ButtonProps]]
```

### Decision Criteria for Macro Implementation

Implement the macro approach if:
1. Benchmarks show memo() overhead is significant (>10%)
2. Real-world applications show performance bottlenecks
3. Team has Scala 3 macro expertise available
4. Maintenance burden is acceptable

Don't implement if:
1. memo() performance is acceptable
2. Complexity outweighs benefits
3. Debugging difficulties would hurt productivity

---

## Summary

**Recommended path**:
1. Start with **Approach 2** (memo wrapper) for simplicity and speed
2. Build real applications and gather performance data
3. If needed, implement **Approach 1** (@component macro) for critical paths
4. Consider **Approach 4** (hybrid) if both are valuable

**Current status**:
- Approach 2 is fully designed and ready to implement
- Approach 1 is documented but not yet implemented
- Decision point after Phase 5 (Performance Evaluation)
