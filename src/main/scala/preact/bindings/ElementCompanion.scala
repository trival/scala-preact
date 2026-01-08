package preact.bindings

import scala.scalajs.js

/**
 * Base trait for HTML element companions.
 * Provides modifier-based apply method and prop modifiers.
 *
 * Note: In a full implementation, this would use Scala 3 macros to:
 * 1. Extract case class fields
 * 2. Generate prop modifier objects (e.g., div.children := ...)
 * 3. Build case class instance from modifiers
 * 4. Call render method
 *
 * For this minimal POC, we use a simplified manual approach.
 */
trait ElementCompanion[T]:
  /**
   * Tag name for this element (e.g., "div", "span", "button")
   * Must be implemented by concrete companions
   */
  def tagName: String

  /**
   * Build element from case class instance
   * Must be implemented to call h() with proper props
   */
  def buildVNode(instance: T): VNode

  /**
   * Apply method that accepts modifiers
   * This is what makes div(...) syntax work
   */
  def apply(modifiers: Modifier*): VNode =
    val builder = ElementBuilder()
    builder.addModifiers(modifiers)
    builder.build(tagName)

/**
 * Simplified element companion for elements with only children
 */
abstract class SimpleElementCompanion[T](val tagName: String) extends ElementCompanion[T]:
  def buildVNode(instance: T): VNode =
    // For POC, just use the builder approach
    // In full implementation, would extract fields from instance
    h(tagName, js.undefined)

/**
 * Helper for creating prop modifiers
 * In full implementation, these would be generated per element
 */
object PropModifiers:
  // Generic prop setter (like Laminar's :=)
  extension (key: String)
    inline infix def :=(value: Any): Modifier = PropModifier(key, value)

  // Disabled attribute for buttons/inputs
  inline def disabled(value: Boolean): Modifier = PropModifier("disabled", value)

  // onClick event handler
  inline def onClick(handler: js.Function1[js.Any, Unit]): Modifier =
    PropModifier("onClick", handler)
