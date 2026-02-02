package preact

import preact.bindings.VNode

import scala.deriving.Mirror

trait ComponentTest1[Self]:
  /** The modifier type for this component */
  type Modifier

  /** Apply a single modifier to create a modified instance */
  def apply(self: Self)(modifier: Modifier): Self

object ComponentTest1:
  inline def derived[T](using m: Mirror.ProductOf[T]): ComponentTest1[T] =
    ${ ComponentMacro.derivedImpl[T] }

  /** Helper trait for case classes to extend */
  trait Derived[Self]:
    def render: VNode

  /** Helper to apply modifiers and build instance */
  extension [T](comp: ComponentTest1[T])
    def applyAll[M](initial: T, modifiers: Seq[M]): T =
      modifiers
        .foldLeft(initial)((acc, m) =>
          comp.apply(acc)(m.asInstanceOf[comp.Modifier])
        )
