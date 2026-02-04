package test

import scala.quoted.*

object FieldBuilder:
  def buildImpl[K <: String & Singleton: Type, V: Type](
      key: Expr[K],
      value: Expr[V]
  )(using Quotes): Expr[Field[K, V]] =
    '{ new Field[K, V]($key, $value) }
