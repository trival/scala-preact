'use strict';
import * as $i_$0040preact$002fsignals from "@preact/signals";
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
  return (arg0.$classData.Z ? arg0.H() : $objectClone(arg0));
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
        return null.bR();
      }
    }
  }
}
function $dp_equals__O__Z(instance, x0) {
  switch ((typeof instance)) {
    case "string": {
      return $f_T__equals__O__Z(instance, x0);
    }
    case "number": {
      return $f_jl_Double__equals__O__Z(instance, x0);
    }
    case "boolean": {
      return $f_jl_Boolean__equals__O__Z(instance, x0);
    }
    case "undefined": {
      return $f_jl_Void__equals__O__Z(instance, x0);
    }
    default: {
      if (((!(!(instance && instance.$classData))) || (instance === null))) {
        return instance.A(x0);
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__equals__O__Z(instance, x0);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__equals__O__Z($uC(instance), x0);
      } else {
        return $c_O.prototype.A.call(instance, x0);
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
        return instance.I();
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__hashCode__I(instance);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__hashCode__I($uC(instance));
      } else {
        return $c_O.prototype.I.call(instance);
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
$p.I = (function() {
  return $systemIdentityHashCode(this);
});
$p.A = (function(that) {
  return (this === that);
});
$p.p = (function() {
  var i = this.I();
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.toString = (function() {
  return this.p();
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
$p.P = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
$p.P = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.H = (function() {
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
    H: 1,
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
  $p.P = (function(srcPos, dest, destPos, length) {
    $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
  });
  $p.H = (function() {
    return new ArrayClass(this.a.slice());
  });
  $p.$classData = this;
  var arrayBase = (componentData.B || componentData);
  var arrayDepth = (componentData.D + 1);
  var name = ("[" + componentData.E);
  this.C = ArrayClass;
  this.n = ({
    H: 1,
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
  this.aC = null;
  this.ba = null;
  $n_jl_System$Streams$ = this;
  this.aC = new $c_jl_JSConsoleBasedPrintStream(false);
  this.ba = new $c_jl_JSConsoleBasedPrintStream(true);
}
$p = $c_jl_System$Streams$.prototype = new $h_O();
$p.constructor = $c_jl_System$Streams$;
/** @constructor */
function $h_jl_System$Streams$() {
}
$h_jl_System$Streams$.prototype = $p;
var $d_jl_System$Streams$ = new $TypeData().i($c_jl_System$Streams$, "java.lang.System$Streams$", ({
  as: 1
}));
var $n_jl_System$Streams$;
function $m_jl_System$Streams$() {
  if ((!$n_jl_System$Streams$)) {
    $n_jl_System$Streams$ = new $c_jl_System$Streams$();
  }
  return $n_jl_System$Streams$;
}
function $p_jl_System$SystemProperties$__loadSystemProperties__O($thiz) {
  var result = ({});
  result["java.version"] = "1.8";
  result["java.vm.specification.version"] = "1.8";
  result["java.vm.specification.vendor"] = "Oracle Corporation";
  result["java.vm.specification.name"] = "Java Virtual Machine Specification";
  result["java.vm.name"] = "Scala.js";
  result["java.vm.version"] = "1.20.1";
  result["java.specification.version"] = "1.8";
  result["java.specification.vendor"] = "Oracle Corporation";
  result["java.specification.name"] = "Java Platform API Specification";
  result["file.separator"] = "/";
  result["path.separator"] = ":";
  result["line.separator"] = "\n";
  return result;
}
/** @constructor */
function $c_jl_System$SystemProperties$() {
  this.am = null;
  this.aD = null;
  $n_jl_System$SystemProperties$ = this;
  this.am = $p_jl_System$SystemProperties$__loadSystemProperties__O(this);
  this.aD = null;
}
$p = $c_jl_System$SystemProperties$.prototype = new $h_O();
$p.constructor = $c_jl_System$SystemProperties$;
/** @constructor */
function $h_jl_System$SystemProperties$() {
}
$h_jl_System$SystemProperties$.prototype = $p;
$p.b2 = (function(key, default$1) {
  if ((this.am !== null)) {
    var dict = this.am;
    return ((!(!$m_jl_Utils$Cache$().aF.call(dict, key))) ? dict[key] : default$1);
  } else {
    return this.aD.b2(key, default$1);
  }
});
var $d_jl_System$SystemProperties$ = new $TypeData().i($c_jl_System$SystemProperties$, "java.lang.System$SystemProperties$", ({
  at: 1
}));
var $n_jl_System$SystemProperties$;
function $m_jl_System$SystemProperties$() {
  if ((!$n_jl_System$SystemProperties$)) {
    $n_jl_System$SystemProperties$ = new $c_jl_System$SystemProperties$();
  }
  return $n_jl_System$SystemProperties$;
}
/** @constructor */
function $c_jl_Utils$Cache$() {
  this.aF = null;
  $n_jl_Utils$Cache$ = this;
  this.aF = Object.prototype.hasOwnProperty;
}
$p = $c_jl_Utils$Cache$.prototype = new $h_O();
$p.constructor = $c_jl_Utils$Cache$;
/** @constructor */
function $h_jl_Utils$Cache$() {
}
$h_jl_Utils$Cache$.prototype = $p;
var $d_jl_Utils$Cache$ = new $TypeData().i($c_jl_Utils$Cache$, "java.lang.Utils$Cache$", ({
  av: 1
}));
var $n_jl_Utils$Cache$;
function $m_jl_Utils$Cache$() {
  if ((!$n_jl_Utils$Cache$)) {
    $n_jl_Utils$Cache$ = new $c_jl_Utils$Cache$();
  }
  return $n_jl_Utils$Cache$;
}
function $f_jl_Void__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_jl_Void__hashCode__I($thiz) {
  return 0;
}
function $f_jl_Void__toString__T($thiz) {
  return "undefined";
}
var $d_jl_Void = new $TypeData().i(0, "java.lang.Void", ({
  aw: 1
}), ((x) => (x === (void 0))));
function $p_jl_reflect_Array$__mismatch__O__E($thiz, array) {
  throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), "argument type mismatch");
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
$p.az = (function(array) {
  return ((array instanceof $ac_O) ? array.a.length : ((array instanceof $ac_Z) ? array.a.length : ((array instanceof $ac_C) ? array.a.length : ((array instanceof $ac_B) ? array.a.length : ((array instanceof $ac_S) ? array.a.length : ((array instanceof $ac_I) ? array.a.length : ((array instanceof $ac_J) ? array.a.length : ((array instanceof $ac_F) ? array.a.length : ((array instanceof $ac_D) ? array.a.length : $p_jl_reflect_Array$__mismatch__O__E(this, array))))))))));
});
var $d_jl_reflect_Array$ = new $TypeData().i($c_jl_reflect_Array$, "java.lang.reflect.Array$", ({
  ax: 1
}));
var $n_jl_reflect_Array$;
function $m_jl_reflect_Array$() {
  if ((!$n_jl_reflect_Array$)) {
    $n_jl_reflect_Array$ = new $c_jl_reflect_Array$();
  }
  return $n_jl_reflect_Array$;
}
/** @constructor */
function $c_ju_Arrays$() {
}
$p = $c_ju_Arrays$.prototype = new $h_O();
$p.constructor = $c_ju_Arrays$;
/** @constructor */
function $h_ju_Arrays$() {
}
$h_ju_Arrays$.prototype = $p;
$p.bd = (function(a, key) {
  var startIndex = 0;
  var endIndex = a.a.length;
  while (true) {
    if ((startIndex === endIndex)) {
      return (((-1) - startIndex) | 0);
    } else {
      var mid = ((((startIndex + endIndex) | 0) >>> 1) | 0);
      var elem = a.a[mid];
      var cmp = ((key === elem) ? 0 : ((key < elem) ? (-1) : 1));
      if ((cmp < 0)) {
        endIndex = mid;
      } else if ((cmp === 0)) {
        return mid;
      } else {
        startIndex = ((1 + mid) | 0);
      }
    }
  }
});
var $d_ju_Arrays$ = new $TypeData().i($c_ju_Arrays$, "java.util.Arrays$", ({
  ay: 1
}));
var $n_ju_Arrays$;
function $m_ju_Arrays$() {
  if ((!$n_ju_Arrays$)) {
    $n_ju_Arrays$ = new $c_ju_Arrays$();
  }
  return $n_ju_Arrays$;
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
$p.bK = (function(obj) {
  var $x_1 = obj.foo;
  var x = obj.bar;
  var x$1 = ((x === (void 0)) ? (void 0) : ("bar:: " + (x | 0)));
  return (((((((("foo:: " + $x_1) + " - ") + ((x$1 === (void 0)) ? "no bar" : x$1)) + " - data:: ") + obj.data.value) + " (") + (obj.data.count | 0)) + ")");
});
$p.bf = (function() {
  var $x_1 = $m_Ljs\uff3ftests_js\uff3ftests$package$();
  var _2 = new ($a_Ljs\uff3ftests_Data())("sample", 42);
  return $x_1.bK(({
    "foo": "Hello, Scala.js!",
    "data": _2
  }));
});
var $d_Ljs\uff3ftests_js\uff3ftests$package$ = new $TypeData().i($c_Ljs\uff3ftests_js\uff3ftests$package$, "js_tests.js_tests$package$", ({
  aA: 1
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
$p.bF = (function() {
  var x = $m_sc_StringOps$().as("=", 60);
  $m_s_Console$().h().f((x + "\n"));
  $m_s_Console$().h().f("FieldUnion Macro - SUCCESSFUL Implementation!\n");
  var x$1 = $m_sc_StringOps$().as("=", 60);
  $m_s_Console$().h().f((x$1 + "\n"));
  $m_s_Console$().h().f("\n");
  new $c_sci_$colon$colon("Bob", new $c_sci_$colon$colon("Charlie", $m_sci_Nil$()));
  $m_s_Console$().h().f("\u2713 Manual TestFields works with := extension\n");
  new $c_sci_$colon$colon("Bob", new $c_sci_$colon$colon("Charlie", $m_sci_Nil$()));
  $m_s_Console$().h().f("\u2713 Generated TestFieldsGenerated works with := extension\n");
  $m_s_Console$().h().f("\u2713 Types are provably equal (TestFields =:= TestFieldsGenerated)\n");
  $m_s_Console$().h().f("\n");
  $m_s_Console$().h().f("Macro achievements:\n");
  $m_s_Console$().h().f("  1. Extracts all fields from js.Object trait\n");
  $m_s_Console$().h().f("  2. Creates Field types with singleton string literals\n");
  $m_s_Console$().h().f("  3. Combines them into a union type\n");
  $m_s_Console$().h().f("  4. Exposes type via type parameter (not path-dependent)\n");
  $m_s_Console$().h().f("  5. Generated type works for value validation!\n");
  $m_s_Console$().h().f("\n");
  $m_s_Console$().h().f("Generated union type:\n");
  $m_s_Console$().h().f("  Field[\"friends\", Seq[String]] |\n");
  $m_s_Console$().h().f("  Field[\"age\", js.UndefOr[Int]] |\n");
  $m_s_Console$().h().f("  Field[\"name\", String]\n");
  var x$2 = $m_sc_StringOps$().as("=", 60);
  $m_s_Console$().h().f((x$2 + "\n"));
});
var $d_Lmacro\uff3ftest_macro\uff3ftest$package$ = new $TypeData().i($c_Lmacro\uff3ftest_macro\uff3ftest$package$, "macro_test.macro_test$package$", ({
  aB: 1
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
    $m_Lmacro\uff3ftest_macro\uff3ftest$package$().bF();
  } catch (e) {
    if (false) {
      $m_s_util_CommandLineParser$().bG(e);
    } else {
      throw e;
    }
  }
}
function $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.bD(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__remainder__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.bC(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.bi(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__divide__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.bh(a.b, a.c, b.b, b.c), this$1.d);
}
function $s_RTLong__fromDoubleBits__D__O__RTLong(value, fpBitsDataView) {
  fpBitsDataView.setFloat64(0, value, true);
  return new $c_RTLong((fpBitsDataView.getInt32(0, true) | 0), (fpBitsDataView.getInt32(4, true) | 0));
}
function $s_RTLong__fromDouble__D__RTLong(value) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.b7(value), this$1.d);
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
$p.A = (function(that) {
  return ((that instanceof $c_RTLong) && ((this.b === that.b) && (this.c === that.c)));
});
$p.I = (function() {
  return (this.b ^ this.c);
});
$p.p = (function() {
  return $m_RTLong$().b8(this.b, this.c);
});
$p.bM = (function() {
  return ((this.b << 24) >> 24);
});
$p.bV = (function() {
  return ((this.b << 16) >> 16);
});
$p.bS = (function() {
  return this.b;
});
$p.bT = (function() {
  return this;
});
$p.bQ = (function() {
  var lo = this.b;
  var hi = this.c;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
});
$p.bP = (function() {
  var lo = this.b;
  return ((4.294967296E9 * this.c) + (lo >>> 0.0));
});
$p.bO = (function(that) {
  return $m_RTLong$().b6(this.b, this.c, that.b, that.c);
});
$p.bN = (function(that) {
  return $m_RTLong$().b6(this.b, this.c, that.b, that.c);
});
function $isArrayOf_RTLong(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.U)));
}
var $d_RTLong = new $TypeData().i($c_RTLong, "org.scalajs.linker.runtime.RuntimeLong", ({
  U: 1
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
$p.b8 = (function(lo, hi) {
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
$p.b7 = (function(value) {
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
$p.b6 = (function(alo, ahi, blo, bhi) {
  return ((ahi === bhi) ? ((alo === blo) ? 0 : (((alo >>> 0) < (blo >>> 0)) ? (-1) : 1)) : ((ahi < bhi) ? (-1) : 1));
});
$p.bh = (function(alo, ahi, blo, bhi) {
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
$p.bi = (function(alo, ahi, blo, bhi) {
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
$p.bC = (function(alo, ahi, blo, bhi) {
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
$p.bD = (function(alo, ahi, blo, bhi) {
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
  aC: 1
}));
var $n_RTLong$;
function $m_RTLong$() {
  if ((!$n_RTLong$)) {
    $n_RTLong$ = new $c_RTLong$();
  }
  return $n_RTLong$;
}
/** @constructor */
function $c_Lpreact_component_AttributeModifier(key, value) {
  this.F = null;
  this.q = null;
  this.F = key;
  this.q = value;
}
$p = $c_Lpreact_component_AttributeModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_component_AttributeModifier;
/** @constructor */
function $h_Lpreact_component_AttributeModifier() {
}
$h_Lpreact_component_AttributeModifier.prototype = $p;
function $isArrayOf_Lpreact_component_AttributeModifier(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.V)));
}
var $d_Lpreact_component_AttributeModifier = new $TypeData().i($c_Lpreact_component_AttributeModifier, "preact.component.AttributeModifier", ({
  V: 1
}));
/** @constructor */
function $c_Lpreact_component_ChildModifier(child) {
  this.an = null;
  this.an = child;
}
$p = $c_Lpreact_component_ChildModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_component_ChildModifier;
/** @constructor */
function $h_Lpreact_component_ChildModifier() {
}
$h_Lpreact_component_ChildModifier.prototype = $p;
function $isArrayOf_Lpreact_component_ChildModifier(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.W)));
}
var $d_Lpreact_component_ChildModifier = new $TypeData().i($c_Lpreact_component_ChildModifier, "preact.component.ChildModifier", ({
  W: 1
}));
function $ct_Lpreact_component_ComponentBase__sjs_js_Function1__($thiz, renderFn) {
  $thiz.Z = ((props$2) => {
    var ctx = $m_Lpreact_signals_ComponentVarContext$();
    var this$3 = $m_Lpreact_signals_package$().V;
    var oldval = this$3.C;
    this$3.C = ctx;
    try {
      return renderFn(props$2);
    } finally {
      this$3.C = oldval;
    }
  });
  return $thiz;
}
/** @constructor */
function $c_Lpreact_component_ComponentBase() {
  this.Z = null;
}
$p = $c_Lpreact_component_ComponentBase.prototype = new $h_O();
$p.constructor = $c_Lpreact_component_ComponentBase;
/** @constructor */
function $h_Lpreact_component_ComponentBase() {
}
$h_Lpreact_component_ComponentBase.prototype = $p;
$p.ae = (function(ms) {
  var attrs = ({});
  var children = [];
  ms.ah(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult1: {
      if ((x$1$3 instanceof $c_Lpreact_component_AttributeModifier)) {
        if ((x$1$3.F === "cls")) {
          if ((!$m_sr_BoxesRunTime$().z(x$1$3.q, (void 0)))) {
            var x$1 = x$1$3.q;
            var $x_1 = (!((x$1 !== null) && $dp_equals__O__Z(x$1, "")));
          } else {
            var $x_1 = false;
          }
          if ($x_1) {
            var existing = attrs[x$1$3.F];
            var newValue = ((!$m_sr_BoxesRunTime$().z(existing, (void 0))) ? ((existing + " ") + x$1$3.q) : x$1$3.q);
            attrs[x$1$3.F] = newValue;
            break matchResult1;
          } else {
            break matchResult1;
          }
        } else {
          attrs[x$1$3.F] = x$1$3.q;
          break matchResult1;
        }
      }
      if ((x$1$3 instanceof $c_Lpreact_component_ChildModifier)) {
        children.push(x$1$3.an);
        break matchResult1;
      }
      throw new $c_s_MatchError(x$1$3);
    }
  })));
  return (0, $i_preact.h)(this.Z, attrs, children);
});
/** @constructor */
function $c_Lpreact_signals_Var$package$() {
  this.aI = null;
  this.aJ = false;
  this.aG = null;
  this.aH = false;
}
$p = $c_Lpreact_signals_Var$package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_Var$package$;
/** @constructor */
function $h_Lpreact_signals_Var$package$() {
}
$h_Lpreact_signals_Var$package$.prototype = $p;
$p.bH = (function() {
  if ((!this.aJ)) {
    this.aI = new $c_Lpreact_signals_Var$package$$anon$1();
    this.aJ = true;
  }
  return this.aI;
});
$p.b4 = (function() {
  if ((!this.aH)) {
    this.aG = new $c_Lpreact_signals_Var$package$$anon$2();
    this.aH = true;
  }
  return this.aG;
});
var $d_Lpreact_signals_Var$package$ = new $TypeData().i($c_Lpreact_signals_Var$package$, "preact.signals.Var$package$", ({
  aH: 1
}));
var $n_Lpreact_signals_Var$package$;
function $m_Lpreact_signals_Var$package$() {
  if ((!$n_Lpreact_signals_Var$package$)) {
    $n_Lpreact_signals_Var$package$ = new $c_Lpreact_signals_Var$package$();
  }
  return $n_Lpreact_signals_Var$package$;
}
/** @constructor */
function $c_Lpreact_signals_package$() {
  this.V = null;
  $n_Lpreact_signals_package$ = this;
  this.V = new $c_s_util_DynamicVariable($m_Lpreact_signals_GlobalVarContext$());
}
$p = $c_Lpreact_signals_package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_package$;
/** @constructor */
function $h_Lpreact_signals_package$() {
}
$h_Lpreact_signals_package$.prototype = $p;
var $d_Lpreact_signals_package$ = new $TypeData().i($c_Lpreact_signals_package$, "preact.signals.package$", ({
  aK: 1
}));
var $n_Lpreact_signals_package$;
function $m_Lpreact_signals_package$() {
  if ((!$n_Lpreact_signals_package$)) {
    $n_Lpreact_signals_package$ = new $c_Lpreact_signals_package$();
  }
  return $n_Lpreact_signals_package$;
}
function $p_Lpreact_test_test$package$__computation$proxy1$1__Lpreact_signals_Var__I($thiz, count$1) {
  return ((count$1.t.value | 0) << 1);
}
function $p_Lpreact_test_test$package$__body$proxy1$1__Lpreact_signals_Var__Lpreact_signals_ReadVar__V($thiz, count$2, double$1) {
  var x = ((("Count changed: " + (count$2.t.value | 0)) + ", Double: ") + double$1.U());
  $m_s_Console$().h().f((x + "\n"));
}
function $p_Lpreact_test_test$package$__body$proxy2$1__V($thiz) {
  var Var_this = $m_Lpreact_test_test$package$().W;
  var x = ("Theme changed: " + Var_this.t.value);
  $m_s_Console$().h().f((x + "\n"));
}
/** @constructor */
function $c_Lpreact_test_test$package$() {
  this.ap = null;
  this.W = null;
  this.aK = null;
  this.aL = null;
  $n_Lpreact_test_test$package$ = this;
  this.ap = new $c_Lpreact_test_test$package$$anon$1();
  this.W = $m_Lpreact_signals_package$().V.C.ax("light");
  this.aK = new $c_Lpreact_test_test$package$$anon$2();
  this.aL = new $c_Lpreact_test_test$package$$anon$3();
}
$p = $c_Lpreact_test_test$package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_test$package$;
/** @constructor */
function $h_Lpreact_test_test$package$() {
}
$h_Lpreact_test_test$package$.prototype = $p;
$p.i = (function(tag, modifiers) {
  var jsAttribs = new $c_sr_ObjectRef(({}));
  var childrenArray = new $c_sr_ObjectRef([]);
  modifiers.ah(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult1: {
      if ((x$1$3 instanceof $c_Lpreact_component_AttributeModifier)) {
        if ((x$1$3.F === "cls")) {
          if ((!$m_sr_BoxesRunTime$().z(x$1$3.q, (void 0)))) {
            var x$1 = x$1$3.q;
            var $x_1 = (!((x$1 !== null) && $dp_equals__O__Z(x$1, "")));
          } else {
            var $x_1 = false;
          }
          if ($x_1) {
            var existing = jsAttribs.T.class;
            var newValue = ((!$m_sr_BoxesRunTime$().z(existing, (void 0))) ? ((existing + " ") + x$1$3.q) : x$1$3.q);
            jsAttribs.T.class = newValue;
            break matchResult1;
          } else {
            break matchResult1;
          }
        } else {
          var jsAttribs$proxy1 = jsAttribs.T;
          if ((x$1$3.F === "cls")) {
            if ((!$m_sr_BoxesRunTime$().z(x$1$3.q, (void 0)))) {
              var x$3 = x$1$3.q;
              var $x_2 = (!((x$3 !== null) && $dp_equals__O__Z(x$3, "")));
            } else {
              var $x_2 = false;
            }
            if ($x_2) {
              var existing$2 = jsAttribs$proxy1[x$1$3.F];
              var newValue$2 = ((!$m_sr_BoxesRunTime$().z(existing$2, (void 0))) ? ((existing$2 + " ") + x$1$3.q) : x$1$3.q);
              jsAttribs$proxy1[x$1$3.F] = newValue$2;
              break matchResult1;
            } else {
              break matchResult1;
            }
          } else {
            jsAttribs$proxy1[x$1$3.F] = x$1$3.q;
            break matchResult1;
          }
        }
      }
      if ((x$1$3 instanceof $c_Lpreact_component_ChildModifier)) {
        var childrenArray$proxy1 = childrenArray.T;
        childrenArray$proxy1.push(x$1$3.an);
        break matchResult1;
      }
      throw new $c_s_MatchError(x$1$3);
    }
  })));
  return (0, $i_preact.h)(tag, jsAttribs.T, childrenArray.T);
});
$p.bb = (function() {
  $m_Lpreact_signals_package$().V.C.aw(new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => {
    $p_Lpreact_test_test$package$__body$proxy2$1__V(this);
  })));
  var $x_20 = $m_sr_ScalaRunTime$();
  var $x_19 = new $c_Lpreact_component_AttributeModifier("id", "greeting");
  var $x_18 = new $c_Lpreact_component_AttributeModifier("key", "main-div");
  var $x_17 = new $c_Lpreact_component_AttributeModifier("cls", "min-h-screen p-8 bg-linear-to-br from-slate-50 to-slate-100");
  var Var_this = $m_Lpreact_test_test$package$().W;
  var $x_16 = new $c_Lpreact_component_AttributeModifier("cls", ((Var_this.t.value === "dark") ? "from-slate-800 to-slate-900" : (void 0)));
  var $x_15 = $m_sr_ScalaRunTime$();
  var $x_14 = new $c_Lpreact_component_AttributeModifier("cls", "max-w-4xl mx-auto space-y-6");
  var ms$proxy15 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-3xl font-bold text-gray-800 mb-6"), new $c_Lpreact_component_ChildModifier("Scala Preact Demo")]));
  var $x_13 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("h3", ms$proxy15));
  var ms$proxy16 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-gray-600"), new $c_Lpreact_component_ChildModifier("This is a div element.")]));
  var $x_12 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("p", ms$proxy16));
  var ms$proxy17 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "nested"), new $c_Lpreact_component_ChildModifier("Nested span child element.")]));
  var $x_11 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("span", ms$proxy17));
  var ms$proxy18 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-4 py-2 mx-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"), new $c_Lpreact_component_AttributeModifier("disabled", true), new $c_Lpreact_component_ChildModifier("Disabled Button")]));
  var $x_10 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy18));
  var ms$proxy19 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-4 py-2 mx-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"), new $c_Lpreact_component_AttributeModifier("onClick", ((e$3) => {
    $m_s_Console$().h().f("Button clicked!\n");
  })), new $c_Lpreact_component_ChildModifier("Click me")]));
  var $x_9 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy19));
  var $x_8 = $m_Lpreact_test_test$package$().ap;
  var $x_7 = new $c_Lpreact_component_AttributeModifier("title", "My Card Title");
  var $x_6 = new $c_Lpreact_component_AttributeModifier("key", "card1");
  var $x_5 = new $c_Lpreact_component_ChildModifier("This is the content of the card.");
  var $x_4 = $m_sr_ScalaRunTime$();
  var $x_3 = new $c_Lpreact_component_ChildModifier("A nested div inside the card.");
  var ms$proxy20 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-3 py-1.5 mx-2 rounded bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition-colors"), new $c_Lpreact_component_AttributeModifier("onClick", ((e$3$1) => {
    $m_s_Console$().h().f("Nested button clicked!\n");
  })), new $c_Lpreact_component_ChildModifier("Nested Button")]));
  var ms$proxy21 = $x_4.j(new $ac_O([$x_3, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy20))]));
  var $x_2 = new $c_Lpreact_component_ChildModifier($x_8.ae(new $c_sjsr_WrappedVarArgs([$x_7, $x_6, $x_5, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("div", ms$proxy21))])));
  var $x_1 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().ap.ae(new $c_sjsr_WrappedVarArgs([new $c_Lpreact_component_AttributeModifier("title", "My Second Card with Footer"), new $c_Lpreact_component_AttributeModifier("cls", "highlighted"), new $c_Lpreact_component_AttributeModifier("footer", "This is the footer text."), new $c_Lpreact_component_ChildModifier("This is the content of the second card.")])));
  var ms$proxy22 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-xl font-semibold text-gray-800 mt-8"), new $c_Lpreact_component_ChildModifier("Signals Demo")]));
  var ms$proxy23 = $x_15.j(new $ac_O([$x_14, $x_13, $x_12, $x_11, $x_10, $x_9, $x_2, $x_1, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("h3", ms$proxy22)), new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().aK.ae(new $c_sjsr_WrappedVarArgs([]))), new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().aL.ae(new $c_sjsr_WrappedVarArgs([])))]));
  var ms$proxy24 = $x_20.j(new $ac_O([$x_19, $x_18, $x_17, $x_16, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("div", ms$proxy23))]));
  return $m_Lpreact_test_test$package$().i("div", ms$proxy24);
});
$p.bE = (function() {
  var rootElement = document.body;
  (0, $i_preact.render)($m_Lpreact_test_test$package$().bb(), rootElement);
});
$p.by = (function() {
  return $m_sjs_js_Any$().ay(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((props$2) => {
    var $x_5 = $m_sr_ScalaRunTime$();
    var $x_4 = new $c_Lpreact_component_AttributeModifier("cls", "bg-white rounded-xl shadow-md p-6 border border-gray-200");
    var $x_3 = new $c_Lpreact_component_AttributeModifier("cls", props$2.cls);
    var ms$proxy1 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-lg font-semibold text-gray-800 mb-3"), new $c_Lpreact_component_ChildModifier(props$2.title)]));
    var $x_2 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("h3", ms$proxy1));
    var ms$proxy2 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-gray-600"), new $c_Lpreact_component_ChildModifier(props$2.children)]));
    var $x_1 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("div", ms$proxy2));
    var x = props$2.footer;
    if ((x === (void 0))) {
      var x$1 = (void 0);
    } else {
      var ms$proxy3 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500"), new $c_Lpreact_component_ChildModifier(x)]));
      var x$1 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("div", ms$proxy3));
    }
    var ms$proxy4 = $x_5.j(new $ac_O([$x_4, $x_3, $x_2, $x_1, ((x$1 === (void 0)) ? new $c_Lpreact_component_ChildModifier((void 0)) : x$1)]));
    return $m_Lpreact_test_test$package$().i("div", ms$proxy4);
  })));
});
$p.bz = (function() {
  return $m_sjs_js_Any$().ay(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => {
    var count = $m_Lpreact_signals_package$().V.C.ax(0);
    var double = $m_Lpreact_signals_package$().V.C.b1(new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => $p_Lpreact_test_test$package$__computation$proxy1$1__Lpreact_signals_Var__I(this, count))));
    $m_Lpreact_signals_package$().V.C.aw(new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => {
      $p_Lpreact_test_test$package$__body$proxy1$1__Lpreact_signals_Var__Lpreact_signals_ReadVar__V(this, count, double);
    })));
    var $x_8 = $m_sr_ScalaRunTime$();
    var $x_7 = new $c_Lpreact_component_AttributeModifier("cls", "bg-white rounded-xl shadow-md p-6 border border-gray-200");
    var ms$proxy5 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-lg font-semibold text-gray-800 mb-4"), new $c_Lpreact_component_ChildModifier("Signal Counter")]));
    var $x_6 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("h3", ms$proxy5));
    var ms$proxy6 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-gray-600 mb-2"), new $c_Lpreact_component_ChildModifier("Count: "), $m_Lpreact_signals_Var$package$().b4().ad(count)]));
    var $x_5 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("p", ms$proxy6));
    var ms$proxy7 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "text-gray-600 mb-4"), new $c_Lpreact_component_ChildModifier("Double: "), $m_Lpreact_signals_Var$package$().b4().ad(double)]));
    var $x_4 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("p", ms$proxy7));
    var $x_3 = $m_sr_ScalaRunTime$();
    var $x_2 = new $c_Lpreact_component_AttributeModifier("cls", "flex gap-3");
    var ms$proxy8 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"), new $c_Lpreact_component_AttributeModifier("onClick", ((_$2$3) => {
      count.t.value = ((1 + (count.t.value | 0)) | 0);
    })), new $c_Lpreact_component_ChildModifier("Increment")]));
    var $x_1 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy8));
    var ms$proxy9 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"), new $c_Lpreact_component_AttributeModifier("onClick", ((_$4$3) => {
      count.t.value = (((-1) + (count.t.value | 0)) | 0);
    })), new $c_Lpreact_component_ChildModifier("Decrement")]));
    var ms$proxy10 = $x_3.j(new $ac_O([$x_2, $x_1, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy9))]));
    var ms$proxy11 = $x_8.j(new $ac_O([$x_7, $x_6, $x_5, $x_4, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("div", ms$proxy10))]));
    return $m_Lpreact_test_test$package$().i("div", ms$proxy11);
  })));
});
$p.bA = (function() {
  return $m_sjs_js_Any$().ay(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$6$2) => {
    var Var_this = $m_Lpreact_test_test$package$().W;
    var isDark = (Var_this.t.value === "dark");
    var $x_5 = $m_sr_ScalaRunTime$();
    var $x_4 = new $c_Lpreact_component_AttributeModifier("cls", "rounded-xl shadow-md p-6 border transition-colors duration-300");
    var $x_3 = new $c_Lpreact_component_AttributeModifier("cls", ((!isDark) ? "bg-white border-gray-200" : (void 0)));
    var $x_2 = new $c_Lpreact_component_AttributeModifier("cls", (isDark ? "bg-gray-800 border-gray-700" : (void 0)));
    var ms$proxy12 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "mb-4 transition-colors duration-300"), new $c_Lpreact_component_AttributeModifier("cls", ((!isDark) ? "text-gray-600" : (void 0))), new $c_Lpreact_component_AttributeModifier("cls", (isDark ? "text-gray-300" : (void 0))), new $c_Lpreact_component_ChildModifier("Current Theme: "), $m_Lpreact_signals_Var$package$().bH().ad($m_Lpreact_test_test$package$().W)]));
    var $x_1 = new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("p", ms$proxy12));
    var ms$proxy13 = $m_sr_ScalaRunTime$().j(new $ac_O([new $c_Lpreact_component_AttributeModifier("cls", "px-4 py-2 rounded-lg font-medium transition-colors duration-300"), new $c_Lpreact_component_AttributeModifier("cls", ((!isDark) ? "bg-amber-500 hover:bg-amber-600 text-white" : (void 0))), new $c_Lpreact_component_AttributeModifier("cls", (isDark ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900" : (void 0))), new $c_Lpreact_component_AttributeModifier("onClick", ((_$7$3) => {
      var Var_this$1 = $m_Lpreact_test_test$package$().W;
      var Var_this$2 = $m_Lpreact_test_test$package$().W;
      if ((Var_this$2.t.value === "light")) {
        var value$proxy10 = "dark";
      } else {
        var value$proxy10 = "light";
      }
      Var_this$1.t.value = value$proxy10;
    })), (isDark ? new $c_Lpreact_component_ChildModifier("Switch to Light") : new $c_Lpreact_component_ChildModifier("Switch to Dark"))]));
    var ms$proxy14 = $x_5.j(new $ac_O([$x_4, $x_3, $x_2, $x_1, new $c_Lpreact_component_ChildModifier($m_Lpreact_test_test$package$().i("button", ms$proxy13))]));
    return $m_Lpreact_test_test$package$().i("div", ms$proxy14);
  })));
});
var $d_Lpreact_test_test$package$ = new $TypeData().i($c_Lpreact_test_test$package$, "preact.test.test$package$", ({
  aL: 1
}));
var $n_Lpreact_test_test$package$;
function $m_Lpreact_test_test$package$() {
  if ((!$n_Lpreact_test_test$package$)) {
    $n_Lpreact_test_test$package$ = new $c_Lpreact_test_test$package$();
  }
  return $n_Lpreact_test_test$package$;
}
/** @constructor */
function $c_s_Array$() {
}
$p = $c_s_Array$.prototype = new $h_O();
$p.constructor = $c_s_Array$;
/** @constructor */
function $h_s_Array$() {
}
$h_s_Array$.prototype = $p;
$p.bl = (function(xs, ys) {
  if ((xs === ys)) {
    return true;
  }
  if ((xs.a.length !== ys.a.length)) {
    return false;
  }
  var len = xs.a.length;
  var i = 0;
  while ((i < len)) {
    if ((!$m_sr_BoxesRunTime$().z(xs.a[i], ys.a[i]))) {
      return false;
    }
    i = ((1 + i) | 0);
  }
  return true;
});
var $d_s_Array$ = new $TypeData().i($c_s_Array$, "scala.Array$", ({
  aP: 1
}));
var $n_s_Array$;
function $m_s_Array$() {
  if ((!$n_s_Array$)) {
    $n_s_Array$ = new $c_s_Array$();
  }
  return $n_s_Array$;
}
function $f_sc_IterableOnceOps__foreach__F1__V($thiz, f) {
  var it = $thiz.s();
  while (it.k()) {
    f.N(it.g());
  }
}
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return (($thiz.v() === 0) ? (("" + start) + end) : $thiz.at($ct_scm_StringBuilder__(new $c_scm_StringBuilder()), start, sep, end).G.m);
}
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, b, start, sep, end) {
  var jsb = b.G;
  if ((start.length !== 0)) {
    jsb.m = (("" + jsb.m) + start);
  }
  var it = $thiz.s();
  if (it.k()) {
    var obj = it.g();
    jsb.m = (("" + jsb.m) + obj);
    while (it.k()) {
      if ((sep.length !== 0)) {
        jsb.m = (("" + jsb.m) + sep);
      }
      var obj$1 = it.g();
      jsb.m = (("" + jsb.m) + obj$1);
    }
  }
  if ((end.length !== 0)) {
    jsb.m = (("" + jsb.m) + end);
  }
  return b;
}
/** @constructor */
function $c_sc_Iterator$ConcatIteratorCell(head, tail) {
  this.aQ = null;
  this.a1 = null;
  this.aQ = head;
  this.a1 = tail;
}
$p = $c_sc_Iterator$ConcatIteratorCell.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$ConcatIteratorCell;
/** @constructor */
function $h_sc_Iterator$ConcatIteratorCell() {
}
$h_sc_Iterator$ConcatIteratorCell.prototype = $p;
$p.br = (function() {
  return this.aQ.U().s();
});
var $d_sc_Iterator$ConcatIteratorCell = new $TypeData().i($c_sc_Iterator$ConcatIteratorCell, "scala.collection.Iterator$ConcatIteratorCell", ({
  b6: 1
}));
/** @constructor */
function $c_sc_StringOps$() {
  this.aR = null;
  $n_sc_StringOps$ = this;
  this.aR = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.aR));
}
$p = $c_sc_StringOps$.prototype = new $h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
$h_sc_StringOps$.prototype = $p;
$p.as = (function(this$, n) {
  if ((n <= 0)) {
    return "";
  } else {
    var sb = $ct_jl_StringBuilder__I__(new $c_jl_StringBuilder(), Math.imul(this$.length, n));
    var i = 0;
    while ((i < n)) {
      sb.m = (("" + sb.m) + this$);
      i = ((1 + i) | 0);
    }
    return sb.m;
  }
});
var $d_sc_StringOps$ = new $TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  bc: 1
}));
var $n_sc_StringOps$;
function $m_sc_StringOps$() {
  if ((!$n_sc_StringOps$)) {
    $n_sc_StringOps$ = new $c_sc_StringOps$();
  }
  return $n_sc_StringOps$;
}
/** @constructor */
function $c_sci_IndexedSeqDefaults$() {
  this.aW = 0;
  $n_sci_IndexedSeqDefaults$ = this;
  try {
    $m_sc_StringOps$();
    var $x_1 = $m_jl_Integer$().bt($m_jl_System$SystemProperties$().b2("scala.collection.immutable.IndexedSeq.defaultApplyPreferredMaxLength", "64"), 10, 214748364);
  } catch (e) {
    if (false) {
      var $x_1 = 64;
    } else {
      var $x_1;
      throw e;
    }
  }
  this.aW = $x_1;
}
$p = $c_sci_IndexedSeqDefaults$.prototype = new $h_O();
$p.constructor = $c_sci_IndexedSeqDefaults$;
/** @constructor */
function $h_sci_IndexedSeqDefaults$() {
}
$h_sci_IndexedSeqDefaults$.prototype = $p;
var $d_sci_IndexedSeqDefaults$ = new $TypeData().i($c_sci_IndexedSeqDefaults$, "scala.collection.immutable.IndexedSeqDefaults$", ({
  bh: 1
}));
var $n_sci_IndexedSeqDefaults$;
function $m_sci_IndexedSeqDefaults$() {
  if ((!$n_sci_IndexedSeqDefaults$)) {
    $n_sci_IndexedSeqDefaults$ = new $c_sci_IndexedSeqDefaults$();
  }
  return $n_sci_IndexedSeqDefaults$;
}
/** @constructor */
function $c_sr_BoxesRunTime$() {
}
$p = $c_sr_BoxesRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_BoxesRunTime$;
/** @constructor */
function $h_sr_BoxesRunTime$() {
}
$h_sr_BoxesRunTime$.prototype = $p;
$p.z = (function(x, y) {
  return ((x === y) || ($is_jl_Number(x) ? this.bo(x, y) : ((x instanceof $Char) ? this.bm(x, y) : ((x === null) ? (y === null) : $dp_equals__O__Z(x, y)))));
});
$p.bo = (function(xn, y) {
  if ($is_jl_Number(y)) {
    return this.bn(xn, y);
  } else if ((y instanceof $Char)) {
    if (((typeof xn) === "number")) {
      return ((+xn) === y.c);
    } else if ((xn instanceof $c_RTLong)) {
      var t = $uJ(xn);
      var lo = t.b;
      var hi = t.c;
      var value = y.c;
      var hi$1 = (value >> 31);
      return ((lo === value) && (hi === hi$1));
    } else {
      return ((xn === null) ? (y === null) : $dp_equals__O__Z(xn, y));
    }
  } else {
    return ((xn === null) ? (y === null) : $dp_equals__O__Z(xn, y));
  }
});
$p.bn = (function(xn, yn) {
  if (((typeof xn) === "number")) {
    var x2 = (+xn);
    if (((typeof yn) === "number")) {
      return (x2 === (+yn));
    } else if ((yn instanceof $c_RTLong)) {
      var t = $uJ(yn);
      var lo = t.b;
      return (x2 === ((4.294967296E9 * t.c) + (lo >>> 0.0)));
    } else {
      return (false && yn.A(x2));
    }
  } else if ((xn instanceof $c_RTLong)) {
    var t$1 = $uJ(xn);
    var lo$1 = t$1.b;
    var hi$1 = t$1.c;
    if ((yn instanceof $c_RTLong)) {
      var t$2 = $uJ(yn);
      var lo$2 = t$2.b;
      var hi$2 = t$2.c;
      return ((lo$1 === lo$2) && (hi$1 === hi$2));
    } else if (((typeof yn) === "number")) {
      var x3$3 = (+yn);
      return (((4.294967296E9 * hi$1) + (lo$1 >>> 0.0)) === x3$3);
    } else {
      return (false && yn.A(new $c_RTLong(lo$1, hi$1)));
    }
  } else {
    return ((xn === null) ? (yn === null) : $dp_equals__O__Z(xn, yn));
  }
});
$p.bm = (function(xc, y) {
  if ((y instanceof $Char)) {
    return (xc.c === y.c);
  } else if ($is_jl_Number(y)) {
    if (((typeof y) === "number")) {
      return ((+y) === xc.c);
    } else if ((y instanceof $c_RTLong)) {
      var t = $uJ(y);
      var lo = t.b;
      var hi = t.c;
      var value = xc.c;
      var hi$1 = (value >> 31);
      return ((lo === value) && (hi === hi$1));
    } else {
      return ((y === null) ? (xc === null) : $dp_equals__O__Z(y, xc));
    }
  } else {
    return ((xc === null) && (y === null));
  }
});
var $d_sr_BoxesRunTime$ = new $TypeData().i($c_sr_BoxesRunTime$, "scala.runtime.BoxesRunTime$", ({
  bI: 1
}));
var $n_sr_BoxesRunTime$;
function $m_sr_BoxesRunTime$() {
  if ((!$n_sr_BoxesRunTime$)) {
    $n_sr_BoxesRunTime$ = new $c_sr_BoxesRunTime$();
  }
  return $n_sr_BoxesRunTime$;
}
/** @constructor */
function $c_sr_Scala3RunTime$() {
}
$p = $c_sr_Scala3RunTime$.prototype = new $h_O();
$p.constructor = $c_sr_Scala3RunTime$;
/** @constructor */
function $h_sr_Scala3RunTime$() {
}
$h_sr_Scala3RunTime$.prototype = $p;
$p.ai = (function() {
  throw $ct_jl_NullPointerException__T__(new $c_jl_NullPointerException(), "tried to cast away nullability, but value is null");
});
var $d_sr_Scala3RunTime$ = new $TypeData().i($c_sr_Scala3RunTime$, "scala.runtime.Scala3RunTime$", ({
  bL: 1
}));
var $n_sr_Scala3RunTime$;
function $m_sr_Scala3RunTime$() {
  if ((!$n_sr_Scala3RunTime$)) {
    $n_sr_Scala3RunTime$ = new $c_sr_Scala3RunTime$();
  }
  return $n_sr_Scala3RunTime$;
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
$p.X = (function(xs, idx) {
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
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  throw new $c_s_MatchError(xs);
});
$p.j = (function(xs) {
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
  bM: 1
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
$p.bv = (function(lv) {
  var lo = lv.b;
  var hi = lv.c;
  return ((hi === (lo >> 31)) ? lo : (lo ^ hi));
});
$p.bj = (function(dv) {
  var iv = $doubleToInt(dv);
  if ((iv === dv)) {
    return iv;
  } else {
    var this$1 = $m_RTLong$();
    var lo = this$1.b7(dv);
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
$p.o = (function(x) {
  if ((x === null)) {
    return 0;
  } else if (((typeof x) === "number")) {
    return this.bj((+x));
  } else if ((x instanceof $c_RTLong)) {
    var t = $uJ(x);
    return this.bv(new $c_RTLong(t.b, t.c));
  } else {
    return $dp_hashCode__I(x);
  }
});
var $d_sr_Statics$ = new $TypeData().i($c_sr_Statics$, "scala.runtime.Statics$", ({
  bN: 1
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
$p.bG = (function(err) {
  var where = ((err.b3() === 0) ? "" : ((err.b3() === 1) ? " after first argument" : ((" after " + err.b3()) + " arguments")));
  var x = ((("Illegal command line" + where) + ": ") + err.bU());
  $m_s_Console$().h().f((x + "\n"));
});
var $d_s_util_CommandLineParser$ = new $TypeData().i($c_s_util_CommandLineParser$, "scala.util.CommandLineParser$", ({
  bT: 1
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
  this.C = null;
  this.C = init;
}
$p = $c_s_util_DynamicVariable.prototype = new $h_O();
$p.constructor = $c_s_util_DynamicVariable;
/** @constructor */
function $h_s_util_DynamicVariable() {
}
$h_s_util_DynamicVariable.prototype = $p;
$p.p = (function() {
  return (("DynamicVariable(" + this.C) + ")");
});
var $d_s_util_DynamicVariable = new $TypeData().i($c_s_util_DynamicVariable, "scala.util.DynamicVariable", ({
  bV: 1
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
  var h = this.b5(hash, data);
  var i = h;
  h = ((i << 13) | ((i >>> 19) | 0));
  return (((-430675100) + Math.imul(5, h)) | 0);
});
$p.b5 = (function(hash, data) {
  var k = data;
  k = Math.imul((-862048943), k);
  var i = k;
  k = ((i << 15) | ((i >>> 17) | 0));
  k = Math.imul(461845907, k);
  return (hash ^ k);
});
$p.D = (function(hash, length) {
  return this.a7((hash ^ length));
});
$p.a7 = (function(hash) {
  var h = hash;
  h = (h ^ ((h >>> 16) | 0));
  h = Math.imul((-2048144789), h);
  h = (h ^ ((h >>> 13) | 0));
  h = Math.imul((-1028477387), h);
  h = (h ^ ((h >>> 16) | 0));
  return h;
});
$p.bJ = (function(xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.s();
  while (iterator.k()) {
    var x = iterator.g();
    var h = $m_sr_Statics$().o(x);
    a = ((a + h) | 0);
    b = (b ^ h);
    c = Math.imul(c, (1 | h));
    n = ((1 + n) | 0);
  }
  var h$2 = seed;
  h$2 = this.e(h$2, a);
  h$2 = this.e(h$2, b);
  h$2 = this.b5(h$2, c);
  return this.D(h$2, n);
});
$p.bx = (function(xs, seed) {
  var it = xs.s();
  var h = seed;
  if ((!it.k())) {
    return this.D(h, 0);
  }
  var x0 = it.g();
  if ((!it.k())) {
    return this.D(this.e(h, $m_sr_Statics$().o(x0)), 1);
  }
  var x1 = it.g();
  var initial = $m_sr_Statics$().o(x0);
  h = this.e(h, initial);
  var h0 = h;
  var prev = $m_sr_Statics$().o(x1);
  var rangeDiff = ((prev - initial) | 0);
  var i = 2;
  while (it.k()) {
    h = this.e(h, prev);
    var hash = $m_sr_Statics$().o(it.g());
    if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
      h = this.e(h, hash);
      i = ((1 + i) | 0);
      while (it.k()) {
        h = this.e(h, $m_sr_Statics$().o(it.g()));
        i = ((1 + i) | 0);
      }
      return this.D(h, i);
    }
    prev = hash;
    i = ((1 + i) | 0);
  }
  return this.a7(this.e(this.e(h0, rangeDiff), prev));
});
$p.bc = (function(a, seed) {
  var h = seed;
  var l = $m_jl_reflect_Array$().az(a);
  switch (l) {
    case 0: {
      return this.D(h, 0);
      break;
    }
    case 1: {
      return this.D(this.e(h, $m_sr_Statics$().o($m_sr_ScalaRunTime$().X(a, 0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().o($m_sr_ScalaRunTime$().X(a, 0));
      h = this.e(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().o($m_sr_ScalaRunTime$().X(a, 1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.e(h, prev);
        var hash = $m_sr_Statics$().o($m_sr_ScalaRunTime$().X(a, i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.e(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.e(h, $m_sr_Statics$().o($m_sr_ScalaRunTime$().X(a, i)));
            i = ((1 + i) | 0);
          }
          return this.D(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.a7(this.e(this.e(h0, rangeDiff), prev));
    }
  }
});
$p.bB = (function(start, step, last, seed) {
  return this.a7(this.e(this.e(this.e(seed, start), step), last));
});
$p.bs = (function(a, seed) {
  var h = seed;
  var l = a.l();
  switch (l) {
    case 0: {
      return this.D(h, 0);
      break;
    }
    case 1: {
      return this.D(this.e(h, $m_sr_Statics$().o(a.r(0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().o(a.r(0));
      h = this.e(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().o(a.r(1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.e(h, prev);
        var hash = $m_sr_Statics$().o(a.r(i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.e(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.e(h, $m_sr_Statics$().o(a.r(i)));
            i = ((1 + i) | 0);
          }
          return this.D(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.a7(this.e(this.e(h0, rangeDiff), prev));
    }
  }
});
$p.bu = (function(xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while ((!elems.n())) {
    var head = elems.O();
    var tail = elems.E();
    var hash = $m_sr_Statics$().o(head);
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
  return ((rangeState === 2) ? this.bB(initial, rangeDiff, prev, seed) : this.D(h, n));
});
function $p_jl_Character$__nonASCIIZeroDigitCodePoints$lzycompute__AI($thiz) {
  if (((((32 & $thiz.aa) << 24) >> 24) === 0)) {
    $thiz.al = new $ac_I(new Int32Array([1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296, 66720, 68912, 69734, 69872, 69942, 70096, 70384, 70736, 70864, 71248, 71360, 71472, 71904, 72016, 72784, 73040, 73120, 73552, 92768, 92864, 93008, 120782, 120792, 120802, 120812, 120822, 123200, 123632, 124144, 125264, 130032]));
    $thiz.aa = (((32 | $thiz.aa) << 24) >> 24);
  }
  return $thiz.al;
}
function $p_jl_Character$__nonASCIIZeroDigitCodePoints__AI($thiz) {
  return (((((32 & $thiz.aa) << 24) >> 24) === 0) ? $p_jl_Character$__nonASCIIZeroDigitCodePoints$lzycompute__AI($thiz) : $thiz.al);
}
/** @constructor */
function $c_jl_Character$() {
  this.al = null;
  this.aa = 0;
}
$p = $c_jl_Character$.prototype = new $h_O();
$p.constructor = $c_jl_Character$;
/** @constructor */
function $h_jl_Character$() {
}
$h_jl_Character$.prototype = $p;
$p.bg = (function(codePoint, radix) {
  if ((codePoint < 256)) {
    var value = (((codePoint >= 48) && (codePoint <= 57)) ? (((-48) + codePoint) | 0) : (((codePoint >= 65) && (codePoint <= 90)) ? (((-55) + codePoint) | 0) : (((codePoint >= 97) && (codePoint <= 122)) ? (((-87) + codePoint) | 0) : (-1))));
  } else if (((codePoint >= 65313) && (codePoint <= 65338))) {
    var value = (((-65303) + codePoint) | 0);
  } else if (((codePoint >= 65345) && (codePoint <= 65370))) {
    var value = (((-65335) + codePoint) | 0);
  } else {
    var p = $m_ju_Arrays$().bd($p_jl_Character$__nonASCIIZeroDigitCodePoints__AI(this), codePoint);
    var zeroCodePointIndex = ((p < 0) ? (((-2) - p) | 0) : p);
    if ((zeroCodePointIndex < 0)) {
      var value = (-1);
    } else {
      var v = ((codePoint - $p_jl_Character$__nonASCIIZeroDigitCodePoints__AI(this).a[zeroCodePointIndex]) | 0);
      var value = ((v > 9) ? (-1) : v);
    }
  }
  return ((value < radix) ? value : (-1));
});
var $d_jl_Character$ = new $TypeData().i($c_jl_Character$, "java.lang.Character$", ({
  ae: 1,
  a: 1
}));
var $n_jl_Character$;
function $m_jl_Character$() {
  if ((!$n_jl_Character$)) {
    $n_jl_Character$ = new $c_jl_Character$();
  }
  return $n_jl_Character$;
}
/** @constructor */
function $c_jl_Integer$() {
}
$p = $c_jl_Integer$.prototype = new $h_O();
$p.constructor = $c_jl_Integer$;
/** @constructor */
function $h_jl_Integer$() {
}
$h_jl_Integer$.prototype = $p;
$p.a6 = (function(s) {
  throw new $c_jl_NumberFormatException((("For input string: \"" + s) + "\""));
});
$p.bt = (function(s, radix, overflowBarrier) {
  if ((s === null)) {
    $m_jl_Integer$().a6(s);
  }
  var len = s.length;
  if ((len === 0)) {
    $m_jl_Integer$().a6(s);
  }
  var character = $m_jl_Character$();
  var firstChar = s.charCodeAt(0);
  var negative = (firstChar === 45);
  var sign = (negative ? (-1) : 0);
  var i = ((negative || (firstChar === 43)) ? 1 : 0);
  if ((i >= len)) {
    $m_jl_Integer$().a6(s);
  }
  var java$lang$IntFloatBits$Int32Box$$value = 0;
  java$lang$IntFloatBits$Int32Box$$value = 0;
  while ((i !== len)) {
    var x = character.bg(s.charCodeAt(i), radix);
    if (((x < 0) || ((java$lang$IntFloatBits$Int32Box$$value >>> 0) > (overflowBarrier >>> 0)))) {
      $m_jl_Integer$().a6(s);
    }
    var x$2 = java$lang$IntFloatBits$Int32Box$$value;
    var x$3 = Math.imul(x$2, radix);
    var v = ((x$3 + x) | 0);
    java$lang$IntFloatBits$Int32Box$$value = v;
    i = ((1 + i) | 0);
  }
  if (((java$lang$IntFloatBits$Int32Box$$value >>> 0) > (((2147483647 - sign) | 0) >>> 0))) {
    $m_jl_Integer$().a6(s);
  }
  return (((java$lang$IntFloatBits$Int32Box$$value ^ sign) - sign) | 0);
});
var $d_jl_Integer$ = new $TypeData().i($c_jl_Integer$, "java.lang.Integer$", ({
  ai: 1,
  a: 1
}));
var $n_jl_Integer$;
function $m_jl_Integer$() {
  if ((!$n_jl_Integer$)) {
    $n_jl_Integer$ = new $c_jl_Integer$();
  }
  return $n_jl_Integer$;
}
/** @constructor */
function $c_jl_Number() {
}
$p = $c_jl_Number.prototype = new $h_O();
$p.constructor = $c_jl_Number;
/** @constructor */
function $h_jl_Number() {
}
$h_jl_Number.prototype = $p;
function $is_jl_Number(obj) {
  return (((obj instanceof $c_jl_Number) || ((typeof obj) === "number")) || (obj instanceof $c_RTLong));
}
function $isArrayOf_jl_Number(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.j)));
}
function $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, e, enableSuppression, writableStackTrace) {
  $thiz.aE = s;
  if (writableStackTrace) {
    $thiz.bp();
  }
  return $thiz;
}
class $c_jl_Throwable extends Error {
  constructor() {
    super();
    this.aE = null;
  }
  aA() {
    return this.aE;
  }
  bp() {
    var reference = (false ? this.bL : this);
    if ((Object.prototype.toString.call(reference) !== "[object Error]")) {
      if (((Error.captureStackTrace === (void 0)) || (!(!Object.isSealed(this))))) {
        new Error();
      } else {
        Error.captureStackTrace(this);
      }
    }
    return this;
  }
  p() {
    var className = $objectClassName(this);
    var message = this.aA();
    return ((message === null) ? className : ((className + ": ") + message));
  }
  I() {
    return $c_O.prototype.I.call(this);
  }
  A(that) {
    return $c_O.prototype.A.call(this, that);
  }
  get "message"() {
    var m = this.aA();
    return ((m === null) ? "" : m);
  }
  get "name"() {
    return $objectClassName(this);
  }
  "toString"() {
    return this.p();
  }
}
/** @constructor */
function $c_Lpreact_signals_ComponentVarContext$() {
}
$p = $c_Lpreact_signals_ComponentVarContext$.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_ComponentVarContext$;
/** @constructor */
function $h_Lpreact_signals_ComponentVarContext$() {
}
$h_Lpreact_signals_ComponentVarContext$.prototype = $p;
$p.ax = (function(initialValue) {
  return new $c_Lpreact_signals_Var((0, $i_$0040preact$002fsignals.useSignal)(initialValue));
});
$p.b1 = (function(computation) {
  return new $c_Lpreact_signals_Memo((0, $i_$0040preact$002fsignals.useComputed)((() => computation.U())));
});
$p.aw = (function(body) {
  return (0, $i_$0040preact$002fsignals.useSignalEffect)((() => {
    body.U();
  }));
});
var $d_Lpreact_signals_ComponentVarContext$ = new $TypeData().i($c_Lpreact_signals_ComponentVarContext$, "preact.signals.ComponentVarContext$", ({
  aD: 1,
  Y: 1
}));
var $n_Lpreact_signals_ComponentVarContext$;
function $m_Lpreact_signals_ComponentVarContext$() {
  if ((!$n_Lpreact_signals_ComponentVarContext$)) {
    $n_Lpreact_signals_ComponentVarContext$ = new $c_Lpreact_signals_ComponentVarContext$();
  }
  return $n_Lpreact_signals_ComponentVarContext$;
}
/** @constructor */
function $c_Lpreact_signals_GlobalVarContext$() {
}
$p = $c_Lpreact_signals_GlobalVarContext$.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_GlobalVarContext$;
/** @constructor */
function $h_Lpreact_signals_GlobalVarContext$() {
}
$h_Lpreact_signals_GlobalVarContext$.prototype = $p;
$p.ax = (function(initialValue) {
  return new $c_Lpreact_signals_Var((0, $i_$0040preact$002fsignals.signal)(initialValue));
});
$p.b1 = (function(computation) {
  return new $c_Lpreact_signals_Memo((0, $i_$0040preact$002fsignals.computed)((() => computation.U())));
});
$p.aw = (function(body) {
  return (0, $i_$0040preact$002fsignals.effect)((() => {
    body.U();
  }));
});
var $d_Lpreact_signals_GlobalVarContext$ = new $TypeData().i($c_Lpreact_signals_GlobalVarContext$, "preact.signals.GlobalVarContext$", ({
  aE: 1,
  Y: 1
}));
var $n_Lpreact_signals_GlobalVarContext$;
function $m_Lpreact_signals_GlobalVarContext$() {
  if ((!$n_Lpreact_signals_GlobalVarContext$)) {
    $n_Lpreact_signals_GlobalVarContext$ = new $c_Lpreact_signals_GlobalVarContext$();
  }
  return $n_Lpreact_signals_GlobalVarContext$;
}
/** @constructor */
function $c_Lpreact_signals_Memo(underlying) {
  this.ao = null;
  this.ao = underlying;
}
$p = $c_Lpreact_signals_Memo.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_Memo;
/** @constructor */
function $h_Lpreact_signals_Memo() {
}
$h_Lpreact_signals_Memo.prototype = $p;
$p.U = (function() {
  return this.ao.value;
});
$p.a9 = (function() {
  return this.ao;
});
var $d_Lpreact_signals_Memo = new $TypeData().i($c_Lpreact_signals_Memo, "preact.signals.Memo", ({
  aF: 1,
  X: 1
}));
/** @constructor */
function $c_Lpreact_signals_Var(underlying) {
  this.t = null;
  this.t = underlying;
}
$p = $c_Lpreact_signals_Var.prototype = new $h_O();
$p.constructor = $c_Lpreact_signals_Var;
/** @constructor */
function $h_Lpreact_signals_Var() {
}
$h_Lpreact_signals_Var.prototype = $p;
$p.U = (function() {
  return this.t.value;
});
$p.a9 = (function() {
  return this.t;
});
var $d_Lpreact_signals_Var = new $TypeData().i($c_Lpreact_signals_Var, "preact.signals.Var", ({
  aG: 1,
  X: 1
}));
/** @constructor */
function $c_Lpreact_test_test$package$$anon$1() {
  this.Z = null;
  $ct_Lpreact_component_ComponentBase__sjs_js_Function1__(this, $m_Lpreact_test_test$package$().by());
}
$p = $c_Lpreact_test_test$package$$anon$1.prototype = new $h_Lpreact_component_ComponentBase();
$p.constructor = $c_Lpreact_test_test$package$$anon$1;
/** @constructor */
function $h_Lpreact_test_test$package$$anon$1() {
}
$h_Lpreact_test_test$package$$anon$1.prototype = $p;
var $d_Lpreact_test_test$package$$anon$1 = new $TypeData().i($c_Lpreact_test_test$package$$anon$1, "preact.test.test$package$$anon$1", ({
  aM: 1,
  I: 1
}));
/** @constructor */
function $c_Lpreact_test_test$package$$anon$2() {
  this.Z = null;
  $ct_Lpreact_component_ComponentBase__sjs_js_Function1__(this, $m_Lpreact_test_test$package$().bz());
}
$p = $c_Lpreact_test_test$package$$anon$2.prototype = new $h_Lpreact_component_ComponentBase();
$p.constructor = $c_Lpreact_test_test$package$$anon$2;
/** @constructor */
function $h_Lpreact_test_test$package$$anon$2() {
}
$h_Lpreact_test_test$package$$anon$2.prototype = $p;
var $d_Lpreact_test_test$package$$anon$2 = new $TypeData().i($c_Lpreact_test_test$package$$anon$2, "preact.test.test$package$$anon$2", ({
  aN: 1,
  I: 1
}));
/** @constructor */
function $c_Lpreact_test_test$package$$anon$3() {
  this.Z = null;
  $ct_Lpreact_component_ComponentBase__sjs_js_Function1__(this, $m_Lpreact_test_test$package$().bA());
}
$p = $c_Lpreact_test_test$package$$anon$3.prototype = new $h_Lpreact_component_ComponentBase();
$p.constructor = $c_Lpreact_test_test$package$$anon$3;
/** @constructor */
function $h_Lpreact_test_test$package$$anon$3() {
}
$h_Lpreact_test_test$package$$anon$3.prototype = $p;
var $d_Lpreact_test_test$package$$anon$3 = new $TypeData().i($c_Lpreact_test_test$package$$anon$3, "preact.test.test$package$$anon$3", ({
  aO: 1,
  I: 1
}));
/** @constructor */
function $c_s_Console$() {
  this.aM = null;
  $n_s_Console$ = this;
  this.aM = new $c_s_util_DynamicVariable($m_jl_System$Streams$().aC);
}
$p = $c_s_Console$.prototype = new $h_O();
$p.constructor = $c_s_Console$;
/** @constructor */
function $h_s_Console$() {
}
$h_s_Console$.prototype = $p;
$p.h = (function() {
  return this.aM.C;
});
var $d_s_Console$ = new $TypeData().i($c_s_Console$, "scala.Console$", ({
  aQ: 1,
  bv: 1
}));
var $n_s_Console$;
function $m_s_Console$() {
  if ((!$n_s_Console$)) {
    $n_s_Console$ = new $c_s_Console$();
  }
  return $n_s_Console$;
}
/** @constructor */
function $c_s_Conversion() {
}
$p = $c_s_Conversion.prototype = new $h_O();
$p.constructor = $c_s_Conversion;
/** @constructor */
function $h_s_Conversion() {
}
$h_s_Conversion.prototype = $p;
$p.p = (function() {
  return "<function1>";
});
/** @constructor */
function $c_sr_AbstractFunction0() {
}
$p = $c_sr_AbstractFunction0.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction0;
/** @constructor */
function $h_sr_AbstractFunction0() {
}
$h_sr_AbstractFunction0.prototype = $p;
$p.p = (function() {
  return "<function0>";
});
/** @constructor */
function $c_sr_AbstractFunction1() {
}
$p = $c_sr_AbstractFunction1.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction1;
/** @constructor */
function $h_sr_AbstractFunction1() {
}
$h_sr_AbstractFunction1.prototype = $p;
$p.p = (function() {
  return "<function1>";
});
/** @constructor */
function $c_sr_ObjectRef(elem) {
  this.T = null;
  this.T = elem;
}
$p = $c_sr_ObjectRef.prototype = new $h_O();
$p.constructor = $c_sr_ObjectRef;
/** @constructor */
function $h_sr_ObjectRef() {
}
$h_sr_ObjectRef.prototype = $p;
$p.p = (function() {
  return ("" + this.T);
});
var $d_sr_ObjectRef = new $TypeData().i($c_sr_ObjectRef, "scala.runtime.ObjectRef", ({
  bK: 1,
  a: 1
}));
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.a4 = 0;
  this.aZ = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.a4 = $f_T__hashCode__I("Seq");
  this.aZ = $f_T__hashCode__I("Map");
  $f_T__hashCode__I("Set");
  this.bJ($m_sci_Nil$(), this.aZ);
}
$p = $c_s_util_hashing_MurmurHash3$.prototype = new $h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {
}
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.b9 = (function(xs) {
  return ($is_sc_IndexedSeq(xs) ? this.bs(xs, this.a4) : ((xs instanceof $c_sci_List) ? this.bu(xs, this.a4) : this.bx(xs, this.a4)));
});
var $d_s_util_hashing_MurmurHash3$ = new $TypeData().i($c_s_util_hashing_MurmurHash3$, "scala.util.hashing.MurmurHash3$", ({
  bX: 1,
  bW: 1
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
function $c_Lpreact_signals_Var$package$$anon$1() {
}
$p = $c_Lpreact_signals_Var$package$$anon$1.prototype = new $h_s_Conversion();
$p.constructor = $c_Lpreact_signals_Var$package$$anon$1;
/** @constructor */
function $h_Lpreact_signals_Var$package$$anon$1() {
}
$h_Lpreact_signals_Var$package$$anon$1.prototype = $p;
$p.ad = (function(signal) {
  return new $c_Lpreact_component_ChildModifier(signal.a9());
});
$p.N = (function(x) {
  return new $c_Lpreact_component_ChildModifier(x.a9());
});
var $d_Lpreact_signals_Var$package$$anon$1 = new $TypeData().i($c_Lpreact_signals_Var$package$$anon$1, "preact.signals.Var$package$$anon$1", ({
  aI: 1,
  Z: 1,
  i: 1
}));
/** @constructor */
function $c_Lpreact_signals_Var$package$$anon$2() {
}
$p = $c_Lpreact_signals_Var$package$$anon$2.prototype = new $h_s_Conversion();
$p.constructor = $c_Lpreact_signals_Var$package$$anon$2;
/** @constructor */
function $h_Lpreact_signals_Var$package$$anon$2() {
}
$h_Lpreact_signals_Var$package$$anon$2.prototype = $p;
$p.ad = (function(signal) {
  return new $c_Lpreact_component_ChildModifier(signal.a9());
});
$p.N = (function(x) {
  return new $c_Lpreact_component_ChildModifier(x.a9());
});
var $d_Lpreact_signals_Var$package$$anon$2 = new $TypeData().i($c_Lpreact_signals_Var$package$$anon$2, "preact.signals.Var$package$$anon$2", ({
  aJ: 1,
  Z: 1,
  i: 1
}));
function $f_sc_Iterator__concat__F0__sc_Iterator($thiz, xs) {
  return new $c_sc_Iterator$ConcatIterator($thiz).be(xs);
}
function $f_sc_Iterator__sliceIterator__I__I__sc_Iterator($thiz, from, until) {
  var lo = ((from > 0) ? from : 0);
  var rest = ((until < 0) ? (-1) : ((until <= lo) ? 0 : ((until - lo) | 0)));
  return ((rest === 0) ? $m_sc_Iterator$().K : new $c_sc_Iterator$SliceIterator($thiz, lo, rest));
}
function $f_sc_Iterator__sameElements__sc_IterableOnce__Z($thiz, that) {
  var those = that.s();
  while ($thiz.k()) {
    if ((!those.k())) {
      return false;
    }
    if ((!$m_sr_BoxesRunTime$().z($thiz.g(), those.g()))) {
      return false;
    }
  }
  return (!those.k());
}
/** @constructor */
function $c_sc_Iterator$() {
  this.K = null;
  $n_sc_Iterator$ = this;
  this.K = new $c_sc_Iterator$$anon$19();
}
$p = $c_sc_Iterator$.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {
}
$h_sc_Iterator$.prototype = $p;
var $d_sc_Iterator$ = new $TypeData().i($c_sc_Iterator$, "scala.collection.Iterator$", ({
  b4: 1,
  a: 1,
  b3: 1
}));
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if ((!$n_sc_Iterator$)) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
function $isArrayOf_s_math_ScalaNumber(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bw)));
}
/** @constructor */
function $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(f) {
  this.aX = null;
  this.aX = f;
}
$p = $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype = new $h_sr_AbstractFunction0();
$p.constructor = $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855;
/** @constructor */
function $h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855() {
}
$h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype = $p;
$p.U = (function() {
  return (0, this.aX)();
});
var $d_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855 = new $TypeData().i($c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855, "scala.runtime.AbstractFunction0.$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855", ({
  bF: 1,
  bE: 1,
  aR: 1
}));
/** @constructor */
function $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(f) {
  this.aY = null;
  this.aY = f;
}
$p = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = new $h_sr_AbstractFunction1();
$p.constructor = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28;
/** @constructor */
function $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28() {
}
$h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = $p;
$p.N = (function(x0) {
  return (0, this.aY)(x0);
});
var $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 = new $TypeData().i($c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28, "scala.runtime.AbstractFunction1.$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28", ({
  bH: 1,
  bG: 1,
  i: 1
}));
var $d_sr_Nothing$ = new $TypeData().i(0, "scala.runtime.Nothing$", ({
  bJ: 1,
  d: 1,
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
$p.ay = (function(f) {
  return ((arg1$2) => f.N(arg1$2));
});
var $d_sjs_js_Any$ = new $TypeData().i($c_sjs_js_Any$, "scala.scalajs.js.Any$", ({
  bO: 1,
  bQ: 1,
  bR: 1
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
function $f_jl_Boolean__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_jl_Boolean__hashCode__I($thiz) {
  return ($thiz ? 1231 : 1237);
}
function $f_jl_Boolean__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Boolean = new $TypeData().i(0, "java.lang.Boolean", ({
  ac: 1,
  a: 1,
  e: 1,
  h: 1
}), ((x) => ((typeof x) === "boolean")));
function $f_jl_Character__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Character__equals__O__Z($thiz, that) {
  return ((that instanceof $Char) && ($thiz === that.c));
}
function $f_jl_Character__toString__T($thiz) {
  return ("" + $cToS($thiz));
}
function $isArrayOf_jl_Character(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.Q)));
}
var $d_jl_Character = new $TypeData().i(0, "java.lang.Character", ({
  Q: 1,
  a: 1,
  e: 1,
  h: 1
}), ((x) => (x instanceof $Char)));
class $c_jl_RuntimeException extends $c_jl_Exception {
}
function $ct_jl_StringBuilder__($thiz) {
  $thiz.m = "";
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
  this.m = null;
}
$p = $c_jl_StringBuilder.prototype = new $h_O();
$p.constructor = $c_jl_StringBuilder;
/** @constructor */
function $h_jl_StringBuilder() {
}
$h_jl_StringBuilder.prototype = $p;
$p.p = (function() {
  return this.m;
});
$p.l = (function() {
  return this.m.length;
});
$p.b0 = (function(index) {
  return this.m.charCodeAt(index);
});
var $d_jl_StringBuilder = new $TypeData().i($c_jl_StringBuilder, "java.lang.StringBuilder", ({
  ar: 1,
  G: 1,
  O: 1,
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
$p.v = (function() {
  return (-1);
});
$p.at = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.s = (function() {
  return this;
});
$p.ag = (function(n) {
  return this.ak(n, (-1));
});
$p.ak = (function(from, until) {
  return $f_sc_Iterator__sliceIterator__I__I__sc_Iterator(this, from, until);
});
$p.p = (function() {
  return "<iterator>";
});
function $f_sc_SeqOps__isEmpty__Z($thiz) {
  return ($thiz.a5(0) === 0);
}
function $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, that) {
  var thisKnownSize = $thiz.v();
  if ((thisKnownSize !== (-1))) {
    var thatKnownSize = that.v();
    if ((thatKnownSize !== (-1))) {
      if ((thisKnownSize !== thatKnownSize)) {
        return false;
      }
      if ((thisKnownSize === 0)) {
        return true;
      }
    }
  }
  return $f_sc_Iterator__sameElements__sc_IterableOnce__Z($thiz.s(), that);
}
function $isArrayOf_s_util_CommandLineParser$ParseError(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bU)));
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
  ab: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
function $f_jl_Byte__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Byte__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Byte__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Byte = new $TypeData().i(0, "java.lang.Byte", ({
  ad: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1
}), ((x) => $isByte(x)));
function $ct_jl_IllegalArgumentException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_jl_IllegalArgumentException extends $c_jl_RuntimeException {
}
var $d_jl_IllegalArgumentException = new $TypeData().i($c_jl_IllegalArgumentException, "java.lang.IllegalArgumentException", ({
  S: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
class $c_jl_IndexOutOfBoundsException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_IndexOutOfBoundsException = new $TypeData().i($c_jl_IndexOutOfBoundsException, "java.lang.IndexOutOfBoundsException", ({
  ag: 1,
  g: 1,
  f: 1,
  d: 1,
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
  ak: 1,
  N: 1,
  L: 1,
  P: 1,
  M: 1
}));
class $c_jl_NegativeArraySizeException extends $c_jl_RuntimeException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
var $d_jl_NegativeArraySizeException = new $TypeData().i($c_jl_NegativeArraySizeException, "java.lang.NegativeArraySizeException", ({
  al: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
function $ct_jl_NullPointerException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_NullPointerException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_NullPointerException extends $c_jl_RuntimeException {
}
var $d_jl_NullPointerException = new $TypeData().i($c_jl_NullPointerException, "java.lang.NullPointerException", ({
  am: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
function $isArrayOf_jl_SecurityException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.ao)));
}
function $f_jl_Short__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Short__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Short__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Short = new $TypeData().i(0, "java.lang.Short", ({
  ap: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1
}), ((x) => $isShort(x)));
class $c_jl_UnsupportedOperationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_UnsupportedOperationException = new $TypeData().i($c_jl_UnsupportedOperationException, "java.lang.UnsupportedOperationException", ({
  au: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
class $c_ju_NoSuchElementException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_ju_NoSuchElementException = new $TypeData().i($c_ju_NoSuchElementException, "java.util.NoSuchElementException", ({
  az: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
function $p_s_MatchError__objString__T($thiz) {
  if ((!$thiz.aO)) {
    if (($thiz.ab === null)) {
      var $x_1 = "null";
    } else {
      try {
        var $x_1 = ((($thiz.ab + " (") + $p_s_MatchError__ofClass$1__T($thiz)) + ")");
      } catch (e) {
        var $x_1 = ("an instance " + $p_s_MatchError__ofClass$1__T($thiz));
      }
    }
    $thiz.aN = $x_1;
    $thiz.aO = true;
  }
  return $thiz.aN;
}
function $p_s_MatchError__ofClass$1__T($thiz) {
  var this$1 = $thiz.ab;
  return ("of class " + $objectClassName(this$1));
}
class $c_s_MatchError extends $c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.ab = null;
    this.aN = null;
    this.aO = false;
    this.ab = obj;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  aA() {
    return $p_s_MatchError__objString__T(this);
  }
}
var $d_s_MatchError = new $TypeData().i($c_s_MatchError, "scala.MatchError", ({
  aS: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, ($thiz.af() + "("), ", ", ")");
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
$p.k = (function() {
  return false;
});
$p.bw = (function() {
  throw new $c_ju_NoSuchElementException("next on empty iterator");
});
$p.v = (function() {
  return 0;
});
$p.g = (function() {
  this.bw();
});
$p.ak = (function(from, until) {
  return this;
});
var $d_sc_Iterator$$anon$19 = new $TypeData().i($c_sc_Iterator$$anon$19, "scala.collection.Iterator$$anon$19", ({
  b5: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $p_sc_Iterator$ConcatIterator__merge$1__V($thiz) {
  while (true) {
    if (($thiz.u instanceof $c_sc_Iterator$ConcatIterator)) {
      var c = $thiz.u;
      $thiz.u = c.u;
      $thiz.R = c.R;
      if ((c.y !== null)) {
        if (($thiz.x === null)) {
          $thiz.x = c.x;
        }
        var x$proxy10 = c.x;
        if ((x$proxy10 === null)) {
          $m_sr_Scala3RunTime$().ai();
        }
        x$proxy10.a1 = $thiz.y;
        $thiz.y = c.y;
      }
    } else {
      return (void 0);
    }
  }
}
function $p_sc_Iterator$ConcatIterator__advance$1__Z($thiz) {
  while (true) {
    if (($thiz.y === null)) {
      $thiz.u = null;
      $thiz.x = null;
      return false;
    } else {
      $thiz.u = $thiz.y.br();
      if (($thiz.x === $thiz.y)) {
        var x$proxy12 = $thiz.x;
        if ((x$proxy12 === null)) {
          $m_sr_Scala3RunTime$().ai();
        }
        $thiz.x = x$proxy12.a1;
      }
      $thiz.y = $thiz.y.a1;
      $p_sc_Iterator$ConcatIterator__merge$1__V($thiz);
      if ($thiz.R) {
        return true;
      } else if ((($thiz.u !== null) && $thiz.u.k())) {
        $thiz.R = true;
        return true;
      }
    }
  }
}
/** @constructor */
function $c_sc_Iterator$ConcatIterator(from) {
  this.u = null;
  this.y = null;
  this.x = null;
  this.R = false;
  this.u = from;
  this.y = null;
  this.x = null;
  this.R = false;
}
$p = $c_sc_Iterator$ConcatIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$ConcatIterator;
/** @constructor */
function $h_sc_Iterator$ConcatIterator() {
}
$h_sc_Iterator$ConcatIterator.prototype = $p;
$p.k = (function() {
  if (this.R) {
    return true;
  } else if ((this.u !== null)) {
    if (this.u.k()) {
      this.R = true;
      return true;
    } else {
      return $p_sc_Iterator$ConcatIterator__advance$1__Z(this);
    }
  } else {
    return false;
  }
});
$p.g = (function() {
  if (this.k()) {
    this.R = false;
    var x$proxy13 = this.u;
    if ((x$proxy13 === null)) {
      $m_sr_Scala3RunTime$().ai();
    }
    return x$proxy13.g();
  } else {
    return $m_sc_Iterator$().K.g();
  }
});
$p.be = (function(that) {
  var c = new $c_sc_Iterator$ConcatIteratorCell(that, null);
  if ((this.y === null)) {
    this.y = c;
    this.x = c;
  } else {
    var x$proxy14 = this.x;
    if ((x$proxy14 === null)) {
      $m_sr_Scala3RunTime$().ai();
    }
    x$proxy14.a1 = c;
    this.x = c;
  }
  if ((this.u === null)) {
    this.u = $m_sc_Iterator$().K;
  }
  return this;
});
function $isArrayOf_sc_Iterator$ConcatIterator(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a1)));
}
var $d_sc_Iterator$ConcatIterator = new $TypeData().i($c_sc_Iterator$ConcatIterator, "scala.collection.Iterator$ConcatIterator", ({
  a1: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $p_sc_Iterator$SliceIterator__skip__V($thiz) {
  while (($thiz.L > 0)) {
    if ($thiz.S.k()) {
      $thiz.S.g();
      $thiz.L = (((-1) + $thiz.L) | 0);
    } else {
      $thiz.L = 0;
    }
  }
}
function $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I($thiz, lo$1) {
  if (($thiz.w < 0)) {
    return (-1);
  } else {
    var that = (($thiz.w - lo$1) | 0);
    return ((that < 0) ? 0 : that);
  }
}
/** @constructor */
function $c_sc_Iterator$SliceIterator(underlying, start, limit) {
  this.S = null;
  this.w = 0;
  this.L = 0;
  this.S = underlying;
  this.w = limit;
  this.L = start;
}
$p = $c_sc_Iterator$SliceIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$SliceIterator;
/** @constructor */
function $h_sc_Iterator$SliceIterator() {
}
$h_sc_Iterator$SliceIterator.prototype = $p;
$p.v = (function() {
  var size = this.S.v();
  if ((size < 0)) {
    return (-1);
  } else {
    var that = ((size - this.L) | 0);
    var dropSize = ((that < 0) ? 0 : that);
    if ((this.w < 0)) {
      return dropSize;
    } else {
      var x = this.w;
      return ((x < dropSize) ? x : dropSize);
    }
  }
});
$p.k = (function() {
  $p_sc_Iterator$SliceIterator__skip__V(this);
  return ((this.w !== 0) && this.S.k());
});
$p.g = (function() {
  $p_sc_Iterator$SliceIterator__skip__V(this);
  if ((this.w > 0)) {
    this.w = (((-1) + this.w) | 0);
    return this.S.g();
  } else {
    return ((this.w < 0) ? this.S.g() : $m_sc_Iterator$().K.g());
  }
});
$p.ak = (function(from, until) {
  var lo = ((from > 0) ? from : 0);
  if ((until < 0)) {
    var rest = $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I(this, lo);
  } else if ((until <= lo)) {
    var rest = 0;
  } else if ((this.w < 0)) {
    var rest = ((until - lo) | 0);
  } else {
    var x = $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I(this, lo);
    var that = ((until - lo) | 0);
    var rest = ((x < that) ? x : that);
  }
  var sum = ((this.L + lo) | 0);
  if ((rest === 0)) {
    return $m_sc_Iterator$().K;
  } else if ((sum < 0)) {
    this.L = 2147483647;
    this.w = 0;
    return $f_sc_Iterator__concat__F0__sc_Iterator(this, new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => new $c_sc_Iterator$SliceIterator(this.S, (((-2147483647) + sum) | 0), rest))));
  } else {
    this.L = sum;
    this.w = rest;
    return this;
  }
});
var $d_sc_Iterator$SliceIterator = new $TypeData().i($c_sc_Iterator$SliceIterator, "scala.collection.Iterator$SliceIterator", ({
  b7: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if ((n < 0)) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  var skipped = $thiz.bk(n);
  if (skipped.n()) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  return skipped.O();
}
function $f_sc_LinearSeqOps__sameElements__sc_IterableOnce__Z($thiz, that) {
  return ($is_sc_LinearSeq(that) ? $p_sc_LinearSeqOps__linearSeqEq$1__sc_LinearSeq__sc_LinearSeq__Z($thiz, $thiz, that) : $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, that));
}
function $p_sc_LinearSeqOps__linearSeqEq$1__sc_LinearSeq__sc_LinearSeq__Z($thiz, a, b) {
  var b$tailLocal1 = b;
  var a$tailLocal1 = a;
  while (true) {
    if ((a$tailLocal1 === b$tailLocal1)) {
      return true;
    } else if ((((!a$tailLocal1.n()) && (!b$tailLocal1.n())) && $m_sr_BoxesRunTime$().z(a$tailLocal1.O(), b$tailLocal1.O()))) {
      var a$tailLocal1$tmp1 = a$tailLocal1.E();
      var b$tailLocal1$tmp1 = b$tailLocal1.E();
      a$tailLocal1 = a$tailLocal1$tmp1;
      b$tailLocal1 = b$tailLocal1$tmp1;
    } else {
      return (a$tailLocal1.n() && b$tailLocal1.n());
    }
  }
}
/** @constructor */
function $c_sc_StrictOptimizedLinearSeqOps$$anon$1(outer) {
  this.a3 = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.a3 = outer;
}
$p = $c_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_StrictOptimizedLinearSeqOps$$anon$1;
/** @constructor */
function $h_sc_StrictOptimizedLinearSeqOps$$anon$1() {
}
$h_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = $p;
$p.k = (function() {
  return (!this.a3.n());
});
$p.g = (function() {
  var r = this.a3.O();
  this.a3 = this.a3.E();
  return r;
});
var $d_sc_StrictOptimizedLinearSeqOps$$anon$1 = new $TypeData().i($c_sc_StrictOptimizedLinearSeqOps$$anon$1, "scala.collection.StrictOptimizedLinearSeqOps$$anon$1", ({
  bb: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1
}));
function $f_jl_Double__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
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
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.R)));
}
var $d_jl_Double = new $TypeData().i(0, "java.lang.Double", ({
  R: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1,
  s: 1
}), ((x) => ((typeof x) === "number")));
function $f_jl_Float__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
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
  af: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1,
  s: 1
}), ((x) => $isFloat(x)));
function $f_jl_Integer__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Integer__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Integer__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Integer = new $TypeData().i(0, "java.lang.Integer", ({
  ah: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1,
  s: 1
}), ((x) => $isInt(x)));
function $f_jl_Long__equals__O__Z($thiz, that) {
  return ((that instanceof $c_RTLong) && (($thiz.b === that.b) && ($thiz.c === that.c)));
}
function $f_jl_Long__hashCode__I($thiz) {
  return ($thiz.b ^ $thiz.c);
}
function $f_jl_Long__toString__T($thiz) {
  return $m_RTLong$().b8($thiz.b, $thiz.c);
}
function $isArrayOf_jl_Long(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.T)));
}
var $d_jl_Long = new $TypeData().i(0, "java.lang.Long", ({
  T: 1,
  j: 1,
  a: 1,
  e: 1,
  h: 1,
  s: 1
}), ((x) => (x instanceof $c_RTLong)));
class $c_jl_NumberFormatException extends $c_jl_IllegalArgumentException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_NumberFormatException = new $TypeData().i($c_jl_NumberFormatException, "java.lang.NumberFormatException", ({
  an: 1,
  S: 1,
  g: 1,
  f: 1,
  d: 1,
  a: 1
}));
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
function $f_T__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_T__toString__T($thiz) {
  return $thiz;
}
var $d_T = new $TypeData().i(0, "java.lang.String", ({
  aq: 1,
  a: 1,
  e: 1,
  G: 1,
  h: 1,
  s: 1
}), ((x) => ((typeof x) === "string")));
/** @constructor */
function $c_sc_AbstractIterable() {
}
$p = $c_sc_AbstractIterable.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {
}
$h_sc_AbstractIterable.prototype = $p;
$p.v = (function() {
  return (-1);
});
$p.ah = (function(f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
});
$p.at = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.af = (function() {
  return this.a8();
});
/** @constructor */
function $c_sc_ArrayOps$ArrayIterator(xs) {
  this.ac = null;
  this.J = 0;
  this.a0 = 0;
  this.ac = xs;
  this.J = 0;
  this.a0 = $m_jl_reflect_Array$().az(this.ac);
}
$p = $c_sc_ArrayOps$ArrayIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_ArrayOps$ArrayIterator;
/** @constructor */
function $h_sc_ArrayOps$ArrayIterator() {
}
$h_sc_ArrayOps$ArrayIterator.prototype = $p;
$p.v = (function() {
  return ((this.a0 - this.J) | 0);
});
$p.k = (function() {
  return (this.J < this.a0);
});
$p.g = (function() {
  if ((this.J >= $m_jl_reflect_Array$().az(this.ac))) {
    $m_sc_Iterator$().K.g();
  }
  var r = $m_sr_ScalaRunTime$().X(this.ac, this.J);
  this.J = ((1 + this.J) | 0);
  return r;
});
$p.ag = (function(n) {
  if ((n > 0)) {
    var newPos = ((this.J + n) | 0);
    if ((newPos < 0)) {
      var $x_1 = this.a0;
    } else {
      var a = this.a0;
      var $x_1 = ((a < newPos) ? a : newPos);
    }
    this.J = $x_1;
  }
  return this;
});
var $d_sc_ArrayOps$ArrayIterator = new $TypeData().i($c_sc_ArrayOps$ArrayIterator, "scala.collection.ArrayOps$ArrayIterator", ({
  aV: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1,
  a: 1
}));
function $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I($thiz, value) {
  return ((value < 0) ? 0 : ((value > $thiz.B) ? $thiz.B : value));
}
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator(self) {
  this.aP = null;
  this.Q = 0;
  this.B = 0;
  this.aP = self;
  this.Q = 0;
  this.B = self.l();
}
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {
}
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.v = (function() {
  return this.B;
});
$p.k = (function() {
  return (this.B > 0);
});
$p.g = (function() {
  if ((this.B > 0)) {
    var r = this.aP.r(this.Q);
    this.Q = ((1 + this.Q) | 0);
    this.B = (((-1) + this.B) | 0);
    return r;
  } else {
    return $m_sc_Iterator$().K.g();
  }
});
$p.ag = (function(n) {
  if ((n > 0)) {
    this.Q = ((this.Q + n) | 0);
    var b = ((this.B - n) | 0);
    this.B = ((b < 0) ? 0 : b);
  }
  return this;
});
$p.ak = (function(from, until) {
  var formatFrom = $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I(this, from);
  var formatUntil = $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I(this, until);
  var b = ((formatUntil - formatFrom) | 0);
  this.B = ((b < 0) ? 0 : b);
  this.Q = ((this.Q + formatFrom) | 0);
  return this;
});
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $TypeData().i($c_sc_IndexedSeqView$IndexedSeqViewIterator, "scala.collection.IndexedSeqView$IndexedSeqViewIterator", ({
  b2: 1,
  m: 1,
  b: 1,
  c: 1,
  q: 1,
  a: 1
}));
function $p_sci_ArraySeq$__emptyImpl__sci_ArraySeq$ofRef($thiz) {
  if ((!$thiz.aV)) {
    $thiz.aU = new $c_sci_ArraySeq$ofRef(new ($d_sr_Nothing$.r().C)(0));
    $thiz.aV = true;
  }
  return $thiz.aU;
}
/** @constructor */
function $c_sci_ArraySeq$() {
  this.aU = null;
  this.aV = false;
}
$p = $c_sci_ArraySeq$.prototype = new $h_O();
$p.constructor = $c_sci_ArraySeq$;
/** @constructor */
function $h_sci_ArraySeq$() {
}
$h_sci_ArraySeq$.prototype = $p;
var $d_sci_ArraySeq$ = new $TypeData().i($c_sci_ArraySeq$, "scala.collection.immutable.ArraySeq$", ({
  bg: 1,
  a: 1,
  aY: 1,
  aW: 1,
  aX: 1,
  ba: 1
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
  return ($thiz.a8() + "(<not computed>)");
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
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bP)));
}
function $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V($thiz, line) {
  if (((typeof console) !== "undefined")) {
    if (($thiz.aB && (!(!(!(!console.error)))))) {
      console.error(line);
    } else {
      console.log(line);
    }
  }
}
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream(isErr) {
  this.aB = false;
  this.Y = null;
  this.aB = isErr;
  $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__(this, new $c_jl_JSConsoleBasedPrintStream$DummyOutputStream(), false, null);
  this.Y = "";
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
      this.Y = (("" + this.Y) + rest);
      rest = "";
    } else {
      var $x_1 = this.Y;
      var this$2 = rest;
      $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V(this, (("" + $x_1) + this$2.substring(0, nlPos)));
      this.Y = "";
      var this$3 = rest;
      var beginIndex = ((1 + nlPos) | 0);
      rest = this$3.substring(beginIndex);
    }
  }
});
var $d_jl_JSConsoleBasedPrintStream = new $TypeData().i($c_jl_JSConsoleBasedPrintStream, "java.lang.JSConsoleBasedPrintStream", ({
  aj: 1,
  aa: 1,
  a9: 1,
  N: 1,
  L: 1,
  P: 1,
  M: 1,
  O: 1
}));
function $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq($thiz, n, s) {
  var s$tailLocal1 = s;
  var n$tailLocal1 = n;
  while (true) {
    if (((n$tailLocal1 <= 0) || s$tailLocal1.n())) {
      return s$tailLocal1;
    } else {
      var n$tailLocal1$tmp1 = (((-1) + n$tailLocal1) | 0);
      var s$tailLocal1$tmp1 = s$tailLocal1.E();
      n$tailLocal1 = n$tailLocal1$tmp1;
      s$tailLocal1 = s$tailLocal1$tmp1;
    }
  }
}
/** @constructor */
function $c_s_reflect_ManifestFactory$PhantomManifest() {
  this.aq = null;
}
$p = $c_s_reflect_ManifestFactory$PhantomManifest.prototype = new $h_s_reflect_ManifestFactory$ClassTypeManifest();
$p.constructor = $c_s_reflect_ManifestFactory$PhantomManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$PhantomManifest() {
}
$h_s_reflect_ManifestFactory$PhantomManifest.prototype = $p;
$p.p = (function() {
  return this.aq;
});
$p.A = (function(that) {
  return (this === that);
});
$p.I = (function() {
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
$p.p = (function() {
  return $f_sc_View__toString__T(this);
});
/** @constructor */
function $c_s_reflect_ManifestFactory$ObjectManifest$() {
  this.aq = null;
  this.aq = "Object";
  $m_sci_Nil$();
}
$p = $c_s_reflect_ManifestFactory$ObjectManifest$.prototype = new $h_s_reflect_ManifestFactory$PhantomManifest();
$p.constructor = $c_s_reflect_ManifestFactory$ObjectManifest$;
/** @constructor */
function $h_s_reflect_ManifestFactory$ObjectManifest$() {
}
$h_s_reflect_ManifestFactory$ObjectManifest$.prototype = $p;
var $d_s_reflect_ManifestFactory$ObjectManifest$ = new $TypeData().i($c_s_reflect_ManifestFactory$ObjectManifest$, "scala.reflect.ManifestFactory$ObjectManifest$", ({
  bB: 1,
  bC: 1,
  bA: 1,
  a: 1,
  bD: 1,
  bx: 1,
  l: 1,
  by: 1,
  bz: 1
}));
var $n_s_reflect_ManifestFactory$ObjectManifest$;
function $m_s_reflect_ManifestFactory$ObjectManifest$() {
  if ((!$n_s_reflect_ManifestFactory$ObjectManifest$)) {
    $n_s_reflect_ManifestFactory$ObjectManifest$ = new $c_s_reflect_ManifestFactory$ObjectManifest$();
  }
  return $n_s_reflect_ManifestFactory$ObjectManifest$;
}
function $f_sc_Seq__equals__O__Z($thiz, o) {
  if (($thiz === o)) {
    return true;
  } else {
    if ($is_sc_Seq(o)) {
      if (o.av($thiz)) {
        return $thiz.aj(o);
      }
    }
    return false;
  }
}
function $is_sc_Seq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.k)));
}
function $isArrayOf_sc_Seq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.k)));
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
  return $f_sc_SeqOps__isEmpty__Z(this);
});
$p.aj = (function(that) {
  return $f_sc_SeqOps__sameElements__sc_IterableOnce__Z(this, that);
});
$p.av = (function(that) {
  return true;
});
$p.A = (function(o) {
  return $f_sc_Seq__equals__O__Z(this, o);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().b9(this);
});
$p.p = (function() {
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
function $is_sc_LinearSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.y)));
}
function $isArrayOf_sc_LinearSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.y)));
}
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.a2 = underlying;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqView$Id() {
  this.a2 = null;
}
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {
}
$h_sc_SeqView$Id.prototype = $p;
$p.r = (function(idx) {
  return this.a2.r(idx);
});
$p.l = (function() {
  return this.a2.l();
});
$p.n = (function() {
  return this.a2.n();
});
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.a2 = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {
}
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.a5 = (function(len) {
  var x = this.l();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.v = (function() {
  return this.l();
});
$p.s = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(this);
});
$p.a8 = (function() {
  return "IndexedSeqView";
});
var $d_sc_IndexedSeqView$Id = new $TypeData().i($c_sc_IndexedSeqView$Id, "scala.collection.IndexedSeqView$Id", ({
  b1: 1,
  b9: 1,
  aT: 1,
  aU: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  a: 1,
  bd: 1,
  r: 1,
  b8: 1,
  x: 1,
  b0: 1
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
function $f_sci_IndexedSeq__canEqual__O__Z($thiz, that) {
  return ((!$is_sci_IndexedSeq(that)) || ($thiz.l() === that.l()));
}
function $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z($thiz, o) {
  if ($is_sci_IndexedSeq(o)) {
    if (($thiz === o)) {
      return true;
    } else {
      var length = $thiz.l();
      var equal = (length === o.l());
      if (equal) {
        var index = 0;
        var a = $thiz.au();
        var b = o.au();
        var preferredLength = ((a < b) ? a : b);
        var hi = (length >> 31);
        var hi$1 = (preferredLength >> 31);
        var lo = (preferredLength << 1);
        var hi$2 = (((preferredLength >>> 31) | 0) | (hi$1 << 1));
        if (((hi === hi$2) ? ((length >>> 0) > (lo >>> 0)) : (hi > hi$2))) {
          var maxApplyCompare = preferredLength;
        } else {
          var maxApplyCompare = length;
        }
        while (((index < maxApplyCompare) && equal)) {
          equal = $m_sr_BoxesRunTime$().z($thiz.r(index), o.r(index));
          index = ((1 + index) | 0);
        }
        if (((index < length) && equal)) {
          var thisIt = $thiz.s().ag(index);
          var thatIt = o.s().ag(index);
          while ((equal && thisIt.k())) {
            equal = $m_sr_BoxesRunTime$().z(thisIt.g(), thatIt.g());
          }
        }
      }
      return equal;
    }
  } else {
    return $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, o);
  }
}
function $is_sci_IndexedSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.B)));
}
function $isArrayOf_sci_IndexedSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.B)));
}
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
  this.ar = null;
  this.ar = array;
}
$p = $c_sjsr_WrappedVarArgs.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs;
/** @constructor */
function $h_sjsr_WrappedVarArgs() {
}
$h_sjsr_WrappedVarArgs.prototype = $p;
$p.av = (function(that) {
  return $f_sci_IndexedSeq__canEqual__O__Z(this, that);
});
$p.aj = (function(o) {
  return $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z(this, o);
});
$p.au = (function() {
  return $m_sci_IndexedSeqDefaults$().aW;
});
$p.s = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.a5 = (function(len) {
  var x = this.l();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.v = (function() {
  return this.l();
});
$p.A = (function(o) {
  return $f_sc_Seq__equals__O__Z(this, o);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().b9(this);
});
$p.p = (function() {
  return $f_sc_Iterable__toString__T(this);
});
$p.n = (function() {
  return $f_sc_SeqOps__isEmpty__Z(this);
});
$p.ah = (function(f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
});
$p.at = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.l = (function() {
  return (this.ar.length | 0);
});
$p.r = (function(idx) {
  return this.ar[idx];
});
$p.af = (function() {
  return "WrappedVarArgs";
});
$p.N = (function(v1) {
  return this.r((v1 | 0));
});
var $d_sjsr_WrappedVarArgs = new $TypeData().i($c_sjsr_WrappedVarArgs, "scala.scalajs.runtime.WrappedVarArgs", ({
  bS: 1,
  B: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  C: 1,
  i: 1,
  t: 1,
  r: 1,
  l: 1,
  k: 1,
  E: 1,
  D: 1,
  x: 1,
  v: 1,
  a6: 1,
  F: 1,
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
$p.a5 = (function(len) {
  var x = this.M.a.length;
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.v = (function() {
  return this.M.a.length;
});
$p.a8 = (function() {
  return "IndexedSeq";
});
$p.av = (function(that) {
  return $f_sci_IndexedSeq__canEqual__O__Z(this, that);
});
$p.aj = (function(o) {
  return $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z(this, o);
});
$p.af = (function() {
  return "ArraySeq";
});
$p.au = (function() {
  return 2147483647;
});
/** @constructor */
function $c_sci_ArraySeq$ofRef(unsafeArray) {
  this.M = null;
  this.M = unsafeArray;
}
$p = $c_sci_ArraySeq$ofRef.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofRef;
/** @constructor */
function $h_sci_ArraySeq$ofRef() {
}
$h_sci_ArraySeq$ofRef.prototype = $p;
$p.l = (function() {
  return this.M.a.length;
});
$p.r = (function(i) {
  return this.M.a[i];
});
$p.I = (function() {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.bc(this.M, this$1.a4);
});
$p.A = (function(that) {
  return ((that instanceof $c_sci_ArraySeq$ofRef) ? $m_s_Array$().bl(this.M, that.M) : $f_sc_Seq__equals__O__Z(this, that));
});
$p.s = (function() {
  return new $c_sc_ArrayOps$ArrayIterator(this.M);
});
$p.N = (function(v1) {
  return this.r((v1 | 0));
});
function $isArrayOf_sci_ArraySeq$ofRef(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a5)));
}
var $d_sci_ArraySeq$ofRef = new $TypeData().i($c_sci_ArraySeq$ofRef, "scala.collection.immutable.ArraySeq$ofRef", ({
  a5: 1,
  bf: 1,
  J: 1,
  w: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  i: 1,
  t: 1,
  r: 1,
  l: 1,
  k: 1,
  C: 1,
  E: 1,
  D: 1,
  x: 1,
  v: 1,
  a6: 1,
  B: 1,
  z: 1,
  A: 1,
  F: 1,
  aZ: 1,
  a: 1
}));
function $p_sci_List__loop$2__I__I__sci_List__I($thiz, len$1, i, xs) {
  var xs$tailLocal1 = xs;
  var i$tailLocal1 = i;
  while (true) {
    if ((i$tailLocal1 === len$1)) {
      return (xs$tailLocal1.n() ? 0 : 1);
    } else if (xs$tailLocal1.n()) {
      return (-1);
    } else {
      var i$tailLocal1$tmp1 = ((1 + i$tailLocal1) | 0);
      var xs$tailLocal1$tmp1 = xs$tailLocal1.E();
      i$tailLocal1 = i$tailLocal1$tmp1;
      xs$tailLocal1 = xs$tailLocal1$tmp1;
    }
  }
}
function $p_sci_List__listEq$1__sci_List__sci_List__Z($thiz, a, b) {
  var b$tailLocal1 = b;
  var a$tailLocal1 = a;
  while (true) {
    if ((a$tailLocal1 === b$tailLocal1)) {
      return true;
    } else {
      var aEmpty = a$tailLocal1.n();
      var bEmpty = b$tailLocal1.n();
      if (((!(aEmpty || bEmpty)) && $m_sr_BoxesRunTime$().z(a$tailLocal1.O(), b$tailLocal1.O()))) {
        var a$tailLocal1$tmp1 = a$tailLocal1.E();
        var b$tailLocal1$tmp1 = b$tailLocal1.E();
        a$tailLocal1 = a$tailLocal1$tmp1;
        b$tailLocal1 = b$tailLocal1$tmp1;
      } else {
        return (aEmpty && bEmpty);
      }
    }
  }
}
/** @constructor */
function $c_sci_List() {
}
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {
}
$h_sci_List.prototype = $p;
$p.r = (function(n) {
  return $f_sc_LinearSeqOps__apply__I__O(this, n);
});
$p.aj = (function(that) {
  return $f_sc_LinearSeqOps__sameElements__sc_IterableOnce__Z(this, that);
});
$p.a8 = (function() {
  return "LinearSeq";
});
$p.s = (function() {
  return new $c_sc_StrictOptimizedLinearSeqOps$$anon$1(this);
});
$p.n = (function() {
  return (this === $m_sci_Nil$());
});
$p.ah = (function(f) {
  var these = this;
  while ((!these.n())) {
    f.N(these.O());
    these = these.E();
  }
});
$p.l = (function() {
  var these = this;
  var len = 0;
  while ((!these.n())) {
    len = ((1 + len) | 0);
    these = these.E();
  }
  return len;
});
$p.a5 = (function(len) {
  return ((len < 0) ? 1 : $p_sci_List__loop$2__I__I__sci_List__I(this, len, 0, this));
});
$p.af = (function() {
  return "List";
});
$p.A = (function(o) {
  return ((o instanceof $c_sci_List) ? $p_sci_List__listEq$1__sci_List__sci_List__Z(this, this, o) : $f_sc_Seq__equals__O__Z(this, o));
});
$p.bk = (function(n) {
  return $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(this, n, this);
});
$p.N = (function(v1) {
  return $f_sc_LinearSeqOps__apply__I__O(this, (v1 | 0));
});
function $isArrayOf_sci_List(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.K)));
}
/** @constructor */
function $c_sci_$colon$colon(head, next) {
  this.aS = null;
  this.aT = null;
  this.aS = head;
  this.aT = next;
}
$p = $c_sci_$colon$colon.prototype = new $h_sci_List();
$p.constructor = $c_sci_$colon$colon;
/** @constructor */
function $h_sci_$colon$colon() {
}
$h_sci_$colon$colon.prototype = $p;
$p.O = (function() {
  return this.aS;
});
$p.E = (function() {
  return this.aT;
});
var $d_sci_$colon$colon = new $TypeData().i($c_sci_$colon$colon, "scala.collection.immutable.$colon$colon", ({
  be: 1,
  K: 1,
  J: 1,
  w: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  i: 1,
  t: 1,
  r: 1,
  l: 1,
  k: 1,
  C: 1,
  E: 1,
  D: 1,
  a2: 1,
  y: 1,
  a8: 1,
  a7: 1,
  z: 1,
  A: 1,
  a3: 1,
  F: 1,
  a: 1,
  a4: 1,
  a0: 1
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
$p.bq = (function() {
  throw new $c_ju_NoSuchElementException("head of empty list");
});
$p.bI = (function() {
  throw new $c_jl_UnsupportedOperationException("tail of empty list");
});
$p.v = (function() {
  return 0;
});
$p.s = (function() {
  return $m_sc_Iterator$().K;
});
$p.O = (function() {
  this.bq();
});
$p.E = (function() {
  this.bI();
});
var $d_sci_Nil$ = new $TypeData().i($c_sci_Nil$, "scala.collection.immutable.Nil$", ({
  bi: 1,
  K: 1,
  J: 1,
  w: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  i: 1,
  t: 1,
  r: 1,
  l: 1,
  k: 1,
  C: 1,
  E: 1,
  D: 1,
  a2: 1,
  y: 1,
  a8: 1,
  a7: 1,
  z: 1,
  A: 1,
  a3: 1,
  F: 1,
  a: 1,
  a4: 1,
  a0: 1
}));
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if ((!$n_sci_Nil$)) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.G = underlying;
  return $thiz;
}
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, $ct_jl_StringBuilder__(new $c_jl_StringBuilder()));
  return $thiz;
}
/** @constructor */
function $c_scm_StringBuilder() {
  this.G = null;
}
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {
}
$h_scm_StringBuilder.prototype = $p;
$p.s = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.a5 = (function(len) {
  var x = this.G.l();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.a8 = (function() {
  return "IndexedSeq";
});
$p.l = (function() {
  return this.G.l();
});
$p.v = (function() {
  return this.G.l();
});
$p.p = (function() {
  return this.G.m;
});
$p.n = (function() {
  return (this.G.l() === 0);
});
$p.r = (function(i) {
  return $bC(this.G.b0(i));
});
$p.N = (function(v1) {
  var i = (v1 | 0);
  return $bC(this.G.b0(i));
});
var $d_scm_StringBuilder = new $TypeData().i($c_scm_StringBuilder, "scala.collection.mutable.StringBuilder", ({
  bu: 1,
  bj: 1,
  w: 1,
  u: 1,
  b: 1,
  c: 1,
  p: 1,
  o: 1,
  n: 1,
  i: 1,
  t: 1,
  r: 1,
  l: 1,
  k: 1,
  bq: 1,
  H: 1,
  bm: 1,
  bt: 1,
  bs: 1,
  bl: 1,
  bn: 1,
  bk: 1,
  br: 1,
  x: 1,
  v: 1,
  bp: 1,
  bo: 1,
  G: 1,
  a: 1
}));
$L0 = new $c_RTLong(0, 0);
$d_J.z = $L0;
let $e_createAndUseTestObj = (function() {
  return $m_Ljs\uff3ftests_js\uff3ftests$package$().bf();
});
export { $e_createAndUseTestObj as createAndUseTestObj };
let $e_renderApp = (function() {
  $m_Lpreact_test_test$package$().bE();
});
export { $e_renderApp as renderApp };
$s_Lmacro\uff3ftest_run__main__AT__V(new ($d_T.r().C)([]));
