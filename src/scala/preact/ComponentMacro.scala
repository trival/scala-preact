package preact

import preact.bindings.Child
import preact.test.modifier.*

import scala.deriving.Mirror
import scala.quoted.*

object ComponentMacro:

  def derivedImpl[T: Type](using Quotes): Expr[Component[T]] =
    import quotes.reflect.*

    // Summon the Mirror for the case class
    val mirror = Expr.summon[Mirror.ProductOf[T]].getOrElse {
      report.errorAndAbort("Component can only be derived for case classes")
    }

    // Extract field labels and types from Mirror
    mirror match
      case '{
            $m: Mirror.ProductOf[T] {
              type MirroredElemLabels = labels
              type MirroredElemTypes = types
            }
          } =>
        // Build the Modifier union type
        val modifierTypeRepr = buildModifierUnion[labels, types]

        // Generate the apply method implementation
        modifierTypeRepr.asType match
          case '[modType] =>
            val applyExpr = generateApplyImpl[T, labels, types, modType]

            '{
              new Component[T]:
                type Modifier = modType
                def apply(self: T)(modifier: Modifier): T =
                  $applyExpr(modifier, self)
            }

  /** Build the Modifier union type from field labels and types */
  def buildModifierUnion[Labels: Type, Types: Type](using
      Quotes
  ): quotes.reflect.TypeRepr =
    import quotes.reflect.*

    (Type.of[Labels], Type.of[Types]) match
      case ('[EmptyTuple], '[EmptyTuple]) =>
        // Base case: return Nothing (empty union)
        TypeRepr.of[Nothing]

      case ('[label *: labelTail], '[tpe *: typeTail]) =>
        val labelStr = Type.valueOfConstant[label].get.toString

        val currentType =
          if labelStr == "children" then
            // Children field adds ChildModifier
            TypeRepr.of[ChildModifier]
          else
            // Regular field adds AttributeModifier[labelLiteral, valueType]
            // Use singleton literal type for the key to create a proper specialized union
            // For Option[T] fields, unwrap to just T in the modifier
            val valueType = TypeRepr.of[tpe] match
              case AppliedType(option, List(innerType))
                  if option =:= TypeRepr.of[Option].typeSymbol.typeRef =>
                innerType
              case other => other

            val keyType = ConstantType(StringConstant(labelStr))

            AppliedType(
              TypeRepr.of[AttributeModifier],
              List(keyType, valueType)
            )

        val tailUnion = buildModifierUnion[labelTail, typeTail]

        // Build union: currentType | tailUnion
        if tailUnion =:= TypeRepr.of[Nothing] then currentType
        else OrType(currentType, tailUnion)

  /** Generate the apply method implementation */
  def generateApplyImpl[T: Type, Labels: Type, Types: Type, ModType: Type](using
      Quotes
  ): Expr[(ModType, T) => T] =
    import quotes.reflect.*

    '{ (modifier: ModType, self: T) =>
      modifier match
        case attr: AttributeModifier[?, ?] =>
          ${ generateAttributeCases[T, Labels, Types]('attr, 'self) }
        case child: ChildModifier =>
          ${ generateChildCase[T, Labels]('child, 'self) }
        case _ =>
          self // Fallback for any unmatched cases
    }

  /** Generate the pattern match for AttributeModifier cases */
  def generateAttributeCases[T: Type, Labels: Type, Types: Type](
      attr: Expr[AttributeModifier[?, ?]],
      self: Expr[T]
  )(using Quotes): Expr[T] =
    import quotes.reflect.*

    // Collect all field cases recursively
    def collectFieldCases[L: Type, Ts: Type]: List[CaseDef] =
      (Type.of[L], Type.of[Ts]) match
        case ('[EmptyTuple], '[EmptyTuple]) =>
          Nil

        case ('[label *: labelTail], '[tpe *: typeTail]) =>
          val labelStr = Type.valueOfConstant[label].get.toString

          if labelStr == "children" then
            // Skip children field in AttributeModifier cases
            collectFieldCases[labelTail, typeTail]
          else
            // Generate: case "fieldName" => copy(fieldName = value.asInstanceOf[FieldType])
            val pattern = Literal(StringConstant(labelStr))
            val copyCall =
              generateCopyCall[T, tpe](self, labelStr, '{ $attr.value })

            val caseDef = CaseDef(pattern, None, copyCall.asTerm)
            caseDef :: collectFieldCases[labelTail, typeTail]

    val fieldCases = collectFieldCases[Labels, Types]
    val allCases = fieldCases :+ CaseDef(Wildcard(), None, self.asTerm)

    Match('{ $attr.key }.asTerm, allCases).asExprOf[T]

  /** Generate copy call for a specific field */
  def generateCopyCall[T: Type, FieldType: Type](
      self: Expr[T],
      fieldName: String,
      fieldValue: Expr[Any]
  )(using Quotes): Expr[T] =
    import quotes.reflect.*

    val classSym = TypeRepr.of[T].typeSymbol
    val copyMethod = classSym.methodMember("copy").headOption.getOrElse {
      report.errorAndAbort(s"No copy method found on ${classSym.name}")
    }

    val copyParams = copyMethod.paramSymss.flatten

    // Build named arguments for copy method
    val namedArgs = copyParams.map { param =>
      if param.name == fieldName then
        // Get the actual field type from the parameter
        val paramType = param.termRef.widenTermRefByName.asType match
          case '[fieldType] => TypeRepr.of[fieldType]

        // Check if the field is an Option type
        val valueExpr = paramType match
          case AppliedType(option, List(innerType))
              if option =:= TypeRepr.of[Option].typeSymbol.typeRef =>
            // Field is Option[T], wrap value in Some()
            innerType.asType match
              case '[innerT] =>
                '{ Some($fieldValue.asInstanceOf[innerT]) }.asTerm
          case _ =>
            // Field is not Option, use value directly
            '{ $fieldValue.asInstanceOf[FieldType] }.asTerm

        NamedArg(param.name, valueExpr)
      else
        // Other parameters get their current values from self
        // For case classes, fields are accessible directly
        val getter = classSym.fieldMember(param.name)
        if getter == Symbol.noSymbol then
          report.errorAndAbort(s"No field found for parameter ${param.name}")
        NamedArg(param.name, Select(self.asTerm, getter))
    }

    Apply(
      Select(self.asTerm, copyMethod),
      namedArgs
    ).asExprOf[T]

  /** Generate the ChildModifier case */
  def generateChildCase[T: Type, Labels: Type](
      child: Expr[ChildModifier],
      self: Expr[T]
  )(using Quotes): Expr[T] =
    import quotes.reflect.*

    // Check if "children" field exists
    def hasChildrenField[LabelList: Type]: Boolean =
      Type.of[LabelList] match
        case '[EmptyTuple]    => false
        case '[label *: tail] =>
          Type
            .valueOfConstant[label]
            .exists(_.toString == "children") || hasChildrenField[tail]

    if hasChildrenField[Labels] then
      // Generate: copy(children = children :+ child.child)
      val classSym = TypeRepr.of[T].typeSymbol
      val copyMethod = classSym.methodMember("copy").head
      val copyParams = copyMethod.paramSymss.flatten

      val childrenGetter = classSym.fieldMember("children")

      val namedArgs = copyParams.map { param =>
        if param.name == "children" then
          // Append the child to the children array
          NamedArg(
            param.name,
            '{
              val arr = ${ Select(self.asTerm, childrenGetter).asExprOf[Any] }
                .asInstanceOf[scala.scalajs.js.Array[Child]]
              arr.concat(
                scala.scalajs.js.Array(${ child }.child)
              )
            }.asTerm
          )
        else
          val getter = classSym.fieldMember(param.name)
          NamedArg(param.name, Select(self.asTerm, getter))
      }

      Apply(
        Select(self.asTerm, copyMethod),
        namedArgs
      ).asExprOf[T]
    else
      // No children field - return self unchanged
      self
