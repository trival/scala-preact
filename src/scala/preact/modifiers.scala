package preact.modifier

import preact.bindings.*

import scala.quoted.*
import scala.scalajs.js

class AttributeModifier[Key <: String, Value](val key: Key, val value: Value):
  inline def apply(jsAttribs: js.Dynamic): Unit =
    jsAttribs.updateDynamic(key)(value.asInstanceOf[js.Any])

extension [Key <: String, Value](key: Key)
  inline def :=(value: Value) = AttributeModifier(key, value)

class ChildModifier(val child: Child):
  inline def apply(childrenArray: js.Array[Child]): Unit =
    childrenArray.push(child.asInstanceOf[js.Any])

inline def NullChild: ChildModifier = ChildModifier(())

// Given conversions for children
given Conversion[String, ChildModifier]:
  inline def apply(str: String) = ChildModifier(str)
given Conversion[Int, ChildModifier]:
  inline def apply(num: Int) = ChildModifier(num)
given Conversion[Double, ChildModifier]:
  inline def apply(num: Double) = ChildModifier(num)
given Conversion[VNode, ChildModifier]:
  inline def apply(vnode: VNode) = ChildModifier(vnode)

type Children = js.Array[Child]

/** Trait that holds the computed union type of fields. F is the union type of
  * all Field[name, type] tuples
  */
trait AttribUnion[T, F]
// def printFields(fields: F*): Unit =
//   println(s"Fields: $fields")

object AttribUnion:
  /** Extract the Fields union type from a FieldUnion instance.
    *
    * Usage:
    * {{{
    * val fieldUnion = FieldUnion.derived[Test]
    * type TestFields = FieldUnion.Fields[fieldUnion.type]
    * }}}
    */
  type Attribs[FU] = FU match
    case AttribUnion[_, f] => f

  /** Derive a FieldUnion instance for a trait, computing the Fields union type.
    *
    * Example:
    * {{{
    * val testUnion = FieldUnion.derived[Test]
    * type TestFields = FieldUnion.Fields[testUnion.type]
    * }}}
    */
  transparent inline def derived[T]: Any =
    ${ derivedImpl[T] }

  private def derivedImpl[T: Type](using Quotes): Expr[Any] =
    import quotes.reflect.*

    // Get the trait's type representation and symbol
    val tpe = TypeRepr.of[T]
    val typeSymbol = tpe.typeSymbol

    // Extract all field members from the trait
    val fields = typeSymbol.memberFields

    if fields.isEmpty then
      report.errorAndAbort(s"Type ${typeSymbol.name} has no fields")

    // Process each field to create Field tuple types
    val fieldTypes: List[TypeRepr] = fields.map { fieldSym =>
      val fieldName = fieldSym.name
      val memberType = tpe.memberType(fieldSym)

      // For now, use types as-is (no conversion)
      // TODO: Add js.UndefOr[A] to Option[A] conversion later
      val convertedType = memberType

      // Create string literal type for the field name
      val fieldNameType = ConstantType(StringConstant(fieldName))

      // Create Field[FieldNameLiteral, FieldValueType] class type
      val fieldClassSymbol =
        Symbol.requiredClass("preact.modifier.AttributeModifier")
      val result = AppliedType(
        fieldClassSymbol.typeRef,
        List(fieldNameType, convertedType)
      )

      report.info(s"Field '$fieldName': ${result.show}")
      result
    }

    // Combine all field types into a union type
    val unionType = fieldTypes.reduce((left, right) => OrType(left, right))

    // Print the final union type for verification
    report.info(s"=== FINAL UNION: ${unionType.show} ===")

    // Return a FieldUnion instance with the union type as a type parameter
    unionType.asType match
      case '[fieldsType] =>
        '{
          new AttribUnion[T, fieldsType] {}
        }
