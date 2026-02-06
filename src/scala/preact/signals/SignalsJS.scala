package preact.signals

import scala.scalajs.js
import scala.scalajs.js.annotation.*

@js.native
trait PreactSignal[A] extends js.Object:
  var value: A = js.native

@js.native
trait PreactComputed[+A] extends js.Object:
  def value: A = js.native

@js.native
trait PreactEffectHandle extends js.Object:
  def dispose(): Unit = js.native

// Global variants
@js.native
@JSImport("@preact/signals", "signal")
def signal[A](initialValue: A): PreactSignal[A] = js.native

@js.native
@JSImport("@preact/signals", "computed")
def computed[A](fn: js.Function0[A]): PreactComputed[A] = js.native

@js.native
@JSImport("@preact/signals", "effect")
def effect(fn: js.Function0[Unit]): PreactEffectHandle = js.native

@js.native
@JSImport("@preact/signals", "batch")
def batch$js(fn: js.Function0[Unit]): Unit = js.native

// Hook variants (must be called during component render)
@js.native
@JSImport("@preact/signals", "useSignal")
def useSignal[A](initialValue: A): PreactSignal[A] = js.native

@js.native
@JSImport("@preact/signals", "useComputed")
def useComputed[A](fn: js.Function0[A]): PreactComputed[A] = js.native

@js.native
@JSImport("@preact/signals", "useSignalEffect")
def useSignalEffect(fn: js.Function0[Unit]): PreactEffectHandle = js.native
