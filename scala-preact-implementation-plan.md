# Scala 3 Preact Bindings Implementation Plan

## Overview
Create idiomatic Scala 3 bindings for Preact with functional components, automatic memoization, and a type-safe HTML DSL. The bindings will leverage Scala's immutability for performance optimization through automatic memoization.

## Project Context
- **Build System**: scala-cli with project.scala
- **Scala Version**: 3.8.0-RC5 (with improved Scala.js support and named tuples)
- **Scala.js**: 1.20.2 with ES modules
- **Preact Version**: 10.28.2
- **Code Style**: Braceless syntax (Scala 3 style)
- **Starting Point**: Empty bindings.scala file

## User Requirements
1. Function-based components that compile to Preact components
2. Automatic memoization using Preact's `memo()` for all Scala components
3. Props using case classes AND named tuples (Scala 3.7+ feature)
4. Function-based HTML DSL: `div(className := "foo")(h1("Hello"))`
5. Initial scope: Core rendering only (h, render, Fragment) - no hooks yet
6. Braceless syntax throughout

## Design Principles
- Thin abstraction over Preact's JavaScript API
- Zero or minimal runtime overhead
- Leverage immutability for automatic shallow comparison
- Idiomatic Scala 3 with modern features
- Type-safe where possible, pragmatic where needed

---

## Implementation Plan

### 1. Project Configuration Updates

**File: project.scala**
- Add Scala.js DOM dependency for browser APIs
- Ensure proper ES module configuration is in place

### 2. Core Type System

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
type Children = js.Array[Child]

// Props base trait - marker for JS-compatible props
trait Props extends js.Object

// Empty props for components without props
object NoProps extends Props

// Component function types
type ComponentFunction[P <: Props] = js.Function1[P, VNode]
type Component[P <: Props] = P => VNode
type SimpleComponent = () => VNode
```

**Key Design Decisions**:
- Opaque VNode prevents mixing with arbitrary js.Any while maintaining zero cost
- Multiple Child types for flexibility (strings, numbers, booleans, vnodes)
- Props trait ensures JS compatibility

### 3. JavaScript Facades

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
    nodeName: String | ComponentFunction[?],
    attributes: js.UndefOr[js.Object],
    children: Child*
  ): VNode = js.native

  def render(vnode: VNode, container: js.Any): Unit = js.native

  val Fragment: ComponentFunction[?] = js.native

@js.native
@JSImport("preact/compat", "memo")
def memo[P <: Props](
  component: ComponentFunction[P],
  arePropsEqual: js.UndefOr[js.Function2[P, P, Boolean]] = js.undefined
): ComponentFunction[P] = js.native
```

**Key Design Decisions**:
- Use @JSImport for ES module imports (matching project's jsModuleKind)
- memo imported from preact/compat (where it actually lives)
- Varargs for children to match Preact's API

### 4. Props Conversion System

**File: src/scala/preact/bindings/PropsConversion.scala** (NEW)

Support both case classes and named tuples as props:

```scala
package preact.bindings

import scala.scalajs.js

// Type class for converting Scala types to JS props
trait ToProps[T]:
  def toJsObject(value: T): js.Object

object ToProps:
  // Case class props - already js.Object compatible
  given caseClassProps[T <: Props]: ToProps[T] with
    def toJsObject(value: T): js.Object = value.asInstanceOf[js.Object]

  // Named tuple props - convert to js.Object
  given namedTupleProps[T <: Tuple: scala.Tuple.IsMappedBy[AnyKV]]: ToProps[T] with
    def toJsObject(value: T): js.Object =
      val obj = js.Dynamic.literal()
      val names = scala.compiletime.constValueTuple[T.zip[Tuple.Map[T, scala.compiletime.ops.any.ToString]]]
      // Use runtime reflection to extract tuple values
      import scala.deriving.Mirror
      value.productIterator.zip(value.productElementNames).foreach:
        case (v, name) => obj.updateDynamic(name)(v.asInstanceOf[js.Any])
      obj.asInstanceOf[js.Object]

// Helper to extract props type class
transparent inline def toJsProps[T](value: T)(using conv: ToProps[T]): js.Object =
  conv.toJsObject(value)
```

**Key Design Decisions**:
- Type class pattern for extensibility
- Case classes remain first-class (extend Props trait)
- Named tuples converted at compile time where possible
- Fallback to runtime conversion for complex tuples

### 5. Component System with Auto-Memoization

**File: src/scala/preact/bindings/Component.scala** (NEW)

The core feature - automatic memoization for all components:

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

  // Components with named tuple props
  inline def componentWithTuple[T <: Tuple: ToProps](
    f: T => VNode
  ): ComponentFunction[js.Object] =
    val jsFunc: ComponentFunction[js.Object] = (props: js.Object) =>
      // Convert js.Object back to tuple for function call
      // Note: This requires runtime conversion
      f(props.asInstanceOf[T])
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

**Key Design Decisions**:
- ALL components wrapped with memo() automatically
- inline functions for zero overhead
- Default shallow comparison perfect for immutable props
- Special handling for named tuples
- Custom comparison available for edge cases

### 6. Attribute System

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

### 7. HTML Element Builders

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

  // Render a component with props
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

  // Render component with named tuple props
  inline def componentT[T <: Tuple: ToProps](
    comp: ComponentFunction[js.Object],
    props: T
  )(children: Child*): VNode =
    val jsProps = toJsProps(props)
    val propsWithChildren =
      if children.isEmpty then
        jsProps
      else
        val dynProps = jsProps.asInstanceOf[js.Dynamic]
        dynProps.updateDynamic("children")(js.Array(children*))
        dynProps.asInstanceOf[js.Object]
    Preact.h(comp, propsWithChildren)
```

**Key Design Decisions**:
- Two-stage call: (attributes)(children) for clear separation
- Comprehensive HTML5 element coverage
- Fragment support for React-like patterns
- Component rendering helpers for both case class and named tuple props
- inline functions where beneficial

### 8. Public API Package Object

**File: src/scala/preact/bindings/package.scala** (NEW)

Clean single-import API surface:

```scala
package preact

import scala.scalajs.js

package object bindings:

  // Export core types
  export preact.bindings.{
    VNode, Child, Children, Props, NoProps,
    Component, ComponentFunction, SimpleComponent
  }

  // Export all elements
  export preact.bindings.Elements.*

  // Export all attributes with given instances
  export preact.bindings.Attributes.{*, given}

  // Export component helpers
  export preact.bindings.ComponentHelpers.{
    component,
    componentWithCompare,
    componentWithTuple
  }

  // Export props conversion
  export preact.bindings.PropsConversion.{ToProps, toJsProps, given}

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

## Implementation Steps

### Phase 1: Foundation (Types & Facades)
1. Create Types.scala with VNode, Props, Child types
2. Create Facades.scala with @JSImport bindings to Preact
3. Test basic interop with simple h() and render() calls
4. Verify memo() facade works

### Phase 2: Props System
1. Create PropsConversion.scala with ToProps type class
2. Implement case class props support
3. Implement named tuple props conversion
4. Test both props mechanisms

### Phase 3: Component System
1. Create Component.scala with component helpers
2. Implement automatic memoization wrapping
3. Test that memo() is properly applied
4. Verify shallow comparison works with immutable props

### Phase 4: HTML DSL
1. Create Attributes.scala with ADT and builders
2. Implement attribute combination logic
3. Create Elements.scala with element builders
4. Test attribute and children handling

### Phase 5: Public API
1. Create package.scala with exports
2. Ensure clean API surface
3. Write example usage code
4. Create documentation

### Phase 6: Build Integration
1. Update project.scala with DOM dependency
2. Ensure Vite can bundle Scala.js output
3. Test development workflow
4. Verify hot reload works

---

## Example Usage

After implementation, here's how the API will be used:

```scala
package example

import preact.bindings.*
import scala.scalajs.js.annotation.*

// Props as case class
case class ResourceProps(
  title: String,
  description: String,
  href: String
) extends Props

// Component with case class props
val Resource = component[ResourceProps]: props =>
  a(
    href := props.href,
    target := "_blank",
    className := "resource"
  )(
    h2()(props.title),
    p()(props.description)
  )

// Alternative: Named tuple props
val ResourceT = componentWithTuple: (title: String, description: String, href: String) =>
  a(
    href := href,
    target := "_blank",
    className := "resource"
  )(
    h2()(title),
    p()(description)
  )

// Component without props
val App = component: () =>
  div()(
    h1()("My Preact App"),
    section()(
      component(
        Resource,
        ResourceProps(
          title = "Learn Preact",
          description = "Interactive tutorial",
          href = "https://preactjs.com/tutorial"
        )
      )()
    )
  )

// Entry point
@main def main(): Unit =
  val root = js.Dynamic.global.document.getElementById("app")
  render(component(App), root)
```

---

## Files to Create/Modify

### New Files
1. **src/scala/preact/bindings/Types.scala** - Core type definitions
2. **src/scala/preact/bindings/Facades.scala** - JavaScript facades
3. **src/scala/preact/bindings/PropsConversion.scala** - Props type class
4. **src/scala/preact/bindings/Component.scala** - Component helpers with auto-memo
5. **src/scala/preact/bindings/Attributes.scala** - Attribute system
6. **src/scala/preact/bindings/Elements.scala** - HTML element builders
7. **src/scala/preact/bindings/package.scala** - Public API exports

### Files to Modify
1. **project.scala** - Add scalajs-dom dependency
2. **src/scala/preact/bindings.scala** - Remove (replaced by package structure)

### Build Integration
1. **vite.config.ts** - Configure to include Scala.js output
2. **package.json** - May need preact/compat for memo

---

## Future Extensions

This initial implementation provides the foundation for:
- **Hooks** (useState, useEffect, etc.) - straightforward facades
- **Context API** - createContext and useContext
- **Refs** - useRef and createRef
- **Advanced features** - Portals, error boundaries, suspense
- **Additional elements** - SVG, custom elements
- **Type-safe events** - Specific event types for handlers

---

## Technical Considerations

### Scala.js Interop
- Using @JSImport for ES modules (matches jsModuleKind es)
- Props must extend js.Object for JS compatibility
- Event handlers must be js.Function types
- Varargs compile to JS rest parameters

### Performance
- Opaque types = zero overhead
- inline functions = direct JS code
- memo() overhead = minimal (Preact's shallow comparison)
- Attribute combination = O(n) where n = attrs (typically small)

### Type Safety
- VNode opaque type prevents js.Any mixing
- Props trait ensures JS compatibility
- Attribute ADT enables compile-time checking
- Component types distinguish Scala vs JS functions

### Named Tuples
- Scala 3.7+ feature
- Convert to js.Object at component boundaries
- Slightly more overhead than case classes
- Better for inline/one-off props
- Less IDE support than case classes
