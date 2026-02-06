package preact.test

import org.scalajs.dom
import preact.bindings.*
import preact.component.{*, given}
import preact.js_helpers.*
import preact.signals.{*, given}

import scala.deriving.Mirror
import scala.scalajs.js
import scala.scalajs.js.annotation.JSExportTopLevel

def buildinTagWithChildren[
    Modifier <: AttributeModifier[?, ?] | ChildModifier
](
    tag: String,
    modifiers: Seq[Modifier]
): VNode =
  var jsAttribs = js.Dynamic.literal()
  var childrenArray = js.Array[Child]()

  modifiers.foreach:
    case am: AttributeModifier[?, ?] =>
      if am.key == "cls" then
        // Special handling for "cls" to concatenate multiple class values
        if am.value != js.undefined && am.value != "" then
          val existing = jsAttribs.selectDynamic("class")
          val newValue =
            if existing != js.undefined then s"$existing ${am.value}"
            else am.value
          jsAttribs.updateDynamic("class")(newValue.asInstanceOf[js.Any])
      else am(jsAttribs)

    case cm: ChildModifier =>
      cm(childrenArray)

  h(tag, jsAttribs, childrenArray)

object DomElement:
  type Key = AttributeModifier["key", String]
  type Id = AttributeModifier["id", String]
  type Cls = AttributeModifier["cls", Opt[String]]
  type Disabled = AttributeModifier["disabled", Boolean]
  type OnClick =
    AttributeModifier["onClick", js.Function1[dom.MouseEvent, Unit]]

  type Modifier = Id | Key | Cls | Disabled | OnClick | ChildModifier

inline def div(ms: DomElement.Modifier*) = buildinTagWithChildren("div", ms)
inline def span(ms: DomElement.Modifier*) = buildinTagWithChildren("span", ms)
inline def h3(ms: DomElement.Modifier*) = buildinTagWithChildren("h3", ms)
inline def p(ms: DomElement.Modifier*) = buildinTagWithChildren("p", ms)
inline def button(ms: DomElement.Modifier*) =
  buildinTagWithChildren("button", ms)

// === Component API Examples ===

trait CardProps extends Props:
  val title: String
  val footer: Opt[String]
  val children: Children
  val cls: Opt[String]

val Card = component[CardProps]: props =>
  div(
    "cls" := "bg-white rounded-xl shadow-md p-6 border border-gray-200",
    "cls" := props.cls,
    h3(
      "cls" := "text-lg font-semibold text-gray-800 mb-3",
      props.title
    ),
    div(
      "cls" := "text-gray-600",
      props.children
    ),
    props.footer
      .map[ChildModifier](text =>
        div(
          "cls" := "mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500",
          text
        )
      )
      .getOrElse(NullChild)
  )

// === Signal Examples ===

// Global state - uses signal()
val globalTheme = Var("light")

// Component with local signal state - uses useSignal()
val SignalCounter = component[Props]: _ =>
  val count = Var(0)
  val double = Var.memo(count() * 2)
  Var.effect:
    println(s"Count changed: ${count()}, Double: ${double()}")

  div(
    "cls" := "bg-white rounded-xl shadow-md p-6 border border-gray-200",
    h3(
      "cls" := "text-lg font-semibold text-gray-800 mb-4",
      "Signal Counter"
    ),
    p(
      "cls" := "text-gray-600 mb-2",
      "Count: ",
      count
    ),
    p(
      "cls" := "text-gray-600 mb-4",
      "Double: ",
      double
    ),
    div(
      "cls" := "flex gap-3",
      button(
        "cls" := "px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors",
        "onClick" := (_ => count(_ + 1)),
        "Increment"
      ),
      button(
        "cls" := "px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors",
        "onClick" := (_ => count(_ - 1)),
        "Decrement"
      )
    )
  )

// Component that displays and toggles global theme
val ThemeDisplay = component[Props]: _ =>
  val isDark = globalTheme() == "dark"
  div(
    "cls" := "rounded-xl shadow-md p-6 border transition-colors duration-300",
    "cls" := maybe(!isDark, "bg-white border-gray-200"),
    "cls" := maybe(isDark, "bg-gray-800 border-gray-700"),
    p(
      "cls" := "mb-4 transition-colors duration-300",
      "cls" := maybe(!isDark, cls("text-gray-600")),
      "cls" := maybe(isDark, "text-gray-300"),
      "Current Theme: ",
      globalTheme
    ),
    button(
      "cls" := "px-4 py-2 rounded-lg font-medium transition-colors duration-300",
      "cls" := maybe(!isDark, "bg-amber-500 hover:bg-amber-600 text-white"),
      "cls" := maybe(isDark, "bg-yellow-400 hover:bg-yellow-500 text-gray-900"),
      "onClick" := (_ =>
        globalTheme(if globalTheme() == "light" then "dark" else "light")
      ),
      if isDark then "Switch to Light" else "Switch to Dark"
    )
  )

// === Application Rendering, where all the versions are tested ===

def appContent =
  Var.effect:
    println(s"Theme changed: ${globalTheme()}")

  div(
    "id" := "greeting",
    "key" := "main-div",
    "cls" := "min-h-screen p-8 bg-linear-to-br from-slate-50 to-slate-100",
    "cls" := maybe(globalTheme() == "dark", "from-slate-800 to-slate-900"),

    div(
      "cls" := "max-w-4xl mx-auto space-y-6",

      h3(
        "cls" := "text-3xl font-bold text-gray-800 mb-6",
        "Scala Preact Demo"
      ),

      p(
        "cls" := "text-gray-600",
        "This is a div element."
      ), // child element

      span(
        "cls" := "nested",
        "Nested span child element."
      ), // nested div as child

      // Button with disabled prop
      button(
        "cls" := "px-4 py-2 mx-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed",
        "disabled" := true,
        "Disabled Button"
      ),

      // Button with click handler
      button(
        "cls" := "px-4 py-2 mx-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors",
        "onClick" := (e => println("Button clicked!")),
        "Click me"
      ),

      // Card component with title and children
      Card(
        "title" := "My Card Title",
        "key" := "card1", // Stable key to prevent remounting
        "This is the content of the card.",
        div(
          "A nested div inside the card.",
          button(
            "cls" := "px-3 py-1.5 mx-2 rounded bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition-colors",
            "onClick" := (e => println("Nested button clicked!")),
            "Nested Button"
          )
        )
      ),

      // Card component with title and children
      Card(
        "title" := "My Second Card with Footer",
        "cls" := "highlighted", // Custom class for the second card
        "footer" := "This is the footer text.",
        "This is the content of the second card."
      ),

      // Signal examples
      h3(
        "cls" := "text-xl font-semibold text-gray-800 mt-8",
        "Signals Demo"
      ),
      SignalCounter(),
      ThemeDisplay()
    ) // close inner div
  )

@JSExportTopLevel("renderApp")
def renderApp(): Unit =
  val rootElement = dom.document.body
  render(appContent, rootElement)
