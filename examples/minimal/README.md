# Minimal Proof of Concept - Unified Case Class Approach

This directory contains a **minimal proof of concept** demonstrating the unified case class approach for Scala 3 Preact bindings.

## Core Concept

Both HTML elements and custom components are defined as **case classes with render methods**, creating a truly unified markup language.

## What's Implemented

### Core Types (`src/main/scala/preact/bindings/`)

1. **Types.scala** - Core types
   - `Children` - Opaque type over `Seq[Child]`
   - `Modifier` - Sealed trait for all modifiers
   - `PropModifier`, `ChildModifier` - Concrete modifier types
   - Given conversions (String → Modifier, VNode → Modifier, etc.)

2. **Preact.scala** - Preact facades
   - `h()` - Hyperscript function for creating VNodes
   - `memo()` - Memoization wrapper for components

3. **Builder.scala** - Element builder
   - `ElementBuilder` - Accumulates modifiers into props and children
   - Calls `h(tag, props, children*)` to create VNode

4. **ElementCompanion.scala** - Element companion trait
   - `ElementCompanion[T]` - Base trait for HTML element companions
   - `SimpleElementCompanion[T]` - Simplified version for POC
   - `PropModifiers` - Helper object with `:=` operator

5. **Elements.scala** - HTML element definitions
   - `div`, `span`, `button` case classes (minimal props)
   - Companion objects extending `SimpleElementCompanion`
   - `dsl` object for easy imports

6. **Component.scala** - Component helpers
   - `ComponentCompanion[T]` - Base trait for component companions
   - `SimpleComponentCompanion[T]` - Manual helper for POC

### Example (`examples/minimal/MinimalExample.scala`)

Demonstrates:
- HTML elements: `div(...)`, `span(...)`, `button(...)`
- Custom component: `Card(Card.title := "...", span("..."))`
- Unified syntax - both use modifiers and children the same way

## Usage Example

```scala
import preact.bindings.*
import preact.bindings.dsl.{*, given}

// HTML elements
div(
  span("Hello"),
  button(
    disabled(true),
    "Click me"
  )
)

// Custom component - same syntax!
Card(
  Card.title := "My Card",
  span("Content")
)
```

## What's Missing (for full implementation)

This POC is **manual** - in the full implementation, these would be **macro-generated**:

### 1. Companion Object Generation

**Current (manual)**:
```scala
case class button(disabled: Boolean = false, children: Children = Children.empty)

object button extends SimpleElementCompanion[button]("button"):
  // Manual - nothing generated yet
```

**Full Implementation (macro-generated)**:
```scala
case class button(disabled: Boolean = false, children: Children = Children.empty)

object button extends ElementCompanion[button]:
  // Macro generates:
  val disabled = Prop[Boolean]("disabled")
  val children = Prop[Children]("children")

  def apply(modifiers: Modifier*): VNode =
    // Macro generates builder logic:
    // 1. Extract prop values from modifiers
    // 2. Accumulate children from ChildModifiers
    // 3. Apply defaults for missing props
    // 4. Call h("button", props, children)
```

### 2. Prop Modifiers

**Current (manual)**:
```scala
// Generic := operator only
button(
  "disabled" := true,  // Stringly-typed
  "Click"
)
```

**Full Implementation (macro-generated)**:
```scala
// Type-safe prop modifiers
button(
  button.disabled := true,  // Type-checked
  "Click"
)
```

### 3. Case Class Field Extraction

The macro needs to:
1. Extract all fields from the case class
2. Determine which are required vs optional (have defaults)
3. Identify special types (Children, ClassName)
4. Generate corresponding prop modifier objects
5. Build the case class instance from accumulated modifiers

### 4. Children Accumulation

**Current**: Children are accumulated into the element builder, but not into a `children` field.

**Full Implementation**:
- ChildModifiers are accumulated into `children` prop field
- Special handling for `Children` type
- Automatic construction: `Children(child1, child2, ...)`

### 5. Component Render Method

**Current**: Manual wrapper in `SimpleComponentCompanion`

**Full Implementation**:
- Macro detects `render` method
- Wraps with `memo()` for performance
- Converts to Preact functional component

## Implementation Path

To go from this POC to full implementation:

### Phase 1: Basic Macro Derivation
1. Create `ElementCompanion` macro that:
   - Extracts case class fields
   - Generates prop modifier objects (e.g., `button.disabled`)
   - Generates `apply(modifiers: Modifier*)` method
   - Builds case class instance from modifiers

2. Implement builder logic:
   - Accumulate PropModifiers → case class fields
   - Accumulate ChildModifiers → Children field
   - Apply defaults for missing fields
   - Call `h(tagName, propsObject, children*)`

### Phase 2: Children Handling
1. Detect `Children` type in case class fields
2. Accumulate ChildModifiers into `children` field
3. Construct `Children(...)` from accumulated children

### Phase 3: Component Support
1. Detect `render` method in case class
2. Wrap with `memo()` for functional component
3. Convert case class instance to JS props object
4. Call `h(memoizedComponent, props, null)`

### Phase 4: Advanced Features
1. ClassName special type and accumulation
2. Optional fields with `Option[T]`
3. Required field compile-time validation
4. Better error messages

## Key Insights

1. **Unified Model**: HTML elements and components are both case classes with a `render` method (implicitly for elements)

2. **Modifiers**: Everything (props, children, events) is a `Modifier`, enabling flexible composition

3. **Derivation**: Companion objects are derived from case class structure, eliminating boilerplate

4. **Consistency**: Users write `div(...)` and `Card(...)` the same way

5. **Type Safety**: Case class fields provide compile-time type checking

## Testing

To test this implementation, you would:

1. Set up Scala.js project with Preact dependencies
2. Compile to JavaScript
3. Import compiled JS in HTML
4. Call `MinimalExample.app` from JavaScript
5. Mount to DOM with Preact's `render()`

Example HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { render } from 'preact';
    import { app } from './minimal-example.js';

    render(app, document.body);
  </script>
</head>
<body></body>
</html>
```

## Next Steps

1. **Implement the macro** - Start with basic field extraction
2. **Test with real Preact** - Compile to JS and run in browser
3. **Add more elements** - Expand HTML element coverage
4. **Add ClassName support** - Implement the special type
5. **Add attribute inheritance** - Implement `GlobalAttrs`, `FormAttrs` traits
