package examples.minimal

import preact.bindings.{*, given}
import scala.scalajs.js
import scala.scalajs.js.annotation.JSExportTopLevel
import org.scalajs.dom

/** Minimal proof of concept example demonstrating:
  *   1. HTML elements (div, span, button) using case class pattern
  *   2. Custom component (Card) using case class with render method
  *   3. Unified modifier syntax for both
  */

// ===== Custom Component =====

/** Card component - demonstrates component-as-case-class pattern
  */
case class Card(
    title: String,
    children: Children = Children.empty
):
  def render: VNode =
    div(
      span(title), // Card title
      div(
        children.toSeq.map(c => ChildModifier(c))*
      ) // Card content - spread children as modifiers
    )

object Card
    extends SimpleComponentCompanion[Card](
      children => Card("Untitled", children),
      card => card.render
    ):
  // In full implementation, macro would generate:
  // val title = Prop[String]("title")
  // val children = Prop[Children]("children")

  // Manual prop modifier for POC
  object title:
    def :=(value: String): PropModifier = PropModifier("title", value)

  // Override apply to handle title prop
  override def apply(modifiers: Modifier*): VNode =
    var titleValue = "Untitled"
    val childMods = scala.collection.mutable.ArrayBuffer[Child]()

    modifiers.foreach {
      case PropModifier("title", t: String) =>
        titleValue = t
      case ChildModifier(c) =>
        childMods += c
      case _ =>
        () // ignore
    }

    val card = Card(titleValue, Children(childMods.toSeq*))
    card.render

// ===== Example App =====

object MinimalExample:
  import PropModifiers.*

  def appContent: VNode =
    div(
      // Simple text child
      span("Hello from Preact!"),

      // Button with disabled prop
      button(
        disabled(true),
        "Disabled Button"
      ),

      // Button with click handler
      button(
        onClick(e => println("Button clicked!")),
        "Click me"
      ),

      // Custom Card component - same syntax!
      Card(
        Card.title := "My Card",
        span("This is "),
        span("card content")
      ),

      // Nested structure
      div(
        span("Nested: "),
        span("Level 1"),
        div(
          span("Level 2"),
          button("Nested Button")
        )
      )
    )

  /** Main entry point - exported to JavaScript Call this from JS to render the
    * app
    */
  @JSExportTopLevel("renderApp")
  def main(): Unit =
    val rootElement = dom.document.body
    render(appContent, rootElement)

/** Expected output (conceptual JSX):
  *
  * <div> <span>Hello from Preact!</span> <button disabled>Disabled
  * Button</button> <button onClick={...}>Click me</button> <div> <span>My
  * Card</span> <div> <span>This is </span> <span>card content</span> </div>
  * </div> <div> <span>Nested: </span> <span>Level 1</span> <div> <span>Level
  * 2</span> <button>Nested Button</button> </div> </div> </div>
  */
