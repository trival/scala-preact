package preact.bindings

import scala.scalajs.js

/** Minimal HTML element definitions for proof of concept.
  *
  * In POC, elements are simple functions that accept modifiers and return
  * VNodes. This avoids the case class constructor collision issue.
  *
  * In full implementation, the macro would generate proper element companions
  * that handle both the case class and modifier syntax.
  */

// ===== Element Functions =====

object div:
  def apply(modifiers: Modifier*): VNode =
    val builder = ElementBuilder()
    builder.addModifiers(modifiers)
    builder.build("div")

object span:
  def apply(modifiers: Modifier*): VNode =
    val builder = ElementBuilder()
    builder.addModifiers(modifiers)
    builder.build("span")

object button:
  def apply(modifiers: Modifier*): VNode =
    val builder = ElementBuilder()
    builder.addModifiers(modifiers)
    builder.build("button")
