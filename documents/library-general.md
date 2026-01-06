# Scala 3 Preact Bindings - Library General Architecture

## Overview
This document covers the general architecture, core types, facades, and implementation roadmap for Scala 3 bindings to Preact. For specific aspects, see:
- [Component Implementation](./component-implementation.md) - Component definition APIs and approaches
- [HTML DSL Design](./html-dsl-design.md) - Laminar-inspired unified modifier API

## Project Context
- **Build System**: scala-cli with project.scala
- **Scala Version**: 3.8.0-RC5 (with improved Scala.js support and macros)
- **Scala.js**: 1.20.2 with ES modules
- **Preact Version**: 10.28.2
- **Code Style**: Braceless syntax (Scala 3 style)

## Core Requirements
1. Function-based Scala code that compiles to Preact components
2. Automatic performance optimization leveraging Scala's immutability
3. Props using case classes (immutable by default)
4. Laminar-inspired HTML DSL with unified modifiers
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
- Laminar-inspired API where it makes sense

---

## Core Type System

**File: src/scala/preact/bindings/Types.scala**

Define foundational types that all other modules depend on:

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

// Component function types
type ComponentFunction[P <: Props] = js.Function1[P, VNode]
type Component[P <: Props] = P => VNode
type SimpleComponent = () => VNode
```

**Key Design Decisions**:
- Opaque VNode prevents mixing with arbitrary js.Any while maintaining zero cost
- Multiple Child types for flexibility (strings, numbers, booleans, vnodes)
- Props trait ensures JS compatibility
- Component types support functional style

---

## JavaScript Facades

**File: src/scala/preact/bindings/Facades.scala**

Direct bindings to Preact's JavaScript API using @JSImport for ES modules:

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

  // For class component approach (if needed)
  @js.native
  trait Component extends js.Object:
    val props: js.Any = js.native
    def render(): VNode = js.native
    def shouldComponentUpdate(nextProps: js.Any, nextState: js.Any): Boolean = js.native

// For memo wrapper approach
@js.native
@JSImport("preact/compat", "memo")
def memo[P <: Props](
  component: ComponentFunction[P],
  arePropsEqual: js.UndefOr[js.Function2[P, P, Boolean]] = js.undefined
): ComponentFunction[P] = js.native
```

**Key Design Decisions**:
- Use @JSImport for ES modules (matches project's jsModuleKind)
- Include both Component class facade and memo() for flexibility
- Varargs for children to match Preact's API
- Fragment as js.Any since it can be used as nodeName

---

## Public API Package Object

**File: src/scala/preact/bindings/package.scala**

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

  // Export HTML DSL
  export preact.bindings.Dsl.*

  // Export component helpers (see component-implementation.md)
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

## Implementation Steps

### Phase 1: Foundation (Types & Facades)
1. Update project.scala with scalajs-dom dependency
2. Create Types.scala with VNode, Props, Child types
3. Create Facades.scala with @JSImport bindings to Preact (h, render, Fragment, memo)
4. Test basic interop with simple h() and render() calls
5. Verify memo() facade works

### Phase 2: Component System
See [Component Implementation](./component-implementation.md) for detailed design.

1. Decide on initial component approach (likely memo wrapper for simplicity)
2. Create Component.scala with component helpers
3. Implement automatic memoization wrapping
4. Test that memo() is properly applied
5. Verify shallow comparison works with immutable props
6. Write simple example component

### Phase 3: HTML DSL
See [HTML DSL Design](./html-dsl-design.md) for detailed design.

1. Implement unified Modifier system (Laminar-inspired)
2. Create modifier types for props, children, events, styles, etc.
3. Create tag builders that accept modifiers
4. Implement builder pattern to accumulate props and children
5. Test modifier composition and application
6. Expand element coverage as needed

### Phase 4: Public API & Testing
1. Create package.scala with exports
2. Ensure clean API surface
3. Write complete example application
4. Update Vite config to bundle Scala.js output
5. Test development workflow and hot reload

### Phase 5: Performance Evaluation
1. Benchmark the chosen approach
2. Profile rendering performance
3. Evaluate if optimizations are needed
4. Document findings for future improvements

### Phase 6: Build Integration
1. Ensure Vite can bundle Scala.js output
2. Configure source maps for debugging
3. Test production build optimization
4. Document build process

---

## Example Usage

After implementation, here's how the complete API will be used:

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
val Resource = component[ResourceProps]: props =>
  a(
    href := props.href,
    target := "_blank",
    className := "resource",
    h2(props.title),
    p(props.description)
  )

// Component without props
val App = component: () =>
  div(
    h1("Scala Preact App"),
    section(
      Resource(ResourceProps(
        title = "Learn Preact",
        description = "Interactive tutorial",
        href = "https://preactjs.com/tutorial"
      )),
      Resource(ResourceProps(
        title = "Scala.js",
        description = "Compile Scala to JavaScript",
        href = "https://www.scala-js.org/"
      ))
    )
  )

// Entry point
@main def main(): Unit =
  val root = js.Dynamic.global.document.getElementById("app")
  render(App(), root)
```

Note: The unified modifier syntax means attributes and children are mixed in a single parameter list, just like Laminar.

---

## Future Enhancements

### Immediate Next Steps
After the minimal implementation, consider:

1. **Named Tuple Props Support**
   - Add PropsConversion.scala with ToProps type class
   - Support inline named tuples: `(name: String, age: Int)`
   - Trade-off: More flexible API vs. less IDE support

2. **Performance Optimization**
   - Consider @component macro for class component generation
   - Benchmark performance vs memo() approach
   - Decide on optimizations based on real-world usage

3. **Extended HTML Elements**
   - Add more HTML5 elements
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
- **Modifier accumulation** = O(n) where n = number of modifiers (typically 3-10)
- **Immutable props** = shallow comparison is very fast
- **Builder pattern** = small allocation overhead, excellent ergonomics

### Type Safety
- VNode opaque type prevents js.Any mixing
- Props trait ensures JS compatibility
- Modifier ADT enables compile-time checking
- Component types distinguish Scala vs JS functions
- Compile-time guarantee of prop types

### Build System
- scala-cli for simple project structure
- Vite for fast development and bundling
- ES modules throughout for modern JavaScript
- Source maps for debugging Scala code

---

## Files to Create/Modify

### New Files (Phase 1)
1. **src/scala/preact/bindings/Types.scala** - Core type definitions
2. **src/scala/preact/bindings/Facades.scala** - JavaScript facades

### New Files (Phase 2)
3. **src/scala/preact/bindings/Component.scala** - Component helpers (see component-implementation.md)

### New Files (Phase 3)
4. **src/scala/preact/bindings/Dsl.scala** - HTML DSL with unified modifiers (see html-dsl-design.md)

### New Files (Phase 4)
5. **src/scala/preact/bindings/package.scala** - Public API exports

### Files to Modify
1. **project.scala** - Add scalajs-dom dependency
2. **src/scala/preact/bindings.scala** - Remove (replaced by package structure)
3. **vite.config.ts** - Configure to include Scala.js output
4. **package.json** - Ensure preact/compat is available

---

## Related Documents
- [Component Implementation](./component-implementation.md) - Detailed component API design
- [HTML DSL Design](./html-dsl-design.md) - Laminar-inspired modifier system
