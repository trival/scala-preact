'use strict';
import * as $i_preact from "preact";
var $p;
var $fileLevelThis = this;
var $L0;
function $Char(c) {
  this.c = c;
}
$p = $Char.prototype;
$p.toString = (function() {
  return String.fromCharCode(this.c);
});
function $noIsInstance(arg0) {
  throw new TypeError("Cannot call isInstance() on a Class representing a JS trait/object");
}
function $objectClone(arg0) {
  return Object.create(Object.getPrototypeOf(arg0), Object.getOwnPropertyDescriptors(arg0));
}
function $objectOrArrayClone(arg0) {
  return (arg0.$classData.Z ? arg0.v() : $objectClone(arg0));
}
function $objectClassName(arg0) {
  switch ((typeof arg0)) {
    case "string": {
      return "java.lang.String";
    }
    case "number": {
      if ($isInt(arg0)) {
        if ((((arg0 << 24) >> 24) === arg0)) {
          return "java.lang.Byte";
        } else if ((((arg0 << 16) >> 16) === arg0)) {
          return "java.lang.Short";
        } else {
          return "java.lang.Integer";
        }
      } else if ($isFloat(arg0)) {
        return "java.lang.Float";
      } else {
        return "java.lang.Double";
      }
    }
    case "boolean": {
      return "java.lang.Boolean";
    }
    case "undefined": {
      return "java.lang.Void";
    }
    default: {
      if ((arg0 instanceof $c_RTLong)) {
        return "java.lang.Long";
      } else if ((arg0 instanceof $Char)) {
        return "java.lang.Character";
      } else if ((!(!(arg0 && arg0.$classData)))) {
        return arg0.$classData.N;
      } else {
        return null.bl();
      }
    }
  }
}
function $dp_hashCode__I(instance) {
  switch ((typeof instance)) {
    case "string": {
      return $f_T__hashCode__I(instance);
    }
    case "number": {
      return $f_jl_Double__hashCode__I(instance);
    }
    case "boolean": {
      return $f_jl_Boolean__hashCode__I(instance);
    }
    case "undefined": {
      return $f_jl_Void__hashCode__I(instance);
    }
    default: {
      if (((!(!(instance && instance.$classData))) || (instance === null))) {
        return instance.n();
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__hashCode__I(instance);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__hashCode__I($uC(instance));
      } else {
        return $c_O.prototype.n.call(instance);
      }
    }
  }
}
function $dp_toString__T(instance) {
  return ((instance === (void 0)) ? "undefined" : instance.toString());
}
function $checkIntDivisor(arg0) {
  if ((arg0 === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  } else {
    return arg0;
  }
}
function $doubleToInt(arg0) {
  return ((arg0 > 2147483647) ? 2147483647 : ((arg0 < (-2147483648)) ? (-2147483648) : (arg0 | 0)));
}
function $cToS(arg0) {
  return String.fromCharCode(arg0);
}
var $fpBitsDataView = new DataView(new ArrayBuffer(8));
function $floatToBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setFloat32(0, arg0, true);
  return dataView.getInt32(0, true);
}
function $floatFromBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setInt32(0, arg0, true);
  return dataView.getFloat32(0, true);
}
function $doubleToBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__fromDoubleBits__D__O__RTLong(arg0, dataView);
}
function $doubleFromBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__bitsToDouble__RTLong__O__D(arg0, dataView);
}
function $resolveSuperRef(arg0, arg1) {
  var getPrototypeOf = Object.getPrototyeOf;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var superProto = arg0.prototype;
  while ((superProto !== null)) {
    var desc = getOwnPropertyDescriptor(superProto, arg1);
    if ((desc !== (void 0))) {
      return desc;
    }
    superProto = getPrototypeOf(superProto);
  }
}
function $superGet(arg0, arg1, arg2) {
  var desc = $resolveSuperRef(arg0, arg2);
  if ((desc !== (void 0))) {
    var getter = desc.get;
    return ((getter !== (void 0)) ? getter.call(arg1) : getter.value);
  }
}
function $superSet(arg0, arg1, arg2, arg3) {
  var desc = $resolveSuperRef(arg0, arg2);
  if ((desc !== (void 0))) {
    var setter = desc.set;
    if ((setter !== (void 0))) {
      setter.call(arg1, arg3);
      return (void 0);
    }
  }
  throw new TypeError((("super has no setter '" + arg2) + "'."));
}
function $arraycopyGeneric(arg0, arg1, arg2, arg3, arg4) {
  if ((((arg0 !== arg2) || (arg3 < arg1)) || (((arg1 + arg4) | 0) < arg3))) {
    for (var i = 0; (i < arg4); i = ((i + 1) | 0)) {
      arg2[((arg3 + i) | 0)] = arg0[((arg1 + i) | 0)];
    }
  } else {
    for (var i = ((arg4 - 1) | 0); (i >= 0); i = ((i - 1) | 0)) {
      arg2[((arg3 + i) | 0)] = arg0[((arg1 + i) | 0)];
    }
  }
}
var $lastIDHash = 0;
var $idHashCodeMap = new WeakMap();
function $systemIdentityHashCode(obj) {
  switch ((typeof obj)) {
    case "string": {
      return $f_T__hashCode__I(obj);
    }
    case "number": {
      return $f_jl_Double__hashCode__I(obj);
    }
    case "bigint": {
      var biHash = 0;
      if ((obj < BigInt(0))) {
        obj = (~obj);
      }
      while ((obj !== BigInt(0))) {
        biHash = (biHash ^ Number(BigInt.asIntN(32, obj)));
        obj = (obj >> BigInt(32));
      }
      return biHash;
    }
    case "boolean": {
      return (obj ? 1231 : 1237);
    }
    case "undefined": {
      return 0;
    }
    case "symbol": {
      var description = obj.description;
      return ((description === (void 0)) ? 0 : $f_T__hashCode__I(description));
    }
    default: {
      if ((obj === null)) {
        return 0;
      } else {
        var hash = $idHashCodeMap.get(obj);
        if ((hash === (void 0))) {
          hash = (($lastIDHash + 1) | 0);
          $lastIDHash = hash;
          $idHashCodeMap.set(obj, hash);
        }
        return hash;
      }
    }
  }
}
function $isByte(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 24) >> 24) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isShort(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 16) >> 16) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isInt(arg0) {
  return ((((typeof arg0) === "number") && ((arg0 | 0) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isFloat(arg0) {
  return (((typeof arg0) === "number") && ((arg0 !== arg0) || (Math.fround(arg0) === arg0)));
}
function $bC(arg0) {
  return new $Char(arg0);
}
var $bC0 = $bC(0);
function $uC(arg0) {
  return ((arg0 === null) ? 0 : arg0.c);
}
function $uJ(arg0) {
  return ((arg0 === null) ? $L0 : arg0);
}
/** @constructor */
function $c_O() {
}
$p = $c_O.prototype;
$p.constructor = $c_O;
/** @constructor */
function $h_O() {
}
$h_O.prototype = $p;
$p.n = (function() {
  return $systemIdentityHashCode(this);
});
$p.k = (function() {
  var i = this.n();
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.toString = (function() {
  return this.k();
});
function $ac_O(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = null;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_O.prototype = new $h_O();
$p.constructor = $ac_O;
$p.x = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.v = (function() {
  return new $ac_O(this.a.slice());
});
function $ah_O() {
}
$ah_O.prototype = $p;
function $ac_Z(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = false;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_Z.prototype = new $h_O();
$p.constructor = $ac_Z;
$p.x = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.v = (function() {
  return new $ac_Z(this.a.slice());
});
function $ac_C(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Uint16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_C.prototype = new $h_O();
$p.constructor = $ac_C;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_C(this.a.slice());
});
function $ac_B(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int8Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_B.prototype = new $h_O();
$p.constructor = $ac_B;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_B(this.a.slice());
});
function $ac_S(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_S.prototype = new $h_O();
$p.constructor = $ac_S;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_S(this.a.slice());
});
function $ac_I(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_I.prototype = new $h_O();
$p.constructor = $ac_I;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_I(this.a.slice());
});
function $ac_J(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = $L0;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_J.prototype = new $h_O();
$p.constructor = $ac_J;
$p.x = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.v = (function() {
  return new $ac_J(this.a.slice());
});
function $ac_F(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Float32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_F.prototype = new $h_O();
$p.constructor = $ac_F;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_F(this.a.slice());
});
function $ac_D(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Float64Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_D.prototype = new $h_O();
$p.constructor = $ac_D;
$p.x = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.v = (function() {
  return new $ac_D(this.a.slice());
});
function $TypeData() {
  this.C = (void 0);
  this.n = null;
  this.O = null;
  this.B = null;
  this.D = 0;
  this.z = null;
  this.E = "";
  this.L = (void 0);
  this.A = (void 0);
  this.F = (void 0);
  this.w = (void 0);
  this.J = false;
  this.N = "";
  this.X = false;
  this.Y = false;
  this.Z = false;
  this.I = (void 0);
}
$p = $TypeData.prototype;
$p.p = (function(zero, arrayEncodedName, displayName, arrayClass, typedArrayClass) {
  this.n = ({});
  this.z = zero;
  this.E = arrayEncodedName;
  var self = this;
  this.F = ((that) => (that === self));
  this.N = displayName;
  this.X = true;
  this.I = ((obj) => false);
  if ((arrayClass !== (void 0))) {
    this.A = new $TypeData().y(this, arrayClass, typedArrayClass);
  }
  return this;
});
$p.i = (function(kindOrCtor, fullName, ancestors, isInstance) {
  var internalName = Object.getOwnPropertyNames(ancestors)[0];
  this.n = ancestors;
  this.E = (("L" + fullName) + ";");
  this.F = ((that) => (!(!that.n[internalName])));
  this.J = (kindOrCtor === 2);
  this.N = fullName;
  this.Y = (kindOrCtor === 1);
  this.I = (isInstance || ((obj) => (!(!((obj && obj.$classData) && obj.$classData.n[internalName])))));
  if (((typeof kindOrCtor) !== "number")) {
    kindOrCtor.prototype.$classData = this;
  }
  return this;
});
$p.y = (function(componentData, arrayClass, typedArrayClass, isAssignableFromFun) {
  arrayClass.prototype.$classData = this;
  var name = ("[" + componentData.E);
  this.C = arrayClass;
  this.n = ({
    G: 1,
    a: 1
  });
  this.O = componentData;
  this.B = componentData;
  this.D = 1;
  this.E = name;
  this.N = name;
  this.Z = true;
  var self = this;
  this.F = (isAssignableFromFun || ((that) => (self === that)));
  this.w = (typedArrayClass ? ((array) => new arrayClass(new typedArrayClass(array))) : ((array) => new arrayClass(array)));
  this.I = ((obj) => (obj instanceof arrayClass));
  return this;
});
$p.a = (function(componentData) {
  function ArrayClass(arg) {
    if (((typeof arg) === "number")) {
      this.a = new Array(arg);
      for (var i = 0; (i < arg); (i++)) {
        this.a[i] = null;
      }
    } else {
      this.a = arg;
    }
  }
  var $p = ArrayClass.prototype = new $ah_O();
  $p.constructor = ArrayClass;
  $p.x = (function(srcPos, dest, destPos, length) {
    $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
  });
  $p.v = (function() {
    return new ArrayClass(this.a.slice());
  });
  $p.$classData = this;
  var arrayBase = (componentData.B || componentData);
  var arrayDepth = (componentData.D + 1);
  var name = ("[" + componentData.E);
  this.C = ArrayClass;
  this.n = ({
    G: 1,
    a: 1
  });
  this.O = componentData;
  this.B = arrayBase;
  this.D = arrayDepth;
  this.E = name;
  this.N = name;
  this.Z = true;
  var isAssignableFromFun = ((that) => {
    var thatDepth = that.D;
    return ((thatDepth === arrayDepth) ? arrayBase.F(that.B) : ((thatDepth > arrayDepth) && (arrayBase === $d_O)));
  });
  this.F = isAssignableFromFun;
  this.w = ((array) => new ArrayClass(array));
  var self = this;
  this.I = ((obj) => {
    var data = (obj && obj.$classData);
    return ((!(!data)) && ((data === self) || isAssignableFromFun(data)));
  });
  return this;
});
$p.r = (function() {
  if ((!this.A)) {
    this.A = new $TypeData().a(this);
  }
  return this.A;
});
function $isArrayOf_O(obj, depth) {
  var data = (obj && obj.$classData);
  if ((!data)) {
    return false;
  } else {
    var arrayDepth = data.D;
    return ((arrayDepth === depth) ? (!data.B.X) : (arrayDepth > depth));
  }
}
function $isArrayOf_Z(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_Z))));
}
function $isArrayOf_C(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_C))));
}
function $isArrayOf_B(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_B))));
}
function $isArrayOf_S(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_S))));
}
function $isArrayOf_I(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_I))));
}
function $isArrayOf_J(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_J))));
}
function $isArrayOf_F(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_F))));
}
function $isArrayOf_D(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_D))));
}
var $d_O = new $TypeData();
$d_O.n = ({});
$d_O.E = "Ljava.lang.Object;";
$d_O.F = ((that) => (!that.X));
$d_O.N = "java.lang.Object";
$d_O.I = ((obj) => (obj !== null));
$d_O.A = new $TypeData().y($d_O, $ac_O, (void 0), ((that) => {
  var thatDepth = that.D;
  return ((thatDepth === 1) ? (!that.B.X) : (thatDepth > 1));
}));
$c_O.prototype.$classData = $d_O;
var $d_V = new $TypeData().p((void 0), "V", "void", (void 0), (void 0));
var $d_Z = new $TypeData().p(false, "Z", "boolean", $ac_Z, (void 0));
var $d_C = new $TypeData().p(0, "C", "char", $ac_C, Uint16Array);
var $d_B = new $TypeData().p(0, "B", "byte", $ac_B, Int8Array);
var $d_S = new $TypeData().p(0, "S", "short", $ac_S, Int16Array);
var $d_I = new $TypeData().p(0, "I", "int", $ac_I, Int32Array);
var $d_J = new $TypeData().p(null, "J", "long", $ac_J, (void 0));
var $d_F = new $TypeData().p(0.0, "F", "float", $ac_F, Float32Array);
var $d_D = new $TypeData().p(0.0, "D", "double", $ac_D, Float64Array);
/** @constructor */
function $c_jl_System$Streams$() {
  this.an = null;
  this.aK = null;
  $n_jl_System$Streams$ = this;
  this.an = new $c_jl_JSConsoleBasedPrintStream(false);
  this.aK = new $c_jl_JSConsoleBasedPrintStream(true);
}
$p = $c_jl_System$Streams$.prototype = new $h_O();
$p.constructor = $c_jl_System$Streams$;
/** @constructor */
function $h_jl_System$Streams$() {
}
$h_jl_System$Streams$.prototype = $p;
var $d_jl_System$Streams$ = new $TypeData().i($c_jl_System$Streams$, "java.lang.System$Streams$", ({
  am: 1
}));
var $n_jl_System$Streams$;
function $m_jl_System$Streams$() {
  if ((!$n_jl_System$Streams$)) {
    $n_jl_System$Streams$ = new $c_jl_System$Streams$();
  }
  return $n_jl_System$Streams$;
}
function $f_jl_Void__hashCode__I($thiz) {
  return 0;
}
function $f_jl_Void__toString__T($thiz) {
  return "undefined";
}
var $d_jl_Void = new $TypeData().i(0, "java.lang.Void", ({
  ao: 1
}), ((x) => (x === (void 0))));
function $p_jl_reflect_Array$__mismatch__O__E($thiz, array) {
  throw new $c_jl_IllegalArgumentException("argument type mismatch");
}
/** @constructor */
function $c_jl_reflect_Array$() {
}
$p = $c_jl_reflect_Array$.prototype = new $h_O();
$p.constructor = $c_jl_reflect_Array$;
/** @constructor */
function $h_jl_reflect_Array$() {
}
$h_jl_reflect_Array$.prototype = $p;
$p.aj = (function(array) {
  return ((array instanceof $ac_O) ? array.a.length : ((array instanceof $ac_Z) ? array.a.length : ((array instanceof $ac_C) ? array.a.length : ((array instanceof $ac_B) ? array.a.length : ((array instanceof $ac_S) ? array.a.length : ((array instanceof $ac_I) ? array.a.length : ((array instanceof $ac_J) ? array.a.length : ((array instanceof $ac_F) ? array.a.length : ((array instanceof $ac_D) ? array.a.length : $p_jl_reflect_Array$__mismatch__O__E(this, array))))))))));
});
var $d_jl_reflect_Array$ = new $TypeData().i($c_jl_reflect_Array$, "java.lang.reflect.Array$", ({
  ap: 1
}));
var $n_jl_reflect_Array$;
function $m_jl_reflect_Array$() {
  if ((!$n_jl_reflect_Array$)) {
    $n_jl_reflect_Array$ = new $c_jl_reflect_Array$();
  }
  return $n_jl_reflect_Array$;
}
/** @constructor */
function $c_Ljs\uff3ftests_js\uff3ftests$package$() {
}
$p = $c_Ljs\uff3ftests_js\uff3ftests$package$.prototype = new $h_O();
$p.constructor = $c_Ljs\uff3ftests_js\uff3ftests$package$;
/** @constructor */
function $h_Ljs\uff3ftests_js\uff3ftests$package$() {
}
$h_Ljs\uff3ftests_js\uff3ftests$package$.prototype = $p;
$p.bd = (function(obj) {
  var $x_1 = obj.foo;
  var x = obj.bar;
  var x$1 = ((x === (void 0)) ? (void 0) : ("bar:: " + (x | 0)));
  return (((((((("foo:: " + $x_1) + " - ") + ((x$1 === (void 0)) ? "no bar" : x$1)) + " - data:: ") + obj.data.value) + " (") + (obj.data.count | 0)) + ")");
});
$p.aP = (function() {
  var $x_1 = $m_Ljs\uff3ftests_js\uff3ftests$package$();
  var _2 = new ($a_Ljs\uff3ftests_Data())("sample", 42);
  return $x_1.bd(({
    "foo": "Hello, Scala.js!",
    "data": _2
  }));
});
var $d_Ljs\uff3ftests_js\uff3ftests$package$ = new $TypeData().i($c_Ljs\uff3ftests_js\uff3ftests$package$, "js_tests.js_tests$package$", ({
  ar: 1
}));
var $n_Ljs\uff3ftests_js\uff3ftests$package$;
function $m_Ljs\uff3ftests_js\uff3ftests$package$() {
  if ((!$n_Ljs\uff3ftests_js\uff3ftests$package$)) {
    $n_Ljs\uff3ftests_js\uff3ftests$package$ = new $c_Ljs\uff3ftests_js\uff3ftests$package$();
  }
  return $n_Ljs\uff3ftests_js\uff3ftests$package$;
}
/** @constructor */
function $c_Lmacro\uff3ftest_macro\uff3ftest$package$() {
}
$p = $c_Lmacro\uff3ftest_macro\uff3ftest$package$.prototype = new $h_O();
$p.constructor = $c_Lmacro\uff3ftest_macro\uff3ftest$package$;
/** @constructor */
function $h_Lmacro\uff3ftest_macro\uff3ftest$package$() {
}
$h_Lmacro\uff3ftest_macro\uff3ftest$package$.prototype = $p;
$p.b9 = (function() {
  var x = $m_sc_StringOps$().ag("=", 60);
  $m_s_Console$().g().f((x + "\n"));
  $m_s_Console$().g().f("FieldUnion Macro - SUCCESSFUL Implementation!\n");
  var x$1 = $m_sc_StringOps$().ag("=", 60);
  $m_s_Console$().g().f((x$1 + "\n"));
  $m_s_Console$().g().f("\n");
  new $c_sci_$colon$colon("Bob", new $c_sci_$colon$colon("Charlie", $m_sci_Nil$()));
  $m_s_Console$().g().f("\u2713 Manual TestFields works with := extension\n");
  new $c_sci_$colon$colon("Bob", new $c_sci_$colon$colon("Charlie", $m_sci_Nil$()));
  $m_s_Console$().g().f("\u2713 Generated TestFieldsGenerated works with := extension\n");
  $m_s_Console$().g().f("\u2713 Types are provably equal (TestFields =:= TestFieldsGenerated)\n");
  $m_s_Console$().g().f("\n");
  $m_s_Console$().g().f("Macro achievements:\n");
  $m_s_Console$().g().f("  1. Extracts all fields from js.Object trait\n");
  $m_s_Console$().g().f("  2. Creates Field types with singleton string literals\n");
  $m_s_Console$().g().f("  3. Combines them into a union type\n");
  $m_s_Console$().g().f("  4. Exposes type via type parameter (not path-dependent)\n");
  $m_s_Console$().g().f("  5. Generated type works for value validation!\n");
  $m_s_Console$().g().f("\n");
  $m_s_Console$().g().f("Generated union type:\n");
  $m_s_Console$().g().f("  Field[\"friends\", Seq[String]] |\n");
  $m_s_Console$().g().f("  Field[\"age\", js.UndefOr[Int]] |\n");
  $m_s_Console$().g().f("  Field[\"name\", String]\n");
  var x$2 = $m_sc_StringOps$().ag("=", 60);
  $m_s_Console$().g().f((x$2 + "\n"));
});
var $d_Lmacro\uff3ftest_macro\uff3ftest$package$ = new $TypeData().i($c_Lmacro\uff3ftest_macro\uff3ftest$package$, "macro_test.macro_test$package$", ({
  as: 1
}));
var $n_Lmacro\uff3ftest_macro\uff3ftest$package$;
function $m_Lmacro\uff3ftest_macro\uff3ftest$package$() {
  if ((!$n_Lmacro\uff3ftest_macro\uff3ftest$package$)) {
    $n_Lmacro\uff3ftest_macro\uff3ftest$package$ = new $c_Lmacro\uff3ftest_macro\uff3ftest$package$();
  }
  return $n_Lmacro\uff3ftest_macro\uff3ftest$package$;
}
function $s_Lmacro\uff3ftest_run__main__AT__V(args) {
  try {
    $m_Lmacro\uff3ftest_macro\uff3ftest$package$().b9();
  } catch (e) {
    if (false) {
      $m_s_util_CommandLineParser$().ba(e);
    } else {
      throw e;
    }
  }
}
function $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.b5(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__remainder__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.b4(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aR(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__divide__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aQ(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__fromDoubleBits__D__O__RTLong(value, fpBitsDataView) {
  fpBitsDataView.setFloat64(0, value, true);
  return new $c_RTLong((fpBitsDataView.getInt32(0, true) | 0), (fpBitsDataView.getInt32(4, true) | 0));
}
function $s_RTLong__fromDouble__D__RTLong(value) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aH(value), this$1.d);
}
function $s_RTLong__fromUnsignedInt__I__RTLong(value) {
  return new $c_RTLong(value, 0);
}
function $s_RTLong__fromInt__I__RTLong(value) {
  return new $c_RTLong(value, (value >> 31));
}
function $s_RTLong__clz__RTLong__I(a) {
  var hi = a.c;
  return ((hi !== 0) ? Math.clz32(hi) : ((32 + Math.clz32(a.b)) | 0));
}
function $s_RTLong__toFloat__RTLong__F(a) {
  var lo = a.b;
  var hi = a.c;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
}
function $s_RTLong__toDouble__RTLong__D(a) {
  var lo = a.b;
  return ((4.294967296E9 * a.c) + (lo >>> 0.0));
}
function $s_RTLong__toInt__RTLong__I(a) {
  return a.b;
}
function $s_RTLong__bitsToDouble__RTLong__O__D(a, fpBitsDataView) {
  fpBitsDataView.setInt32(0, a.b, true);
  fpBitsDataView.setInt32(4, a.c, true);
  return (+fpBitsDataView.getFloat64(0, true));
}
function $s_RTLong__mul__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var a0 = (65535 & alo);
  var a1 = ((alo >>> 16) | 0);
  var b0 = (65535 & blo);
  var b1 = ((blo >>> 16) | 0);
  var a0b0 = Math.imul(a0, b0);
  var a1b0 = Math.imul(a1, b0);
  var a0b1 = Math.imul(a0, b1);
  var lo = ((a0b0 + (((a1b0 + a0b1) | 0) << 16)) | 0);
  var c1part = ((((a0b0 >>> 16) | 0) + a0b1) | 0);
  return new $c_RTLong(lo, ((((((((Math.imul(alo, b.c) + Math.imul(a.c, blo)) | 0) + Math.imul(a1, b1)) | 0) + ((c1part >>> 16) | 0)) | 0) + (((((65535 & c1part) + a1b0) | 0) >>> 16) | 0)) | 0));
}
function $s_RTLong__sub__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var lo = ((alo - blo) | 0);
  return new $c_RTLong(lo, ((((a.c - b.c) | 0) + ((((~alo) & blo) | ((~(alo ^ blo)) & lo)) >> 31)) | 0));
}
function $s_RTLong__add__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var lo = ((alo + blo) | 0);
  return new $c_RTLong(lo, ((((a.c + b.c) | 0) + ((((alo & blo) | ((alo | blo) & (~lo))) >>> 31) | 0)) | 0));
}
function $s_RTLong__sar__RTLong__I__RTLong(a, n) {
  var hi = a.c;
  return new $c_RTLong((((32 & n) === 0) ? (((a.b >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : (hi >> n)), (((32 & n) === 0) ? (hi >> n) : (hi >> 31)));
}
function $s_RTLong__shr__RTLong__I__RTLong(a, n) {
  var hi = a.c;
  return new $c_RTLong((((32 & n) === 0) ? (((a.b >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : ((hi >>> n) | 0)), (((32 & n) === 0) ? ((hi >>> n) | 0) : 0));
}
function $s_RTLong__shl__RTLong__I__RTLong(a, n) {
  var lo = a.b;
  return new $c_RTLong((((32 & n) === 0) ? (lo << n) : 0), (((32 & n) === 0) ? (((((lo >>> 1) | 0) >>> ((31 - n) | 0)) | 0) | (a.c << n)) : (lo << n)));
}
function $s_RTLong__xor__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.b ^ b.b), (a.c ^ b.c));
}
function $s_RTLong__and__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.b & b.b), (a.c & b.c));
}
function $s_RTLong__or__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.b | b.b), (a.c | b.c));
}
function $s_RTLong__geu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) >= (b.b >>> 0)) : ((ahi >>> 0) >= (bhi >>> 0)));
}
function $s_RTLong__gtu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) > (b.b >>> 0)) : ((ahi >>> 0) > (bhi >>> 0)));
}
function $s_RTLong__leu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) <= (b.b >>> 0)) : ((ahi >>> 0) <= (bhi >>> 0)));
}
function $s_RTLong__ltu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) < (b.b >>> 0)) : ((ahi >>> 0) < (bhi >>> 0)));
}
function $s_RTLong__ge__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) >= (b.b >>> 0)) : (ahi > bhi));
}
function $s_RTLong__gt__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) > (b.b >>> 0)) : (ahi > bhi));
}
function $s_RTLong__le__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) <= (b.b >>> 0)) : (ahi < bhi));
}
function $s_RTLong__lt__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ((ahi === bhi) ? ((a.b >>> 0) < (b.b >>> 0)) : (ahi < bhi));
}
function $s_RTLong__notEquals__RTLong__RTLong__Z(a, b) {
  return (!((a.b === b.b) && (a.c === b.c)));
}
function $s_RTLong__equals__RTLong__RTLong__Z(a, b) {
  return ((a.b === b.b) && (a.c === b.c));
}
/** @constructor */
function $c_RTLong(lo, hi) {
  this.b = 0;
  this.c = 0;
  this.b = lo;
  this.c = hi;
}
$p = $c_RTLong.prototype = new $h_O();
$p.constructor = $c_RTLong;
/** @constructor */
function $h_RTLong() {
}
$h_RTLong.prototype = $p;
$p.bj = (function(that) {
  return ((that instanceof $c_RTLong) && ((this.b === that.b) && (this.c === that.c)));
});
$p.n = (function() {
  return (this.b ^ this.c);
});
$p.k = (function() {
  return $m_RTLong$().aI(this.b, this.c);
});
$p.bf = (function() {
  return ((this.b << 24) >> 24);
});
$p.bp = (function() {
  return ((this.b << 16) >> 16);
});
$p.bm = (function() {
  return this.b;
});
$p.bn = (function() {
  return this;
});
$p.bk = (function() {
  var lo = this.b;
  var hi = this.c;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
});
$p.bi = (function() {
  var lo = this.b;
  return ((4.294967296E9 * this.c) + (lo >>> 0.0));
});
$p.bh = (function(that) {
  return $m_RTLong$().aG(this.b, this.c, that.b, that.c);
});
$p.bg = (function(that) {
  return $m_RTLong$().aG(this.b, this.c, that.b, that.c);
});
function $isArrayOf_RTLong(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.Q)));
}
var $d_RTLong = new $TypeData().i($c_RTLong, "org.scalajs.linker.runtime.RuntimeLong", ({
  Q: 1
}));
function $p_RTLong$__unsigned_$div__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble / bDouble);
      $thiz.d = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.d = 0;
      return 0;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    var pow = ((31 - Math.clz32(blo)) | 0);
    $thiz.d = ((ahi >>> pow) | 0);
    return (((alo >>> pow) | 0) | ((ahi << 1) << ((31 - pow) | 0)));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    var pow$2 = ((31 - Math.clz32(bhi)) | 0);
    $thiz.d = 0;
    return ((ahi >>> pow$2) | 0);
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, true);
  }
}
function $p_RTLong$__unsigned_$percent__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble % bDouble);
      $thiz.d = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.d = ahi;
      return alo;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    $thiz.d = 0;
    return (alo & (((-1) + blo) | 0));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    $thiz.d = (ahi & (((-1) + bhi) | 0));
    return alo;
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, false);
  }
}
function $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, askQuotient) {
  var shift = ((((bhi !== 0) ? Math.clz32(bhi) : ((32 + Math.clz32(blo)) | 0)) - ((ahi !== 0) ? Math.clz32(ahi) : ((32 + Math.clz32(alo)) | 0))) | 0);
  var b = shift;
  var lo = (((32 & b) === 0) ? (blo << b) : 0);
  var hi = (((32 & b) === 0) ? (((((blo >>> 1) | 0) >>> ((31 - b) | 0)) | 0) | (bhi << b)) : (blo << b));
  var bShiftLo = lo;
  var bShiftHi = hi;
  var remLo = alo;
  var remHi = ahi;
  var quotLo = 0;
  var quotHi = 0;
  while (((shift >= 0) && (((-2097152) & remHi) !== 0))) {
    var alo$1 = remLo;
    var ahi$1 = remHi;
    var blo$1 = bShiftLo;
    var bhi$1 = bShiftHi;
    if (((ahi$1 === bhi$1) ? ((alo$1 >>> 0) >= (blo$1 >>> 0)) : ((ahi$1 >>> 0) >= (bhi$1 >>> 0)))) {
      var lo$1 = remLo;
      var hi$1 = remHi;
      var lo$2 = bShiftLo;
      var hi$2 = bShiftHi;
      var lo$3 = ((lo$1 - lo$2) | 0);
      var hi$3 = ((((hi$1 - hi$2) | 0) + ((((~lo$1) & lo$2) | ((~(lo$1 ^ lo$2)) & lo$3)) >> 31)) | 0);
      remLo = lo$3;
      remHi = hi$3;
      if ((shift < 32)) {
        quotLo = (quotLo | (1 << shift));
      } else {
        quotHi = (quotHi | (1 << shift));
      }
    }
    shift = (((-1) + shift) | 0);
    var lo$4 = bShiftLo;
    var hi$4 = bShiftHi;
    var lo$5 = (((lo$4 >>> 1) | 0) | (hi$4 << 31));
    var hi$5 = ((hi$4 >>> 1) | 0);
    bShiftLo = lo$5;
    bShiftHi = hi$5;
  }
  var alo$2 = remLo;
  var ahi$2 = remHi;
  if (((ahi$2 === bhi) ? ((alo$2 >>> 0) >= (blo >>> 0)) : ((ahi$2 >>> 0) >= (bhi >>> 0)))) {
    var lo$6 = remLo;
    var hi$6 = remHi;
    var remDouble = ((4.294967296E9 * hi$6) + (lo$6 >>> 0.0));
    var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
    if (askQuotient) {
      var x = (remDouble / bDouble);
      var lo$7 = (x | 0.0);
      var hi$7 = ((x / 4.294967296E9) | 0.0);
      var lo$8 = quotLo;
      var hi$8 = quotHi;
      var lo$9 = ((lo$8 + lo$7) | 0);
      var hi$9 = ((((hi$8 + hi$7) | 0) + ((((lo$8 & lo$7) | ((lo$8 | lo$7) & (~lo$9))) >>> 31) | 0)) | 0);
      $thiz.d = hi$9;
      return lo$9;
    } else {
      var rem_mod_bDouble = (remDouble % bDouble);
      $thiz.d = ((rem_mod_bDouble / 4.294967296E9) | 0.0);
      return (rem_mod_bDouble | 0.0);
    }
  } else if (askQuotient) {
    $thiz.d = quotHi;
    return quotLo;
  } else {
    $thiz.d = remHi;
    return remLo;
  }
}
/** @constructor */
function $c_RTLong$() {
  this.d = 0;
}
$p = $c_RTLong$.prototype = new $h_O();
$p.constructor = $c_RTLong$;
/** @constructor */
function $h_RTLong$() {
}
$h_RTLong$.prototype = $p;
$p.aI = (function(lo, hi) {
  if ((hi === (lo >> 31))) {
    return ("" + lo);
  } else if ((((-2097152) & (hi ^ (hi >> 10))) === 0)) {
    return ("" + ((4.294967296E9 * hi) + (lo >>> 0.0)));
  } else {
    var sign = (hi >> 31);
    var xlo = (lo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((hi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var approxNum = ((4.294967296E9 * (rhi >>> 0.0)) + (rlo >>> 0.0));
    var approxQuot = (+Math.floor((1.0E-9 * approxNum)));
    var approxRem = ((rlo - Math.imul(1000000000, (approxQuot | 0.0))) | 0);
    if ((approxRem < 0)) {
      approxQuot = (approxQuot - 1.0);
      approxRem = ((1000000000 + approxRem) | 0);
    } else if ((approxRem >= 1000000000)) {
      approxQuot = (approxQuot + 1.0);
      approxRem = (((-1000000000) + approxRem) | 0);
    }
    var this$4 = approxRem;
    var remStr = ("" + this$4);
    var $x_1 = approxQuot;
    var start = remStr.length;
    var s = ((("" + $x_1) + "000000000".substring(start)) + remStr);
    return ((hi < 0) ? ("-" + s) : s);
  }
});
$p.aH = (function(value) {
  if ((value < (-9.223372036854776E18))) {
    this.d = (-2147483648);
    return 0;
  } else if ((value >= 9.223372036854776E18)) {
    this.d = 2147483647;
    return (-1);
  } else {
    var rawLo = (value | 0.0);
    var rawHi = ((value / 4.294967296E9) | 0.0);
    this.d = (((value < 0.0) && (rawLo !== 0)) ? (((-1) + rawHi) | 0) : rawHi);
    return rawLo;
  }
});
$p.aG = (function(alo, ahi, blo, bhi) {
  return ((ahi === bhi) ? ((alo === blo) ? 0 : (((alo >>> 0) < (blo >>> 0)) ? (-1) : 1)) : ((ahi < bhi) ? (-1) : 1));
});
$p.aQ = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      if (((alo === (-2147483648)) && (blo === (-1)))) {
        this.d = 0;
        return (-2147483648);
      } else {
        var lo = ((alo / $checkIntDivisor(blo)) | 0);
        this.d = (lo >> 31);
        return lo;
      }
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.d = (-1);
      return (-1);
    } else {
      this.d = 0;
      return 0;
    }
  } else {
    var sign = (ahi >> 31);
    var xlo = (alo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((ahi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var sign$1 = (bhi >> 31);
    var xlo$1 = (blo ^ sign$1);
    var rlo$1 = ((xlo$1 - sign$1) | 0);
    var rhi$1 = (((bhi ^ sign$1) + (((xlo$1 & (~rlo$1)) >>> 31) | 0)) | 0);
    var absRLo = $p_RTLong$__unsigned_$div__I__I__I__I__I(this, rlo, rhi, rlo$1, rhi$1);
    if (((ahi ^ bhi) >= 0)) {
      return absRLo;
    } else {
      var hi = this.d;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.d = hi$1;
      return lo$1;
    }
  }
});
$p.aR = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.d = 0;
      return (((alo >>> 0) / ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.d = 0;
      return 0;
    }
  } else {
    return $p_RTLong$__unsigned_$div__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
$p.b4 = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      var lo = ((alo % $checkIntDivisor(blo)) | 0);
      this.d = (lo >> 31);
      return lo;
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.d = 0;
      return 0;
    } else {
      this.d = ahi;
      return alo;
    }
  } else {
    var sign = (ahi >> 31);
    var xlo = (alo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((ahi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var sign$1 = (bhi >> 31);
    var xlo$1 = (blo ^ sign$1);
    var rlo$1 = ((xlo$1 - sign$1) | 0);
    var rhi$1 = (((bhi ^ sign$1) + (((xlo$1 & (~rlo$1)) >>> 31) | 0)) | 0);
    var absRLo = $p_RTLong$__unsigned_$percent__I__I__I__I__I(this, rlo, rhi, rlo$1, rhi$1);
    if ((ahi < 0)) {
      var hi = this.d;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.d = hi$1;
      return lo$1;
    } else {
      return absRLo;
    }
  }
});
$p.b5 = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.d = 0;
      return (((alo >>> 0) % ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.d = ahi;
      return alo;
    }
  } else {
    return $p_RTLong$__unsigned_$percent__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
var $d_RTLong$ = new $TypeData().i($c_RTLong$, "org.scalajs.linker.runtime.RuntimeLong$", ({
  at: 1
}));
var $n_RTLong$;
function $m_RTLong$() {
  if ((!$n_RTLong$)) {
    $n_RTLong$ = new $c_RTLong$();
  }
  return $n_RTLong$;
}
/** @constructor */
function $c_Lpreact_modifier_AttributeModifier(key, value) {
  this.O = null;
  this.A = null;
  this.O = key;
  this.A = value;
}
$p = $c_Lpreact_modifier_AttributeModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_modifier_AttributeModifier;
/** @constructor */
function $h_Lpreact_modifier_AttributeModifier() {
}
$h_Lpreact_modifier_AttributeModifier.prototype = $p;
function $isArrayOf_Lpreact_modifier_AttributeModifier(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.R)));
}
var $d_Lpreact_modifier_AttributeModifier = new $TypeData().i($c_Lpreact_modifier_AttributeModifier, "preact.modifier.AttributeModifier", ({
  R: 1
}));
/** @constructor */
function $c_Lpreact_modifier_ChildModifier(child) {
  this.P = null;
  this.P = child;
}
$p = $c_Lpreact_modifier_ChildModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_modifier_ChildModifier;
/** @constructor */
function $h_Lpreact_modifier_ChildModifier() {
}
$h_Lpreact_modifier_ChildModifier.prototype = $p;
function $isArrayOf_Lpreact_modifier_ChildModifier(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.S)));
}
var $d_Lpreact_modifier_ChildModifier = new $TypeData().i($c_Lpreact_modifier_ChildModifier, "preact.modifier.ChildModifier", ({
  S: 1
}));
function $ct_Lpreact_test_ComponentTest__F1__($thiz, renderFn) {
  $thiz.a9 = renderFn;
  return $thiz;
}
/** @constructor */
function $c_Lpreact_test_ComponentTest() {
  this.a9 = null;
}
$p = $c_Lpreact_test_ComponentTest.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_ComponentTest;
/** @constructor */
function $h_Lpreact_test_ComponentTest() {
}
$h_Lpreact_test_ComponentTest.prototype = $p;
$p.J = (function(ms) {
  var attrs = ({});
  var children = [];
  ms.L(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult13: {
      if ((x$1$3 instanceof $c_Lpreact_modifier_AttributeModifier)) {
        attrs[x$1$3.O] = x$1$3.A;
        break matchResult13;
      }
      if ((x$1$3 instanceof $c_Lpreact_modifier_ChildModifier)) {
        children.push(x$1$3.P);
        break matchResult13;
      }
      throw new $c_s_MatchError(x$1$3);
    }
  })));
  return (0, $i_preact.h)($m_sjs_js_Any$().aV(this.a9), attrs, children);
});
/** @constructor */
function $c_Lpreact_test_test$package$() {
  this.ap = null;
  $n_Lpreact_test_test$package$ = this;
  this.ap = ($m_Lpreact_test_test$package$(), new $c_Lpreact_test_test$package$$anon$2(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((props$2) => {
    var $x_3 = $m_sr_ScalaRunTime$();
    var ms$proxy9 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(props$2.title)]));
    var $x_2 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("h3", ms$proxy9));
    var ms$proxy10 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(props$2.children)]));
    var $x_1 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy10));
    var x = props$2.footer;
    if ((x === (void 0))) {
      var x$1 = (void 0);
    } else {
      var ms$proxy11 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(x)]));
      var x$1 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy11));
    }
    var ms$proxy12 = $x_3.l(new $ac_O([$x_2, $x_1, ((x$1 === (void 0)) ? new $c_Lpreact_modifier_ChildModifier((void 0)) : x$1)]));
    return $m_Lpreact_test_test$package$().j("div", ms$proxy12);
  }))));
}
$p = $c_Lpreact_test_test$package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_test$package$;
/** @constructor */
function $h_Lpreact_test_test$package$() {
}
$h_Lpreact_test_test$package$.prototype = $p;
$p.j = (function(tag, modifiers) {
  var jsAttribs = new $c_sr_ObjectRef(({}));
  var childrenArray = new $c_sr_ObjectRef([]);
  modifiers.L(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult14: {
      if ((x$1$3 instanceof $c_Lpreact_modifier_AttributeModifier)) {
        var jsAttribs$proxy1 = jsAttribs.o;
        jsAttribs$proxy1[x$1$3.O] = x$1$3.A;
        break matchResult14;
      }
      if ((x$1$3 instanceof $c_Lpreact_modifier_ChildModifier)) {
        var childrenArray$proxy1 = childrenArray.o;
        childrenArray$proxy1.push(x$1$3.P);
        break matchResult14;
      }
      throw new $c_s_MatchError(x$1$3);
    }
  })));
  return (0, $i_preact.h)(tag, jsAttribs.o, childrenArray.o);
});
$p.aM = (function() {
  var $x_12 = $m_sr_ScalaRunTime$();
  var $x_11 = new $c_Lpreact_modifier_AttributeModifier("id", "greeting");
  var $x_10 = new $c_Lpreact_modifier_AttributeModifier("class", "container");
  var $x_9 = new $c_Lpreact_modifier_ChildModifier("This is a div element.");
  var ms$proxy13 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_AttributeModifier("class", "nested"), new $c_Lpreact_modifier_ChildModifier("Nested span child element.")]));
  var $x_8 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("span", ms$proxy13));
  var ms$proxy14 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_AttributeModifier("disabled", true), new $c_Lpreact_modifier_ChildModifier("Disabled Button")]));
  var $x_7 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("button", ms$proxy14));
  var ms$proxy15 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_AttributeModifier("onClick", ((e$3) => {
    $m_s_Console$().g().f("Button clicked!\n");
  })), new $c_Lpreact_modifier_ChildModifier("Click me")]));
  var $x_6 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("button", ms$proxy15));
  var $x_5 = $m_Lpreact_test_Card$();
  var $x_4 = new $c_Lpreact_modifier_AttributeModifier("title", "My Card Title");
  var $x_3 = new $c_Lpreact_modifier_ChildModifier("This is the content of the card.");
  var $x_2 = $m_sr_ScalaRunTime$();
  var $x_1 = new $c_Lpreact_modifier_ChildModifier("A nested div inside the card.");
  var ms$proxy16 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier("Nested Button")]));
  var ms$proxy17 = $x_2.l(new $ac_O([$x_1, new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("button", ms$proxy16))]));
  var ms$proxy18 = $x_12.l(new $ac_O([$x_11, $x_10, $x_9, $x_8, $x_7, $x_6, new $c_Lpreact_modifier_ChildModifier($x_5.J(new $c_sjsr_WrappedVarArgs([$x_4, $x_3, new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy17))]))), new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_Card$().J(new $c_sjsr_WrappedVarArgs([new $c_Lpreact_modifier_AttributeModifier("title", "My Second Card with Footer"), new $c_Lpreact_modifier_AttributeModifier("footer", "This is the footer text."), new $c_Lpreact_modifier_ChildModifier("This is the content of the second card.")]))), new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_Card2$().J(new $c_sjsr_WrappedVarArgs([new $c_Lpreact_modifier_AttributeModifier("title", "My Card2 with Footer"), new $c_Lpreact_modifier_AttributeModifier("footer", "This is the footer text."), new $c_Lpreact_modifier_ChildModifier("This is Card2 content - auto-derived!")]))), new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().ap.J(new $c_sjsr_WrappedVarArgs([new $c_Lpreact_modifier_AttributeModifier("title", "My Card3 with Footer"), new $c_Lpreact_modifier_AttributeModifier("footer", "This is the footer text.")])))]));
  return $m_Lpreact_test_test$package$().j("div", ms$proxy18);
});
$p.b8 = (function() {
  var rootElement = document.body;
  (0, $i_preact.render)($m_Lpreact_test_test$package$().aM(), rootElement);
});
var $d_Lpreact_test_test$package$ = new $TypeData().i($c_Lpreact_test_test$package$, "preact.test.test$package$", ({
  az: 1
}));
var $n_Lpreact_test_test$package$;
function $m_Lpreact_test_test$package$() {
  if ((!$n_Lpreact_test_test$package$)) {
    $n_Lpreact_test_test$package$ = new $c_Lpreact_test_test$package$();
  }
  return $n_Lpreact_test_test$package$;
}
function $f_sc_IterableOnceOps__foreach__F1__V($thiz, f) {
  var it = $thiz.t();
  while (it.q()) {
    f.C(it.m());
  }
}
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return (($thiz.u() === 0) ? (("" + start) + end) : $thiz.ai($ct_scm_StringBuilder__(new $c_scm_StringBuilder()), start, sep, end).y.h);
}
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, b, start, sep, end) {
  var jsb = b.y;
  if ((start.length !== 0)) {
    jsb.h = (("" + jsb.h) + start);
  }
  var it = $thiz.t();
  if (it.q()) {
    var obj = it.m();
    jsb.h = (("" + jsb.h) + obj);
    while (it.q()) {
      if ((sep.length !== 0)) {
        jsb.h = (("" + jsb.h) + sep);
      }
      var obj$1 = it.m();
      jsb.h = (("" + jsb.h) + obj$1);
    }
  }
  if ((end.length !== 0)) {
    jsb.h = (("" + jsb.h) + end);
  }
  return b;
}
/** @constructor */
function $c_sc_StringOps$() {
  this.ax = null;
  $n_sc_StringOps$ = this;
  this.ax = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.ax));
}
$p = $c_sc_StringOps$.prototype = new $h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
$h_sc_StringOps$.prototype = $p;
$p.ag = (function(this$, n) {
  if ((n <= 0)) {
    return "";
  } else {
    var sb = $ct_jl_StringBuilder__I__(new $c_jl_StringBuilder(), Math.imul(this$.length, n));
    var i = 0;
    while ((i < n)) {
      sb.h = (("" + sb.h) + this$);
      i = ((1 + i) | 0);
    }
    return sb.h;
  }
});
var $d_sc_StringOps$ = new $TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  aX: 1
}));
var $n_sc_StringOps$;
function $m_sc_StringOps$() {
  if ((!$n_sc_StringOps$)) {
    $n_sc_StringOps$ = new $c_sc_StringOps$();
  }
  return $n_sc_StringOps$;
}
/** @constructor */
function $c_sr_ScalaRunTime$() {
}
$p = $c_sr_ScalaRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_ScalaRunTime$;
/** @constructor */
function $h_sr_ScalaRunTime$() {
}
$h_sr_ScalaRunTime$.prototype = $p;
$p.K = (function(xs, idx) {
  if ((xs instanceof $ac_O)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_I)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_D)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_J)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_F)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_C)) {
    return $bC(xs.a[idx]);
  }
  if ((xs instanceof $ac_B)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_S)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_Z)) {
    return xs.a[idx];
  }
  if ((xs === null)) {
    throw new $c_jl_NullPointerException();
  }
  throw new $c_s_MatchError(xs);
});
$p.ah = (function(x) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(x.X(), (x.z() + "("), ",", ")");
});
$p.l = (function(xs) {
  if ((xs === null)) {
    return null;
  } else if ((xs.a.length === 0)) {
    var this$2 = $m_sci_ArraySeq$();
    $m_s_reflect_ManifestFactory$ObjectManifest$();
    return $p_sci_ArraySeq$__emptyImpl__sci_ArraySeq$ofRef(this$2);
  } else {
    return new $c_sci_ArraySeq$ofRef(xs);
  }
});
var $d_sr_ScalaRunTime$ = new $TypeData().i($c_sr_ScalaRunTime$, "scala.runtime.ScalaRunTime$", ({
  bs: 1
}));
var $n_sr_ScalaRunTime$;
function $m_sr_ScalaRunTime$() {
  if ((!$n_sr_ScalaRunTime$)) {
    $n_sr_ScalaRunTime$ = new $c_sr_ScalaRunTime$();
  }
  return $n_sr_ScalaRunTime$;
}
/** @constructor */
function $c_sr_Statics$() {
}
$p = $c_sr_Statics$.prototype = new $h_O();
$p.constructor = $c_sr_Statics$;
/** @constructor */
function $h_sr_Statics$() {
}
$h_sr_Statics$.prototype = $p;
$p.b0 = (function(lv) {
  var lo = lv.b;
  var hi = lv.c;
  return ((hi === (lo >> 31)) ? lo : (lo ^ hi));
});
$p.aS = (function(dv) {
  var iv = $doubleToInt(dv);
  if ((iv === dv)) {
    return iv;
  } else {
    var this$1 = $m_RTLong$();
    var lo = this$1.aH(dv);
    var hi = this$1.d;
    if ((((4.294967296E9 * hi) + (lo >>> 0.0)) === dv)) {
      return (lo ^ hi);
    } else {
      var valueInt = (dv | 0);
      if (((valueInt === dv) && ((1.0 / dv) !== (-Infinity)))) {
        return valueInt;
      } else if ((dv !== dv)) {
        return 2146959360;
      } else {
        var fpBitsDataView = $fpBitsDataView;
        fpBitsDataView.setFloat64(0, dv, true);
        return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
      }
    }
  }
});
$p.i = (function(x) {
  if ((x === null)) {
    return 0;
  } else if (((typeof x) === "number")) {
    return this.aS((+x));
  } else if ((x instanceof $c_RTLong)) {
    var t = $uJ(x);
    return this.b0(new $c_RTLong(t.b, t.c));
  } else {
    return $dp_hashCode__I(x);
  }
});
var $d_sr_Statics$ = new $TypeData().i($c_sr_Statics$, "scala.runtime.Statics$", ({
  bt: 1
}));
var $n_sr_Statics$;
function $m_sr_Statics$() {
  if ((!$n_sr_Statics$)) {
    $n_sr_Statics$ = new $c_sr_Statics$();
  }
  return $n_sr_Statics$;
}
/** @constructor */
function $c_s_util_CommandLineParser$() {
}
$p = $c_s_util_CommandLineParser$.prototype = new $h_O();
$p.constructor = $c_s_util_CommandLineParser$;
/** @constructor */
function $h_s_util_CommandLineParser$() {
}
$h_s_util_CommandLineParser$.prototype = $p;
$p.ba = (function(err) {
  var where = ((err.aE() === 0) ? "" : ((err.aE() === 1) ? " after first argument" : ((" after " + err.aE()) + " arguments")));
  var x = ((("Illegal command line" + where) + ": ") + err.bo());
  $m_s_Console$().g().f((x + "\n"));
});
var $d_s_util_CommandLineParser$ = new $TypeData().i($c_s_util_CommandLineParser$, "scala.util.CommandLineParser$", ({
  bz: 1
}));
var $n_s_util_CommandLineParser$;
function $m_s_util_CommandLineParser$() {
  if ((!$n_s_util_CommandLineParser$)) {
    $n_s_util_CommandLineParser$ = new $c_s_util_CommandLineParser$();
  }
  return $n_s_util_CommandLineParser$;
}
/** @constructor */
function $c_s_util_DynamicVariable(init) {
  this.af = null;
  this.af = init;
}
$p = $c_s_util_DynamicVariable.prototype = new $h_O();
$p.constructor = $c_s_util_DynamicVariable;
/** @constructor */
function $h_s_util_DynamicVariable() {
}
$h_s_util_DynamicVariable.prototype = $p;
$p.k = (function() {
  return (("DynamicVariable(" + this.af) + ")");
});
var $d_s_util_DynamicVariable = new $TypeData().i($c_s_util_DynamicVariable, "scala.util.DynamicVariable", ({
  bB: 1
}));
/** @constructor */
function $c_s_util_hashing_MurmurHash3() {
}
$p = $c_s_util_hashing_MurmurHash3.prototype = new $h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3;
/** @constructor */
function $h_s_util_hashing_MurmurHash3() {
}
$h_s_util_hashing_MurmurHash3.prototype = $p;
$p.e = (function(hash, data) {
  var h = this.aF(hash, data);
  var i = h;
  h = ((i << 13) | ((i >>> 19) | 0));
  return (((-430675100) + Math.imul(5, h)) | 0);
});
$p.aF = (function(hash, data) {
  var k = data;
  k = Math.imul((-862048943), k);
  var i = k;
  k = ((i << 15) | ((i >>> 17) | 0));
  k = Math.imul(461845907, k);
  return (hash ^ k);
});
$p.r = (function(hash, length) {
  return this.Y((hash ^ length));
});
$p.Y = (function(hash) {
  var h = hash;
  h = (h ^ ((h >>> 16) | 0));
  h = Math.imul((-2048144789), h);
  h = (h ^ ((h >>> 13) | 0));
  h = Math.imul((-1028477387), h);
  h = (h ^ ((h >>> 16) | 0));
  return h;
});
$p.al = (function(x, seed, ignorePrefix) {
  var arr = x.D();
  if ((arr === 0)) {
    return ((!ignorePrefix) ? $f_T__hashCode__I(x.z()) : seed);
  } else {
    var h = seed;
    if ((!ignorePrefix)) {
      h = this.e(h, $f_T__hashCode__I(x.z()));
    }
    var i = 0;
    while ((i < arr)) {
      h = this.e(h, $m_sr_Statics$().i(x.E(i)));
      i = ((1 + i) | 0);
    }
    return this.r(h, arr);
  }
});
$p.bc = (function(xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.t();
  while (iterator.q()) {
    var x = iterator.m();
    var h = $m_sr_Statics$().i(x);
    a = ((a + h) | 0);
    b = (b ^ h);
    c = Math.imul(c, (1 | h));
    n = ((1 + n) | 0);
  }
  var h$2 = seed;
  h$2 = this.e(h$2, a);
  h$2 = this.e(h$2, b);
  h$2 = this.aF(h$2, c);
  return this.r(h$2, n);
});
$p.b2 = (function(xs, seed) {
  var it = xs.t();
  var h = seed;
  if ((!it.q())) {
    return this.r(h, 0);
  }
  var x0 = it.m();
  if ((!it.q())) {
    return this.r(this.e(h, $m_sr_Statics$().i(x0)), 1);
  }
  var x1 = it.m();
  var initial = $m_sr_Statics$().i(x0);
  h = this.e(h, initial);
  var h0 = h;
  var prev = $m_sr_Statics$().i(x1);
  var rangeDiff = ((prev - initial) | 0);
  var i = 2;
  while (it.q()) {
    h = this.e(h, prev);
    var hash = $m_sr_Statics$().i(it.m());
    if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
      h = this.e(h, hash);
      i = ((1 + i) | 0);
      while (it.q()) {
        h = this.e(h, $m_sr_Statics$().i(it.m()));
        i = ((1 + i) | 0);
      }
      return this.r(h, i);
    }
    prev = hash;
    i = ((1 + i) | 0);
  }
  return this.Y(this.e(this.e(h0, rangeDiff), prev));
});
$p.aO = (function(a, seed) {
  var h = seed;
  var l = $m_jl_reflect_Array$().aj(a);
  switch (l) {
    case 0: {
      return this.r(h, 0);
      break;
    }
    case 1: {
      return this.r(this.e(h, $m_sr_Statics$().i($m_sr_ScalaRunTime$().K(a, 0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().i($m_sr_ScalaRunTime$().K(a, 0));
      h = this.e(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().i($m_sr_ScalaRunTime$().K(a, 1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.e(h, prev);
        var hash = $m_sr_Statics$().i($m_sr_ScalaRunTime$().K(a, i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.e(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.e(h, $m_sr_Statics$().i($m_sr_ScalaRunTime$().K(a, i)));
            i = ((1 + i) | 0);
          }
          return this.r(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.Y(this.e(this.e(h0, rangeDiff), prev));
    }
  }
});
$p.b3 = (function(start, step, last, seed) {
  return this.Y(this.e(this.e(this.e(seed, start), step), last));
});
$p.aY = (function(a, seed) {
  var h = seed;
  var l = a.s();
  switch (l) {
    case 0: {
      return this.r(h, 0);
      break;
    }
    case 1: {
      return this.r(this.e(h, $m_sr_Statics$().i(a.p(0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().i(a.p(0));
      h = this.e(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().i(a.p(1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.e(h, prev);
        var hash = $m_sr_Statics$().i(a.p(i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.e(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.e(h, $m_sr_Statics$().i(a.p(i)));
            i = ((1 + i) | 0);
          }
          return this.r(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.Y(this.e(this.e(h0, rangeDiff), prev));
    }
  }
});
$p.aZ = (function(xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while ((!elems.w())) {
    var head = elems.W();
    var tail = elems.M();
    var hash = $m_sr_Statics$().i(head);
    h = this.e(h, hash);
    switch (rangeState) {
      case 0: {
        initial = hash;
        rangeState = 1;
        break;
      }
      case 1: {
        rangeDiff = ((hash - prev) | 0);
        rangeState = 2;
        break;
      }
      case 2: {
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          rangeState = 3;
        }
        break;
      }
    }
    prev = hash;
    n = ((1 + n) | 0);
    elems = tail;
  }
  return ((rangeState === 2) ? this.b3(initial, rangeDiff, prev, seed) : this.r(h, n));
});
/** @constructor */
function $c_jl_Number() {
}
$p = $c_jl_Number.prototype = new $h_O();
$p.constructor = $c_jl_Number;
/** @constructor */
function $h_jl_Number() {
}
$h_jl_Number.prototype = $p;
function $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, e, enableSuppression, writableStackTrace) {
  $thiz.ao = s;
  if (writableStackTrace) {
    $thiz.aU();
  }
  return $thiz;
}
class $c_jl_Throwable extends Error {
  constructor() {
    super();
    this.ao = null;
  }
  ak() {
    return this.ao;
  }
  aU() {
    var reference = (false ? this.be : this);
    if ((Object.prototype.toString.call(reference) !== "[object Error]")) {
      if (((Error.captureStackTrace === (void 0)) || (!(!Object.isSealed(this))))) {
        new Error();
      } else {
        Error.captureStackTrace(this);
      }
    }
    return this;
  }
  k() {
    var className = $objectClassName(this);
    var message = this.ak();
    return ((message === null) ? className : ((className + ": ") + message));
  }
  n() {
    return $c_O.prototype.n.call(this);
  }
  get "message"() {
    var m = this.ak();
    return ((m === null) ? "" : m);
  }
  get "name"() {
    return $objectClassName(this);
  }
  "toString"() {
    return this.k();
  }
}
/** @constructor */
function $c_Lpreact_test_test$package$$anon$2(renderFn$1) {
  this.a9 = null;
  $ct_Lpreact_test_ComponentTest__F1__(this, renderFn$1);
}
$p = $c_Lpreact_test_test$package$$anon$2.prototype = new $h_Lpreact_test_ComponentTest();
$p.constructor = $c_Lpreact_test_test$package$$anon$2;
/** @constructor */
function $h_Lpreact_test_test$package$$anon$2() {
}
$h_Lpreact_test_test$package$$anon$2.prototype = $p;
var $d_Lpreact_test_test$package$$anon$2 = new $TypeData().i($c_Lpreact_test_test$package$$anon$2, "preact.test.test$package$$anon$2", ({
  aA: 1,
  ay: 1
}));
/** @constructor */
function $c_s_Console$() {
  this.aq = null;
  $n_s_Console$ = this;
  this.aq = new $c_s_util_DynamicVariable($m_jl_System$Streams$().an);
}
$p = $c_s_Console$.prototype = new $h_O();
$p.constructor = $c_s_Console$;
/** @constructor */
function $h_s_Console$() {
}
$h_s_Console$.prototype = $p;
$p.g = (function() {
  return this.aq.af;
});
var $d_s_Console$ = new $TypeData().i($c_s_Console$, "scala.Console$", ({
  aB: 1,
  bg: 1
}));
var $n_s_Console$;
function $m_s_Console$() {
  if ((!$n_s_Console$)) {
    $n_s_Console$ = new $c_s_Console$();
  }
  return $n_s_Console$;
}
/** @constructor */
function $c_sr_AbstractFunction1() {
}
$p = $c_sr_AbstractFunction1.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction1;
/** @constructor */
function $h_sr_AbstractFunction1() {
}
$h_sr_AbstractFunction1.prototype = $p;
$p.k = (function() {
  return "<function1>";
});
/** @constructor */
function $c_sr_ObjectRef(elem) {
  this.o = null;
  this.o = elem;
}
$p = $c_sr_ObjectRef.prototype = new $h_O();
$p.constructor = $c_sr_ObjectRef;
/** @constructor */
function $h_sr_ObjectRef() {
}
$h_sr_ObjectRef.prototype = $p;
$p.k = (function() {
  return ("" + this.o);
});
var $d_sr_ObjectRef = new $TypeData().i($c_sr_ObjectRef, "scala.runtime.ObjectRef", ({
  br: 1,
  a: 1
}));
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.V = 0;
  this.aB = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.V = $f_T__hashCode__I("Seq");
  this.aB = $f_T__hashCode__I("Map");
  $f_T__hashCode__I("Set");
  this.bc($m_sci_Nil$(), this.aB);
}
$p = $c_s_util_hashing_MurmurHash3$.prototype = new $h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {
}
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.aJ = (function(xs) {
  return ($is_sc_IndexedSeq(xs) ? this.aY(xs, this.V) : ((xs instanceof $c_sci_List) ? this.aZ(xs, this.V) : this.b2(xs, this.V)));
});
var $d_s_util_hashing_MurmurHash3$ = new $TypeData().i($c_s_util_hashing_MurmurHash3$, "scala.util.hashing.MurmurHash3$", ({
  bD: 1,
  bC: 1
}));
var $n_s_util_hashing_MurmurHash3$;
function $m_s_util_hashing_MurmurHash3$() {
  if ((!$n_s_util_hashing_MurmurHash3$)) {
    $n_s_util_hashing_MurmurHash3$ = new $c_s_util_hashing_MurmurHash3$();
  }
  return $n_s_util_hashing_MurmurHash3$;
}
class $c_jl_Exception extends $c_jl_Throwable {
}
var $b_Ljs\uff3ftests_Data;
function $a_Ljs\uff3ftests_Data() {
  if ((!$b_Ljs\uff3ftests_Data)) {
    $b_Ljs\uff3ftests_Data = class $b_Ljs\uff3ftests_Data extends Object {
      constructor(arg, arg$2) {
        var value = null;
        var count = 0;
        value = arg;
        count = (arg$2 | 0);
        super();
        Object.defineProperty(this, "value", ({
          "configurable": true,
          "enumerable": true,
          "writable": true,
          "value": null
        }));
        Object.defineProperty(this, "count", ({
          "configurable": true,
          "enumerable": true,
          "writable": true,
          "value": 0
        }));
        this.value = value;
        this.count = count;
      }
    };
  }
  return $b_Ljs\uff3ftests_Data;
}
/** @constructor */
function $c_Lpreact_test_Card$() {
}
$p = $c_Lpreact_test_Card$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card$;
/** @constructor */
function $h_Lpreact_test_Card$() {
}
$h_Lpreact_test_Card$.prototype = $p;
$p.J = (function(ms) {
  var titleValue = new $c_sr_ObjectRef("");
  var footerValue = new $c_sr_ObjectRef($m_s_None$());
  var childMods = [];
  ms.L(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    if ((x$1$2 instanceof $c_Lpreact_modifier_AttributeModifier)) {
      matchResult5: {
        var x8 = x$1$2.O;
        if ((x8 === "title")) {
          titleValue.o = x$1$2.A;
          break matchResult5;
        }
        if ((x8 === "footer")) {
          footerValue.o = new $c_s_Some(x$1$2.A);
          break matchResult5;
        }
        throw new $c_s_MatchError(x8);
      }
      return (void 0);
    }
    if ((x$1$2 instanceof $c_Lpreact_modifier_ChildModifier)) {
      var elem$1 = x$1$2.P;
      childMods.push(elem$1);
      return childMods;
    }
    throw new $c_s_MatchError(x$1$2);
  })));
  var card = new $c_Lpreact_test_Card(titleValue.o, footerValue.o, childMods);
  return card.b6(card);
});
var $d_Lpreact_test_Card$ = new $TypeData().i($c_Lpreact_test_Card$, "preact.test.Card$", ({
  av: 1,
  a3: 1,
  a4: 1
}));
var $n_Lpreact_test_Card$;
function $m_Lpreact_test_Card$() {
  if ((!$n_Lpreact_test_Card$)) {
    $n_Lpreact_test_Card$ = new $c_Lpreact_test_Card$();
  }
  return $n_Lpreact_test_Card$;
}
/** @constructor */
function $c_Lpreact_test_Card2$() {
}
$p = $c_Lpreact_test_Card2$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card2$;
/** @constructor */
function $h_Lpreact_test_Card2$() {
}
$h_Lpreact_test_Card2$.prototype = $p;
$p.aL = (function() {
  return [];
});
$p.J = (function(ms) {
  var c = new $c_sr_ObjectRef(new $c_Lpreact_test_Card2("", $m_s_None$(), $m_Lpreact_test_Card2$().aL()));
  ms.L(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((mod$3) => {
    c.o = c.o.aN(mod$3);
  })));
  return c.o.b7();
});
var $d_Lpreact_test_Card2$ = new $TypeData().i($c_Lpreact_test_Card2$, "preact.test.Card2$", ({
  ax: 1,
  a3: 1,
  a4: 1
}));
var $n_Lpreact_test_Card2$;
function $m_Lpreact_test_Card2$() {
  if ((!$n_Lpreact_test_Card2$)) {
    $n_Lpreact_test_Card2$ = new $c_Lpreact_test_Card2$();
  }
  return $n_Lpreact_test_Card2$;
}
/** @constructor */
function $c_sc_Iterator$() {
  this.H = null;
  $n_sc_Iterator$ = this;
  this.H = new $c_sc_Iterator$$anon$19();
}
$p = $c_sc_Iterator$.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {
}
$h_sc_Iterator$.prototype = $p;
var $d_sc_Iterator$ = new $TypeData().i($c_sc_Iterator$, "scala.collection.Iterator$", ({
  aQ: 1,
  a: 1,
  aP: 1
}));
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if ((!$n_sc_Iterator$)) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
/** @constructor */
function $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(f) {
  this.aA = null;
  this.aA = f;
}
$p = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = new $h_sr_AbstractFunction1();
$p.constructor = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28;
/** @constructor */
function $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28() {
}
$h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = $p;
$p.C = (function(x0) {
  return (0, this.aA)(x0);
});
var $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 = new $TypeData().i($c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28, "scala.runtime.AbstractFunction1.$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28", ({
  bp: 1,
  bo: 1,
  k: 1
}));
var $d_sr_Nothing$ = new $TypeData().i(0, "scala.runtime.Nothing$", ({
  bq: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_sjs_js_Any$() {
}
$p = $c_sjs_js_Any$.prototype = new $h_O();
$p.constructor = $c_sjs_js_Any$;
/** @constructor */
function $h_sjs_js_Any$() {
}
$h_sjs_js_Any$.prototype = $p;
$p.aV = (function(f) {
  return ((arg1$2) => f.C(arg1$2));
});
var $d_sjs_js_Any$ = new $TypeData().i($c_sjs_js_Any$, "scala.scalajs.js.Any$", ({
  bu: 1,
  bw: 1,
  bx: 1
}));
var $n_sjs_js_Any$;
function $m_sjs_js_Any$() {
  if ((!$n_sjs_js_Any$)) {
    $n_sjs_js_Any$ = new $c_sjs_js_Any$();
  }
  return $n_sjs_js_Any$;
}
/** @constructor */
function $c_Ljava_io_OutputStream() {
}
$p = $c_Ljava_io_OutputStream.prototype = new $h_O();
$p.constructor = $c_Ljava_io_OutputStream;
/** @constructor */
function $h_Ljava_io_OutputStream() {
}
$h_Ljava_io_OutputStream.prototype = $p;
function $f_jl_Boolean__hashCode__I($thiz) {
  return ($thiz ? 1231 : 1237);
}
function $f_jl_Boolean__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Boolean = new $TypeData().i(0, "java.lang.Boolean", ({
  a8: 1,
  a: 1,
  e: 1,
  g: 1
}), ((x) => ((typeof x) === "boolean")));
function $f_jl_Character__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Character__toString__T($thiz) {
  return ("" + $cToS($thiz));
}
var $d_jl_Character = new $TypeData().i(0, "java.lang.Character", ({
  aa: 1,
  a: 1,
  e: 1,
  g: 1
}), ((x) => (x instanceof $Char)));
class $c_jl_RuntimeException extends $c_jl_Exception {
}
function $ct_jl_StringBuilder__($thiz) {
  $thiz.h = "";
  return $thiz;
}
function $ct_jl_StringBuilder__I__($thiz, initialCapacity) {
  $ct_jl_StringBuilder__($thiz);
  if ((initialCapacity < 0)) {
    throw new $c_jl_NegativeArraySizeException();
  }
  return $thiz;
}
/** @constructor */
function $c_jl_StringBuilder() {
  this.h = null;
}
$p = $c_jl_StringBuilder.prototype = new $h_O();
$p.constructor = $c_jl_StringBuilder;
/** @constructor */
function $h_jl_StringBuilder() {
}
$h_jl_StringBuilder.prototype = $p;
$p.k = (function() {
  return this.h;
});
$p.s = (function() {
  return this.h.length;
});
$p.aC = (function(index) {
  return this.h.charCodeAt(index);
});
var $d_jl_StringBuilder = new $TypeData().i($c_jl_StringBuilder, "java.lang.StringBuilder", ({
  al: 1,
  F: 1,
  M: 1,
  a: 1
}));
/** @constructor */
function $c_Lpreact_test_Card(title, footer, children) {
  this.a8 = null;
  this.a7 = null;
  this.a6 = null;
  this.a8 = title;
  this.a7 = footer;
  this.a6 = children;
}
$p = $c_Lpreact_test_Card.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card;
/** @constructor */
function $h_Lpreact_test_Card() {
}
$h_Lpreact_test_Card.prototype = $p;
$p.X = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.n = (function() {
  return $m_s_util_hashing_MurmurHash3$().al(this, (-590018411), true);
});
$p.k = (function() {
  return $m_sr_ScalaRunTime$().ah(this);
});
$p.D = (function() {
  return 3;
});
$p.z = (function() {
  return "Card";
});
$p.E = (function(n) {
  switch (n) {
    case 0: {
      return this.a8;
      break;
    }
    case 1: {
      return this.a7;
      break;
    }
    case 2: {
      return this.a6;
      break;
    }
    default: {
      throw new $c_jl_IndexOutOfBoundsException(("" + n));
    }
  }
});
$p.b6 = (function(self) {
  var $x_4 = $m_sr_ScalaRunTime$();
  var ms$proxy1 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(this.a8)]));
  var $x_3 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("h3", ms$proxy1));
  var ms$proxy2 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(this.a6)]));
  var $x_2 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy2));
  matchResult4: {
    var $x_1;
    var x5 = this.a7;
    if ((x5 instanceof $c_s_Some)) {
      var text = x5.T;
      var ms$proxy3 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(text)]));
      var $x_1 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy3));
      break matchResult4;
    }
    if (($m_s_None$() === x5)) {
      var $x_1 = new $c_Lpreact_modifier_ChildModifier((void 0));
      break matchResult4;
    }
    throw new $c_s_MatchError(x5);
  }
  var ms$proxy4 = $x_4.l(new $ac_O([$x_3, $x_2, $x_1]));
  return $m_Lpreact_test_test$package$().j("div", ms$proxy4);
});
var $d_Lpreact_test_Card = new $TypeData().i($c_Lpreact_test_Card, "preact.test.Card", ({
  au: 1,
  d: 1,
  l: 1,
  a: 1
}));
/** @constructor */
function $c_Lpreact_test_Card2(title, footer, children) {
  this.R = null;
  this.Q = null;
  this.F = null;
  this.R = title;
  this.Q = footer;
  this.F = children;
}
$p = $c_Lpreact_test_Card2.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card2;
/** @constructor */
function $h_Lpreact_test_Card2() {
}
$h_Lpreact_test_Card2.prototype = $p;
$p.X = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.n = (function() {
  return $m_s_util_hashing_MurmurHash3$().al(this, (-110178308), true);
});
$p.k = (function() {
  return $m_sr_ScalaRunTime$().ah(this);
});
$p.D = (function() {
  return 3;
});
$p.z = (function() {
  return "Card2";
});
$p.E = (function(n) {
  switch (n) {
    case 0: {
      return this.R;
      break;
    }
    case 1: {
      return this.Q;
      break;
    }
    case 2: {
      return this.F;
      break;
    }
    default: {
      throw new $c_jl_IndexOutOfBoundsException(("" + n));
    }
  }
});
$p.b7 = (function() {
  var $x_4 = $m_sr_ScalaRunTime$();
  var ms$proxy5 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(this.R)]));
  var $x_3 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("h3", ms$proxy5));
  var ms$proxy6 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(this.F)]));
  var $x_2 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy6));
  matchResult10: {
    var $x_1;
    var x16 = this.Q;
    if ((x16 instanceof $c_s_Some)) {
      var text = x16.T;
      var ms$proxy7 = $m_sr_ScalaRunTime$().l(new $ac_O([new $c_Lpreact_modifier_ChildModifier(text)]));
      var $x_1 = new $c_Lpreact_modifier_ChildModifier($m_Lpreact_test_test$package$().j("div", ms$proxy7));
      break matchResult10;
    }
    if (($m_s_None$() === x16)) {
      var $x_1 = new $c_Lpreact_modifier_ChildModifier((void 0));
      break matchResult10;
    }
    throw new $c_s_MatchError(x16);
  }
  var ms$proxy8 = $x_4.l(new $ac_O([$x_3, $x_2, $x_1]));
  return $m_Lpreact_test_test$package$().j("div", ms$proxy8);
});
$p.aN = (function(mod) {
  if ((mod instanceof $c_Lpreact_modifier_AttributeModifier)) {
    var x19 = mod.O;
    if ((x19 === "title")) {
      return new $c_Lpreact_test_Card2(mod.A, this.Q, this.F);
    }
    if ((x19 === "footer")) {
      var footer$1 = new $c_s_Some(mod.A);
      return new $c_Lpreact_test_Card2(this.R, footer$1, this.F);
    }
    return this;
  }
  if ((mod instanceof $c_Lpreact_modifier_ChildModifier)) {
    var children$2 = this.F.concat([mod.P]);
    return new $c_Lpreact_test_Card2(this.R, this.Q, children$2);
  }
  throw new $c_s_MatchError(mod);
});
var $d_Lpreact_test_Card2 = new $TypeData().i($c_Lpreact_test_Card2, "preact.test.Card2", ({
  aw: 1,
  d: 1,
  l: 1,
  a: 1
}));
/** @constructor */
function $c_sc_AbstractIterator() {
}
$p = $c_sc_AbstractIterator.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterator;
/** @constructor */
function $h_sc_AbstractIterator() {
}
$h_sc_AbstractIterator.prototype = $p;
$p.u = (function() {
  return (-1);
});
$p.ai = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.t = (function() {
  return this;
});
$p.k = (function() {
  return "<iterator>";
});
function $isArrayOf_s_util_CommandLineParser$ParseError(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bA)));
}
function $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, out) {
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_FilterOutputStream() {
}
$p = $c_Ljava_io_FilterOutputStream.prototype = new $h_Ljava_io_OutputStream();
$p.constructor = $c_Ljava_io_FilterOutputStream;
/** @constructor */
function $h_Ljava_io_FilterOutputStream() {
}
$h_Ljava_io_FilterOutputStream.prototype = $p;
class $c_jl_ArithmeticException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_ArithmeticException = new $TypeData().i($c_jl_ArithmeticException, "java.lang.ArithmeticException", ({
  a7: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
function $f_jl_Byte__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Byte__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Byte = new $TypeData().i(0, "java.lang.Byte", ({
  a9: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1
}), ((x) => $isByte(x)));
class $c_jl_IllegalArgumentException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_IllegalArgumentException = new $TypeData().i($c_jl_IllegalArgumentException, "java.lang.IllegalArgumentException", ({
  ac: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
class $c_jl_IndexOutOfBoundsException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_IndexOutOfBoundsException = new $TypeData().i($c_jl_IndexOutOfBoundsException, "java.lang.IndexOutOfBoundsException", ({
  ad: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream$DummyOutputStream() {
}
$p = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype = new $h_Ljava_io_OutputStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream$DummyOutputStream() {
}
$h_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype = $p;
var $d_jl_JSConsoleBasedPrintStream$DummyOutputStream = new $TypeData().i($c_jl_JSConsoleBasedPrintStream$DummyOutputStream, "java.lang.JSConsoleBasedPrintStream$DummyOutputStream", ({
  ag: 1,
  L: 1,
  J: 1,
  N: 1,
  K: 1
}));
class $c_jl_NegativeArraySizeException extends $c_jl_RuntimeException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
var $d_jl_NegativeArraySizeException = new $TypeData().i($c_jl_NegativeArraySizeException, "java.lang.NegativeArraySizeException", ({
  ah: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
class $c_jl_NullPointerException extends $c_jl_RuntimeException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
var $d_jl_NullPointerException = new $TypeData().i($c_jl_NullPointerException, "java.lang.NullPointerException", ({
  ai: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
function $f_jl_Short__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Short__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Short = new $TypeData().i(0, "java.lang.Short", ({
  aj: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1
}), ((x) => $isShort(x)));
class $c_jl_UnsupportedOperationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_UnsupportedOperationException = new $TypeData().i($c_jl_UnsupportedOperationException, "java.lang.UnsupportedOperationException", ({
  an: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
class $c_ju_NoSuchElementException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_ju_NoSuchElementException = new $TypeData().i($c_ju_NoSuchElementException, "java.util.NoSuchElementException", ({
  aq: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
function $p_s_MatchError__objString__T($thiz) {
  if ((!$thiz.as)) {
    if (($thiz.a0 === null)) {
      var $x_1 = "null";
    } else {
      try {
        var $x_1 = ((($thiz.a0 + " (") + $p_s_MatchError__ofClass$1__T($thiz)) + ")");
      } catch (e) {
        var $x_1 = ("an instance " + $p_s_MatchError__ofClass$1__T($thiz));
      }
    }
    $thiz.ar = $x_1;
    $thiz.as = true;
  }
  return $thiz.ar;
}
function $p_s_MatchError__ofClass$1__T($thiz) {
  var this$1 = $thiz.a0;
  return ("of class " + $objectClassName(this$1));
}
class $c_s_MatchError extends $c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.a0 = null;
    this.ar = null;
    this.as = false;
    this.a0 = obj;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  ak() {
    return $p_s_MatchError__objString__T(this);
  }
}
var $d_s_MatchError = new $TypeData().i($c_s_MatchError, "scala.MatchError", ({
  aC: 1,
  i: 1,
  h: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_s_Option() {
}
$p = $c_s_Option.prototype = new $h_O();
$p.constructor = $c_s_Option;
/** @constructor */
function $h_s_Option() {
}
$h_s_Option.prototype = $p;
$p.X = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.w = (function() {
  return (this === $m_s_None$());
});
$p.u = (function() {
  return (this.w() ? 0 : 1);
});
$p.t = (function() {
  return (this.w() ? $m_sc_Iterator$().H : new $c_sc_Iterator$$anon$20(this.aD()));
});
/** @constructor */
function $c_s_Product$$anon$1(outer) {
  this.S = 0;
  this.au = 0;
  this.at = null;
  if ((outer === null)) {
    throw new $c_jl_NullPointerException();
  }
  this.at = outer;
  this.S = 0;
  this.au = outer.D();
}
$p = $c_s_Product$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_s_Product$$anon$1;
/** @constructor */
function $h_s_Product$$anon$1() {
}
$h_s_Product$$anon$1.prototype = $p;
$p.q = (function() {
  return (this.S < this.au);
});
$p.m = (function() {
  var result = this.at.E(this.S);
  this.S = ((1 + this.S) | 0);
  return result;
});
var $d_s_Product$$anon$1 = new $TypeData().i($c_s_Product$$anon$1, "scala.Product$$anon$1", ({
  aE: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, ($thiz.a5() + "("), ", ", ")");
}
/** @constructor */
function $c_sc_Iterator$$anon$19() {
}
$p = $c_sc_Iterator$$anon$19.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$19;
/** @constructor */
function $h_sc_Iterator$$anon$19() {
}
$h_sc_Iterator$$anon$19.prototype = $p;
$p.q = (function() {
  return false;
});
$p.b1 = (function() {
  throw new $c_ju_NoSuchElementException("next on empty iterator");
});
$p.u = (function() {
  return 0;
});
$p.m = (function() {
  this.b1();
});
var $d_sc_Iterator$$anon$19 = new $TypeData().i($c_sc_Iterator$$anon$19, "scala.collection.Iterator$$anon$19", ({
  aR: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.aw = null;
  this.a3 = false;
  this.aw = a$2;
  this.a3 = false;
}
$p = $c_sc_Iterator$$anon$20.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$20;
/** @constructor */
function $h_sc_Iterator$$anon$20() {
}
$h_sc_Iterator$$anon$20.prototype = $p;
$p.q = (function() {
  return (!this.a3);
});
$p.m = (function() {
  if (this.a3) {
    return $m_sc_Iterator$().H.m();
  } else {
    this.a3 = true;
    return this.aw;
  }
});
var $d_sc_Iterator$$anon$20 = new $TypeData().i($c_sc_Iterator$$anon$20, "scala.collection.Iterator$$anon$20", ({
  aS: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if ((n < 0)) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  var skipped = $thiz.aT(n);
  if (skipped.w()) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  return skipped.W();
}
/** @constructor */
function $c_sc_StrictOptimizedLinearSeqOps$$anon$1(outer) {
  this.U = null;
  if ((outer === null)) {
    throw new $c_jl_NullPointerException();
  }
  this.U = outer;
}
$p = $c_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_StrictOptimizedLinearSeqOps$$anon$1;
/** @constructor */
function $h_sc_StrictOptimizedLinearSeqOps$$anon$1() {
}
$h_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = $p;
$p.q = (function() {
  return (!this.U.w());
});
$p.m = (function() {
  var r = this.U.W();
  this.U = this.U.M();
  return r;
});
var $d_sc_StrictOptimizedLinearSeqOps$$anon$1 = new $TypeData().i($c_sc_StrictOptimizedLinearSeqOps$$anon$1, "scala.collection.StrictOptimizedLinearSeqOps$$anon$1", ({
  aW: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $f_jl_Double__hashCode__I($thiz) {
  var valueInt = ($thiz | 0);
  if (((valueInt === $thiz) && ((1.0 / $thiz) !== (-Infinity)))) {
    return valueInt;
  } else if (($thiz !== $thiz)) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, $thiz, true);
    return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
  }
}
function $f_jl_Double__toString__T($thiz) {
  return ("" + $thiz);
}
function $isArrayOf_jl_Double(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.O)));
}
var $d_jl_Double = new $TypeData().i(0, "java.lang.Double", ({
  O: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1,
  s: 1
}), ((x) => ((typeof x) === "number")));
function $f_jl_Float__hashCode__I($thiz) {
  var value = $thiz;
  var valueInt = (value | 0);
  if (((valueInt === value) && ((1.0 / value) !== (-Infinity)))) {
    return valueInt;
  } else if ((value !== value)) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, value, true);
    return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
  }
}
function $f_jl_Float__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Float = new $TypeData().i(0, "java.lang.Float", ({
  ab: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1,
  s: 1
}), ((x) => $isFloat(x)));
function $f_jl_Integer__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Integer__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Integer = new $TypeData().i(0, "java.lang.Integer", ({
  ae: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1,
  s: 1
}), ((x) => $isInt(x)));
function $f_jl_Long__hashCode__I($thiz) {
  return ($thiz.b ^ $thiz.c);
}
function $f_jl_Long__toString__T($thiz) {
  return $m_RTLong$().aI($thiz.b, $thiz.c);
}
function $isArrayOf_jl_Long(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.P)));
}
var $d_jl_Long = new $TypeData().i(0, "java.lang.Long", ({
  P: 1,
  j: 1,
  a: 1,
  e: 1,
  g: 1,
  s: 1
}), ((x) => (x instanceof $c_RTLong)));
function $f_T__hashCode__I($thiz) {
  var n = $thiz.length;
  var h = 0;
  var i = 0;
  while ((i !== n)) {
    h = (((((h << 5) - h) | 0) + $thiz.charCodeAt(i)) | 0);
    i = ((1 + i) | 0);
  }
  return h;
}
function $f_T__toString__T($thiz) {
  return $thiz;
}
var $d_T = new $TypeData().i(0, "java.lang.String", ({
  ak: 1,
  a: 1,
  e: 1,
  F: 1,
  g: 1,
  s: 1
}), ((x) => ((typeof x) === "string")));
/** @constructor */
function $c_s_None$() {
}
$p = $c_s_None$.prototype = new $h_s_Option();
$p.constructor = $c_s_None$;
/** @constructor */
function $h_s_None$() {
}
$h_s_None$.prototype = $p;
$p.n = (function() {
  return 2433880;
});
$p.k = (function() {
  return "None";
});
$p.D = (function() {
  return 0;
});
$p.z = (function() {
  return "None";
});
$p.E = (function(n) {
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aW = (function() {
  throw new $c_ju_NoSuchElementException("None.get");
});
$p.aD = (function() {
  this.aW();
});
var $d_s_None$ = new $TypeData().i($c_s_None$, "scala.None$", ({
  aD: 1,
  T: 1,
  b: 1,
  d: 1,
  l: 1,
  a: 1
}));
var $n_s_None$;
function $m_s_None$() {
  if ((!$n_s_None$)) {
    $n_s_None$ = new $c_s_None$();
  }
  return $n_s_None$;
}
/** @constructor */
function $c_s_Some(value) {
  this.T = null;
  this.T = value;
}
$p = $c_s_Some.prototype = new $h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
$h_s_Some.prototype = $p;
$p.n = (function() {
  return $m_s_util_hashing_MurmurHash3$().al(this, 1323286827, true);
});
$p.k = (function() {
  return $m_sr_ScalaRunTime$().ah(this);
});
$p.D = (function() {
  return 1;
});
$p.z = (function() {
  return "Some";
});
$p.E = (function(n) {
  if ((n === 0)) {
    return this.T;
  }
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aD = (function() {
  return this.T;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.U)));
}
var $d_s_Some = new $TypeData().i($c_s_Some, "scala.Some", ({
  U: 1,
  T: 1,
  b: 1,
  d: 1,
  l: 1,
  a: 1
}));
/** @constructor */
function $c_sc_AbstractIterable() {
}
$p = $c_sc_AbstractIterable.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {
}
$h_sc_AbstractIterable.prototype = $p;
$p.u = (function() {
  return (-1);
});
$p.L = (function(f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
});
$p.ai = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.a5 = (function() {
  return this.Z();
});
/** @constructor */
function $c_sc_ArrayOps$ArrayIterator(xs) {
  this.a1 = null;
  this.B = 0;
  this.aa = 0;
  this.a1 = xs;
  this.B = 0;
  this.aa = $m_jl_reflect_Array$().aj(this.a1);
}
$p = $c_sc_ArrayOps$ArrayIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_ArrayOps$ArrayIterator;
/** @constructor */
function $h_sc_ArrayOps$ArrayIterator() {
}
$h_sc_ArrayOps$ArrayIterator.prototype = $p;
$p.u = (function() {
  return ((this.aa - this.B) | 0);
});
$p.q = (function() {
  return (this.B < this.aa);
});
$p.m = (function() {
  if ((this.B >= $m_jl_reflect_Array$().aj(this.a1))) {
    $m_sc_Iterator$().H.m();
  }
  var r = $m_sr_ScalaRunTime$().K(this.a1, this.B);
  this.B = ((1 + this.B) | 0);
  return r;
});
var $d_sc_ArrayOps$ArrayIterator = new $TypeData().i($c_sc_ArrayOps$ArrayIterator, "scala.collection.ArrayOps$ArrayIterator", ({
  aH: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1,
  a: 1
}));
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator(self) {
  this.av = null;
  this.a2 = 0;
  this.G = 0;
  this.av = self;
  this.a2 = 0;
  this.G = self.s();
}
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {
}
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.u = (function() {
  return this.G;
});
$p.q = (function() {
  return (this.G > 0);
});
$p.m = (function() {
  if ((this.G > 0)) {
    var r = this.av.p(this.a2);
    this.a2 = ((1 + this.a2) | 0);
    this.G = (((-1) + this.G) | 0);
    return r;
  } else {
    return $m_sc_Iterator$().H.m();
  }
});
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $TypeData().i($c_sc_IndexedSeqView$IndexedSeqViewIterator, "scala.collection.IndexedSeqView$IndexedSeqViewIterator", ({
  aO: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1,
  a: 1
}));
function $p_sci_ArraySeq$__emptyImpl__sci_ArraySeq$ofRef($thiz) {
  if ((!$thiz.az)) {
    $thiz.ay = new $c_sci_ArraySeq$ofRef(new ($d_sr_Nothing$.r().C)(0));
    $thiz.az = true;
  }
  return $thiz.ay;
}
/** @constructor */
function $c_sci_ArraySeq$() {
  this.ay = null;
  this.az = false;
}
$p = $c_sci_ArraySeq$.prototype = new $h_O();
$p.constructor = $c_sci_ArraySeq$;
/** @constructor */
function $h_sci_ArraySeq$() {
}
$h_sci_ArraySeq$.prototype = $p;
var $d_sci_ArraySeq$ = new $TypeData().i($c_sci_ArraySeq$, "scala.collection.immutable.ArraySeq$", ({
  b1: 1,
  a: 1,
  aK: 1,
  aI: 1,
  aJ: 1,
  aV: 1
}));
var $n_sci_ArraySeq$;
function $m_sci_ArraySeq$() {
  if ((!$n_sci_ArraySeq$)) {
    $n_sci_ArraySeq$ = new $c_sci_ArraySeq$();
  }
  return $n_sci_ArraySeq$;
}
function $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__($thiz, _out, autoFlush, charset) {
  $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, _out);
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_PrintStream() {
}
$p = $c_Ljava_io_PrintStream.prototype = new $h_Ljava_io_FilterOutputStream();
$p.constructor = $c_Ljava_io_PrintStream;
/** @constructor */
function $h_Ljava_io_PrintStream() {
}
$h_Ljava_io_PrintStream.prototype = $p;
function $f_sc_View__toString__T($thiz) {
  return ($thiz.Z() + "(<not computed>)");
}
/** @constructor */
function $c_s_reflect_ManifestFactory$ClassTypeManifest() {
}
$p = $c_s_reflect_ManifestFactory$ClassTypeManifest.prototype = new $h_O();
$p.constructor = $c_s_reflect_ManifestFactory$ClassTypeManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$ClassTypeManifest() {
}
$h_s_reflect_ManifestFactory$ClassTypeManifest.prototype = $p;
function $isArrayOf_sjs_js_JavaScriptException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bv)));
}
function $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V($thiz, line) {
  if (((typeof console) !== "undefined")) {
    if (($thiz.am && (!(!(!(!console.error)))))) {
      console.error(line);
    } else {
      console.log(line);
    }
  }
}
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream(isErr) {
  this.am = false;
  this.N = null;
  this.am = isErr;
  $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__(this, new $c_jl_JSConsoleBasedPrintStream$DummyOutputStream(), false, null);
  this.N = "";
}
$p = $c_jl_JSConsoleBasedPrintStream.prototype = new $h_Ljava_io_PrintStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream() {
}
$h_jl_JSConsoleBasedPrintStream.prototype = $p;
$p.f = (function(s) {
  var rest = s;
  while ((rest !== "")) {
    var this$1 = rest;
    var nlPos = (this$1.indexOf("\n") | 0);
    if ((nlPos < 0)) {
      this.N = (("" + this.N) + rest);
      rest = "";
    } else {
      var $x_1 = this.N;
      var this$2 = rest;
      $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V(this, (("" + $x_1) + this$2.substring(0, nlPos)));
      this.N = "";
      var this$3 = rest;
      var beginIndex = ((1 + nlPos) | 0);
      rest = this$3.substring(beginIndex);
    }
  }
});
var $d_jl_JSConsoleBasedPrintStream = new $TypeData().i($c_jl_JSConsoleBasedPrintStream, "java.lang.JSConsoleBasedPrintStream", ({
  af: 1,
  a6: 1,
  a5: 1,
  L: 1,
  J: 1,
  N: 1,
  K: 1,
  M: 1
}));
function $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq($thiz, n, s) {
  var s$tailLocal1 = s;
  var n$tailLocal1 = n;
  while (true) {
    if (((n$tailLocal1 <= 0) || s$tailLocal1.w())) {
      return s$tailLocal1;
    } else {
      var n$tailLocal1$tmp1 = (((-1) + n$tailLocal1) | 0);
      var s$tailLocal1$tmp1 = s$tailLocal1.M();
      n$tailLocal1 = n$tailLocal1$tmp1;
      s$tailLocal1 = s$tailLocal1$tmp1;
    }
  }
}
/** @constructor */
function $c_s_reflect_ManifestFactory$PhantomManifest() {
  this.ad = null;
}
$p = $c_s_reflect_ManifestFactory$PhantomManifest.prototype = new $h_s_reflect_ManifestFactory$ClassTypeManifest();
$p.constructor = $c_s_reflect_ManifestFactory$PhantomManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$PhantomManifest() {
}
$h_s_reflect_ManifestFactory$PhantomManifest.prototype = $p;
$p.k = (function() {
  return this.ad;
});
$p.n = (function() {
  return $systemIdentityHashCode(this);
});
/** @constructor */
function $c_sc_AbstractView() {
}
$p = $c_sc_AbstractView.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractView;
/** @constructor */
function $h_sc_AbstractView() {
}
$h_sc_AbstractView.prototype = $p;
$p.k = (function() {
  return $f_sc_View__toString__T(this);
});
/** @constructor */
function $c_s_reflect_ManifestFactory$ObjectManifest$() {
  this.ad = null;
  this.ad = "Object";
  $m_sci_Nil$();
}
$p = $c_s_reflect_ManifestFactory$ObjectManifest$.prototype = new $h_s_reflect_ManifestFactory$PhantomManifest();
$p.constructor = $c_s_reflect_ManifestFactory$ObjectManifest$;
/** @constructor */
function $h_s_reflect_ManifestFactory$ObjectManifest$() {
}
$h_s_reflect_ManifestFactory$ObjectManifest$.prototype = $p;
var $d_s_reflect_ManifestFactory$ObjectManifest$ = new $TypeData().i($c_s_reflect_ManifestFactory$ObjectManifest$, "scala.reflect.ManifestFactory$ObjectManifest$", ({
  bl: 1,
  bm: 1,
  bk: 1,
  a: 1,
  bn: 1,
  bh: 1,
  d: 1,
  bi: 1,
  bj: 1
}));
var $n_s_reflect_ManifestFactory$ObjectManifest$;
function $m_s_reflect_ManifestFactory$ObjectManifest$() {
  if ((!$n_s_reflect_ManifestFactory$ObjectManifest$)) {
    $n_s_reflect_ManifestFactory$ObjectManifest$ = new $c_s_reflect_ManifestFactory$ObjectManifest$();
  }
  return $n_s_reflect_ManifestFactory$ObjectManifest$;
}
/** @constructor */
function $c_sc_AbstractSeq() {
}
$p = $c_sc_AbstractSeq.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractSeq;
/** @constructor */
function $h_sc_AbstractSeq() {
}
$h_sc_AbstractSeq.prototype = $p;
$p.n = (function() {
  return $m_s_util_hashing_MurmurHash3$().aJ(this);
});
$p.k = (function() {
  return $f_sc_Iterable__toString__T(this);
});
/** @constructor */
function $c_sc_AbstractSeqView() {
}
$p = $c_sc_AbstractSeqView.prototype = new $h_sc_AbstractView();
$p.constructor = $c_sc_AbstractSeqView;
/** @constructor */
function $h_sc_AbstractSeqView() {
}
$h_sc_AbstractSeqView.prototype = $p;
function $is_sc_IndexedSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.v)));
}
function $isArrayOf_sc_IndexedSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.v)));
}
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.a4 = underlying;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqView$Id() {
  this.a4 = null;
}
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {
}
$h_sc_SeqView$Id.prototype = $p;
$p.p = (function(idx) {
  return this.a4.p(idx);
});
$p.s = (function() {
  return this.a4.s();
});
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.a4 = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {
}
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.u = (function() {
  return this.s();
});
$p.t = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(this);
});
$p.Z = (function() {
  return "IndexedSeqView";
});
var $d_sc_IndexedSeqView$Id = new $TypeData().i($c_sc_IndexedSeqView$Id, "scala.collection.IndexedSeqView$Id", ({
  aN: 1,
  aU: 1,
  aF: 1,
  aG: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  a: 1,
  aY: 1,
  r: 1,
  aT: 1,
  y: 1,
  aM: 1
}));
/** @constructor */
function $c_sci_AbstractSeq() {
}
$p = $c_sci_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_sci_AbstractSeq;
/** @constructor */
function $h_sci_AbstractSeq() {
}
$h_sci_AbstractSeq.prototype = $p;
/** @constructor */
function $c_scm_AbstractSeq() {
}
$p = $c_scm_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_scm_AbstractSeq;
/** @constructor */
function $h_scm_AbstractSeq() {
}
$h_scm_AbstractSeq.prototype = $p;
/** @constructor */
function $c_sjsr_WrappedVarArgs(array) {
  this.ae = null;
  this.ae = array;
}
$p = $c_sjsr_WrappedVarArgs.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs;
/** @constructor */
function $h_sjsr_WrappedVarArgs() {
}
$h_sjsr_WrappedVarArgs.prototype = $p;
$p.t = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.u = (function() {
  return this.s();
});
$p.n = (function() {
  return $m_s_util_hashing_MurmurHash3$().aJ(this);
});
$p.k = (function() {
  return $f_sc_Iterable__toString__T(this);
});
$p.L = (function(f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
});
$p.ai = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.s = (function() {
  return (this.ae.length | 0);
});
$p.p = (function(idx) {
  return this.ae[idx];
});
$p.a5 = (function() {
  return "WrappedVarArgs";
});
$p.C = (function(v1) {
  return this.p((v1 | 0));
});
var $d_sjsr_WrappedVarArgs = new $TypeData().i($c_sjsr_WrappedVarArgs, "scala.scalajs.runtime.WrappedVarArgs", ({
  by: 1,
  Z: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  B: 1,
  k: 1,
  t: 1,
  r: 1,
  d: 1,
  w: 1,
  D: 1,
  C: 1,
  y: 1,
  v: 1,
  a0: 1,
  E: 1,
  z: 1,
  A: 1,
  a: 1
}));
/** @constructor */
function $c_sci_ArraySeq() {
}
$p = $c_sci_ArraySeq.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_ArraySeq;
/** @constructor */
function $h_sci_ArraySeq() {
}
$h_sci_ArraySeq.prototype = $p;
$p.u = (function() {
  return this.I.a.length;
});
$p.Z = (function() {
  return "IndexedSeq";
});
$p.a5 = (function() {
  return "ArraySeq";
});
/** @constructor */
function $c_sci_ArraySeq$ofRef(unsafeArray) {
  this.I = null;
  this.I = unsafeArray;
}
$p = $c_sci_ArraySeq$ofRef.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofRef;
/** @constructor */
function $h_sci_ArraySeq$ofRef() {
}
$h_sci_ArraySeq$ofRef.prototype = $p;
$p.s = (function() {
  return this.I.a.length;
});
$p.p = (function(i) {
  return this.I.a[i];
});
$p.n = (function() {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.aO(this.I, this$1.V);
});
$p.t = (function() {
  return new $c_sc_ArrayOps$ArrayIterator(this.I);
});
$p.C = (function(v1) {
  return this.p((v1 | 0));
});
var $d_sci_ArraySeq$ofRef = new $TypeData().i($c_sci_ArraySeq$ofRef, "scala.collection.immutable.ArraySeq$ofRef", ({
  b2: 1,
  b0: 1,
  H: 1,
  x: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  k: 1,
  t: 1,
  r: 1,
  d: 1,
  w: 1,
  B: 1,
  D: 1,
  C: 1,
  y: 1,
  v: 1,
  a0: 1,
  Z: 1,
  z: 1,
  A: 1,
  E: 1,
  aL: 1,
  a: 1
}));
/** @constructor */
function $c_sci_List() {
}
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {
}
$h_sci_List.prototype = $p;
$p.p = (function(n) {
  return $f_sc_LinearSeqOps__apply__I__O(this, n);
});
$p.Z = (function() {
  return "LinearSeq";
});
$p.t = (function() {
  return new $c_sc_StrictOptimizedLinearSeqOps$$anon$1(this);
});
$p.w = (function() {
  return (this === $m_sci_Nil$());
});
$p.L = (function(f) {
  var these = this;
  while ((!these.w())) {
    f.C(these.W());
    these = these.M();
  }
});
$p.s = (function() {
  var these = this;
  var len = 0;
  while ((!these.w())) {
    len = ((1 + len) | 0);
    these = these.M();
  }
  return len;
});
$p.a5 = (function() {
  return "List";
});
$p.aT = (function(n) {
  return $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(this, n, this);
});
$p.C = (function(v1) {
  return $f_sc_LinearSeqOps__apply__I__O(this, (v1 | 0));
});
function $isArrayOf_sci_List(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.I)));
}
/** @constructor */
function $c_sci_$colon$colon(head, next) {
  this.ab = null;
  this.ac = null;
  this.ab = head;
  this.ac = next;
}
$p = $c_sci_$colon$colon.prototype = new $h_sci_List();
$p.constructor = $c_sci_$colon$colon;
/** @constructor */
function $h_sci_$colon$colon() {
}
$h_sci_$colon$colon.prototype = $p;
$p.X = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.D = (function() {
  return 2;
});
$p.z = (function() {
  return "::";
});
$p.E = (function(n) {
  if ((n === 0)) {
    return this.ab;
  }
  if ((n === 1)) {
    return this.ac;
  }
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.W = (function() {
  return this.ab;
});
$p.M = (function() {
  return this.ac;
});
var $d_sci_$colon$colon = new $TypeData().i($c_sci_$colon$colon, "scala.collection.immutable.$colon$colon", ({
  aZ: 1,
  I: 1,
  H: 1,
  x: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  k: 1,
  t: 1,
  r: 1,
  d: 1,
  w: 1,
  B: 1,
  D: 1,
  C: 1,
  W: 1,
  V: 1,
  a2: 1,
  a1: 1,
  z: 1,
  A: 1,
  X: 1,
  E: 1,
  a: 1,
  Y: 1,
  l: 1
}));
/** @constructor */
function $c_sci_Nil$() {
  $n_sci_Nil$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
$p = $c_sci_Nil$.prototype = new $h_sci_List();
$p.constructor = $c_sci_Nil$;
/** @constructor */
function $h_sci_Nil$() {
}
$h_sci_Nil$.prototype = $p;
$p.X = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.D = (function() {
  return 0;
});
$p.z = (function() {
  return "Nil";
});
$p.E = (function(n) {
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aX = (function() {
  throw new $c_ju_NoSuchElementException("head of empty list");
});
$p.bb = (function() {
  throw new $c_jl_UnsupportedOperationException("tail of empty list");
});
$p.u = (function() {
  return 0;
});
$p.t = (function() {
  return $m_sc_Iterator$().H;
});
$p.W = (function() {
  this.aX();
});
$p.M = (function() {
  this.bb();
});
var $d_sci_Nil$ = new $TypeData().i($c_sci_Nil$, "scala.collection.immutable.Nil$", ({
  b3: 1,
  I: 1,
  H: 1,
  x: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  k: 1,
  t: 1,
  r: 1,
  d: 1,
  w: 1,
  B: 1,
  D: 1,
  C: 1,
  W: 1,
  V: 1,
  a2: 1,
  a1: 1,
  z: 1,
  A: 1,
  X: 1,
  E: 1,
  a: 1,
  Y: 1,
  l: 1
}));
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if ((!$n_sci_Nil$)) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.y = underlying;
  return $thiz;
}
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, $ct_jl_StringBuilder__(new $c_jl_StringBuilder()));
  return $thiz;
}
/** @constructor */
function $c_scm_StringBuilder() {
  this.y = null;
}
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {
}
$h_scm_StringBuilder.prototype = $p;
$p.t = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.Z = (function() {
  return "IndexedSeq";
});
$p.s = (function() {
  return this.y.s();
});
$p.u = (function() {
  return this.y.s();
});
$p.k = (function() {
  return this.y.h;
});
$p.p = (function(i) {
  return $bC(this.y.aC(i));
});
$p.C = (function(v1) {
  var i = (v1 | 0);
  return $bC(this.y.aC(i));
});
var $d_scm_StringBuilder = new $TypeData().i($c_scm_StringBuilder, "scala.collection.mutable.StringBuilder", ({
  bf: 1,
  b4: 1,
  x: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  k: 1,
  t: 1,
  r: 1,
  d: 1,
  w: 1,
  bb: 1,
  G: 1,
  b7: 1,
  be: 1,
  bd: 1,
  b6: 1,
  b8: 1,
  b5: 1,
  bc: 1,
  y: 1,
  v: 1,
  ba: 1,
  b9: 1,
  F: 1,
  a: 1
}));
$L0 = new $c_RTLong(0, 0);
$d_J.z = $L0;
let $e_createAndUseTestObj = (function() {
  return $m_Ljs\uff3ftests_js\uff3ftests$package$().aP();
});
export { $e_createAndUseTestObj as createAndUseTestObj };
let $e_renderApp = (function() {
  $m_Lpreact_test_test$package$().b8();
});
export { $e_renderApp as renderApp };
$s_Lmacro\uff3ftest_run__main__AT__V(new ($d_T.r().C)([]));
