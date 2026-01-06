# Scala 3 Preact Bindings - Implementation Overview

## Overview
This document serves as the main index for the Scala 3 Preact bindings implementation planning. The design has been split into focused documents for easier iteration and refinement.

## Design Documents

1. **[Library General](./library-general.md)** - Core architecture, types, facades, and implementation roadmap
2. **[Component Implementation](./component-implementation.md)** - Component definition API approaches and tradeoffs
3. **[HTML DSL Design](./html-dsl-design.md)** - Laminar-inspired unified modifier API
4. **[Signals and State Management](./signals-design.md)** - Preact Signals integration with Scala API

## Quick Start

For implementation, start with:
1. Read [Library General](./library-general.md) for foundational architecture
2. Review [Component Implementation](./component-implementation.md) to choose component approach
3. Study [HTML DSL Design](./html-dsl-design.md) for the unified modifier system
4. Explore [Signals and State Management](./signals-design.md) for reactive state

---

## Original Planning Document (Historical Reference)

The sections below represent the original monolithic planning document. They are kept for historical reference but may be outdated. Refer to the focused documents above for current design decisions.

## Project Context
- **Build System**: scala-cli with project.scala
- **Scala Version**: 3.8.0-RC5 (with improved Scala.js support and macros)
- **Scala.js**: 1.20.2 with ES modules
- **Preact Version**: 10.28.2
- **Code Style**: Braceless syntax (Scala 3 style)
- **Starting Point**: Empty bindings.scala file

## Core Requirements
1. Function-based Scala code that compiles to Preact components
2. Automatic performance optimization leveraging Scala's immutability
3. Props using case classes (immutable by default)
4. Function-based HTML DSL: `div(className := "foo")(h1("Hello"))`
5. Initial scope: Core rendering only (h, render, Fragment) - no hooks yet
6. Braceless syntax throughout
7. Minimal, testable implementation to evaluate approaches

## Design Principles
- Thin abstraction over Preact's JavaScript API
- Zero or minimal runtime overhead
- Leverage immutability for automatic performance optimization
- Idiomatic Scala 3 with modern features (macros, opaque types, inline)
- Type-safe where possible, pragmatic where needed
- Performance-first approach

---

## Alternative Approaches

This section documents different strategies for implementing the bindings, with performance and complexity tradeoffs.

### Approach 1: @component Macro + Preact Component Classes (RECOMMENDED FOR PERFORMANCE)

**Concept**: Use a Scala 3 macro annotation `@component` that transforms a Scala function into a Preact component class with automatic `shouldComponentUpdate` implementation.

**How it works**:
```scala
@component
def MyButton(props: ButtonProps): VNode =
  button(onClick := props.onClick)(props.label)
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

**Concept**: Wrap Scala component functions with Preact's `memo()` at runtime through a helper function.

**How it works**:
```scala
val MyButton = component[ButtonProps]: props =>
  button(onClick := props.onClick)(props.label)
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
- **Slightly slower than classes**: `memo()` adds a small wrapper overhead
- **Runtime wrapping**: Component wrapping happens at runtime
- **Less performant**: Benchmarks show class components are faster

**Implementation complexity**: LOW

**Key technical challenges**:
1. Proper JavaScript function wrapping
2. Ensuring memo() is imported from preact/compat
3. Handling optional custom comparison functions

---

### Approach 3: Manual Component Classes (No Macro)

**Concept**: Provide a base `Component` trait that users extend manually, implementing Scala traits that compile to JavaScript classes.

**How it works**:
```scala
class MyButton extends Component[ButtonProps]:
  def render(): VNode =
    button(onClick := props.onClick)(props.label)
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

---

### Approach 4: Hybrid - Simple Wrapper + Optional @component

**Concept**: Start with simple `component()` wrapper (Approach 2) but provide optional `@component` macro for performance-critical components.

**How it works**:
```scala
// Simple wrapper for most components
val SimpleButton = component[ButtonProps]: props =>
  button()(props.label)

// Macro annotation for performance-critical components
@component
def ComplexList(props: ListProps): VNode =
  div()(props.items.map(item => renderItem(item))*)
```

**Advantages**:
- **Progressive optimization**: Start simple, optimize later
- **Flexibility**: Choose per-component
- **Easier migration**: Can switch approaches without rewriting everything

**Disadvantages**:
- **Two APIs to maintain**: More surface area
- **Confusion**: Users must understand when to use which approach

**Implementation complexity**: HIGH (both approaches)

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

**For this project**: Since we're leveraging immutability, the shallow comparison in `shouldComponentUpdate` will be extremely effective, making the class approach ideal.

---

## Recommended Minimal Implementation Strategy

Given the goal of exploring alternatives, we should implement **Approach 2 (memo wrapper) FIRST** because:

1. **Fastest to test**: Can validate the core bindings design quickly
2. **Still performant**: ~90-95% performance is good enough for initial testing
3. **Foundation for macros**: The core type system will be reused in macro approach
4. **Easy comparison**: Can later implement Approach 1 and benchmark differences

Once the basic bindings work, we can:
1. Benchmark the memo() approach
2. Implement the @component macro approach
3. Compare performance in real-world scenarios
4. Decide which to use as the primary API

---

## Common Foundation (All Approaches)

Regardless of which component approach we choose, all alternatives share this foundation:

### 1. Core Type System

**File: src/scala/preact/bindings/Types.scala** (NEW)

Define foundational types:

```scala
package preact.bindings

import scala.scalajs.js

// Opaque VNode type for type safety with zero overhead
opaque type VNode = js.Any
object VNode:
  inline def apply(node: js.Any): VNode = node
  extension (vnode: VNode)
    inline def raw: js.Any = vnode

// Children types - flexible to match Preact's expectations
type Child = VNode | String | Int | Double | Boolean | Null

// Props base trait - marker for JS-compatible props
trait Props extends js.Object

// Empty props for components without props
object NoProps extends Props

// Component function types (for Approach 2: memo wrapper)
type ComponentFunction[P <: Props] = js.Function1[P, VNode]
type Component[P <: Props] = P => VNode
type SimpleComponent = () => VNode
```

**Key Design Decisions**:
- Opaque VNode prevents mixing with arbitrary js.Any while maintaining zero cost
- Multiple Child types for flexibility (strings, numbers, booleans, vnodes)
- Props trait ensures JS compatibility
- Component types support functional style

### 2. JavaScript Facades

**File: src/scala/preact/bindings/Facades.scala** (NEW)

Direct bindings to Preact's JavaScript API:

```scala
package preact.bindings

import scala.scalajs.js
import scala.scalajs.js.annotation.*

@js.native
@JSImport("preact", JSImport.Namespace)
object Preact extends js.Object:
  def h(
    nodeName: String | ComponentFunction[?] | js.Any,
    attributes: js.UndefOr[js.Object],
    children: Child*
  ): VNode = js.native

  def render(vnode: VNode, container: js.Any): Unit = js.native

  val Fragment: js.Any = js.native

  // For Approach 1: Component class base
  @js.native
  trait Component extends js.Object:
    val props: js.Any = js.native
    def render(): VNode = js.native
    def shouldComponentUpdate(nextProps: js.Any, nextState: js.Any): Boolean = js.native

// For Approach 2: memo wrapper
@js.native
@JSImport("preact/compat", "memo")
def memo[P <: Props](
  component: ComponentFunction[P],
  arePropsEqual: js.UndefOr[js.Function2[P, P, Boolean]] = js.undefined
): ComponentFunction[P] = js.native
```

**Key Design Decisions**:
- Use @JSImport for ES module imports (matching project's jsModuleKind)
- Include Component class facade for Approach 1 (class-based components)
- Include memo() facade for Approach 2 (functional components)
- Varargs for children to match Preact's API
- Fragment as js.Any since it can be used as nodeName

### 3. Component Implementation (Approach-Specific)

This is where the approaches diverge significantly.

#### For Approach 2 (memo wrapper) - Minimal Initial Implementation

**File: src/scala/preact/bindings/Component.scala** (NEW)

Simple runtime wrapper with automatic memoization:

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

#### For Approach 1 (@component macro) - Future Implementation

**File: src/scala/preact/bindings/ComponentMacro.scala** (FUTURE)

Macro annotation that generates component classes:

```scala
package preact.bindings

import scala.annotation.{Annotation, StaticAnnotation}
import scala.quoted.*

class component extends StaticAnnotation:
  // Macro implementation that:
  // 1. Extracts function definition (name, params, body)
  // 2. Generates JavaScript class extending Preact.Component
  // 3. Implements shouldComponentUpdate with shallow comparison
  // 4. Transforms function body into render() method
  // 5. Handles props extraction and type preservation

// Detailed macro implementation would go here
// This is complex and requires:
// - Scala 3 macro expertise
// - Understanding of Scala.js JavaScript interop
// - Careful handling of types and code generation
```

**Note**: The macro implementation is significantly more complex and should be tackled only after validating the core bindings with Approach 2.

### 4. Attribute System

**File: src/scala/preact/bindings/Attributes.scala** (NEW)

Type-safe attribute builders using braceless syntax:

```scala
package preact.bindings

import scala.scalajs.js

// ADT for different attribute types
sealed trait Attribute

case class KeyValue(key: String, value: Any) extends Attribute
case class EventHandler(name: String, handler: js.Function) extends Attribute
case class StyleAttr(styles: Seq[(String, Any)]) extends Attribute
case class RefAttr(ref: js.Any) extends Attribute

object Attributes:

  // Core attribute syntax
  extension (key: String)
    infix def :=(value: Any): Attribute = KeyValue(key, value)

  // Common HTML attributes
  def className(value: String): Attribute = KeyValue("className", value)
  def id(value: String): Attribute = KeyValue("id", value)
  def href(value: String): Attribute = KeyValue("href", value)
  def src(value: String): Attribute = KeyValue("src", value)
  def alt(value: String): Attribute = KeyValue("alt", value)
  def target(value: String): Attribute = KeyValue("target", value)
  def value(value: String): Attribute = KeyValue("value", value)
  def placeholder(value: String): Attribute = KeyValue("placeholder", value)
  def disabled(value: Boolean): Attribute = KeyValue("disabled", value)
  def checked(value: Boolean): Attribute = KeyValue("checked", value)
  def width(value: String | Int): Attribute = KeyValue("width", value)
  def height(value: String | Int): Attribute = KeyValue("height", value)

  // Event handlers
  def onClick(handler: js.Function1[js.Any, Unit]): Attribute =
    EventHandler("onClick", handler)

  def onChange(handler: js.Function1[js.Any, Unit]): Attribute =
    EventHandler("onChange", handler)

  def onInput(handler: js.Function1[js.Any, Unit]): Attribute =
    EventHandler("onInput", handler)

  def onSubmit(handler: js.Function1[js.Any, Unit]): Attribute =
    EventHandler("onSubmit", handler)

  // Style helper
  def style(styles: (String, Any)*): Attribute =
    StyleAttr(styles)

  // Ref helper
  def ref(value: js.Any): Attribute =
    RefAttr(value)

  // Internal: Combine attributes into JS object
  private[bindings] def combineAttributes(attrs: Seq[Attribute]): js.UndefOr[js.Object] =
    if attrs.isEmpty then
      js.undefined
    else
      val obj = js.Dynamic.literal()
      attrs.foreach:
        case KeyValue(key, value) =>
          obj.updateDynamic(key)(value.asInstanceOf[js.Any])
        case EventHandler(name, handler) =>
          obj.updateDynamic(name)(handler)
        case StyleAttr(styles) =>
          val styleObj = js.Dynamic.literal()
          styles.foreach: (k, v) =>
            styleObj.updateDynamic(k)(v.asInstanceOf[js.Any])
          obj.updateDynamic("style")(styleObj)
        case RefAttr(refValue) =>
          obj.updateDynamic("ref")(refValue)
      obj.asInstanceOf[js.Object]
```

**Key Design Decisions**:
- ADT for type-safe attribute construction
- := operator for custom attributes
- Named functions for common attributes
- Runtime combination of attributes (small overhead, good ergonomics)
- Support for events, styles, and refs

### 5. HTML Element Builders

**File: src/scala/preact/bindings/Elements.scala** (NEW)

User-facing HTML DSL with braceless syntax:

```scala
package preact.bindings

import scala.scalajs.js

object Elements:

  // Internal helper to create elements
  private inline def elem(tag: String)(attrs: Attribute*)(children: Child*): VNode =
    val jsAttrs = Attributes.combineAttributes(attrs)
    Preact.h(tag, jsAttrs, children*)

  // HTML5 elements
  def div(attrs: Attribute*)(children: Child*): VNode = elem("div")(attrs*)(children*)
  def span(attrs: Attribute*)(children: Child*): VNode = elem("span")(attrs*)(children*)
  def p(attrs: Attribute*)(children: Child*): VNode = elem("p")(attrs*)(children*)

  // Headings
  def h1(attrs: Attribute*)(children: Child*): VNode = elem("h1")(attrs*)(children*)
  def h2(attrs: Attribute*)(children: Child*): VNode = elem("h2")(attrs*)(children*)
  def h3(attrs: Attribute*)(children: Child*): VNode = elem("h3")(attrs*)(children*)
  def h4(attrs: Attribute*)(children: Child*): VNode = elem("h4")(attrs*)(children*)
  def h5(attrs: Attribute*)(children: Child*): VNode = elem("h5")(attrs*)(children*)
  def h6(attrs: Attribute*)(children: Child*): VNode = elem("h6")(attrs*)(children*)

  // Links and media
  def a(attrs: Attribute*)(children: Child*): VNode = elem("a")(attrs*)(children*)
  def img(attrs: Attribute*): VNode = elem("img")(attrs*)()

  // Forms
  def button(attrs: Attribute*)(children: Child*): VNode = elem("button")(attrs*)(children*)
  def input(attrs: Attribute*): VNode = elem("input")(attrs*)()
  def textarea(attrs: Attribute*)(children: Child*): VNode = elem("textarea")(attrs*)(children*)
  def select(attrs: Attribute*)(children: Child*): VNode = elem("select")(attrs*)(children*)
  def option(attrs: Attribute*)(children: Child*): VNode = elem("option")(attrs*)(children*)
  def label(attrs: Attribute*)(children: Child*): VNode = elem("label")(attrs*)(children*)
  def form(attrs: Attribute*)(children: Child*): VNode = elem("form")(attrs*)(children*)

  // Sections
  def section(attrs: Attribute*)(children: Child*): VNode = elem("section")(attrs*)(children*)
  def article(attrs: Attribute*)(children: Child*): VNode = elem("article")(attrs*)(children*)
  def header(attrs: Attribute*)(children: Child*): VNode = elem("header")(attrs*)(children*)
  def footer(attrs: Attribute*)(children: Child*): VNode = elem("footer")(attrs*)(children*)
  def nav(attrs: Attribute*)(children: Child*): VNode = elem("nav")(attrs*)(children*)
  def main(attrs: Attribute*)(children: Child*): VNode = elem("main")(attrs*)(children*)

  // Lists
  def ul(attrs: Attribute*)(children: Child*): VNode = elem("ul")(attrs*)(children*)
  def ol(attrs: Attribute*)(children: Child*): VNode = elem("ol")(attrs*)(children*)
  def li(attrs: Attribute*)(children: Child*): VNode = elem("li")(attrs*)(children*)

  // Fragment
  def fragment(children: Child*): VNode =
    Preact.h(Preact.Fragment, js.undefined, children*)

  // Render a component with case class props
  def component[P <: Props](comp: ComponentFunction[P], props: P)(children: Child*): VNode =
    val propsWithChildren =
      if children.isEmpty then
        props
      else
        val dynProps = props.asInstanceOf[js.Dynamic]
        dynProps.updateDynamic("children")(js.Array(children*))
        dynProps.asInstanceOf[P]
    Preact.h(comp, propsWithChildren)

  // Render component without props
  def component(comp: ComponentFunction[NoProps.type]): VNode =
    Preact.h(comp, NoProps)
```

**Key Design Decisions**:
- Two-stage call: (attributes)(children) for clear separation
- Comprehensive HTML5 element coverage
- Fragment support for React-like patterns
- Component rendering helpers for case class props
- inline functions for zero overhead

### 6. Public API Package Object

**File: src/scala/preact/bindings/package.scala** (NEW)

Clean single-import API surface:

```scala
package preact

import scala.scalajs.js

package object bindings:

  // Export core types
  export preact.bindings.{
    VNode, Child, Props, NoProps,
    Component, ComponentFunction, SimpleComponent
  }

  // Export all elements
  export preact.bindings.Elements.*

  // Export all attributes with given instances
  export preact.bindings.Attributes.{*, given}

  // Export component helpers
  export preact.bindings.ComponentHelpers.{
    component,
    componentWithCompare
  }

  // Export facades for direct use if needed
  export preact.bindings.{Preact, memo}

  // Convenience render function
  def render(vnode: VNode, container: js.Any): Unit =
    Preact.render(vnode, container)
```

**Key Design Decisions**:
- Single import point: `import preact.bindings.*`
- Re-export all public API
- Hide internal implementation details
- Convenient render function wrapper

---

## Implementation Steps (Minimal Path)

### Phase 1: Foundation (Types & Facades)
1. Update project.scala with scalajs-dom dependency
2. Create Types.scala with VNode, Props, Child types
3. Create Facades.scala with @JSImport bindings to Preact (h, render, Fragment, memo)
4. Test basic interop with simple h() and render() calls
5. Verify memo() facade works

### Phase 2: Component System (Approach 2 - memo wrapper)
1. Create Component.scala with component helpers
2. Implement automatic memoization wrapping
3. Test that memo() is properly applied
4. Verify shallow comparison works with immutable props
5. Write simple example component

### Phase 3: HTML DSL
1. Create Attributes.scala with ADT and builders
2. Implement attribute combination logic
3. Create Elements.scala with element builders (start with just div, h1, p, button, a)
4. Test attribute and children handling
5. Expand element coverage as needed

### Phase 4: Public API & Testing
1. Create package.scala with exports
2. Ensure clean API surface
3. Write complete example application
4. Update Vite config to bundle Scala.js output
5. Test development workflow and hot reload

### Phase 5: Performance Evaluation
1. Benchmark the memo() approach
2. Evaluate if @component macro is needed
3. Document findings for future implementation

### Phase 6: Build Integration
1. Ensure Vite can bundle Scala.js output
2. Configure source maps for debugging
3. Test production build optimization
4. Document build process

---

## Example Usage (Approach 2 - memo wrapper)

After implementation, here's how the API will be used:

```scala
package example

import preact.bindings.*
import scala.scalajs.js
import scala.scalajs.js.annotation.*

// Props as case class (immutable)
case class ResourceProps(
  title: String,
  description: String,
  href: String
) extends Props

// Component with case class props
// Automatically memoized via memo() wrapper
val Resource = component[ResourceProps]: props =>
  a(
    href := props.href,
    target := "_blank",
    className := "resource"
  )(
    h2()(props.title),
    p()(props.description)
  )

// Component without props
// Also automatically memoized
val App = component: () =>
  div()(
    h1()("Scala Preact App"),
    section()(
      component(
        Resource,
        ResourceProps(
          title = "Learn Preact",
          description = "Interactive tutorial",
          href = "https://preactjs.com/tutorial"
        )
      )(),
      component(
        Resource,
        ResourceProps(
          title = "Scala.js",
          description = "Compile Scala to JavaScript",
          href = "https://www.scala-js.org/"
        )
      )()
    )
  )

// Entry point
@main def main(): Unit =
  val root = js.Dynamic.global.document.getElementById("app")
  render(component(App), root)
```

## Example Usage (Approach 1 - @component macro - FUTURE)

If we implement the macro approach, the API would look like:

```scala
package example

import preact.bindings.*
import scala.scalajs.js
import scala.scalajs.js.annotation.*

case class ResourceProps(
  title: String,
  description: String,
  href: String
) extends Props

// Macro transforms this into a Preact component class
@component
def Resource(props: ResourceProps): VNode =
  a(
    href := props.href,
    target := "_blank",
    className := "resource"
  )(
    h2()(props.title),
    p()(props.description)
  )

@component
def App(): VNode =
  div()(
    h1()("Scala Preact App"),
    section()(
      // Use the component directly as a function
      component(Resource, ResourceProps(
        title = "Learn Preact",
        description = "Interactive tutorial",
        href = "https://preactjs.com/tutorial"
      ))()
    )
  )

@main def main(): Unit =
  val root = js.Dynamic.global.document.getElementById("app")
  render(App(), root)
```

**Note**: The macro approach would require component definitions to be `def` (not `val`) so the macro can transform them.

---

## Files to Create/Modify (Minimal Implementation)

### New Files (Phase 1 & 2)
1. **src/scala/preact/bindings/Types.scala** - Core type definitions (VNode, Props, Child)
2. **src/scala/preact/bindings/Facades.scala** - JavaScript facades (h, render, Fragment, memo)
3. **src/scala/preact/bindings/Component.scala** - Component helpers with auto-memo (Approach 2)

### New Files (Phase 3)
4. **src/scala/preact/bindings/Attributes.scala** - Attribute system (ADT and builders)
5. **src/scala/preact/bindings/Elements.scala** - HTML element builders (start minimal)

### New Files (Phase 4)
6. **src/scala/preact/bindings/package.scala** - Public API exports

### Files to Modify
1. **project.scala** - Add scalajs-dom dependency
2. **src/scala/preact/bindings.scala** - Remove (replaced by package structure)
3. **vite.config.ts** - Configure to include Scala.js output
4. **package.json** - Ensure preact/compat is available

### Future Files (If implementing Approach 1)
- **src/scala/preact/bindings/ComponentMacro.scala** - @component macro implementation

---

## Future Enhancements

### Immediate Next Steps
After the minimal implementation, consider:

1. **Named Tuple Props Support**
   - Add PropsConversion.scala with ToProps type class
   - Support inline named tuples: `(name: String, age: Int)`
   - Trade-off: More flexible API vs. less IDE support

2. **@component Macro Implementation (Approach 1)**
   - Implement macro annotation for class component generation
   - Benchmark performance vs memo() approach
   - Decide on primary API based on results

3. **Extended HTML Elements**
   - Add more HTML5 elements to Elements.scala
   - SVG element support
   - Custom element support

### Medium-term Extensions
- **Hooks** (useState, useEffect, useMemo, useCallback, useRef, useContext)
- **Context API** (createContext, Provider, Consumer)
- **Refs** (createRef, useRef, forwardRef)
- **Type-safe events** (specific event types for different handlers)
- **More attributes** (aria-*, data-*, all HTML5 attributes)

### Advanced Features
- **Portals** - render children into different DOM nodes
- **Error boundaries** - catch errors in component tree
- **Suspense** - async component loading
- **Server-side rendering** - if Preact SSR is needed
- **DevTools integration** - Preact DevTools support

---

## Technical Considerations

### Scala.js Interop
- Using @JSImport for ES modules (matches jsModuleKind es)
- Props must extend js.Object for JS compatibility
- Event handlers must be js.Function types
- Varargs compile to JS rest parameters
- Opaque types provide zero-cost abstractions

### Performance
- **Opaque types** = zero runtime overhead
- **inline functions** = direct JS code generation
- **memo() overhead** = ~5-10% vs class components (estimated)
- **Attribute combination** = O(n) where n = number of attributes (typically 1-5)
- **Immutable props** = shallow comparison is very fast

### Type Safety
- VNode opaque type prevents js.Any mixing
- Props trait ensures JS compatibility
- Attribute ADT enables compile-time checking
- Component types distinguish Scala vs JS functions
- Compile-time guarantee of prop types

### Build System
- scala-cli for simple project structure
- Vite for fast development and bundling
- ES modules throughout for modern JavaScript
- Source maps for debugging Scala code

---

## Decision Points & Open Questions

### To Decide After Minimal Implementation:

1. **Component API**: Stick with Approach 2 (memo wrapper) or invest in Approach 1 (@component macro)?
   - Depends on: Performance benchmarks, macro complexity, maintainability

2. **Named Tuples**: Add support or keep case classes only?
   - Depends on: User feedback, ergonomics vs. type safety trade-off

3. **Hooks**: Which hooks to prioritize?
   - Definitely need: useState, useEffect
   - Nice to have: useMemo, useCallback, useRef
   - Advanced: useContext, useReducer, useImperativeHandle

4. **Element Coverage**: Full HTML5 or just common elements?
   - Start with: 20-30 most common elements
   - Expand based on: Actual usage patterns

5. **Event Types**: Generic js.Function or specific event types?
   - Generic: Simpler, more flexible
   - Specific: Better type safety, more verbose

---

## Summary of Tradeoffs

| Aspect | Approach 1 (Macro) | Approach 2 (memo) |
|--------|-------------------|-------------------|
| Performance | Best (~100%) | Good (~90-95%) |
| Implementation | Complex (macros) | Simple (functions) |
| Debugging | Harder (generated code) | Easy (transparent) |
| Flexibility | Less flexible | Very flexible |
| API Style | `@component def` | `val x = component` |
| Compile time | Slower (macro expansion) | Fast |
| Maintenance | Higher (macro fragility) | Lower (simple code) |

**Recommendation**: Start with Approach 2, measure performance, only implement Approach 1 if performance is insufficient.
