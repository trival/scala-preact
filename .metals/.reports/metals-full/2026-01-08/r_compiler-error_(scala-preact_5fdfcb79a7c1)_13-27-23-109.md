error id: 1A4D2B76822046EC79922F0EB5084066
file://<WORKSPACE>/src/main/scala/preact/bindings/Builder.scala
### java.lang.AssertionError: assertion failed

occurred in the presentation compiler.



action parameters:
uri: file://<WORKSPACE>/src/main/scala/preact/bindings/Builder.scala
text:
```scala
package preact.bindings

import scala.scalajs.js
import scala.collection.mutable

// Builder that accumulates modifiers into props and children
class ElementBuilder:
  private val props = js.Dynamic.literal()
  private val childrenBuffer = mutable.ArrayBuffer[Child]()

  def addModifier(mod: Modifier): Unit = mod match
    case PropModifier(key, value) =>
      props.updateDynamic(key)(value.asInstanceOf[js.Any])

    case ChildModifier(child) =>
      childrenBuffer += child

    case EmptyModifier =>
      // Do nothing

  def addModifiers(mods: Seq[Modifier]): Unit =
    mods.foreach(addModifier)

  def build(tag: String): VNode =
    // Only pass props if there are any
    val jsProps = if hasProps then props.asInstanceOf[js.Object] else js.undefined
    h(tag, jsProps, childrenBuffer.toSeq*)

  private def hasProps: Boolean =
    // Check if props object has any own properties
    js.Object.keys(props.asInstanceOf[js.Object]).length > 0

```


presentation compiler configuration:
Scala version: 3.8.0-RC5-bin-nonbootstrapped
Classpath:
<WORKSPACE>/.scala-build/scala-preact_dfcb79a7c1/classes/main [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-js/scalajs-library_2.13/1.20.2/scalajs-library_2.13-1.20.2.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala3-library_sjs1_3/3.8.0-RC5/scala3-library_sjs1_3-3.8.0-RC5.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-js/scalajs-dom_sjs1_3/2.8.0/scalajs-dom_sjs1_3-2.8.0.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala-library/3.8.0-RC5/scala-library-3.8.0-RC5.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-js/scalajs-javalib/1.20.2/scalajs-javalib-1.20.2.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-js/scalajs-scalalib_2.13/3.8.0-RC5/scalajs-scalalib_2.13-3.8.0-RC5.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala3-library_3/3.8.0-RC5/scala3-library_3-3.8.0-RC5.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/com/sourcegraph/semanticdb-javac/0.10.0/semanticdb-javac-0.10.0.jar [exists ], <WORKSPACE>/.scala-build/scala-preact_dfcb79a7c1/classes/main/META-INF/best-effort [missing ]
Options:
-Xsemanticdb -sourceroot <WORKSPACE> -scalajs -Ywith-best-effort-tasty




#### Error stacktrace:

```
scala.runtime.Scala3RunTime$.assertFailed(Scala3RunTime.scala:13)
	dotty.tools.dotc.core.TypeOps$.dominators$1(TypeOps.scala:248)
	dotty.tools.dotc.core.TypeOps$.approximateOr$1(TypeOps.scala:392)
	dotty.tools.dotc.core.TypeOps$.orDominator(TypeOps.scala:410)
	dotty.tools.dotc.core.Types$OrType.join(Types.scala:3675)
	dotty.tools.dotc.core.Types$OrType.widenUnionWithoutNull(Types.scala:3691)
	dotty.tools.dotc.core.Types$Type.widenUnion(Types.scala:1462)
	dotty.tools.dotc.core.ConstraintHandling.widenOr$1(ConstraintHandling.scala:676)
	dotty.tools.dotc.core.ConstraintHandling.widenInferred(ConstraintHandling.scala:697)
	dotty.tools.dotc.core.ConstraintHandling.widenInferred$(ConstraintHandling.scala:29)
	dotty.tools.dotc.core.TypeComparer.widenInferred(TypeComparer.scala:33)
	dotty.tools.dotc.core.TypeComparer$.widenInferred(TypeComparer.scala:3520)
	dotty.tools.dotc.typer.Namer.rhsType$1(Namer.scala:2224)
	dotty.tools.dotc.typer.Namer.cookedRhsType$1(Namer.scala:2230)
	dotty.tools.dotc.typer.Namer.lhsType$1(Namer.scala:2231)
	dotty.tools.dotc.typer.Namer.inferredResultType(Namer.scala:2243)
	dotty.tools.dotc.typer.Namer.inferredType$1(Namer.scala:1853)
	dotty.tools.dotc.typer.Namer.valOrDefDefSig(Namer.scala:1859)
	dotty.tools.dotc.typer.Namer$Completer.typeSig(Namer.scala:837)
	dotty.tools.dotc.typer.Namer$Completer.completeInCreationContext(Namer.scala:1005)
	dotty.tools.dotc.typer.Namer$Completer.complete(Namer.scala:874)
	dotty.tools.dotc.core.SymDenotations$SymDenotation.completeFrom(SymDenotations.scala:175)
	dotty.tools.dotc.core.Denotations$Denotation.completeInfo$1(Denotations.scala:190)
	dotty.tools.dotc.core.Denotations$Denotation.info(Denotations.scala:192)
	dotty.tools.dotc.core.SymDenotations$SymDenotation.ensureCompleted(SymDenotations.scala:403)
	dotty.tools.dotc.typer.Typer.retrieveSym(Typer.scala:3658)
	dotty.tools.dotc.typer.Typer.typedNamed$1(Typer.scala:3683)
	dotty.tools.dotc.typer.Typer.typedUnadapted(Typer.scala:3804)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3892)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3897)
	dotty.tools.dotc.typer.Typer.traverse$1(Typer.scala:3919)
	dotty.tools.dotc.typer.Typer.typedStats(Typer.scala:3965)
	dotty.tools.dotc.typer.Typer.typedBlockStats(Typer.scala:1534)
	dotty.tools.dotc.typer.Typer.typedBlock(Typer.scala:1538)
	dotty.tools.dotc.typer.Typer.typedUnnamed$1(Typer.scala:3719)
	dotty.tools.dotc.typer.Typer.typedUnadapted(Typer.scala:3805)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3892)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3897)
	dotty.tools.dotc.typer.Typer.typedExpr(Typer.scala:4008)
	dotty.tools.dotc.typer.Typer.$anonfun$67(Typer.scala:3058)
	dotty.tools.dotc.inlines.PrepareInlineable$.dropInlineIfError(PrepareInlineable.scala:256)
	dotty.tools.dotc.typer.Typer.typedDefDef(Typer.scala:3058)
	dotty.tools.dotc.typer.Typer.typedNamed$1(Typer.scala:3693)
	dotty.tools.dotc.typer.Typer.typedUnadapted(Typer.scala:3804)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3892)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3897)
	dotty.tools.dotc.typer.Typer.traverse$1(Typer.scala:3919)
	dotty.tools.dotc.typer.Typer.typedStats(Typer.scala:3965)
	dotty.tools.dotc.typer.Typer.typedClassDef(Typer.scala:3360)
	dotty.tools.dotc.typer.Typer.typedTypeOrClassDef$1(Typer.scala:3699)
	dotty.tools.dotc.typer.Typer.typedNamed$1(Typer.scala:3703)
	dotty.tools.dotc.typer.Typer.typedUnadapted(Typer.scala:3804)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3892)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3897)
	dotty.tools.dotc.typer.Typer.traverse$1(Typer.scala:3919)
	dotty.tools.dotc.typer.Typer.typedStats(Typer.scala:3965)
	dotty.tools.dotc.typer.Typer.typedPackageDef(Typer.scala:3495)
	dotty.tools.dotc.typer.Typer.typedUnnamed$1(Typer.scala:3745)
	dotty.tools.dotc.typer.Typer.typedUnadapted(Typer.scala:3805)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3892)
	dotty.tools.dotc.typer.Typer.typed(Typer.scala:3897)
	dotty.tools.dotc.typer.Typer.typedExpr(Typer.scala:4008)
	dotty.tools.dotc.typer.TyperPhase.typeCheck$$anonfun$1(TyperPhase.scala:47)
	scala.runtime.function.JProcedure1.apply(JProcedure1.java:15)
	scala.runtime.function.JProcedure1.apply(JProcedure1.java:10)
	dotty.tools.dotc.core.Phases$Phase.monitor(Phases.scala:513)
	dotty.tools.dotc.typer.TyperPhase.typeCheck(TyperPhase.scala:53)
	dotty.tools.dotc.typer.TyperPhase.$anonfun$4(TyperPhase.scala:99)
	scala.collection.Iterator$$anon$6.hasNext(Iterator.scala:495)
	scala.collection.Iterator$$anon$9.hasNext(Iterator.scala:599)
	scala.collection.immutable.List.prependedAll(List.scala:156)
	scala.collection.immutable.List$.from(List.scala:682)
	scala.collection.immutable.List$.from(List.scala:682)
	scala.collection.IterableOps$WithFilter.map(Iterable.scala:911)
	dotty.tools.dotc.typer.TyperPhase.runOn(TyperPhase.scala:98)
	dotty.tools.dotc.Run.runPhases$1$$anonfun$1(Run.scala:380)
	scala.runtime.function.JProcedure1.apply(JProcedure1.java:15)
	scala.runtime.function.JProcedure1.apply(JProcedure1.java:10)
	scala.collection.ArrayOps$.foreach$extension(ArrayOps.scala:1327)
	dotty.tools.dotc.Run.runPhases$1(Run.scala:373)
	dotty.tools.dotc.Run.compileUnits$$anonfun$1$$anonfun$2(Run.scala:420)
	dotty.tools.dotc.Run.compileUnits$$anonfun$1$$anonfun$adapted$1(Run.scala:420)
	scala.Function0.apply$mcV$sp(Function0.scala:45)
	dotty.tools.dotc.Run.showProgress(Run.scala:482)
	dotty.tools.dotc.Run.compileUnits$$anonfun$1(Run.scala:420)
	dotty.tools.dotc.Run.compileUnits$$anonfun$adapted$1(Run.scala:432)
	dotty.tools.dotc.util.Stats$.maybeMonitored(Stats.scala:69)
	dotty.tools.dotc.Run.compileUnits(Run.scala:432)
	dotty.tools.dotc.Run.compileSources(Run.scala:319)
	dotty.tools.dotc.interactive.InteractiveDriver.run(InteractiveDriver.scala:165)
	dotty.tools.pc.CachingDriver.run(CachingDriver.scala:44)
	dotty.tools.pc.WithCompilationUnit.<init>(WithCompilationUnit.scala:31)
	dotty.tools.pc.SimpleCollector.<init>(PcCollector.scala:357)
	dotty.tools.pc.PcSemanticTokensProvider$Collector$.<init>(PcSemanticTokensProvider.scala:63)
	dotty.tools.pc.PcSemanticTokensProvider.Collector$lzyINIT1(PcSemanticTokensProvider.scala:63)
	dotty.tools.pc.PcSemanticTokensProvider.Collector(PcSemanticTokensProvider.scala:63)
	dotty.tools.pc.PcSemanticTokensProvider.provide(PcSemanticTokensProvider.scala:88)
	dotty.tools.pc.ScalaPresentationCompiler.semanticTokens$$anonfun$1(ScalaPresentationCompiler.scala:158)
	scala.meta.internal.pc.CompilerAccess.withSharedCompiler(CompilerAccess.scala:149)
	scala.meta.internal.pc.CompilerAccess.$anonfun$1(CompilerAccess.scala:93)
	scala.meta.internal.pc.CompilerAccess.onCompilerJobQueue$$anonfun$1(CompilerAccess.scala:210)
	scala.meta.internal.pc.CompilerJobQueue$Job.run(CompilerJobQueue.scala:153)
	java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1144)
	java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:642)
	java.base/java.lang.Thread.run(Thread.java:1583)
```
#### Short summary: 

java.lang.AssertionError: assertion failed