package preact.test.modifier

import preact.bindings.*

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
