package preact.bindings

import scala.scalajs.js
import scala.scalajs.js.annotation.JSImport
import org.scalajs.dom

// Preact h() function facade
@js.native
@JSImport("preact", "h")
object h extends js.Object:
  def apply(tag: String | js.Any, props: js.UndefOr[js.Object], children: Child*): VNode = js.native

// Preact memo() function facade
@js.native
@JSImport("preact/compat", "memo")
object memo extends js.Object:
  def apply[P](component: js.Function1[P, VNode]): js.Function1[P, VNode] = js.native

// Preact render() function facade
@js.native
@JSImport("preact", "render")
object render extends js.Object:
  def apply(vnode: VNode, container: dom.Element): Unit = js.native
