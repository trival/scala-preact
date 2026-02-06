package preact.signals

import scala.scalajs.js

/** Public API for creating reactive variables.
  * Automatically dispatches to signal() or useSignal() based on runtime context.
  */
object Var:
  /** Create a reactive variable.
    * Uses signal() in global context, useSignal() in component context.
    * Context is determined dynamically at runtime.
    */
  def apply[A](initialValue: A): Var[A] =
    currentContext.value.createVar(initialValue)

  /** Create a memo (derived) reactive value.
    * Uses computed() in global context, useComputed() in component context.
    * Context is determined dynamically at runtime.
    */
  def memo[A](computation: => A): ReadVar[A] =
    currentContext.value.createMemo(computation)

  /** Create an effect that runs when dependencies change.
    * Uses effect() in global context, useSignalEffect() in component context.
    * Context is determined dynamically at runtime.
    */
  def effect(body: => Unit): EffectHandle =
    currentContext.value.createEffect(body)

  /** Batch multiple updates into one commit */
  def batch(updates: => Unit): Unit =
    batch$js(() => updates)

/** Read-only reactive variable (covariant) */
sealed trait ReadVar[+A]:
  /** Read the current value */
  def apply(): A

  /** Expose underlying signal for direct JS interop */
  def underlying: js.Any

  /** Map to create derived value */
  def map[B](f: A => B): ReadVar[B] =
    currentContext.value.createMemo(f(apply()))

/** Writable reactive variable */
final class Var[A](val underlying: Signal[A]) extends ReadVar[A]:
  /** Read the current value */
  def apply(): A = underlying.value

  /** Write a new value */
  def apply(value: A): Unit = underlying.value = value

  /** Update via function */
  def apply(f: A => A): Unit = underlying.value = f(underlying.value)

/** Computed (derived) reactive value - read-only */
final class Memo[A](val underlying: Computed[A]) extends ReadVar[A]:
  /** Read the current value */
  def apply(): A = underlying.value
