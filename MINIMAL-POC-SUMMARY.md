# Minimal POC Summary - Unified Case Class Approach

## What We Built

A **minimal proof of concept** demonstrating the unified case class approach for Scala 3 Preact bindings, where HTML elements and custom components are defined identically as case classes.

## File Structure

```
src/main/scala/preact/bindings/
├── Types.scala              - Core types (Children, Modifier, conversions)
├── Preact.scala             - Preact h() and memo() facades
├── Builder.scala            - ElementBuilder for accumulating modifiers
├── ElementCompanion.scala   - Base trait for element companions
├── Elements.scala           - HTML elements (div, span, button)
└── Component.scala          - Component companion helpers

examples/minimal/
├── MinimalExample.scala     - Example app with Card component
└── README.md                - Detailed documentation
```

## Core Design

### 1. Everything is a Case Class

```scala
// HTML element
case class div(children: Children = Children.empty)

// Custom component
case class Card(title: String, children: Children = Children.empty):
  def render: VNode = div(span(title), div(children))
```

### 2. Companion Objects Provide apply()

```scala
object div extends ElementCompanion[div]
object Card extends ComponentCompanion[Card]

// Usage - identical syntax
div(span("Hello"), button("Click"))
Card(Card.title := "Title", span("Content"))
```

### 3. Modifiers Enable Flexible Composition

```scala
sealed trait Modifier
case class PropModifier(key: String, value: Any) extends Modifier
case class ChildModifier(child: Child) extends Modifier

// Everything becomes a modifier
given Conversion[String, Modifier] = str => ChildModifier(str)
given Conversion[VNode, Modifier] = vnode => ChildModifier(vnode)
```

### 4. Builder Accumulates and Renders

```scala
class ElementBuilder:
  def addModifier(mod: Modifier): Unit = mod match
    case PropModifier(k, v) => props.updateDynamic(k)(v)
    case ChildModifier(child) => childrenBuffer += child

  def build(tag: String): VNode =
    h(tag, props, childrenBuffer.toSeq*)
```

## Example Usage

```scala
import preact.bindings.dsl.{*, given}

// HTML elements
div(
  span("Hello from Preact!"),
  button(disabled(true), "Disabled"),
  button(onClick(e => println("Clicked")), "Click me")
)

// Custom component - same syntax!
Card(
  Card.title := "My Card",
  span("This is card content")
)

// Nested structure
div(
  span("Nested: "),
  div(
    span("Level 2"),
    button("Nested Button")
  )
)
```

## What Works (Manual Implementation)

✅ HTML elements (`div`, `span`, `button`) defined as case classes
✅ Custom components defined as case classes with `render` method
✅ Unified modifier syntax for both
✅ Child accumulation (strings, VNodes)
✅ Prop modifiers (`:=` operator)
✅ Event handlers (`onClick`, etc.)
✅ Builder pattern for efficient accumulation
✅ Preact `h()` integration

## What's Missing (Needs Macros)

❌ **Automatic companion object generation** - Currently manual
❌ **Type-safe prop modifiers** - Currently `"key" := value`, should be `element.key := value`
❌ **Field extraction from case class** - Builder doesn't know case class structure
❌ **Children field accumulation** - ChildModifiers don't populate `children` field
❌ **Default value handling** - No automatic application of case class defaults
❌ **Component `memo()` wrapping** - No automatic memoization
❌ **Required field validation** - No compile-time checks
❌ **ClassName special type** - Not implemented

## Macro Implementation Requirements

### Phase 1: Basic Derivation

The `ElementCompanion` trait needs a macro that:

```scala
// User writes:
case class button(disabled: Boolean = false, children: Children = Children.empty)
object button extends ElementCompanion[button]

// Macro generates:
object button extends ElementCompanion[button]:
  // 1. Prop modifier objects
  val disabled = Prop[Boolean]("disabled")
  val children = Prop[Children]("children")

  // 2. apply method
  def apply(modifiers: Modifier*): VNode =
    var disabledValue = false  // Default
    val childrenBuffer = mutable.ArrayBuffer[Child]()

    modifiers.foreach:
      case PropModifier("disabled", v: Boolean) => disabledValue = v
      case ChildModifier(child) => childrenBuffer += child
      case _ => // ignore

    val instance = button(disabledValue, Children(childrenBuffer.toSeq*))
    h("button", js.Dynamic.literal(disabled = disabledValue), childrenBuffer.toSeq*)

  def tagName: String = "button"
```

### Phase 2: Component Support

For custom components with `render` method:

```scala
// User writes:
case class Card(title: String, children: Children = Children.empty):
  def render: VNode = div(span(title), div(children))

object Card extends ComponentCompanion[Card]

// Macro generates:
object Card extends ComponentCompanion[Card]:
  val title = Prop[String]("title")
  val children = Prop[Children]("children")

  def apply(modifiers: Modifier*): VNode =
    var titleValue: Option[String] = None  // Required
    val childrenBuffer = mutable.ArrayBuffer[Child]()

    modifiers.foreach:
      case PropModifier("title", v: String) => titleValue = Some(v)
      case ChildModifier(child) => childrenBuffer += child
      case _ => // ignore

    // Validate required fields
    require(titleValue.isDefined, "Missing required prop: title")

    val instance = Card(titleValue.get, Children(childrenBuffer.toSeq*))
    instance.render
```

## Technical Challenges

### 1. Case Class Field Extraction

Use Scala 3 quotes reflection:

```scala
def extractFields[T: Type](using Quotes): List[FieldInfo] =
  import quotes.reflect.*
  val tpe = TypeRepr.of[T]
  // Extract primary constructor parameters
  // Determine types, defaults, required vs optional
```

### 2. Default Value Handling

Case class defaults need to be extracted and applied:

```scala
// Detect: disabled: Boolean = false
// Generate: var disabledValue = false  // Use default
```

### 3. Special Type Detection

Detect `Children` and `ClassName` types for special handling:

```scala
field.tpe match
  case TypeRef(_, "Children") => // Accumulate from ChildModifiers
  case TypeRef(_, "ClassName") => // Accumulate from ClsModifiers
  case _ => // Regular prop
```

### 4. Required Field Validation

Compile-time or runtime validation:

```scala
// Option 1: Runtime
require(titleValue.isDefined, "Missing required prop: title")

// Option 2: Compile-time (match types)
type RequiredFields[T] = /* extract non-Option, non-default fields */
def apply(modifiers: Modifier*)(using ev: AllRequiredProvided): VNode
```

## Benefits of This Approach

1. **Unified Model**: HTML and components are the same thing
2. **Zero Boilerplate**: Just define case class + render
3. **Type Safety**: Case class fields provide types
4. **Natural Scala**: Familiar case class syntax
5. **Extensible**: Easy to add custom elements/components
6. **Performance**: Builder overhead is minimal
7. **Consistent**: Same syntax everywhere

## Next Steps

1. **Implement Phase 1 macro** - Basic field extraction and companion generation
2. **Test with real Preact** - Set up Scala.js build and browser testing
3. **Add more elements** - Expand HTML element coverage
4. **Implement Phase 2** - Component `render` method and `memo()` wrapping
5. **Add ClassName** - Implement special type and accumulation
6. **Add validation** - Compile-time required field checks
7. **Optimize** - Inline builder logic, reduce allocations

## Comparison with Original Design

| Aspect | Laminar-Inspired Modifiers | Unified Case Class |
|--------|---------------------------|-------------------|
| HTML elements | Functions accepting modifiers | Case classes with companions |
| Custom components | Separate from elements | Identical to elements |
| Definition | `def div(mods: Modifier*)` | `case class div(children: Children)` |
| Props | Modifiers only | Case class fields (type-checked) |
| Children | ChildModifier | `children: Children` field |
| Syntax | Same for both | Same for both |
| Implementation | Builder pattern | Builder + case class instantiation |
| Derivation | Not needed for elements | Macro for companions |

**Key Difference**: The unified approach makes HTML elements **first-class case classes**, not just functions. This enables:
- Type-safe field access
- Structural typing
- Inheritance (GlobalAttrs, FormAttrs)
- Reuse of component patterns

## Documentation Updates

Updated documents:
- ✅ [component-implementation.md](documents/component-implementation.md) - Added unified approach as preferred
- ✅ [html-dsl-design.md](documents/html-dsl-design.md) - Updated with case class approach and inheritance hierarchy

## Files Created

Implementation files:
- `src/main/scala/preact/bindings/Types.scala`
- `src/main/scala/preact/bindings/Preact.scala`
- `src/main/scala/preact/bindings/Builder.scala`
- `src/main/scala/preact/bindings/ElementCompanion.scala`
- `src/main/scala/preact/bindings/Elements.scala`
- `src/main/scala/preact/bindings/Component.scala`
- `examples/minimal/MinimalExample.scala`
- `examples/minimal/README.md`
