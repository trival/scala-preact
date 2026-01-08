package preact.bindings

import scala.scalajs.js

// VNode type (Preact virtual node)
type VNode = js.Any

// Child type (anything that can be a child)
type Child = String | Int | Double | VNode | Unit

// Children collection (opaque type)
opaque type Children = Seq[Child]

object Children:
  def empty: Children = Seq.empty
  def apply(children: Child*): Children = children.toSeq

  extension (c: Children)
    def toSeq: Seq[Child] = c
    def isEmpty: Boolean = c.isEmpty
    def nonEmpty: Boolean = c.nonEmpty

// Modifier - anything that can modify an element
sealed trait Modifier

// Modifier that sets a prop value
final case class PropModifier(key: String, value: Any) extends Modifier

// Modifier that adds a child
final case class ChildModifier(child: Child) extends Modifier

// Empty modifier (for conditional logic)
case object EmptyModifier extends Modifier

// Given conversions for children
given Conversion[String, Modifier] = str => ChildModifier(str)
given Conversion[Int, Modifier] = num => ChildModifier(num)
given Conversion[Double, Modifier] = num => ChildModifier(num)
given Conversion[VNode, Modifier] = vnode => ChildModifier(vnode)
