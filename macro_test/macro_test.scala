package macro_test

import scala.scalajs.js
import scala.scalajs.js.JSConverters.{*, given}

type Opt[A] = js.UndefOr[A]

class Field[Key <: String, Value](val key: Key, val value: Value)

extension [K <: String & Singleton, V](key: K)
  inline def :=(value: V): Field[K, V] =
    Field[K, V](key, value)

trait Test extends js.Object:
  val name: String
  val age: Opt[Int]
  val friends: Seq[String]

// Manual type definition (matching order that macro generates: friends, age, name)
// Using fully qualified types to match macro output exactly
type TestFields = Field["friends", scala.collection.immutable.Seq[String]] |
  Field["age", js.UndefOr[Int]] | Field["name", java.lang.String]

// Generated using the FieldUnion.derived macro
val testFieldUnion = FieldUnion.derived[Test]
type TestFieldsGenerated = FieldUnion.Fields[testFieldUnion.type]

@main def run(): Unit =
  println("=" * 60)
  println("FieldUnion Macro - SUCCESSFUL Implementation!")
  println("=" * 60)
  println()

  // Test manual type alias
  val f1: TestFields = "name" := "Alice"
  val f2: TestFields = "age" := 30
  val f3: TestFields = "friends" := Seq("Bob", "Charlie")
  println(s"✓ Manual TestFields works with := extension")

  // Test generated type from macro
  val fMacro1: TestFieldsGenerated = "name" := "Alice"
  val fMacro2: TestFieldsGenerated = "age" := 30
  val fMacro3: TestFieldsGenerated = "friends" := Seq("Bob", "Charlie")
  println(s"✓ Generated TestFieldsGenerated works with := extension")

  // Verify types are equal
  summon[TestFields =:= TestFieldsGenerated]
  println(s"✓ Types are provably equal (TestFields =:= TestFieldsGenerated)")

  println()
  println("Macro achievements:")
  println("  1. Extracts all fields from js.Object trait")
  println("  2. Creates Field types with singleton string literals")
  println("  3. Combines them into a union type")
  println("  4. Exposes type via type parameter (not path-dependent)")
  println("  5. Generated type works for value validation!")
  println()
  println("Generated union type:")
  println("  Field[\"friends\", Seq[String]] |")
  println("  Field[\"age\", js.UndefOr[Int]] |")
  println("  Field[\"name\", String]")
  println("=" * 60)
