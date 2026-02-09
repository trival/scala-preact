package preact.test

import org.scalajs.dom
import preact.bindings.*
import preact.component.{*, given}
import preact.html.HtmlTags.*
import preact.js_helpers.*
import preact.signals.{*, given}

import scala.deriving.Mirror
import scala.scalajs.js
import scala.scalajs.js.annotation.JSExportTopLevel

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

// === Form Example ===

val ContactForm = component[Props]: _ =>
  val name = Var("")
  val email = Var("")
  val message = Var("")
  val submitted = Var(false)

  def handleSubmit(e: dom.Event): Unit =
    e.preventDefault()
    println(
      s"Form submitted: name=${name()}, email=${email()}, message=${message()}"
    )
    submitted(true)

  div(
    "cls" := "bg-white rounded-xl shadow-md p-6 border border-gray-200",
    h3(
      "cls" := "text-lg font-semibold text-gray-800 mb-4",
      "Contact Form"
    ),
    if submitted() then
      div(
        "cls" := "text-green-600 font-medium",
        "Thank you for your message!"
      )
    else
      form(
        "onSubmit" := ((e: dom.Event) => handleSubmit(e)),
        "cls" := "space-y-4",
        div(
          label(
            "for" := "name",
            "cls" := "block text-sm font-medium text-gray-700 mb-1",
            "Name"
          ),
          input(
            "type" := "text",
            "id" := "name",
            "name" := "name",
            "placeholder" := "Your name",
            "required" := true,
            "cls" := "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "onInput" := ((e: dom.Event) =>
              name(e.target.asInstanceOf[dom.html.Input].value)
            )
          )
        ),
        div(
          label(
            "for" := "email",
            "cls" := "block text-sm font-medium text-gray-700 mb-1",
            "Email"
          ),
          input(
            "type" := "email",
            "id" := "email",
            "name" := "email",
            "placeholder" := "you@example.com",
            "required" := true,
            "cls" := "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "onInput" := ((e: dom.Event) =>
              email(e.target.asInstanceOf[dom.html.Input].value)
            )
          )
        ),
        div(
          label(
            "for" := "message",
            "cls" := "block text-sm font-medium text-gray-700 mb-1",
            "Message"
          ),
          textArea(
            "id" := "message",
            "name" := "message",
            "placeholder" := "Your message...",
            "rows" := 4,
            "cls" := "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "onInput" := ((e: dom.Event) =>
              message(e.target.asInstanceOf[dom.html.TextArea].value)
            )
          )
        ),
        button(
          "type" := "submit",
          "cls" := "w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors",
          "Send Message"
        )
      )
  )

// === Navigation Links Example ===

val NavLinks = component[Props]: _ =>
  nav(
    "cls" := "bg-white rounded-xl shadow-md p-4 border border-gray-200",
    ul(
      "cls" := "flex gap-6",
      li(
        a(
          "href" := "/",
          "cls" := "text-blue-600 hover:text-blue-800 font-medium transition-colors",
          "Home"
        )
      ),
      li(
        a(
          "href" := "/about",
          "cls" := "text-blue-600 hover:text-blue-800 font-medium transition-colors",
          "About"
        )
      ),
      li(
        a(
          "href" := "/contact",
          "cls" := "text-blue-600 hover:text-blue-800 font-medium transition-colors",
          "Contact"
        )
      ),
      li(
        a(
          "href" := "https://github.com",
          "target" := "_blank",
          "rel" := "noopener noreferrer",
          "cls" := "text-blue-600 hover:text-blue-800 font-medium transition-colors",
          "GitHub ",
          span("cls" := "text-xs", "↗")
        )
      )
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
      ThemeDisplay(),

      // Navigation links example
      h3(
        "cls" := "text-xl font-semibold text-gray-800 mt-8",
        "Navigation Links"
      ),
      NavLinks(),

      // Form example
      h3(
        "cls" := "text-xl font-semibold text-gray-800 mt-8",
        "Form Example"
      ),

      ContactForm()
    ) // close inner div
  )

@JSExportTopLevel("renderApp")
def renderApp(): Unit =
  val rootElement = dom.document.body
  render(appContent, rootElement)
