package preact

import scala.deriving.Mirror

trait Component[Self]:
  /** The modifier type for this component */
  type Modifier

  /** Apply a single modifier to create a modified instance */
  def apply(self: Self)(modifier: Modifier): Self

object Component:
  inline def derived[T](using m: Mirror.ProductOf[T]): Component[T] =
    ${ ComponentMacro.derivedImpl[T] }

  /** Helper trait for case classes to extend */
  trait Derived[Self]
