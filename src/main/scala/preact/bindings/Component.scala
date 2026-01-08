package preact.bindings

import scala.scalajs.js

/**
 * Base trait for component companions.
 * Similar to ElementCompanion but for custom components.
 *
 * Note: In full implementation, this would use macros for derivation.
 * For POC, we provide a manual helper.
 */
trait ComponentCompanion[T]:
  /**
   * Build VNode from component instance
   * The instance should have a render method
   */
  def buildVNode(instance: T): VNode

  /**
   * Apply method accepting modifiers
   * Builds component instance from modifiers and calls render
   */
  def apply(modifiers: Modifier*): VNode

/**
 * Helper for creating simple components manually.
 * In full implementation, this would be macro-generated.
 */
abstract class SimpleComponentCompanion[T](
  create: Children => T,
  render: T => VNode
) extends ComponentCompanion[T]:

  def buildVNode(instance: T): VNode = render(instance)

  def apply(modifiers: Modifier*): VNode =
    // Extract children from modifiers
    val children = modifiers.collect:
      case ChildModifier(child) => child
    .toSeq

    // Create instance and render
    val instance = create(Children(children*))
    render(instance)
