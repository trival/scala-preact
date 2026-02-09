//> using scala 3.8.1
//> using dep com.lihaoyi::os-lib:0.11.4

import os._
import scala.util.matching.Regex

/** HTML Code Generator for Preact Facade
  *
  * This script generates type-safe HTML bindings by parsing the scala-dom-types
  * library definitions and producing Scala files with type aliases and tag functions.
  *
  * == Setup ==
  *
  * 1. Clone scala-dom-types into the tmp folder (excluded from git):
  *    {{{
  *    git clone https://github.com/raquo/scala-dom-types.git tmp/scala-dom-types
  *    }}}
  *
  * 2. Run the generator:
  *    {{{
  *    scala-cli run codegen/HtmlCodegen.scala --server=false
  *    }}}
  *    Note: The `--server=false` flag avoids potential Bloop server issues with Scala 3.8.1
  *
  * == Generated Files ==
  *
  * The generator produces four files in `src/scala/preact/html/`:
  *
  *   - '''HtmlAttrs.scala''' - Type aliases for HTML attributes (id, href, src, disabled, etc.)
  *   - '''HtmlEvents.scala''' - Type aliases for DOM events (onClick, onChange, onKeyDown, etc.)
  *   - '''HtmlModifiers.scala''' - Union type combining all attributes, events, and children
  *   - '''HtmlTags.scala''' - Tag functions for all HTML elements (div, span, button, input, etc.)
  *
  * == How It Works ==
  *
  * 1. '''Parsing''': Reads definition files from scala-dom-types using regex patterns to extract:
  *    - TagDef entries (tag name, DOM name, isVoid flag)
  *    - EventPropDef entries (event name, DOM event type)
  *    - AttrDef and ReflectedHtmlAttrDef entries (attribute name, value type)
  *
  * 2. '''Generation''': Produces Scala code using the project's AttributeModifier pattern:
  *    - Attributes become `type Href = AttributeModifier["href", String]`
  *    - Events become `type OnClick = AttributeModifier["onClick", js.Function1[dom.MouseEvent, Unit]]`
  *    - Tags become `inline def div(ms: HtmlModifiers.Modifier*) = buildinTagWithChildren("div", ms)`
  *
  * == Customization ==
  *
  * Special attributes not in scala-dom-types are manually defined in generateHtmlAttrs:
  *   - `Key` - React/Preact key for list reconciliation
  *   - `Cls` - Alias for class attribute with Opt[String] support
  *   - `Typ` - Alias for type attribute (reserved word in Scala)
  *
  * To add new special attributes, modify the generateHtmlAttrs function.
  */
object HtmlCodegen:

  // === Data Models ===

  case class TagDef(
      scalaName: String,
      domName: String,
      isVoid: Boolean
  )

  case class EventDef(
      scalaName: String,
      domName: String,
      eventType: String // e.g., "dom.MouseEvent"
  )

  case class AttrDef(
      scalaName: String,
      domAttrName: String,
      scalaValueType: String
  )

  // === Configuration ===

  val scalaDomTypesPath: Path =
    pwd / "tmp" / "scala-dom-types" / "shared" / "src" / "main" / "scala" / "com" / "raquo" / "domtypes" / "defs"

  val outputPath: Path = pwd / "src" / "scala" / "preact" / "html"

  // === Parsers ===

  def parseTagDefs(content: String): List[TagDef] =
    // Match TagDef with HtmlTagType only
    val pattern =
      """TagDef\(\s*tagType\s*=\s*HtmlTagType,\s*scalaName\s*=\s*"([^"]+)",(?:\s*scalaAliases\s*=\s*[^,]+,)?\s*domName\s*=\s*"([^"]+)",\s*isVoid\s*=\s*(true|false)""".r

    pattern
      .findAllMatchIn(content)
      .map { m =>
        TagDef(
          scalaName = m.group(1),
          domName = m.group(2),
          isVoid = m.group(3) == "true"
        )
      }
      .toList

  def parseEventDefs(content: String): List[EventDef] =
    // Match EventPropDef
    val pattern =
      """EventPropDef\(\s*scalaName\s*=\s*"([^"]+)",(?:\s*scalaAliases\s*=\s*[^,]+,)?\s*domName\s*=\s*"([^"]+)",\s*scalaJsEventType\s*=\s*"([^"]+)"""".r

    pattern
      .findAllMatchIn(content)
      .map { m =>
        EventDef(
          scalaName = m.group(1),
          domName = m.group(2),
          eventType = m.group(3)
        )
      }
      .toList

  def parseReflectedAttrDefs(content: String): List[AttrDef] =
    // Match ReflectedHtmlAttrDef
    val pattern =
      """ReflectedHtmlAttrDef\(\s*scalaName\s*=\s*"([^"]+)",\s*domAttrName\s*=\s*"([^"]+)",\s*domPropName\s*=\s*"[^"]+",\s*scalaValueType\s*=\s*"([^"]+)"""".r

    pattern
      .findAllMatchIn(content)
      .map { m =>
        AttrDef(
          scalaName = m.group(1),
          domAttrName = m.group(2),
          scalaValueType = m.group(3)
        )
      }
      .toList

  def parseAttrDefs(content: String): List[AttrDef] =
    // Match AttrDef (from GlobalAttrDefs and HtmlAttrDefs)
    // Note: scalaName can be quoted with backticks like `type`
    val pattern =
      """AttrDef\(\s*tagType\s*=\s*\w+,\s*scalaName\s*=\s*(?:"|`)([^"`]+)(?:"|`),[^)]*?domName\s*=\s*"([^"]+)",[^)]*?scalaValueType\s*=\s*"([^"]+)"""".r

    pattern
      .findAllMatchIn(content)
      .map { m =>
        AttrDef(
          scalaName = m.group(1),
          domAttrName = m.group(2),
          scalaValueType = m.group(3)
        )
      }
      .toList

  // === File Collection ===

  def collectTags(): List[TagDef] =
    val tagFiles = List(
      "GroupingTagDefs.scala",
      "TextTagDefs.scala",
      "FormTagDefs.scala",
      "SectionTagDefs.scala",
      "TableTagDefs.scala",
      "EmbedTagDefs.scala",
      "DocumentTagDefs.scala",
      "MiscTagDefs.scala"
    )

    tagFiles.flatMap { fileName =>
      val path = scalaDomTypesPath / "tags" / fileName
      if os.exists(path) then
        val content = os.read(path)
        parseTagDefs(content)
      else
        println(s"Warning: $path not found")
        Nil
    }

  def collectEvents(): List[EventDef] =
    val eventFiles = List(
      "MouseEventPropDefs.scala",
      "KeyboardEventPropDefs.scala",
      "FormEventPropDefs.scala",
      "ClipboardEventPropDefs.scala",
      "TouchEventPropDefs.scala",
      "PointerEventPropDefs.scala",
      "AnimationEventPropDefs.scala",
      "MediaEventPropDefs.scala",
      "MiscellaneousEventPropDefs.scala",
      "ErrorEventPropDefs.scala"
    )

    eventFiles.flatMap { fileName =>
      val path = scalaDomTypesPath / "eventProps" / fileName
      if os.exists(path) then
        val content = os.read(path)
        parseEventDefs(content)
      else
        println(s"Warning: $path not found")
        Nil
    }

  def collectAttrs(): List[AttrDef] =
    // Collect from multiple sources
    val reflectedPath = scalaDomTypesPath / "reflectedAttrs" / "ReflectedHtmlAttrDefs.scala"
    val globalPath = scalaDomTypesPath / "attrs" / "GlobalAttrDefs.scala"
    val htmlAttrPath = scalaDomTypesPath / "attrs" / "HtmlAttrDefs.scala"

    val reflectedAttrs =
      if os.exists(reflectedPath) then
        parseReflectedAttrDefs(os.read(reflectedPath))
      else
        println(s"Warning: $reflectedPath not found")
        Nil

    val globalAttrs =
      if os.exists(globalPath) then
        parseAttrDefs(os.read(globalPath))
      else
        println(s"Warning: $globalPath not found")
        Nil

    val htmlAttrs =
      if os.exists(htmlAttrPath) then
        parseAttrDefs(os.read(htmlAttrPath))
      else
        println(s"Warning: $htmlAttrPath not found")
        Nil

    // Combine all, deduplicating by domAttrName
    (reflectedAttrs ++ globalAttrs ++ htmlAttrs)
      .groupBy(_.domAttrName)
      .map(_._2.head)
      .toList
      .sortBy(_.scalaName)

  // === Code Generation Helpers ===

  // Scala reserved words that cannot be used as method names
  val scalaReservedWords: Set[String] = Set(
    "abstract", "case", "catch", "class", "def", "do", "else", "extends",
    "false", "final", "finally", "for", "forSome", "if", "implicit", "import",
    "lazy", "match", "new", "null", "object", "override", "package", "private",
    "protected", "return", "sealed", "super", "this", "throw", "trait", "true",
    "try", "type", "val", "var", "while", "with", "yield"
  )

  def capitalize(s: String): String =
    if s.isEmpty then s
    else s.head.toUpper + s.tail

  // Strip "Tag" suffix unless the result would be a Scala reserved word
  def normalizeTagName(scalaName: String): String =
    if scalaName.endsWith("Tag") then
      val stripped = scalaName.dropRight(3)
      if scalaReservedWords.contains(stripped) then scalaName
      else stripped
    else scalaName

  def mapValueType(scalaValueType: String): String =
    scalaValueType match
      case "String"  => "String"
      case "Boolean" => "Boolean"
      case "Int"     => "Int"
      case "Double"  => "Double"
      case other     => other

  def mapEventType(eventType: String): String =
    // eventType comes as "dom.MouseEvent", we need the full type for js.Function1
    eventType

  // === Code Generators ===

  def generateHtmlAttrs(attrs: List[AttrDef]): String =
    val attrTypes = attrs
      .map { attr =>
        val typeName = capitalize(attr.scalaName)
        val valueType = mapValueType(attr.scalaValueType)
        s"""  type $typeName = AttributeModifier["${attr.domAttrName}", $valueType]"""
      }
      .mkString("\n")

    s"""package preact.html
       |
       |import preact.component.AttributeModifier
       |import preact.js_helpers.*
       |
       |// DO NOT EDIT - Generated from scala-dom-types
       |// See codegen/HtmlCodegen.scala
       |
       |object HtmlAttrs:
       |  // Special attributes (manually defined, not in scala-dom-types)
       |  type Key = AttributeModifier["key", String]
       |  type Cls = AttributeModifier["cls", Opt[String]]
       |  type Typ = AttributeModifier["type", String]  // `type` is a reserved word in Scala
       |  type Rel = AttributeModifier["rel", String]   // Link relationship type
       |
       |  // Generated reflected HTML attributes
       |$attrTypes
       |""".stripMargin

  def generateHtmlEvents(events: List[EventDef]): String =
    val eventTypes = events
      .map { event =>
        val typeName = capitalize(event.scalaName)
        val eventType = mapEventType(event.eventType)
        s"""  type $typeName = AttributeModifier["${event.scalaName}", js.Function1[$eventType, Unit]]"""
      }
      .mkString("\n")

    s"""package preact.html
       |
       |import org.scalajs.dom
       |import preact.component.AttributeModifier
       |import scala.scalajs.js
       |
       |// DO NOT EDIT - Generated from scala-dom-types
       |// See codegen/HtmlCodegen.scala
       |
       |object HtmlEvents:
       |$eventTypes
       |""".stripMargin

  def generateHtmlModifiers(
      attrs: List[AttrDef],
      events: List[EventDef]
  ): String =
    val attrRefs = attrs.map(a => s"HtmlAttrs.${capitalize(a.scalaName)}")
    val eventRefs = events.map(e => s"HtmlEvents.${capitalize(e.scalaName)}")

    // Build union type with special attrs first
    val allTypes =
      List("HtmlAttrs.Key", "HtmlAttrs.Cls", "HtmlAttrs.Typ", "HtmlAttrs.Rel") ++ attrRefs ++ eventRefs ++ List(
        "ChildModifier"
      )
    val unionType = allTypes.mkString(" |\n    ")

    s"""package preact.html
       |
       |import preact.component.ChildModifier
       |
       |// DO NOT EDIT - Generated from scala-dom-types
       |// See codegen/HtmlCodegen.scala
       |
       |object HtmlModifiers:
       |  type Modifier =
       |    $unionType
       |""".stripMargin

  def generateHtmlTags(tags: List[TagDef]): String =
    val tagDefs = tags
      .map { tag =>
        val builderFn =
          if tag.isVoid then "buildinTag" else "buildinTagWithChildren"
        val methodName = normalizeTagName(tag.scalaName)
        s"""  inline def $methodName(ms: HtmlModifiers.Modifier*) = $builderFn("${tag.domName}", ms)"""
      }
      .mkString("\n")

    s"""package preact.html
       |
       |import preact.bindings.*
       |import preact.component.*
       |import preact.js_helpers.*
       |import scala.scalajs.js
       |
       |// DO NOT EDIT - Generated from scala-dom-types
       |// See codegen/HtmlCodegen.scala
       |
       |object HtmlTags:
       |  // Tag builder for void elements (no children)
       |  private def buildinTag(
       |      tag: String,
       |      modifiers: Seq[HtmlModifiers.Modifier]
       |  ): VNode =
       |    var jsAttribs = js.Dynamic.literal()
       |    modifiers.foreach:
       |      case am: AttributeModifier[?, ?] =>
       |        if am.key == "cls" then
       |          if am.value != js.undefined && am.value != "" then
       |            val existing = jsAttribs.selectDynamic("class")
       |            val newValue =
       |              if existing != js.undefined then s"$$existing $${am.value}"
       |              else am.value
       |            jsAttribs.updateDynamic("class")(newValue.asInstanceOf[js.Any])
       |        else am(jsAttribs)
       |      case _: ChildModifier =>
       |        () // Void elements don't have children, ignore
       |    h(tag, jsAttribs, js.undefined)
       |
       |  // Tag builder for elements with children
       |  private def buildinTagWithChildren(
       |      tag: String,
       |      modifiers: Seq[HtmlModifiers.Modifier]
       |  ): VNode =
       |    var jsAttribs = js.Dynamic.literal()
       |    var childrenArray = js.Array[Child]()
       |
       |    modifiers.foreach:
       |      case am: AttributeModifier[?, ?] =>
       |        if am.key == "cls" then
       |          if am.value != js.undefined && am.value != "" then
       |            val existing = jsAttribs.selectDynamic("class")
       |            val newValue =
       |              if existing != js.undefined then s"$$existing $${am.value}"
       |              else am.value
       |            jsAttribs.updateDynamic("class")(newValue.asInstanceOf[js.Any])
       |        else am(jsAttribs)
       |      case cm: ChildModifier =>
       |        cm(childrenArray)
       |
       |    h(tag, jsAttribs, childrenArray)
       |
       |  // Generated tag functions
       |$tagDefs
       |""".stripMargin

  // === Main ===

  def main(args: Array[String]): Unit =
    println("Parsing scala-dom-types definitions...")

    val tags = collectTags()
    val events = collectEvents()
    val attrs = collectAttrs()

    println(s"Found ${tags.size} tags, ${events.size} events, ${attrs.size} attributes")

    println("Generating code...")

    os.makeDir.all(outputPath)

    os.write.over(outputPath / "HtmlAttrs.scala", generateHtmlAttrs(attrs))
    println(s"  Generated HtmlAttrs.scala")

    os.write.over(outputPath / "HtmlEvents.scala", generateHtmlEvents(events))
    println(s"  Generated HtmlEvents.scala")

    os.write.over(
      outputPath / "HtmlModifiers.scala",
      generateHtmlModifiers(attrs, events)
    )
    println(s"  Generated HtmlModifiers.scala")

    os.write.over(outputPath / "HtmlTags.scala", generateHtmlTags(tags))
    println(s"  Generated HtmlTags.scala")

    println("Done!")
