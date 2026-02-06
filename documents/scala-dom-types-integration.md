# scala-dom-types Integration Research

## Overview

[scala-dom-types](https://github.com/raquo/scala-dom-types) is a library that provides type-safe definitions for HTML/SVG tags, attributes, DOM properties, CSS styles, and events. It's designed as a **compile-time dependency** - consuming libraries use code generation to produce tailored trait definitions.

## Library Structure

### Definition Files Location

All definitions are in `shared/src/main/scala/com/raquo/domtypes/defs/`:

```
defs/
├── attrs/
│   ├── AriaAttrDefs.scala      # ARIA attributes
│   ├── GlobalAttrDefs.scala    # Global HTML attributes (id, tabindex, etc.)
│   ├── HtmlAttrDefs.scala      # HTML-specific attributes (href, src, etc.)
│   ├── MathMlDefs.scala        # MathML attributes
│   └── SvgAttrDefs.scala       # SVG attributes
├── eventProps/
│   ├── AnimationEventPropDefs.scala
│   ├── ClipboardEventPropDefs.scala
│   ├── DocumentOnlyEventPropDefs.scala
│   ├── ErrorEventPropDefs.scala
│   ├── FormEventPropDefs.scala
│   ├── KeyboardEventPropDefs.scala
│   ├── MediaEventPropDefs.scala
│   ├── MiscellaneousEventPropDefs.scala
│   ├── MouseEventPropDefs.scala
│   ├── PointerEventPropDefs.scala
│   ├── TouchEventPropDefs.scala
│   └── WindowOnlyEventPropDefs.scala
├── props/
│   └── PropDefs.scala          # DOM properties (checked, value, etc.)
├── reflectedAttrs/
│   └── ReflectedHtmlAttrDefs.scala  # Attrs that sync with properties
├── styles/
│   └── [CSS style definitions]
└── tags/
    ├── DocumentTagDefs.scala   # html, head, meta, script, etc.
    ├── EmbedTagDefs.scala      # img, video, audio, iframe, etc.
    ├── FormTagDefs.scala       # form, input, button, select, etc.
    ├── GroupingTagDefs.scala   # div, p, ul, ol, li, pre, etc.
    ├── MathMlTagDefs.scala
    ├── MiscTagDefs.scala
    ├── SectionTagDefs.scala    # body, header, footer, h1-h6, etc.
    ├── SvgTagDefs.scala
    ├── TableTagDefs.scala      # table, tr, td, th, etc.
    └── TextTagDefs.scala       # span, a, em, strong, code, etc.
```

## Definition Data Structures

### TagDef

```scala
TagDef(
  tagType = HtmlTagType,
  scalaName = "div",
  domName = "div",
  isVoid = false,
  scalaJsElementTypeAlias = "dom.html.Div",
  javascriptElementType = "HTMLDivElement",
  commentLines = List("Represents a generic container..."),
  docUrls = List("https://developer.mozilla.org/...")
)
```

### AttrDef

```scala
AttrDef(
  tagType = AnyTagType,
  scalaName = "idAttr",
  domName = "id",
  namespace = None,
  scalaValueType = "String",
  codec = "StringAsIs",
  reflectedProp = Some(...),
  commentLines = List("..."),
  docUrls = List("...")
)
```

### EventPropDef

```scala
EventPropDef(
  scalaName = "onClick",
  domName = "click",
  scalaJsEventType = "dom.MouseEvent",
  javascriptEventType = "MouseEvent",
  commentLines = List("The click event is raised..."),
  docUrls = List("...")
)
```

### ReflectedHtmlAttrDef

```scala
ReflectedHtmlAttrDef(
  scalaName = "disabled",
  domAttrName = "disabled",
  domPropName = "disabled",
  scalaValueType = "Boolean",
  domPropValueType = "Boolean",
  attrCodec = "BooleanAsAttrPresence",
  propCodec = "BooleanAsIs",
  commentLines = List("..."),
  docUrls = List("...")
)
```

### PropDef

```scala
PropDef(
  scalaName = "checked",
  domName = "checked",
  scalaValueType = "Boolean",
  domValueType = "Boolean",
  codec = "BooleanAsIs",
  reflectedAttr = None,
  commentLines = List("..."),
  docUrls = List("...")
)
```

## Key Concepts

### Attributes vs Properties vs Reflected Attributes

1. **Attributes**: HTML content attributes set via `setAttribute()`. Stored as strings.
   - Example: `<div id="foo">` → `element.setAttribute("id", "foo")`

2. **Properties**: JavaScript DOM object properties. Support native JS types.
   - Example: `element.checked = true` (boolean, not string)

3. **Reflected Attributes**: Special cases where attribute and property are synchronized.
   - Example: `id` - setting the attribute also updates the property and vice versa
   - These can be treated as either attribute or property depending on implementation

### Deliberately Omitted Keys

scala-dom-types intentionally omits these because they require library-specific handling:

- `class` / `className` attribute
- `style` attribute
- `data-*` attributes
- `role`, `rel` attributes

Libraries must implement these manually based on their API design.

### Codec System

Codecs handle value encoding/decoding between Scala and JavaScript:

- `StringAsIs` - pass through strings unchanged
- `BooleanAsIs` - pass through booleans unchanged
- `BooleanAsAttrPresence` - presence of attribute = true, absence = false
- `BooleanAsTrueFalseString` - "true"/"false" strings
- `IntAsString` - convert int to/from string

## Recommended Integration Approach

From the README section "How to use scala-dom-types in your library":

### 1. Add as Compile-Time Dependency

```scala
// For code generation (JVM)
libraryDependencies += "com.raquo" %% "domtypes" % "18.2.0"
```

### 2. Create a Code Generator

Either:

- Use `CanonicalGenerator` with custom parameters
- Override `*TraitGenerator` classes for specific customization
- Write a fully custom generator

### 3. Generate Tailored Traits

The generator reads definition objects and outputs simple, abstraction-free traits tailored to your library's API.

Example workflow:

```scala
val generator = new CanonicalGenerator(
  baseOutputDirectoryPath = "src/main/scala/mylib",
  basePackagePath = "mylib.html",
  ...
)

// Generate tags trait
val tagsContent = generator.generateTagsTrait(
  tagDefs = GroupingTagDefs.defs ++ TextTagDefs.defs ++ ...,
  ...
)
generator.writeToFile(tagsContent, "tags", "HtmlTags.scala")
```

### 4. Required Manual Implementations

- **Codecs**: Copy codec implementations for value encoding/decoding
- **Complex keys**: Implement `class`, `style`, `data-*` manually
- **Concrete types**: Develop `Tag`, `HtmlAttr`, `EventProp` classes with your DSL

### 5. Bundle Assembly

Create a single object extending all generated traits to expose consolidated keys.

## Mapping to Our AttributeModifier Pattern

### Current Pattern (in test.scala)

```scala
object DomElement:
  type Key = AttributeModifier["key", String]
  type Id = AttributeModifier["id", String]
  type Cls = AttributeModifier["cls", Opt[String]]
  type Disabled = AttributeModifier["disabled", Boolean]
  type OnClick = AttributeModifier["onClick", js.Function1[dom.MouseEvent, Unit]]

  type Modifier = Id | Key | Cls | Disabled | OnClick | ChildModifier
```

### Generated Mapping

| scala-dom-types Definition                                             | Generated Type Alias                                                              |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `AttrDef(scalaName="id", scalaValueType="String")`                     | `type Id = AttributeModifier["id", String]`                                       |
| `ReflectedHtmlAttrDef(scalaName="disabled", scalaValueType="Boolean")` | `type Disabled = AttributeModifier["disabled", Boolean]`                          |
| `EventPropDef(scalaName="onClick", scalaJsEventType="dom.MouseEvent")` | `type OnClick = AttributeModifier["onClick", js.Function1[dom.MouseEvent, Unit]]` |
| `PropDef(scalaName="value", scalaValueType="String")`                  | `type Value = AttributeModifier["value", String]`                                 |

### Tag Generation

| scala-dom-types Definition                                | Generated Function                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| `TagDef(scalaName="div", domName="div")`                  | `inline def div(ms: Modifier*) = buildinTagWithChildren("div", ms)` |
| `TagDef(scalaName="input", domName="input", isVoid=true)` | `inline def input(ms: Modifier*) = buildinTag("input", ms)`         |

## Special Considerations

### Reserved Words

- `class` → use `cls` (scala-dom-types notes this is omitted, we handle manually)
- `for` → scala-dom-types uses `forId`
- `type` → scala-dom-types uses `typ` or `tpe`

### Event Handler Types

scala-dom-types provides:

- `scalaJsEventType` = `"dom.MouseEvent"`, `"dom.KeyboardEvent"`, etc.

We need to wrap as:

- `js.Function1[dom.MouseEvent, Unit]`

### Void Elements

Elements like `<br>`, `<input>`, `<img>` are self-closing (`isVoid = true`).
Consider whether to use a different builder function that doesn't accept children.

## Event Categories Summary

| Category  | Events                                                                                                                  |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Mouse     | click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave, mouseover, mouseout, wheel, contextmenu, drag\* |
| Keyboard  | keydown, keyup, keypress                                                                                                |
| Form      | submit, reset, input, change, focus, blur, select, invalid                                                              |
| Clipboard | copy, cut, paste                                                                                                        |
| Touch     | touchstart, touchend, touchmove, touchcancel                                                                            |
| Pointer   | pointerdown, pointerup, pointermove, pointerenter, pointerleave, pointerover, pointerout, pointercancel                 |
| Animation | animationstart, animationend, animationiteration                                                                        |
| Media     | play, pause, ended, volumechange, seeking, seeked, loadeddata, etc.                                                     |
| Error     | error, abort                                                                                                            |
| Misc      | scroll, resize, load, unload, beforeunload                                                                              |

## References

- Repository: https://github.com/raquo/scala-dom-types
- README: https://github.com/raquo/scala-dom-types/blob/master/README.md
- Laminar (example consumer): https://github.com/raquo/Laminar
- MDN HTML Elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
- MDN Events: https://developer.mozilla.org/en-US/docs/Web/Events
