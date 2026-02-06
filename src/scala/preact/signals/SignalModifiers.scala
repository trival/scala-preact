package preact.signals

import preact.component.ChildModifier
import preact.bindings.{Child, VNode}

/** Integration with the HTML DSL modifier system.
  *
  * Allows using signals directly in HTML templates. Preact will automatically
  * track signal access and update the DOM when signals change.
  */

// Convert signals to child modifiers - allows using signals directly as children
given stringVarToChild: Conversion[ReadVar[String], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given intVarToChild: Conversion[ReadVar[Int], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given doubleVarToChild: Conversion[ReadVar[Double], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])

given vnodeVarToChild: Conversion[ReadVar[VNode], ChildModifier] =
  signal => ChildModifier(signal.underlying.asInstanceOf[Child])
