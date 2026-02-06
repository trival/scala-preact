# Plan: Auto-Derive Component Trait with Modifier Type and Apply Method

This document was a sketch pre implementation. see the concrete implementation in `src/scala/preact/**/*` and related files for the actual design and API.

## Overview

Implement a `Component` trait with a `derived` macro that auto-generates:

1. The `Modifier` union type from case class fields
2. The instance `apply(modifier: Modifier): Self` method
3. Support for both `AttributeModifier` and `ChildModifier` types

## Design Approach

Based on the Scala 3 derivation documentation and detailed Plan agent analysis, we'll use the **macro-based approach** with the following architecture:

### Component Trait Structure with Type Member

```scala
trait Component[Self]:
  /** The modifier type - union of all AttributeModifiers + ChildModifier */
  type Modifier

  /** Apply a single modifier to create a modified instance */
  def apply(modifier: Modifier): Self

object Component:
  inline def derived[T](using m: Mirror.ProductOf[T]): Component[T] =
    ${ ComponentMacro.derivedImpl[T] }
```

**Key Design Decision**: Use a **type member** `type Modifier` instead of a type parameter. This allows:

- Access as `Card2.Modifier` from the companion object (via path-dependent type `Card2#Modifier`)
- The macro to generate the concrete union type at derivation time
- Clean, simple trait signature

### Macro Implementation Strategy

The macro (in `ComponentMacro.scala`) will:

1. **Extract field metadata** from `Mirror.ProductOf[T]`:

   ```scala
   case '{ $m: Mirror.ProductOf[T] {
       type MirroredElemLabels = labels
       type MirroredElemTypes = types
   }} =>
   ```

2. **Build Modifier union type** by recursively processing label/type tuples:
   - For each field except "children": Create `AttributeModifier[labelLiteral, fieldType]`
   - If "children" field exists: Add `ChildModifier` to union
   - Combine with `OrType(left, right)` to build: `Attr1 | Attr2 | ... | ChildModifier`

3. **Generate apply method** with pattern matching:
   - Match on `AttributeModifier[?, ?]` → nested match on `attr.key` → call `copy(field = value)`
   - Match on `ChildModifier` → call `copy(children = children :+ child)`
   - Use reflection API to call `copy()` with named arguments

4. **Return Component instance**:
   ```scala
   '{
     new Component[T]:
       type Modifier = ${modifierType}
       def apply(modifier: Modifier): T = ${applyMethodExpr}
   }
   ```

### Key Technical Challenges & Solutions

1. **String literal types**: Use `ConstantType(StringConstant(str))` to create types like `"title"` (not just `String`)

2. **Dynamic copy() calls**: Use reflection API:
   - Get class symbol's `copy` method
   - Build `NamedArg` for each parameter
   - Modified field gets new value, others get current value via `Select(self, getter)`

3. **Building union types**: Use `TypeRepr.appliedToTypes()` and `OrType()` to construct the union at type level

4. **Type/TypeRepr conversion**: Use `.asType match { case '[t] => ... }` pattern to convert back to quoted types

5. **"children" field detection**: Recursively check `MirroredElemLabels` tuple for string literal "children"

## Implementation Steps

### 1. Create Component.scala with trait definition

**File**: `src/scala/preact/Component.scala` (new file)

```scala
package preact

import scala.deriving.Mirror

trait Component[Self]:
  /** The modifier type for this component */
  type Modifier

  /** Apply a single modifier to create a modified instance */
  def apply(modifier: Modifier): Self

object Component:
  inline def derived[T](using m: Mirror.ProductOf[T]): Component[T] =
    ${ ComponentMacro.derivedImpl[T] }
```

### 2. Create ComponentMacro.scala with macro implementation

**File**: `src/scala/preact/ComponentMacro.scala` (new file)

Structure:

- `derivedImpl[T]` - Main entry point, extracts Mirror, delegates to helper methods
- `buildModifierType` - Recursively processes field labels/types to build union type
- `generateApplyMethod` - Generates the pattern match expression for apply method
- `generateCopyCall` - Uses reflection API to call copy() with specific field
- `hasChildrenField` - Checks if "children" field exists in labels tuple

Key implementation details:

```scala
def derivedImpl[T: Type](using Quotes): Expr[Component[T]] =
  // Pattern match to extract labels and types from Mirror
  val mirror = Expr.summon[Mirror.ProductOf[T]].getOrElse {
    report.errorAndAbort("Component can only be derived for case classes")
  }

  mirror match
    case '{ $m: Mirror.ProductOf[T] {
        type MirroredElemLabels = labels
        type MirroredElemTypes = types
    }} =>
      // Build the union type
      val modifierTypeRepr = buildModifierUnion[labels, types]

      // Generate apply method
      modifierTypeRepr.asType match
        case '[modType] =>
          val applyExpr = generateApplyImpl[T, labels, types, modType]

          '{
            new Component[T]:
              type Modifier = modType
              def apply(modifier: Modifier): T = $applyExpr
          }
```

### 3. Implement buildModifierUnion

Recursively process tuples to build union type:

```scala
def buildModifierUnion[Labels: Type, Types: Type](using Quotes): TypeRepr =
  import quotes.reflect.*

  (Type.of[Labels], Type.of[Types]) match
    case ('[EmptyTuple], '[EmptyTuple]) =>
      // Base case: just ChildModifier if children exists
      if hasChildrenField[Labels] then
        TypeRepr.of[ChildModifier]
      else
        TypeRepr.of[Nothing] // No fields

    case ('[label *: labelTail], '[tpe *: typeTail]) =>
      val labelStr = Type.valueOfConstant[label].get.toString

      val currentType =
        if labelStr == "children" then
          TypeRepr.of[ChildModifier]
        else
          // AttributeModifier[label, tpe]
          TypeRepr.of[AttributeModifier].appliedToTypes(List(
            ConstantType(StringConstant(labelStr)),
            TypeRepr.of[tpe]
          ))

      val tailUnion = buildModifierUnion[labelTail, typeTail]
      OrType(currentType, tailUnion)
```

### 4. Implement generateApplyImpl with reflection-based copy()

Generate pattern match with copy calls:

```scala
def generateApplyImpl[T: Type, Labels: Type, Types: Type, ModType: Type](
  using Quotes
): Expr[ModType => T] =
  '{(modifier: ModType) =>
    val self = ??? // Get reference to instance
    modifier match
      case attr: AttributeModifier[?, ?] =>
        ${generateAttributeCases[T, Labels, Types]('attr, 'self)}
      case child: ChildModifier =>
        ${generateChildCase[T, Labels]('child, 'self)}
  }

// Helper to generate attr.key match cases
def generateAttributeCases[T: Type, Labels: Type, Types: Type](
  attr: Expr[AttributeModifier[?, ?]],
  self: Expr[T]
)(using Quotes): Expr[T] =
  import quotes.reflect.*

  // Build match on attr.key
  val cases = collectFieldCases[T, Labels, Types](attr, self)
  Match('{ ${attr}.key }.asTerm, cases).asExprOf[T]

// Use reflection to call copy with specific field
def generateCopyCall[T: Type](
  self: Expr[T],
  fieldName: String,
  fieldValue: Expr[Any]
)(using Quotes): Expr[T] =
  import quotes.reflect.*

  val classSym = TypeRepr.of[T].typeSymbol
  val copyMethod = classSym.methodMember("copy").head
  val copyParams = copyMethod.paramSymss.flatten

  val namedArgs = copyParams.map { param =>
    if param.name == fieldName then
      NamedArg(param.name, fieldValue.asTerm)
    else
      val getter = classSym.methodMember(param.name).head
      NamedArg(param.name, Select(self.asTerm, getter))
  }

  Apply(Select(self.asTerm, copyMethod), namedArgs).asExprOf[T]
```

### 5. Update Card2 in test.scala

**File**: `src/scala/preact/test.scala`

Remove manual implementation, add derives:

```scala
case class Card2(
  title: String = "",
  footer: Option[String] = None,
  children: js.Array[Child] = js.Array()
) derives Component:
  def render: VNode =
    div(
      h3(title),
      div(children*),
      footer.fold(NullChild: Child)(div(_))
    )

object Card2:
  // Manual companion apply (user preference)
  def apply(ms: Card2#Modifier*): VNode =
    var card = Card2()
    ms.foreach(m => card = card.apply(m))
    card.render
```

### 6. Test and verify

- Compile and check for macro expansion errors
- Test that Card2("title" := "Test") works
- Verify Card2.Modifier type is accessible
- Ensure existing functionality still works

## Critical Files to Create/Modify

1. **src/scala/preact/Component.scala** (NEW) - Component trait definition with type member
2. **src/scala/preact/ComponentMacro.scala** (NEW) - Macro implementation with all derivation logic
3. **src/scala/preact/test.scala** (MODIFY lines 88-128) - Update Card2 to use `derives Component`, remove manual Modifier type and apply method
4. **src/scala/preact/modifiers.scala** (REFERENCE) - Contains AttributeModifier and ChildModifier definitions needed by macro

## Technical Implementation Details

### Tricky Parts and Solutions

#### 1. Accessing "this" in Generated apply Method

**Challenge**: The generated `apply(modifier): T` method needs access to the instance it's called on.

**Solution**: The Component trait is mixed into the case class via `derives`. The generated method body will reference `this` which will be bound to the case class instance at runtime. However, we need to ensure the macro generates code that works within the Component trait context.

**Approach**: Generate the apply method as a lambda that closes over a `self` parameter:

```scala
new Component[T]:
  def apply(modifier: Modifier): T =
    // "this" here is NOT the Component instance, it's the case class instance
    // when mixed in via derives. But we need to be careful...
    val self = this.asInstanceOf[T]
    modifier match ...
```

Actually, better approach based on Plan agent feedback: Generate as instance method where `this` naturally refers to the product instance.

#### 2. Building OrType Unions Correctly

**Challenge**: Need to build `A | B | C | D` as nested `OrType(OrType(OrType(A, B), C), D)`.

**Solution**: Process recursively right-to-left:

```scala
def buildUnion(types: List[TypeRepr]): TypeRepr = types match
  case Nil => TypeRepr.of[Nothing]
  case head :: Nil => head
  case head :: tail => OrType(head, buildUnion(tail))
```

#### 3. Handling Empty/Nothing in Union Base Case

**Challenge**: If no fields exist (unlikely for case class), what should Modifier be?

**Solution**: Return `TypeRepr.of[Nothing]` for empty case - this will make the Modifier type uninhabitable, which is correct (no modifiers possible).

#### 4. Children Field Special Handling

**Challenge**: The "children" field should:

- Add ChildModifier to the union
- Generate `copy(children = children :+ child.child)` not `copy(children = child.child)`
- Not create an AttributeModifier["children", ...]

**Solution**:

- Detect "children" field name during union building
- Add ChildModifier instead of AttributeModifier
- In apply method generation, skip "children" in attr.key match
- Add separate `case child: ChildModifier` with append logic

#### 5. Type Casting Safety

**Challenge**: `attr.value.asInstanceOf[FieldType]` is unsafe without guarantees.

**Solution**: The cast is safe because:

1. The Modifier union type restricts which AttributeModifiers are valid
2. The pattern match on `attr.key` ensures we only cast to the type associated with that key
3. Scala's type system guarantees `AttributeModifier["title", String]` has `value: String`

### Important Scala 3 Macro Patterns

From the Plan agent analysis and derivation-macro.md:

1. **Extract labels as string literals**:

   ```scala
   val labelStr = Type.valueOfConstant[label].get.toString
   // This gives us "title" as a String value
   ```

2. **Create string literal type**:

   ```scala
   ConstantType(StringConstant("title"))
   // This gives us the type "title" (not String)
   ```

3. **Apply type parameters**:

   ```scala
   TypeRepr.of[AttributeModifier].appliedToTypes(List(keyType, valueType))
   // Creates AttributeModifier[K, V]
   ```

4. **Convert TypeRepr to Type for quotes**:

   ```scala
   typeRepr.asType match
     case '[t] => // Now can use Type[t] in quotes
       '{ ... : t }
   ```

5. **Build case statements with reflection**:
   ```scala
   CaseDef(
     pattern: Tree,       // e.g., Literal(StringConstant("title"))
     guard: Option[Tree], // Usually None
     rhs: Tree           // The body, e.g., copy call
   )
   ```

### Type Safety & Limitations

**Guarantees**:

- Only fields that exist on the case class can be modified
- Field types are enforced (can't pass Int where String expected)
- Modifier union type is complete and exhaustive

**Limitations**:

1. **Product types only**: Case classes with `Mirror.ProductOf` - no sealed traits or enums
2. **Field names**: Must be valid identifiers and not conflict with "children" special handling
3. **Children type**: Currently hardcoded to expect field name "children" - could be made configurable
4. **No nested derivation**: Doesn't automatically derive Component for nested case classes
5. **Scala.js interop**: Assumes types are compatible with JavaScript (which they should be)

## Verification Plan

### Phase 1: Compilation Test

**Goal**: Ensure macro expands without errors

1. Compile the project with the new Component derivation
2. Check for macro expansion errors or type errors
3. Use compiler flags to inspect generated code:
   - `-Xprint:typer` to see the expanded code after type checking
   - `-Vprint-types` to see detailed type information
4. Verify the generated Modifier union type is correct
5. Verify the generated apply method body matches expected pattern

### Phase 2: Type Checking Tests

**Goal**: Verify type safety at compile time

1. **Modifier type accessibility**: Confirm `Card2.Modifier` or `Card2#Modifier` is accessible
2. **Invalid modifier rejection**: Try to pass wrong type - should fail compilation:
   ```scala
   Card2("invalid" := "value") // Should not compile - "invalid" not a field
   ```
3. **Type mismatch**: Try to pass wrong value type - should fail:
   ```scala
   Card2("title" := 123) // Should not compile - title is String not Int
   ```

### Phase 3: Runtime Tests

**Goal**: Verify the derived implementation works correctly

Test cases in the main method or new test file:

1. **Basic modifier application**:

   ```scala
   val c1 = Card2().apply("title" := "Test Title")
   assert(c1.title == "Test Title")
   ```

2. **Chaining modifiers via companion**:

   ```scala
   val c2 = Card2("title" := "Title", "footer" := Some("Footer"))
   assert(c2.title == "Title" && c2.footer == Some("Footer"))
   ```

3. **Children modifier**:

   ```scala
   val c3 = Card2("Child 1", "Child 2")
   assert(c3.children.length == 2)
   ```

4. **Mixed modifiers**:

   ```scala
   val c4 = Card2("title" := "T", "Child", "footer" := None)
   assert(c4.title == "T" && c4.children.length == 1)
   ```

5. **Render test**: Ensure Card2 still renders to VNode correctly:
   ```scala
   val vnode = Card2("title" := "Test").render
   // Check vnode structure
   ```

### Phase 4: Integration Test

**Goal**: Ensure existing code continues to work

1. Run the existing main method in test.scala
2. Verify Card2 renders correctly in browser/Node.js
3. Check that all existing Card2 usage patterns still work
4. Verify no runtime errors or unexpected behavior

### Phase 5: Edge Cases

**Goal**: Test boundary conditions

1. **Empty modifiers**: `Card2()` should create default instance
2. **Duplicate modifiers**: Last one wins behavior
3. **Option types**: `footer := None` and `footer := Some("text")` both work
4. **Empty children**: Card with no children renders correctly

### Success Criteria

✅ Project compiles without errors
✅ Generated Modifier type is correct union of AttributeModifiers + ChildModifier
✅ Generated apply method correctly pattern matches and calls copy()
✅ Type safety enforced - invalid modifiers rejected at compile time
✅ Runtime behavior matches manual Card2 implementation
✅ Existing code continues to work
✅ Card2.Modifier type is accessible from companion object

## Design Decisions (User Confirmed)

1. **Companion object apply method**: Keep manual - users will write their own varargs apply method in companion objects
2. **Children field identification**: Hardcode field name "children" - macro will look for a field named "children" specifically
3. **Modifier type access**: Type member pattern - expose as `Card2.Modifier` on the companion object, matching current convention

## Summary

This plan implements **type class derivation for Preact Components** using Scala 3's macro system. The solution is based on the derivation-macro.md pattern but adapted for component builders.

### What Gets Auto-Generated

For a case class like:

```scala
case class Card2(
  title: String = "",
  footer: Option[String] = None,
  children: js.Array[Child] = js.Array()
) derives Component
```

The macro will generate:

```scala
// Modifier type (exposed as type member)
type Modifier =
  AttributeModifier["title", String] |
  AttributeModifier["footer", Option[String]] |
  ChildModifier

// Apply method with pattern matching
def apply(modifier: Modifier): Card2 = modifier match
  case attr: AttributeModifier[?, ?] =>
    attr.key match
      case "title" => copy(title = attr.value.asInstanceOf[String])
      case "footer" => copy(footer = attr.value.asInstanceOf[Option[String]])
      case _ => this
  case child: ChildModifier =>
    copy(children = children :+ child.child)
```

## Key Insights from Design Process

1. **Type member pattern is crucial**: Using `type Modifier` as a member (not type parameter) enables path-dependent access as `Card2#Modifier`

2. **Reflection API required**: Can't generate `copy(fieldName = value)` without reflection since field name is a runtime String

3. **Union type building**: Must recursively process tuple types and build nested `OrType` structures

4. **Children is special**: Requires different handling from regular fields - append instead of replace

5. **Type safety preserved**: Even with macros, Scala's type system ensures only valid modifiers can be constructed and applied

## Next Steps After Implementation

Once the basic derivation works, potential enhancements:

1. **Configurable children field**: Use annotation `@ChildrenField` instead of hardcoded "children"
2. **Support other collection types**: Not just `js.Array[Child]` but `Seq[Child]`, `List[Child]`, etc.
3. **Nested derivation**: Automatically derive Component for nested case class fields
4. **Custom modifier types**: Allow users to define additional modifiers beyond AttributeModifier
5. **Companion apply generation**: Optionally generate the varargs apply method
6. **Better error messages**: Custom compile errors for common mistakes

## Summary

This implementation plan provides a complete, detailed approach to implementing Component derivation for the scala-preact project:

### What We're Building

- A `Component[Self]` trait with a `type Modifier` member and `apply` method
- A macro that derives this trait for case classes
- Automatic generation of the Modifier union type and apply method implementation

### How It Works

1. User writes `case class Card2(...) derives Component`
2. Compiler calls `Component.derived[Card2]`
3. Macro extracts field names and types from Mirror.ProductOf
4. Macro generates union type: `AttributeModifier["title", String] | ... | ChildModifier`
5. Macro generates apply method with pattern matching on modifier type
6. Result: Card2 gets auto-generated Modifier type and apply method

### Key Benefits

- ✅ Eliminates ~40 lines of boilerplate per component (Modifier type + apply method)
- ✅ Type-safe: field names and types checked at compile time
- ✅ Maintainable: Changes to case class fields automatically update Modifier type
- ✅ Zero runtime overhead: All code generation happens at compile time
- ✅ Matches existing API: `Card2("title" := "Test")` syntax unchanged

### Potential Extensions (Future Work)

1. Support for `@ChildrenField` annotation instead of hardcoded "children"
2. Support for sealed traits/enums (Mirror.SumOf)
3. Auto-generate companion object apply method
4. Support for nested component derivation
5. Custom modifier types beyond AttributeModifier/ChildModifier
