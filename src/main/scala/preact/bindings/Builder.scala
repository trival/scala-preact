package preact.bindings

import scala.scalajs.js
import scala.collection.mutable

// Builder that accumulates modifiers into props and children
class ElementBuilder:
  private val props = js.Dynamic.literal()
  private val childrenBuffer = mutable.ArrayBuffer[Child]()

  def addModifier(mod: Modifier): Unit = mod match
    case PropModifier(key, value) =>
      props.updateDynamic(key)(value.asInstanceOf[js.Any])

    case ChildModifier(child) =>
      childrenBuffer += child

    case EmptyModifier =>
      // Do nothing

  def addModifiers(mods: Seq[Modifier]): Unit =
    mods.foreach(addModifier)

  def build(tag: String): VNode =
    // Only pass props if there are any
    val jsProps = if hasProps then props.asInstanceOf[js.Object] else js.undefined
    h(tag, jsProps, childrenBuffer.toSeq*)

  private def hasProps: Boolean =
    // Check if props object has any own properties
    js.Object.keys(props.asInstanceOf[js.Object]).length > 0
