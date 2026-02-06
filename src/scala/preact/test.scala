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

  modifiers.foreach {
    case am: AttributeModifier[?, ?] =>
      am(jsAttribs)
    case cm: ChildModifier =>
      cm(childrenArray)
  }

  h(tag, jsAttribs, childrenArray)

object DomElement:
  type Id = AttributeModifier["id", String]
  type Cls = AttributeModifier["class", Opt[String]]
  type Disabled = AttributeModifier["disabled", Boolean]
  type OnClick =
    AttributeModifier["onClick", js.Function1[dom.MouseEvent, Unit]]

  type Modifier = Id | Cls | Disabled | OnClick | ChildModifier

inline def div(ms: DomElement.Modifier*) = buildinTagWithChildren("div", ms)
inline def span(ms: DomElement.Modifier*) = buildinTagWithChildren("span", ms)
inline def h3(ms: DomElement.Modifier*) = buildinTagWithChildren("h3", ms)
inline def p(ms: DomElement.Modifier*) = buildinTagWithChildren("p", ms)
inline def button(ms: DomElement.Modifier*) =
  buildinTagWithChildren("button", ms)

// === Component API Examples ===

trait CardProps extends JS:
  val title: String
  val footer: Opt[String]
  val children: Children
  val cls: Opt[String]

val Card = component[CardProps]: props =>
  div(
    "class" := props.cls,
    h3(props.title), // Card title
    div(
      props.children
    ), // Card content - spread children as modifiers
    props.footer
      .map[ChildModifier](text => div(text))
      .getOrElse(NullChild) // Card footer if exists
  )

// === Signal Examples ===

// Global state - uses signal()
val globalTheme = Var("light")

trait CounterProps extends JS:
  val key: Opt[String] // Dummy prop to satisfy component macro

// Component with local signal state - uses useSignal()
val SignalCounter = component[CounterProps]: _ =>
  val count = Var(0)
  val double = Var.memo(count() * 2)

  div(
    h3("Signal Counter"),
    p(s"Count: ${count()}"),
    p(s"Double: ${double()}"),
    button(
      "onClick" := (_ => count(_ + 1)),
      "Increment"
    ),
    button(
      "onClick" := (_ => count(_ - 1)),
      "Decrement"
    )
  )

// Component that displays and toggles global theme
val ThemeDisplay = component[CounterProps]: _ =>
  div(
    "class" := "theme-display",
    p(s"Current Theme: ${globalTheme()}"),
    button(
      "onClick" := (_ =>
        globalTheme(if globalTheme() == "light" then "dark" else "light")
      ),
      "Toggle Theme"
    )
  )

// === Application Rendering, where all the versions are tested ===

def appContent =
  div(
    "id" := "greeting", // id attribute
    "class" := "container", // class attribute

    "This is a div element.", // child element

    span(
      "class" := "nested",
      "Nested span child element."
    ), // nested div as child

    // Button with disabled prop
    button(
      "disabled" := true,
      "Disabled Button"
    ),

    // Button with click handler
    button(
      "onClick" := (e => println("Button clicked!")),
      "Click me"
    ),

    // Card component with title and children
    Card(
      "title" := "My Card Title",
      "This is the content of the card.",
      div(
        "A nested div inside the card.",
        button(
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
    h3("Signals Demo"),
    SignalCounter(),
    ThemeDisplay()
  )

@JSExportTopLevel("renderApp")
def renderApp(): Unit =
  val rootElement = dom.document.body
  render(appContent, rootElement)
