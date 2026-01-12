package preact.test

import preact.bindings.Child

import scala.scalajs.js

case class AttributeModifier[Key <: String, Value](
    key: Key,
    value: Value
):
  def apply(jsAttribs: js.Dynamic): Unit =
    jsAttribs
      .updateDynamic(key)(value.asInstanceOf[js.Any])

extension [Key <: String, Value](key: Key)
  def :=(value: Value): AttributeModifier[Key, Value] =
    AttributeModifier(key, value)

case class ChildModifier(child: Child):
  def apply(childrenArray: js.Array[Child]): Unit =
    childrenArray.push(child.asInstanceOf[js.Any])

case class div(id: Option[String] = None, cls: Option[String] = None)

object div:
  type Id = AttributeModifier["id", String]
  type Cls = AttributeModifier["class", String]
  type Modifier = Id | Cls | ChildModifier

  def apply(modifiers: Modifier*): div =
    var idOpt: Option[String] = None
    var clsOpt: Option[String] = None

    modifiers.foreach {
      case AttributeModifier("id", v: String) =>
        idOpt = Some(v)
      case AttributeModifier("class", v: String) =>
        clsOpt = Some(v)
      case _ =>
        () // ignore other attributes for this example
    }

    div(idOpt, clsOpt)
