package js_tests

import scala.scalajs.js
import scala.scalajs.js.JSConverters.{*, given}

type Opt[T] = js.UndefOr[T]
type JS = js.Object

class Data(val value: String, val count: Int) extends JS

trait TestObj extends JS:
  val foo: String
  val bar: Opt[Int]
  val data: Data

def useTestObj(obj: TestObj): String =
  js.UndefOrOps
  s"foo:: ${obj.foo} - ${obj.bar.map(it => s"bar:: $it").getOrElse("no bar")} - data:: ${obj.data.value} (${obj.data.count})"

@js.annotation.JSExportTopLevel("createAndUseTestObj")
def createAndUseTestObj(): String =
  val obj = js.Dynamic
    .literal(foo = "Hello, Scala.js!", data = Data("sample", 42))
    .asInstanceOf[TestObj]

  useTestObj(obj)
