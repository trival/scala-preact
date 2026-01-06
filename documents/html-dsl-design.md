# HTML DSL Design - Laminar-Inspired Unified Modifier API

## Overview
This document details the design of the HTML DSL for Scala Preact bindings, inspired by Laminar's unified modifier approach where attributes, children, and other modifiers are passed in a single parameter list.

See also:
- [Library General](./library-general.md) - Core architecture and types
- [Component Implementation](./component-implementation.md) - Component definition approaches

---

## Design Goals

1. **Unified Modifier API**: Following Laminar's approach, tags accept a single varargs parameter of `Modifier` type
2. **Props and Children Together**: Mix attributes, children, event handlers, styles, etc. in one list
3. **Type-Safe**: Compile-time checking where possible
4. **Zero/Minimal Overhead**: Builder pattern with efficient accumulation
5. **Extensible**: Easy to add custom modifier types
6. **Idiomatic Scala 3**: Braceless syntax, extension methods, inline functions

---

## Core Concept: The Modifier

Everything that can modify an element is a `Modifier`. This includes:
- Attributes (className, id, href, etc.)
- Children (text, numbers, other VNodes)
- Event handlers (onClick, onChange, etc.)
- Styles (style properties)
- Refs (element references)
- Custom modifiers (anything that transforms the element)

**Key insight from Laminar**: By having a single `Modifier` type, users can compose element definitions naturally without separating attributes from children syntactically.

---

## Type System

```scala
package preact.bindings

import scala.scalajs.js

// Base trait for all modifiers
sealed trait Modifier

// Modifiers that set prop values
final case class PropModifier(key: String, value: Any) extends Modifier

// Modifiers that add children
final case class ChildModifier(child: Child) extends Modifier

// Modifiers that set event handlers
final case class EventModifier(name: String, handler: js.Function) extends Modifier

// Modifiers that set styles
final case class StyleModifier(styles: Seq[(String, Any)]) extends Modifier

// Modifiers that set refs
final case class RefModifier(ref: js.Any) extends Modifier

// Optional: Modifier for multiple children at once
final case class ChildrenModifier(children: Seq[Child]) extends Modifier

// Optional: Modifier that applies nothing (useful for conditional logic)
case object EmptyModifier extends Modifier
```

---

## Builder Pattern

Internally, we need to accumulate modifiers into props and children for Preact's `h()` function.

```scala
package preact.bindings

import scala.scalajs.js

// Internal builder for accumulating modifiers
private[bindings] class ElementBuilder:
  private val props = js.Dynamic.literal()
  private val children = scala.collection.mutable.ArrayBuffer[Child]()

  def addModifier(mod: Modifier): Unit = mod match
    case PropModifier(key, value) =>
      props.updateDynamic(key)(value.asInstanceOf[js.Any])

    case ChildModifier(child) =>
      children += child

    case ChildrenModifier(childs) =>
      children ++= childs

    case EventModifier(name, handler) =>
      props.updateDynamic(name)(handler)

    case StyleModifier(styles) =>
      val styleObj = props.selectDynamic("style") match
        case existing: js.Dynamic => existing
        case _ =>
          val newStyle = js.Dynamic.literal()
          props.updateDynamic("style")(newStyle)
          newStyle

      styles.foreach: (k, v) =>
        styleObj.updateDynamic(k)(v.asInstanceOf[js.Any])

    case RefModifier(refValue) =>
      props.updateDynamic("ref")(refValue)

    case EmptyModifier =>
      // Do nothing

  def addModifiers(mods: Seq[Modifier]): Unit =
    mods.foreach(addModifier)

  def build(tag: String): VNode =
    val jsProps = if props.hasOwnProperty("constructor") then props.asInstanceOf[js.Object] else js.undefined
    Preact.h(tag, jsProps, children.toSeq*)
```

---

## Modifier Constructors

These functions create modifiers. Most are simple factory functions.

```scala
package preact.bindings

import scala.scalajs.js

object Modifiers:

  // Generic attribute syntax (like Laminar's := operator)
  extension (key: String)
    inline infix def :=(value: Any): Modifier = PropModifier(key, value)

  // Common HTML attributes with named functions
  inline def className(value: String): Modifier = PropModifier("className", value)
  inline def id(value: String): Modifier = PropModifier("id", value)
  inline def href(value: String): Modifier = PropModifier("href", value)
  inline def src(value: String): Modifier = PropModifier("src", value)
  inline def alt(value: String): Modifier = PropModifier("alt", value)
  inline def target(value: String): Modifier = PropModifier("target", value)
  inline def value(value: String): Modifier = PropModifier("value", value)
  inline def placeholder(value: String): Modifier = PropModifier("placeholder", value)
  inline def disabled(value: Boolean): Modifier = PropModifier("disabled", value)
  inline def checked(value: Boolean): Modifier = PropModifier("checked", value)
  inline def width(value: String | Int): Modifier = PropModifier("width", value)
  inline def height(value: String | Int): Modifier = PropModifier("height", value)
  inline def title(value: String): Modifier = PropModifier("title", value)
  inline def lang(value: String): Modifier = PropModifier("lang", value)
  inline def role(value: String): Modifier = PropModifier("role", value)

  // Form attributes
  inline def name(value: String): Modifier = PropModifier("name", value)
  inline def `type`(value: String): Modifier = PropModifier("type", value)
  inline def autoComplete(value: String): Modifier = PropModifier("autoComplete", value)
  inline def autoFocus(value: Boolean): Modifier = PropModifier("autoFocus", value)
  inline def required(value: Boolean): Modifier = PropModifier("required", value)
  inline def readOnly(value: Boolean): Modifier = PropModifier("readOnly", value)
  inline def multiple(value: Boolean): Modifier = PropModifier("multiple", value)

  // Event handlers
  inline def onClick(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onClick", handler)

  inline def onChange(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onChange", handler)

  inline def onInput(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onInput", handler)

  inline def onSubmit(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onSubmit", handler)

  inline def onFocus(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onFocus", handler)

  inline def onBlur(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onBlur", handler)

  inline def onKeyDown(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onKeyDown", handler)

  inline def onKeyUp(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onKeyUp", handler)

  inline def onMouseEnter(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onMouseEnter", handler)

  inline def onMouseLeave(handler: js.Function1[js.Any, Unit]): Modifier =
    EventModifier("onMouseLeave", handler)

  // Style helper
  inline def styleAttr(styles: (String, Any)*): Modifier =
    StyleModifier(styles)

  // Ref helper
  inline def ref(value: js.Any): Modifier =
    RefModifier(value)

  // Conditional modifier (returns EmptyModifier if condition is false)
  inline def when(condition: Boolean)(modifier: => Modifier): Modifier =
    if condition then modifier else EmptyModifier

  // Convert children to modifiers
  given Conversion[String, Modifier] = str => ChildModifier(str)
  given Conversion[Int, Modifier] = num => ChildModifier(num)
  given Conversion[Double, Modifier] = num => ChildModifier(num)
  given Conversion[VNode, Modifier] = vnode => ChildModifier(vnode)

  // Allow sequences of children
  given Conversion[Seq[VNode], Modifier] = vnodes => ChildrenModifier(vnodes)
```

---

## Tag Functions

Tag functions accept variable arguments of modifiers and build elements.

```scala
package preact.bindings

import scala.scalajs.js

object Tags:

  // Internal helper to create elements from modifiers
  private inline def tag(name: String)(modifiers: Modifier*): VNode =
    val builder = ElementBuilder()
    builder.addModifiers(modifiers)
    builder.build(name)

  // HTML5 elements
  inline def div(modifiers: Modifier*): VNode = tag("div")(modifiers*)
  inline def span(modifiers: Modifier*): VNode = tag("span")(modifiers*)
  inline def p(modifiers: Modifier*): VNode = tag("p")(modifiers*)
  inline def pre(modifiers: Modifier*): VNode = tag("pre")(modifiers*)
  inline def code(modifiers: Modifier*): VNode = tag("code")(modifiers*)

  // Headings
  inline def h1(modifiers: Modifier*): VNode = tag("h1")(modifiers*)
  inline def h2(modifiers: Modifier*): VNode = tag("h2")(modifiers*)
  inline def h3(modifiers: Modifier*): VNode = tag("h3")(modifiers*)
  inline def h4(modifiers: Modifier*): VNode = tag("h4")(modifiers*)
  inline def h5(modifiers: Modifier*): VNode = tag("h5")(modifiers*)
  inline def h6(modifiers: Modifier*): VNode = tag("h6")(modifiers*)

  // Links and media
  inline def a(modifiers: Modifier*): VNode = tag("a")(modifiers*)
  inline def img(modifiers: Modifier*): VNode = tag("img")(modifiers*)
  inline def video(modifiers: Modifier*): VNode = tag("video")(modifiers*)
  inline def audio(modifiers: Modifier*): VNode = tag("audio")(modifiers*)

  // Forms
  inline def button(modifiers: Modifier*): VNode = tag("button")(modifiers*)
  inline def input(modifiers: Modifier*): VNode = tag("input")(modifiers*)
  inline def textarea(modifiers: Modifier*): VNode = tag("textarea")(modifiers*)
  inline def select(modifiers: Modifier*): VNode = tag("select")(modifiers*)
  inline def option(modifiers: Modifier*): VNode = tag("option")(modifiers*)
  inline def label(modifiers: Modifier*): VNode = tag("label")(modifiers*)
  inline def form(modifiers: Modifier*): VNode = tag("form")(modifiers*)
  inline def fieldset(modifiers: Modifier*): VNode = tag("fieldset")(modifiers*)
  inline def legend(modifiers: Modifier*): VNode = tag("legend")(modifiers*)

  // Sections
  inline def section(modifiers: Modifier*): VNode = tag("section")(modifiers*)
  inline def article(modifiers: Modifier*): VNode = tag("article")(modifiers*)
  inline def header(modifiers: Modifier*): VNode = tag("header")(modifiers*)
  inline def footer(modifiers: Modifier*): VNode = tag("footer")(modifiers*)
  inline def nav(modifiers: Modifier*): VNode = tag("nav")(modifiers*)
  inline def main(modifiers: Modifier*): VNode = tag("main")(modifiers*)
  inline def aside(modifiers: Modifier*): VNode = tag("aside")(modifiers*)

  // Lists
  inline def ul(modifiers: Modifier*): VNode = tag("ul")(modifiers*)
  inline def ol(modifiers: Modifier*): VNode = tag("ol")(modifiers*)
  inline def li(modifiers: Modifier*): VNode = tag("li")(modifiers*)
  inline def dl(modifiers: Modifier*): VNode = tag("dl")(modifiers*)
  inline def dt(modifiers: Modifier*): VNode = tag("dt")(modifiers*)
  inline def dd(modifiers: Modifier*): VNode = tag("dd")(modifiers*)

  // Tables
  inline def table(modifiers: Modifier*): VNode = tag("table")(modifiers*)
  inline def thead(modifiers: Modifier*): VNode = tag("thead")(modifiers*)
  inline def tbody(modifiers: Modifier*): VNode = tag("tbody")(modifiers*)
  inline def tfoot(modifiers: Modifier*): VNode = tag("tfoot")(modifiers*)
  inline def tr(modifiers: Modifier*): VNode = tag("tr")(modifiers*)
  inline def th(modifiers: Modifier*): VNode = tag("th")(modifiers*)
  inline def td(modifiers: Modifier*): VNode = tag("td")(modifiers*)

  // Text semantics
  inline def strong(modifiers: Modifier*): VNode = tag("strong")(modifiers*)
  inline def em(modifiers: Modifier*): VNode = tag("em")(modifiers*)
  inline def small(modifiers: Modifier*): VNode = tag("small")(modifiers*)
  inline def mark(modifiers: Modifier*): VNode = tag("mark")(modifiers*)
  inline def abbr(modifiers: Modifier*): VNode = tag("abbr")(modifiers*)
  inline def cite(modifiers: Modifier*): VNode = tag("cite")(modifiers*)
  inline def blockquote(modifiers: Modifier*): VNode = tag("blockquote")(modifiers*)

  // Fragment
  inline def fragment(children: VNode*): VNode =
    Preact.h(Preact.Fragment, js.undefined, children*)
```

---

## Unified DSL Object

Combine everything into a single importable object.

```scala
package preact.bindings

object Dsl:
  // Export all tags
  export Tags.*

  // Export all modifiers and conversions
  export Modifiers.{*, given}
```

---

## Usage Examples

### Basic Element with Mixed Modifiers

```scala
import preact.bindings.*

div(
  className := "container",
  id := "main",
  h1("Welcome"),
  p("This is a paragraph"),
  "Plain text child"
)
```

### Event Handlers and Dynamic Attributes

```scala
import preact.bindings.*
import scala.scalajs.js

button(
  className := "btn btn-primary",
  disabled := false,
  onClick := (e => println("Clicked!")),
  "Click Me"
)
```

### Nested Elements

```scala
import preact.bindings.*

div(
  className := "card",
  header(
    className := "card-header",
    h3("Card Title")
  ),
  div(
    className := "card-body",
    p("Card content goes here"),
    p("More content")
  ),
  footer(
    className := "card-footer",
    button("Action")
  )
)
```

### Lists and Mapping

```scala
import preact.bindings.*

case class Item(id: Int, name: String)

val items = Seq(
  Item(1, "First"),
  Item(2, "Second"),
  Item(3, "Third")
)

ul(
  className := "item-list",
  items.map(item =>
    li(
      key := item.id.toString,
      item.name
    )
  )
)
```

### Conditional Modifiers

```scala
import preact.bindings.*

val isActive = true
val showDescription = false

div(
  className := "item",
  when(isActive)(className := "active"),
  h3("Title"),
  when(showDescription)(p("Description"))
)
```

### Styles

```scala
import preact.bindings.*

div(
  styleAttr(
    "backgroundColor" -> "blue",
    "color" -> "white",
    "padding" -> "20px"
  ),
  "Styled content"
)
```

### Form Example

```scala
import preact.bindings.*
import scala.scalajs.js

form(
  onSubmit := (e => {
    e.preventDefault()
    println("Form submitted")
  }),
  div(
    label("Username:"),
    input(
      `type` := "text",
      name := "username",
      placeholder := "Enter username",
      required := true
    )
  ),
  div(
    label("Password:"),
    input(
      `type` := "password",
      name := "password",
      required := true
    )
  ),
  button(
    `type` := "submit",
    "Login"
  )
)
```

### Component with DSL

```scala
import preact.bindings.*
import scala.scalajs.js

case class CardProps(
  title: String,
  content: String,
  highlighted: Boolean
) extends Props

val Card = component[CardProps]: props =>
  div(
    className := "card",
    when(props.highlighted)(className := "highlighted"),
    h3(props.title),
    p(props.content)
  )

// Usage
val app = div(
  h1("My App"),
  Card(CardProps("First Card", "Some content", true)),
  Card(CardProps("Second Card", "More content", false))
)
```

---

## Implementation Notes

### Performance Considerations

1. **Builder Allocation**: Each element creates one `ElementBuilder` instance
   - Cost: Small allocation, typically 3-10 modifiers per element
   - Benefit: Clean API, easy to optimize later if needed

2. **Modifier Creation**: Each attribute/child creates one `Modifier` instance
   - Cost: Small allocations
   - Benefit: Type safety, extensibility
   - Optimization: Most modifier constructors are `inline`, reducing overhead

3. **Given Conversions**: Implicit conversion from String/VNode to Modifier
   - Cost: Very small, conversions are simple constructors
   - Benefit: Natural syntax for children

4. **Array Buffer**: Children accumulated in mutable buffer
   - Cost: One allocation per element
   - Benefit: Efficient append operations

**Overall**: The builder pattern adds minimal overhead (estimated 1-5% vs direct h() calls) but provides enormous API benefits. The Laminar project has proven this approach works well in practice.

### Type Safety

The current design provides:
- ✅ Compile-time type checking for modifier types
- ✅ Compile-time type checking for event handler signatures
- ✅ Compile-time type checking for prop values (via Scala's type system)
- ⚠️ No enforcement of valid HTML (e.g., can put invalid attributes on tags)
  - Future: Could add phantom types to restrict attributes per tag

### Extensibility

Users can create custom modifiers:

```scala
// Custom modifier that adds multiple classes
def classes(cls: String*): Modifier =
  PropModifier("className", cls.mkString(" "))

// Custom modifier that sets data attributes
def dataAttr(name: String, value: String): Modifier =
  PropModifier(s"data-$name", value)

// Usage
div(
  classes("btn", "btn-primary", "btn-lg"),
  dataAttr("user-id", "123"),
  "Button"
)
```

### Comparison with Original Design

**Original Design** (two parameter lists):
```scala
div(className := "foo")(
  h1()("Hello"),
  p()("World")
)
```

**New Design** (unified modifiers):
```scala
div(
  className := "foo",
  h1("Hello"),
  p("World")
)
```

**Benefits of new design**:
1. More natural mixing of attributes and children
2. Conditional modifiers easier to express
3. Matches Laminar's proven API design
4. More flexible for composition
5. No need for empty `()` when no attributes

**Tradeoffs**:
1. Requires builder pattern (small runtime overhead)
2. Slightly more complex implementation
3. Type inference might need hints in complex cases

---

## Implementation Files

### File Structure

1. **src/scala/preact/bindings/Modifier.scala**
   - Define `Modifier` sealed trait and all subtypes
   - Define `ElementBuilder` class

2. **src/scala/preact/bindings/Modifiers.scala**
   - Define all modifier constructors (`:=`, `className`, `onClick`, etc.)
   - Define given conversions

3. **src/scala/preact/bindings/Tags.scala**
   - Define all HTML tag functions
   - Internal `tag()` helper

4. **src/scala/preact/bindings/Dsl.scala**
   - Export all tags and modifiers
   - Single import point for DSL

---

## Future Enhancements

### Short-term
- [ ] Add comprehensive HTML5 attribute support
- [ ] Add SVG element and attribute support
- [ ] Add more event handlers (keyboard, mouse, touch, drag)
- [ ] Add aria-* and data-* attribute helpers

### Medium-term
- [ ] Type-safe CSS-in-Scala for styles
- [ ] Phantom types for tag-specific attributes
- [ ] Custom element support
- [ ] Slot support for web components

### Advanced
- [ ] Signal integration (reactive properties like Laminar)
- [ ] Automatic key generation for lists
- [ ] CSS module integration
- [ ] Animation/transition helpers

---

## Summary

This design provides a **Laminar-inspired unified modifier API** that:
- ✅ Mixes attributes and children naturally
- ✅ Uses builder pattern for flexibility
- ✅ Maintains type safety
- ✅ Has minimal overhead
- ✅ Is highly extensible
- ✅ Follows Scala 3 best practices

The API is clean, intuitive, and proven by Laminar's success in the Scala.js ecosystem.
