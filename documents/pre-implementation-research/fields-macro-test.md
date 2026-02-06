# Field Union Macro - Implementation Guide

## Overview

This guide documents how to create a Scala 3 macro that extracts field definitions from a trait and generates a union type of key-value pairs with singleton string literals for keys.

## Problem Statement

Given a trait like:

```scala
trait Test extends js.Object:
  val name: String
  val age: js.UndefOr[Int]
  val friends: Seq[String]
```

We want to automatically generate a union type:

```scala
type TestFields =
  Field["name", String] |
  Field["age", js.UndefOr[Int]] |
  Field["friends", Seq[String]]
```

This allows type-safe validation of field values at compile time.

## Key Insights

### 1. Type Member vs Type Parameter Pattern

**❌ DOESN'T WORK: Type Member Pattern**

```scala
trait FieldUnion[T]:
  type Fields  // Path-dependent type

val instance = FieldUnion.derived[Test]
type Generated = instance.Fields  // Won't unify with values!
```

**Problem:** Path-dependent types like `instance.Fields` don't unify with actual values the same way direct type aliases do. The type system treats them too conservatively.

**✅ WORKS: Type Parameter Pattern**

```scala
trait FieldUnion[T, F]:  // F is the union type
  def printFields(fields: F*): Unit

transparent inline def derived[T]: Any =
  ${ derivedImpl[T] }
```

**Solution:** Using a type parameter exposes the union type directly in the value's type signature, and `transparent inline` allows the exact type to flow through to the call site.

### 2. Extracting the Type from the Macro Result

Use the provided `Fields` type alias to extract the union type:

```scala
val testFieldUnion = FieldUnion.derived[Test]
type TestFieldsGenerated = FieldUnion.Fields[testFieldUnion.type]
```

The library provides a generic match type to extract the union type parameter:

```scala
object FieldUnion:
  type Fields[FU] = FU match
    case FieldUnion[_, f] => f
```

This gives you a usable type alias that works for value validation without needing to write the match type in user code.

### 3. Preserving Singleton String Literal Types

The macro must create **singleton string literal types** (e.g., `"name"`) not just `String`:

```scala
val fieldNameType = ConstantType(StringConstant(fieldName))

val fieldClassSymbol = Symbol.requiredClass("test.Field")
val fieldType = AppliedType(
  fieldClassSymbol.typeRef,
  List(fieldNameType, convertedType)
)
```

Using `ConstantType(StringConstant(...))` creates the singleton type, and `AppliedType` preserves it when applying to the Field class.

### 4. Extension Method for Value Creation

To create values with singleton types, use an extension method:

```scala
extension [K <: String & Singleton, V](key: K)
  inline def :=(value: V): Field[K, V] =
    ${ FieldBuilder.buildImpl('key, 'value) }
```

The `String & Singleton` bound is critical for preserving literal types.

## Complete Implementation

### Step 1: Define the Field Class

```scala
class Field[Key <: String, Value](val key: Key, val value: Value)
```

### Step 2: Create the FieldUnion Trait

```scala
/** Trait that holds the computed union type of fields.
  * T is the source trait type
  * F is the union type of all Field[name, type] tuples
  */
trait FieldUnion[T, F]:
  def printFields(fields: F*): Unit =
    println(s"Fields: $fields")
```

### Step 3: Implement the Macro

```scala
object FieldUnion:
  // Type alias to extract the union type from the macro result
  type Fields[FU] = FU match
    case FieldUnion[_, f] => f

  transparent inline def derived[T]: Any =
    ${ derivedImpl[T] }

  private def derivedImpl[T: Type](using Quotes): Expr[Any] =
    import quotes.reflect.*

    val tpe = TypeRepr.of[T]
    val typeSymbol = tpe.typeSymbol
    val fields = typeSymbol.memberFields

    if fields.isEmpty then
      report.errorAndAbort(s"Type ${typeSymbol.name} has no fields")

    // Create Field[singleton-key, value-type] for each field
    val fieldTypes: List[TypeRepr] = fields.map { fieldSym =>
      val fieldName = fieldSym.name
      val memberType = tpe.memberType(fieldSym)

      // Create singleton string literal type
      val fieldNameType = ConstantType(StringConstant(fieldName))

      // Apply to Field class
      val fieldClassSymbol = Symbol.requiredClass("test.Field")
      AppliedType(
        fieldClassSymbol.typeRef,
        List(fieldNameType, memberType)
      )
    }

    // Combine into union type
    val unionType = fieldTypes.reduce((left, right) =>
      OrType(left, right)
    )

    // Return FieldUnion instance with union type as type parameter
    unionType.asType match
      case '[fieldsType] =>
        '{
          new FieldUnion[T, fieldsType] {}
        }
```

### Step 4: Create Extension Method

```scala
object FieldBuilder:
  def buildImpl[K <: String & Singleton: Type, V: Type](
      key: Expr[K],
      value: Expr[V]
  )(using Quotes): Expr[Field[K, V]] =
    '{ new Field[K, V]($key, $value) }

extension [K <: String & Singleton, V](key: K)
  inline def :=(value: V): Field[K, V] =
    ${ FieldBuilder.buildImpl('key, 'value) }
```

### Step 5: Usage

```scala
trait MyData extends js.Object:
  val name: String
  val age: Int

// Generate union type
val fieldUnion = FieldUnion.derived[MyData]
type MyDataFields = FieldUnion.Fields[fieldUnion.type]

// Use for validation
val f1: MyDataFields = "name" := "Alice"  // ✓ compiles
val f2: MyDataFields = "age" := 30        // ✓ compiles
val f3: MyDataFields = "invalid" := "x"   // ✗ compile error
```

## Common Pitfalls

### ❌ Using `inline def` without `transparent`

```scala
inline def derived[T]: FieldUnion[T, ?] = ${ ... }
```

This won't expose the concrete union type. Must use `transparent inline` with `Any` return type.

### ❌ Missing `String & Singleton` bound

```scala
extension [K <: String, V](key: K)  // Wrong!
```

Without `& Singleton`, the type parameter will widen to `String` instead of preserving literal types like `"name"`.

### ❌ Using `.widen` on field types

```scala
val memberType = tpe.memberType(fieldSym).widen  // Wrong!
```

This can cause `js.UndefOr[Int]` to become `Int | Unit`, losing type information.

### ❌ Returning type member instead of type parameter

```scala
trait FieldUnion[T]:
  type Fields  // Path-dependent type issues
```

Always use type parameter pattern: `trait FieldUnion[T, F]`

## Type Conversion (Optional)

To convert types like `js.UndefOr[A]` to `Option[A]`:

```scala
def convertJsUndefOr(tpe: TypeRepr): TypeRepr =
  val dealiased = tpe.dealias

  dealiased match
    case AppliedType(tycon, List(innerType)) =>
      if tycon.typeSymbol.fullName == "scala.scalajs.js.UndefOr" then
        TypeRepr.of[Option].appliedTo(innerType)
      else
        tpe
    case _ => tpe

// Use in macro:
val convertedType = convertJsUndefOr(memberType)
```

## Testing

Verify the implementation works:

```scala
@main def test(): Unit =
  // Manual type should match generated type
  summon[ManualType =:= GeneratedType]

  // Values should be accepted
  val f1: GeneratedType = "field" := value

  // Methods using generated type should work
  fieldUnion.printFields(f1, f2, f3)
```

## Summary

The key to making this macro work is:

1. **Use type parameters** (`FieldUnion[T, F]`) not type members
2. **Use `transparent inline`** to expose the concrete type
3. **Create singleton types** with `ConstantType(StringConstant(...))`
4. **Extract with match types** to get usable type alias
5. **Use `String & Singleton`** bound in extension methods

This pattern enables compile-time validation of field names and types, which is invaluable for type-safe builders, configuration objects, and API interfaces.
