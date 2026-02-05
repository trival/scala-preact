package preact.test

import org.scalajs.dom
import preact.bindings.*
import preact.component.{*, given}
import preact.js_helpers.*

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
    )
  )

@JSExportTopLevel("renderApp")
def renderApp(): Unit =
  val rootElement = dom.document.body
  render(appContent, rootElement)
