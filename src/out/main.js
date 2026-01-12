"use strict";
import * as $i_preact from "preact";
var $p;
var $fileLevelThis = this;
var $getOwnPropertyDescriptors =
  Object.getOwnPropertyDescriptors ||
  (() => {
    var ownKeysFun;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
      ownKeysFun = Reflect.ownKeys;
    } else {
      var getOwnPropertySymbols = Object.getOwnPropertySymbols || ((o) => []);
      ownKeysFun = (o) =>
        Object.getOwnPropertyNames(o).concat(getOwnPropertySymbols(o));
    }
    return (o) => {
      var ownKeys = ownKeysFun(o);
      var descriptors = {};
      var len = ownKeys.length | 0;
      var i = 0;
      while (i !== len) {
        var key = ownKeys[i];
        Object.defineProperty(descriptors, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: Object.getOwnPropertyDescriptor(o, key),
        });
        i = (i + 1) | 0;
      }
      return descriptors;
    };
  })();
var $L0;
function $Char(c) {
  this.c = c;
}
$p = $Char.prototype;
$p.toString = function () {
  return String.fromCharCode(this.c);
};
function $noIsInstance(arg0) {
  throw new TypeError(
    "Cannot call isInstance() on a Class representing a JS trait/object"
  );
}
function $objectClone(arg0) {
  return Object.create(
    Object.getPrototypeOf(arg0),
    $getOwnPropertyDescriptors(arg0)
  );
}
function $objectOrArrayClone(arg0) {
  return arg0.$classData.Z ? arg0.J() : $objectClone(arg0);
}
function $objectGetClass(arg0) {
  switch (typeof arg0) {
    case "string": {
      return $d_T.l();
    }
    case "number": {
      if ($isInt(arg0)) {
        if ((arg0 << 24) >> 24 === arg0) {
          return $d_jl_Byte.l();
        } else if ((arg0 << 16) >> 16 === arg0) {
          return $d_jl_Short.l();
        } else {
          return $d_jl_Integer.l();
        }
      } else if ($isFloat(arg0)) {
        return $d_jl_Float.l();
      } else {
        return $d_jl_Double.l();
      }
    }
    case "boolean": {
      return $d_jl_Boolean.l();
    }
    case "undefined": {
      return $d_jl_Void.l();
    }
    default: {
      if (arg0 instanceof $c_RTLong) {
        return $d_jl_Long.l();
      } else if (arg0 instanceof $Char) {
        return $d_jl_Character.l();
      } else if (!!(arg0 && arg0.$classData)) {
        return arg0.$classData.l();
      } else {
        return null;
      }
    }
  }
}
function $objectClassName(arg0) {
  switch (typeof arg0) {
    case "string": {
      return "java.lang.String";
    }
    case "number": {
      if ($isInt(arg0)) {
        if ((arg0 << 24) >> 24 === arg0) {
          return "java.lang.Byte";
        } else if ((arg0 << 16) >> 16 === arg0) {
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
      if (arg0 instanceof $c_RTLong) {
        return "java.lang.Long";
      } else if (arg0 instanceof $Char) {
        return "java.lang.Character";
      } else if (!!(arg0 && arg0.$classData)) {
        return arg0.$classData.N;
      } else {
        return null.dk();
      }
    }
  }
}
function $dp_hashCode__I(instance) {
  switch (typeof instance) {
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
      if (!!(instance && instance.$classData) || instance === null) {
        return instance.i();
      } else if (instance instanceof $c_RTLong) {
        return $f_jl_Long__hashCode__I(instance);
      } else if (instance instanceof $Char) {
        return $f_jl_Character__hashCode__I($uC(instance));
      } else {
        return $c_O.prototype.i.call(instance);
      }
    }
  }
}
function $dp_toString__T(instance) {
  return instance === void 0 ? "undefined" : instance.toString();
}
function $checkIntDivisor(arg0) {
  if (arg0 === 0) {
    throw new $c_jl_ArithmeticException("/ by zero");
  } else {
    return arg0;
  }
}
function $doubleToInt(arg0) {
  return arg0 > 2147483647
    ? 2147483647
    : arg0 < -2147483648
    ? -2147483648
    : arg0 | 0;
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
  while (superProto !== null) {
    var desc = getOwnPropertyDescriptor(superProto, arg1);
    if (desc !== void 0) {
      return desc;
    }
    superProto = getPrototypeOf(superProto);
  }
}
function $superGet(arg0, arg1, arg2) {
  var desc = $resolveSuperRef(arg0, arg2);
  if (desc !== void 0) {
    var getter = desc.get;
    return getter !== void 0 ? getter.call(arg1) : getter.value;
  }
}
function $superSet(arg0, arg1, arg2, arg3) {
  var desc = $resolveSuperRef(arg0, arg2);
  if (desc !== void 0) {
    var setter = desc.set;
    if (setter !== void 0) {
      setter.call(arg1, arg3);
      return void 0;
    }
  }
  throw new TypeError("super has no setter '" + arg2 + "'.");
}
function $arraycopyGeneric(arg0, arg1, arg2, arg3, arg4) {
  if (arg0 !== arg2 || arg3 < arg1 || ((arg1 + arg4) | 0) < arg3) {
    for (var i = 0; i < arg4; i = (i + 1) | 0) {
      arg2[(arg3 + i) | 0] = arg0[(arg1 + i) | 0];
    }
  } else {
    for (var i = (arg4 - 1) | 0; i >= 0; i = (i - 1) | 0) {
      arg2[(arg3 + i) | 0] = arg0[(arg1 + i) | 0];
    }
  }
}
var $lastIDHash = 0;
var $idHashCodeMap = new WeakMap();
function $systemIdentityHashCode(obj) {
  switch (typeof obj) {
    case "string": {
      return $f_T__hashCode__I(obj);
    }
    case "number": {
      return $f_jl_Double__hashCode__I(obj);
    }
    case "bigint": {
      var biHash = 0;
      if (obj < BigInt(0)) {
        obj = ~obj;
      }
      while (obj !== BigInt(0)) {
        biHash = biHash ^ Number(BigInt.asIntN(32, obj));
        obj = obj >> BigInt(32);
      }
      return biHash;
    }
    case "boolean": {
      return obj ? 1231 : 1237;
    }
    case "undefined": {
      return 0;
    }
    case "symbol": {
      var description = obj.description;
      return description === void 0 ? 0 : $f_T__hashCode__I(description);
    }
    default: {
      if (obj === null) {
        return 0;
      } else {
        var hash = $idHashCodeMap.get(obj);
        if (hash === void 0) {
          hash = ($lastIDHash + 1) | 0;
          $lastIDHash = hash;
          $idHashCodeMap.set(obj, hash);
        }
        return hash;
      }
    }
  }
}
function $isByte(arg0) {
  return (
    typeof arg0 === "number" &&
    (arg0 << 24) >> 24 === arg0 &&
    1 / arg0 !== 1 / -0
  );
}
function $isShort(arg0) {
  return (
    typeof arg0 === "number" &&
    (arg0 << 16) >> 16 === arg0 &&
    1 / arg0 !== 1 / -0
  );
}
function $isInt(arg0) {
  return typeof arg0 === "number" && (arg0 | 0) === arg0 && 1 / arg0 !== 1 / -0;
}
function $isFloat(arg0) {
  return (
    typeof arg0 === "number" && (arg0 !== arg0 || Math.fround(arg0) === arg0)
  );
}
function $bC(arg0) {
  return new $Char(arg0);
}
var $bC0 = $bC(0);
function $uC(arg0) {
  return arg0 === null ? 0 : arg0.c;
}
function $uJ(arg0) {
  return arg0 === null ? $L0 : arg0;
}
/** @constructor */
function $c_O() {}
$p = $c_O.prototype;
$p.constructor = $c_O;
/** @constructor */
function $h_O() {}
$h_O.prototype = $p;
$p.i = function () {
  return $systemIdentityHashCode(this);
};
$p.o = function () {
  var i = this.i();
  return $objectClassName(this) + "@" + (i >>> 0.0).toString(16);
};
$p.toString = function () {
  return this.o();
};
function $ac_O(arg) {
  if (typeof arg === "number") {
    this.a = new Array(arg);
    for (var i = 0; i < arg; i++) {
      this.a[i] = null;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_O.prototype = new $h_O();
$p.constructor = $ac_O;
$p.F = function (srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
};
$p.J = function () {
  return new $ac_O(this.a.slice());
};
function $ah_O() {}
$ah_O.prototype = $p;
function $ac_Z(arg) {
  if (typeof arg === "number") {
    this.a = new Array(arg);
    for (var i = 0; i < arg; i++) {
      this.a[i] = false;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_Z.prototype = new $h_O();
$p.constructor = $ac_Z;
$p.F = function (srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
};
$p.J = function () {
  return new $ac_Z(this.a.slice());
};
function $ac_C(arg) {
  if (typeof arg === "number") {
    this.a = new Uint16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_C.prototype = new $h_O();
$p.constructor = $ac_C;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_C(this.a.slice());
};
function $ac_B(arg) {
  if (typeof arg === "number") {
    this.a = new Int8Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_B.prototype = new $h_O();
$p.constructor = $ac_B;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_B(this.a.slice());
};
function $ac_S(arg) {
  if (typeof arg === "number") {
    this.a = new Int16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_S.prototype = new $h_O();
$p.constructor = $ac_S;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_S(this.a.slice());
};
function $ac_I(arg) {
  if (typeof arg === "number") {
    this.a = new Int32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_I.prototype = new $h_O();
$p.constructor = $ac_I;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_I(this.a.slice());
};
function $ac_J(arg) {
  if (typeof arg === "number") {
    this.a = new Array(arg);
    for (var i = 0; i < arg; i++) {
      this.a[i] = $L0;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_J.prototype = new $h_O();
$p.constructor = $ac_J;
$p.F = function (srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
};
$p.J = function () {
  return new $ac_J(this.a.slice());
};
function $ac_F(arg) {
  if (typeof arg === "number") {
    this.a = new Float32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_F.prototype = new $h_O();
$p.constructor = $ac_F;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_F(this.a.slice());
};
function $ac_D(arg) {
  if (typeof arg === "number") {
    this.a = new Float64Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_D.prototype = new $h_O();
$p.constructor = $ac_D;
$p.F = function (srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, (srcPos + length) | 0), destPos);
};
$p.J = function () {
  return new $ac_D(this.a.slice());
};
function $TypeData() {
  this.C = void 0;
  this.n = null;
  this.O = null;
  this.B = null;
  this.D = 0;
  this.z = null;
  this.E = "";
  this.L = void 0;
  this.A = void 0;
  this.F = void 0;
  this.w = void 0;
  this.J = false;
  this.N = "";
  this.X = false;
  this.Y = false;
  this.Z = false;
  this.I = void 0;
}
$p = $TypeData.prototype;
$p.p = function (
  zero,
  arrayEncodedName,
  displayName,
  arrayClass,
  typedArrayClass
) {
  this.n = {};
  this.z = zero;
  this.E = arrayEncodedName;
  var self = this;
  this.F = (that) => that === self;
  this.N = displayName;
  this.X = true;
  this.I = (obj) => false;
  if (arrayClass !== void 0) {
    this.A = new $TypeData().y(this, arrayClass, typedArrayClass);
  }
  return this;
};
$p.i = function (kindOrCtor, fullName, ancestors, isInstance) {
  var internalName = Object.getOwnPropertyNames(ancestors)[0];
  this.n = ancestors;
  this.E = "L" + fullName + ";";
  this.F = (that) => !!that.n[internalName];
  this.J = kindOrCtor === 2;
  this.N = fullName;
  this.Y = kindOrCtor === 1;
  this.I =
    isInstance ||
    ((obj) => !!(obj && obj.$classData && obj.$classData.n[internalName]));
  if (typeof kindOrCtor !== "number") {
    kindOrCtor.prototype.$classData = this;
  }
  return this;
};
$p.y = function (
  componentData,
  arrayClass,
  typedArrayClass,
  isAssignableFromFun
) {
  arrayClass.prototype.$classData = this;
  var name = "[" + componentData.E;
  this.C = arrayClass;
  this.n = {
    r: 1,
    a: 1,
  };
  this.O = componentData;
  this.B = componentData;
  this.D = 1;
  this.E = name;
  this.N = name;
  this.Z = true;
  var self = this;
  this.F = isAssignableFromFun || ((that) => self === that);
  this.w = typedArrayClass
    ? (array) => new arrayClass(new typedArrayClass(array))
    : (array) => new arrayClass(array);
  this.I = (obj) => obj instanceof arrayClass;
  return this;
};
$p.a = function (componentData) {
  function ArrayClass(arg) {
    if (typeof arg === "number") {
      this.a = new Array(arg);
      for (var i = 0; i < arg; i++) {
        this.a[i] = null;
      }
    } else {
      this.a = arg;
    }
  }
  var $p = (ArrayClass.prototype = new $ah_O());
  $p.constructor = ArrayClass;
  $p.F = function (srcPos, dest, destPos, length) {
    $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
  };
  $p.J = function () {
    return new ArrayClass(this.a.slice());
  };
  $p.$classData = this;
  var arrayBase = componentData.B || componentData;
  var arrayDepth = componentData.D + 1;
  var name = "[" + componentData.E;
  this.C = ArrayClass;
  this.n = {
    r: 1,
    a: 1,
  };
  this.O = componentData;
  this.B = arrayBase;
  this.D = arrayDepth;
  this.E = name;
  this.N = name;
  this.Z = true;
  var isAssignableFromFun = (that) => {
    var thatDepth = that.D;
    return thatDepth === arrayDepth
      ? arrayBase.F(that.B)
      : thatDepth > arrayDepth && arrayBase === $d_O;
  };
  this.F = isAssignableFromFun;
  this.w = (array) => new ArrayClass(array);
  var self = this;
  this.I = (obj) => {
    var data = obj && obj.$classData;
    return !!data && (data === self || isAssignableFromFun(data));
  };
  return this;
};
$p.r = function () {
  if (!this.A) {
    this.A = new $TypeData().a(this);
  }
  return this.A;
};
$p.l = function () {
  if (!this.L) {
    this.L = new $c_jl_Class(this);
  }
  return this.L;
};
$p.R = function (that) {
  return this === that || this.F(that);
};
$p.S = function () {
  return this.P ? this.P.l() : null;
};
$p.Q = function () {
  return this.O ? this.O.l() : null;
};
$p.U = function (length) {
  if (this === $d_V) {
    throw $ct_jl_IllegalArgumentException__(
      new $c_jl_IllegalArgumentException()
    );
  }
  return new (this.r().C)(length);
};
function $isArrayOf_O(obj, depth) {
  var data = obj && obj.$classData;
  if (!data) {
    return false;
  } else {
    var arrayDepth = data.D;
    return arrayDepth === depth ? !data.B.X : arrayDepth > depth;
  }
}
function $isArrayOf_Z(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_Z
  );
}
function $isArrayOf_C(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_C
  );
}
function $isArrayOf_B(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_B
  );
}
function $isArrayOf_S(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_S
  );
}
function $isArrayOf_I(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_I
  );
}
function $isArrayOf_J(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_J
  );
}
function $isArrayOf_F(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_F
  );
}
function $isArrayOf_D(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B === $d_D
  );
}
var $d_O = new $TypeData();
$d_O.n = {};
$d_O.E = "Ljava.lang.Object;";
$d_O.F = (that) => !that.X;
$d_O.N = "java.lang.Object";
$d_O.I = (obj) => obj !== null;
$d_O.A = new $TypeData().y($d_O, $ac_O, void 0, (that) => {
  var thatDepth = that.D;
  return thatDepth === 1 ? !that.B.X : thatDepth > 1;
});
$c_O.prototype.$classData = $d_O;
var $d_V = new $TypeData().p(void 0, "V", "void", void 0, void 0);
var $d_Z = new $TypeData().p(false, "Z", "boolean", $ac_Z, void 0);
var $d_C = new $TypeData().p(0, "C", "char", $ac_C, Uint16Array);
var $d_B = new $TypeData().p(0, "B", "byte", $ac_B, Int8Array);
var $d_S = new $TypeData().p(0, "S", "short", $ac_S, Int16Array);
var $d_I = new $TypeData().p(0, "I", "int", $ac_I, Int32Array);
var $d_J = new $TypeData().p(null, "J", "long", $ac_J, void 0);
var $d_F = new $TypeData().p(0.0, "F", "float", $ac_F, Float32Array);
var $d_D = new $TypeData().p(0.0, "D", "double", $ac_D, Float64Array);
/** @constructor */
function $c_Lexamples_minimal_MinimalExample$() {}
$p = $c_Lexamples_minimal_MinimalExample$.prototype = new $h_O();
$p.constructor = $c_Lexamples_minimal_MinimalExample$;
/** @constructor */
function $h_Lexamples_minimal_MinimalExample$() {}
$h_Lexamples_minimal_MinimalExample$.prototype = $p;
$p.br = function () {
  return $m_Lpreact_lib1_div$().p(
    new $c_sjsr_WrappedVarArgs([
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_span$().p(
            new $c_sjsr_WrappedVarArgs([
              $m_Lpreact_lib1_Types$package$().K().d("Hello from Preact!"),
            ])
          )
        ),
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_button$().p(
            new $c_sjsr_WrappedVarArgs([
              new $c_Lpreact_lib1_PropModifier("disabled", true),
              $m_Lpreact_lib1_Types$package$().K().d("Disabled Button"),
            ])
          )
        ),
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_button$().p(
            new $c_sjsr_WrappedVarArgs([
              new $c_Lpreact_lib1_PropModifier("onClick", (e$3) => {
                $m_s_Console$().cp().ci("Button clicked!\n");
              }),
              $m_Lpreact_lib1_Types$package$().K().d("Click me"),
            ])
          )
        ),
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lexamples_minimal_Card$().p(
            new $c_sjsr_WrappedVarArgs([
              new $c_Lpreact_lib1_PropModifier("title", "My Card"),
              $m_Lpreact_lib1_Types$package$()
                .v()
                .d(
                  $m_Lpreact_lib1_span$().p(
                    new $c_sjsr_WrappedVarArgs([
                      $m_Lpreact_lib1_Types$package$().K().d("This is "),
                    ])
                  )
                ),
              $m_Lpreact_lib1_Types$package$()
                .v()
                .d(
                  $m_Lpreact_lib1_span$().p(
                    new $c_sjsr_WrappedVarArgs([
                      $m_Lpreact_lib1_Types$package$().K().d("card content"),
                    ])
                  )
                ),
            ])
          )
        ),
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_div$().p(
            new $c_sjsr_WrappedVarArgs([
              $m_Lpreact_lib1_Types$package$()
                .v()
                .d(
                  $m_Lpreact_lib1_span$().p(
                    new $c_sjsr_WrappedVarArgs([
                      $m_Lpreact_lib1_Types$package$().K().d("Nested: "),
                    ])
                  )
                ),
              $m_Lpreact_lib1_Types$package$()
                .v()
                .d(
                  $m_Lpreact_lib1_span$().p(
                    new $c_sjsr_WrappedVarArgs([
                      $m_Lpreact_lib1_Types$package$().K().d("Level 1"),
                    ])
                  )
                ),
              $m_Lpreact_lib1_Types$package$()
                .v()
                .d(
                  $m_Lpreact_lib1_div$().p(
                    new $c_sjsr_WrappedVarArgs([
                      $m_Lpreact_lib1_Types$package$()
                        .v()
                        .d(
                          $m_Lpreact_lib1_span$().p(
                            new $c_sjsr_WrappedVarArgs([
                              $m_Lpreact_lib1_Types$package$().K().d("Level 2"),
                            ])
                          )
                        ),
                      $m_Lpreact_lib1_Types$package$()
                        .v()
                        .d(
                          $m_Lpreact_lib1_button$().p(
                            new $c_sjsr_WrappedVarArgs([
                              $m_Lpreact_lib1_Types$package$()
                                .K()
                                .d("Nested Button"),
                            ])
                          )
                        ),
                    ])
                  )
                ),
            ])
          )
        ),
    ])
  );
};
$p.cX = function () {
  var rootElement = document.body;
  (0, $i_preact.render)(this.br(), rootElement);
};
var $d_Lexamples_minimal_MinimalExample$ = new $TypeData().i(
  $c_Lexamples_minimal_MinimalExample$,
  "examples.minimal.MinimalExample$",
  {
    aS: 1,
  }
);
var $n_Lexamples_minimal_MinimalExample$;
function $m_Lexamples_minimal_MinimalExample$() {
  if (!$n_Lexamples_minimal_MinimalExample$) {
    $n_Lexamples_minimal_MinimalExample$ =
      new $c_Lexamples_minimal_MinimalExample$();
  }
  return $n_Lexamples_minimal_MinimalExample$;
}
/** @constructor */
function $c_jl_System$Streams$() {
  this.bD = null;
  this.cu = null;
  $n_jl_System$Streams$ = this;
  this.bD = new $c_jl_JSConsoleBasedPrintStream(false);
  this.cu = new $c_jl_JSConsoleBasedPrintStream(true);
}
$p = $c_jl_System$Streams$.prototype = new $h_O();
$p.constructor = $c_jl_System$Streams$;
/** @constructor */
function $h_jl_System$Streams$() {}
$h_jl_System$Streams$.prototype = $p;
var $d_jl_System$Streams$ = new $TypeData().i(
  $c_jl_System$Streams$,
  "java.lang.System$Streams$",
  {
    bb: 1,
  }
);
var $n_jl_System$Streams$;
function $m_jl_System$Streams$() {
  if (!$n_jl_System$Streams$) {
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
function $isArrayOf_jl_Void(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.ai
  );
}
var $d_jl_Void = new $TypeData().i(
  0,
  "java.lang.Void",
  {
    ai: 1,
  },
  (x) => x === void 0
);
function $p_jl_reflect_Array$__mismatch__O__E($thiz, array) {
  throw $ct_jl_IllegalArgumentException__T__(
    new $c_jl_IllegalArgumentException(),
    "argument type mismatch"
  );
}
/** @constructor */
function $c_jl_reflect_Array$() {}
$p = $c_jl_reflect_Array$.prototype = new $h_O();
$p.constructor = $c_jl_reflect_Array$;
/** @constructor */
function $h_jl_reflect_Array$() {}
$h_jl_reflect_Array$.prototype = $p;
$p.a3 = function (array) {
  return array instanceof $ac_O
    ? array.a.length
    : array instanceof $ac_Z
    ? array.a.length
    : array instanceof $ac_C
    ? array.a.length
    : array instanceof $ac_B
    ? array.a.length
    : array instanceof $ac_S
    ? array.a.length
    : array instanceof $ac_I
    ? array.a.length
    : array instanceof $ac_J
    ? array.a.length
    : array instanceof $ac_F
    ? array.a.length
    : array instanceof $ac_D
    ? array.a.length
    : $p_jl_reflect_Array$__mismatch__O__E(this, array);
};
var $d_jl_reflect_Array$ = new $TypeData().i(
  $c_jl_reflect_Array$,
  "java.lang.reflect.Array$",
  {
    bd: 1,
  }
);
var $n_jl_reflect_Array$;
function $m_jl_reflect_Array$() {
  if (!$n_jl_reflect_Array$) {
    $n_jl_reflect_Array$ = new $c_jl_reflect_Array$();
  }
  return $n_jl_reflect_Array$;
}
function $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.d6(a.b, a.c, b.b, b.c), this$1.h);
}
function $s_RTLong__remainder__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.d5(a.b, a.c, b.b, b.c), this$1.h);
}
function $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.cK(a.b, a.c, b.b, b.c), this$1.h);
}
function $s_RTLong__divide__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.cJ(a.b, a.c, b.b, b.c), this$1.h);
}
function $s_RTLong__fromDoubleBits__D__O__RTLong(value, fpBitsDataView) {
  fpBitsDataView.setFloat64(0, value, true);
  return new $c_RTLong(
    fpBitsDataView.getInt32(0, true) | 0,
    fpBitsDataView.getInt32(4, true) | 0
  );
}
function $s_RTLong__fromDouble__D__RTLong(value) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.cn(value), this$1.h);
}
function $s_RTLong__fromUnsignedInt__I__RTLong(value) {
  return new $c_RTLong(value, 0);
}
function $s_RTLong__fromInt__I__RTLong(value) {
  return new $c_RTLong(value, value >> 31);
}
function $s_RTLong__clz__RTLong__I(a) {
  var hi = a.c;
  return hi !== 0 ? Math.clz32(hi) : (32 + Math.clz32(a.b)) | 0;
}
function $s_RTLong__toFloat__RTLong__F(a) {
  var lo = a.b;
  var hi = a.c;
  return Math.fround(
    4.294967296e9 * hi +
      (((-2097152 & (hi ^ (hi >> 10))) === 0 || (65535 & lo) === 0
        ? lo
        : 32768 | (-32768 & lo)) >>>
        0.0)
  );
}
function $s_RTLong__toDouble__RTLong__D(a) {
  var lo = a.b;
  return 4.294967296e9 * a.c + (lo >>> 0.0);
}
function $s_RTLong__toInt__RTLong__I(a) {
  return a.b;
}
function $s_RTLong__bitsToDouble__RTLong__O__D(a, fpBitsDataView) {
  fpBitsDataView.setInt32(0, a.b, true);
  fpBitsDataView.setInt32(4, a.c, true);
  return +fpBitsDataView.getFloat64(0, true);
}
function $s_RTLong__mul__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var a0 = 65535 & alo;
  var a1 = (alo >>> 16) | 0;
  var b0 = 65535 & blo;
  var b1 = (blo >>> 16) | 0;
  var a0b0 = Math.imul(a0, b0);
  var a1b0 = Math.imul(a1, b0);
  var a0b1 = Math.imul(a0, b1);
  var lo = (a0b0 + (((a1b0 + a0b1) | 0) << 16)) | 0;
  var c1part = (((a0b0 >>> 16) | 0) + a0b1) | 0;
  return new $c_RTLong(
    lo,
    (((((((Math.imul(alo, b.c) + Math.imul(a.c, blo)) | 0) +
      Math.imul(a1, b1)) |
      0) +
      ((c1part >>> 16) | 0)) |
      0) +
      (((((65535 & c1part) + a1b0) | 0) >>> 16) | 0)) |
      0
  );
}
function $s_RTLong__sub__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var lo = (alo - blo) | 0;
  return new $c_RTLong(
    lo,
    (((a.c - b.c) | 0) + (((~alo & blo) | (~(alo ^ blo) & lo)) >> 31)) | 0
  );
}
function $s_RTLong__add__RTLong__RTLong__RTLong(a, b) {
  var alo = a.b;
  var blo = b.b;
  var lo = (alo + blo) | 0;
  return new $c_RTLong(
    lo,
    (((a.c + b.c) | 0) + ((((alo & blo) | ((alo | blo) & ~lo)) >>> 31) | 0)) | 0
  );
}
function $s_RTLong__sar__RTLong__I__RTLong(a, n) {
  var hi = a.c;
  return new $c_RTLong(
    (32 & n) === 0 ? (a.b >>> n) | 0 | ((hi << 1) << ((31 - n) | 0)) : hi >> n,
    (32 & n) === 0 ? hi >> n : hi >> 31
  );
}
function $s_RTLong__shr__RTLong__I__RTLong(a, n) {
  var hi = a.c;
  return new $c_RTLong(
    (32 & n) === 0
      ? (a.b >>> n) | 0 | ((hi << 1) << ((31 - n) | 0))
      : (hi >>> n) | 0,
    (32 & n) === 0 ? (hi >>> n) | 0 : 0
  );
}
function $s_RTLong__shl__RTLong__I__RTLong(a, n) {
  var lo = a.b;
  return new $c_RTLong(
    (32 & n) === 0 ? lo << n : 0,
    (32 & n) === 0
      ? (((lo >>> 1) | 0) >>> ((31 - n) | 0)) | 0 | (a.c << n)
      : lo << n
  );
}
function $s_RTLong__xor__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong(a.b ^ b.b, a.c ^ b.c);
}
function $s_RTLong__and__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong(a.b & b.b, a.c & b.c);
}
function $s_RTLong__or__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong(a.b | b.b, a.c | b.c);
}
function $s_RTLong__geu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 >= b.b >>> 0 : ahi >>> 0 >= bhi >>> 0;
}
function $s_RTLong__gtu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 > b.b >>> 0 : ahi >>> 0 > bhi >>> 0;
}
function $s_RTLong__leu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 <= b.b >>> 0 : ahi >>> 0 <= bhi >>> 0;
}
function $s_RTLong__ltu__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 < b.b >>> 0 : ahi >>> 0 < bhi >>> 0;
}
function $s_RTLong__ge__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 >= b.b >>> 0 : ahi > bhi;
}
function $s_RTLong__gt__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 > b.b >>> 0 : ahi > bhi;
}
function $s_RTLong__le__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 <= b.b >>> 0 : ahi < bhi;
}
function $s_RTLong__lt__RTLong__RTLong__Z(a, b) {
  var ahi = a.c;
  var bhi = b.c;
  return ahi === bhi ? a.b >>> 0 < b.b >>> 0 : ahi < bhi;
}
function $s_RTLong__notEquals__RTLong__RTLong__Z(a, b) {
  return !(a.b === b.b && a.c === b.c);
}
function $s_RTLong__equals__RTLong__RTLong__Z(a, b) {
  return a.b === b.b && a.c === b.c;
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
function $h_RTLong() {}
$h_RTLong.prototype = $p;
$p.di = function (that) {
  return that instanceof $c_RTLong && this.b === that.b && this.c === that.c;
};
$p.i = function () {
  return this.b ^ this.c;
};
$p.o = function () {
  return $m_RTLong$().co(this.b, this.c);
};
$p.de = function () {
  return (this.b << 24) >> 24;
};
$p.dn = function () {
  return (this.b << 16) >> 16;
};
$p.dl = function () {
  return this.b;
};
$p.dm = function () {
  return this;
};
$p.dj = function () {
  var lo = this.b;
  var hi = this.c;
  return Math.fround(
    4.294967296e9 * hi +
      (((-2097152 & (hi ^ (hi >> 10))) === 0 || (65535 & lo) === 0
        ? lo
        : 32768 | (-32768 & lo)) >>>
        0.0)
  );
};
$p.dh = function () {
  var lo = this.b;
  return 4.294967296e9 * this.c + (lo >>> 0.0);
};
$p.dg = function (that) {
  return $m_RTLong$().cm(this.b, this.c, that.b, that.c);
};
$p.df = function (that) {
  return $m_RTLong$().cm(this.b, this.c, that.b, that.c);
};
function $isArrayOf_RTLong(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.aj
  );
}
var $d_RTLong = new $TypeData().i(
  $c_RTLong,
  "org.scalajs.linker.runtime.RuntimeLong",
  {
    aj: 1,
  }
);
function $p_RTLong$__unsigned_$div__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((-2097152 & ahi) === 0) {
    if ((-2097152 & bhi) === 0) {
      var aDouble = 4.294967296e9 * ahi + (alo >>> 0.0);
      var bDouble = 4.294967296e9 * bhi + (blo >>> 0.0);
      var rDouble = aDouble / bDouble;
      $thiz.h = (rDouble / 4.294967296e9) | 0.0;
      return rDouble | 0.0;
    } else {
      $thiz.h = 0;
      return 0;
    }
  } else if (bhi === 0 && (blo & ((-1 + blo) | 0)) === 0) {
    var pow = (31 - Math.clz32(blo)) | 0;
    $thiz.h = (ahi >>> pow) | 0;
    return (alo >>> pow) | 0 | ((ahi << 1) << ((31 - pow) | 0));
  } else if (blo === 0 && (bhi & ((-1 + bhi) | 0)) === 0) {
    var pow$2 = (31 - Math.clz32(bhi)) | 0;
    $thiz.h = 0;
    return (ahi >>> pow$2) | 0;
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I(
      $thiz,
      alo,
      ahi,
      blo,
      bhi,
      true
    );
  }
}
function $p_RTLong$__unsigned_$percent__I__I__I__I__I(
  $thiz,
  alo,
  ahi,
  blo,
  bhi
) {
  if ((-2097152 & ahi) === 0) {
    if ((-2097152 & bhi) === 0) {
      var aDouble = 4.294967296e9 * ahi + (alo >>> 0.0);
      var bDouble = 4.294967296e9 * bhi + (blo >>> 0.0);
      var rDouble = aDouble % bDouble;
      $thiz.h = (rDouble / 4.294967296e9) | 0.0;
      return rDouble | 0.0;
    } else {
      $thiz.h = ahi;
      return alo;
    }
  } else if (bhi === 0 && (blo & ((-1 + blo) | 0)) === 0) {
    $thiz.h = 0;
    return alo & ((-1 + blo) | 0);
  } else if (blo === 0 && (bhi & ((-1 + bhi) | 0)) === 0) {
    $thiz.h = ahi & ((-1 + bhi) | 0);
    return alo;
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I(
      $thiz,
      alo,
      ahi,
      blo,
      bhi,
      false
    );
  }
}
function $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I(
  $thiz,
  alo,
  ahi,
  blo,
  bhi,
  askQuotient
) {
  var shift =
    ((bhi !== 0 ? Math.clz32(bhi) : (32 + Math.clz32(blo)) | 0) -
      (ahi !== 0 ? Math.clz32(ahi) : (32 + Math.clz32(alo)) | 0)) |
    0;
  var b = shift;
  var lo = (32 & b) === 0 ? blo << b : 0;
  var hi =
    (32 & b) === 0
      ? (((blo >>> 1) | 0) >>> ((31 - b) | 0)) | 0 | (bhi << b)
      : blo << b;
  var bShiftLo = lo;
  var bShiftHi = hi;
  var remLo = alo;
  var remHi = ahi;
  var quotLo = 0;
  var quotHi = 0;
  while (shift >= 0 && (-2097152 & remHi) !== 0) {
    var alo$1 = remLo;
    var ahi$1 = remHi;
    var blo$1 = bShiftLo;
    var bhi$1 = bShiftHi;
    if (
      ahi$1 === bhi$1 ? alo$1 >>> 0 >= blo$1 >>> 0 : ahi$1 >>> 0 >= bhi$1 >>> 0
    ) {
      var lo$1 = remLo;
      var hi$1 = remHi;
      var lo$2 = bShiftLo;
      var hi$2 = bShiftHi;
      var lo$3 = (lo$1 - lo$2) | 0;
      var hi$3 =
        (((hi$1 - hi$2) | 0) +
          (((~lo$1 & lo$2) | (~(lo$1 ^ lo$2) & lo$3)) >> 31)) |
        0;
      remLo = lo$3;
      remHi = hi$3;
      if (shift < 32) {
        quotLo = quotLo | (1 << shift);
      } else {
        quotHi = quotHi | (1 << shift);
      }
    }
    shift = (-1 + shift) | 0;
    var lo$4 = bShiftLo;
    var hi$4 = bShiftHi;
    var lo$5 = (lo$4 >>> 1) | 0 | (hi$4 << 31);
    var hi$5 = (hi$4 >>> 1) | 0;
    bShiftLo = lo$5;
    bShiftHi = hi$5;
  }
  var alo$2 = remLo;
  var ahi$2 = remHi;
  if (ahi$2 === bhi ? alo$2 >>> 0 >= blo >>> 0 : ahi$2 >>> 0 >= bhi >>> 0) {
    var lo$6 = remLo;
    var hi$6 = remHi;
    var remDouble = 4.294967296e9 * hi$6 + (lo$6 >>> 0.0);
    var bDouble = 4.294967296e9 * bhi + (blo >>> 0.0);
    if (askQuotient) {
      var x = remDouble / bDouble;
      var lo$7 = x | 0.0;
      var hi$7 = (x / 4.294967296e9) | 0.0;
      var lo$8 = quotLo;
      var hi$8 = quotHi;
      var lo$9 = (lo$8 + lo$7) | 0;
      var hi$9 =
        (((hi$8 + hi$7) | 0) +
          ((((lo$8 & lo$7) | ((lo$8 | lo$7) & ~lo$9)) >>> 31) | 0)) |
        0;
      $thiz.h = hi$9;
      return lo$9;
    } else {
      var rem_mod_bDouble = remDouble % bDouble;
      $thiz.h = (rem_mod_bDouble / 4.294967296e9) | 0.0;
      return rem_mod_bDouble | 0.0;
    }
  } else if (askQuotient) {
    $thiz.h = quotHi;
    return quotLo;
  } else {
    $thiz.h = remHi;
    return remLo;
  }
}
/** @constructor */
function $c_RTLong$() {
  this.h = 0;
}
$p = $c_RTLong$.prototype = new $h_O();
$p.constructor = $c_RTLong$;
/** @constructor */
function $h_RTLong$() {}
$h_RTLong$.prototype = $p;
$p.co = function (lo, hi) {
  if (hi === lo >> 31) {
    return "" + lo;
  } else if ((-2097152 & (hi ^ (hi >> 10))) === 0) {
    return "" + (4.294967296e9 * hi + (lo >>> 0.0));
  } else {
    var sign = hi >> 31;
    var xlo = lo ^ sign;
    var rlo = (xlo - sign) | 0;
    var rhi = ((hi ^ sign) + (((xlo & ~rlo) >>> 31) | 0)) | 0;
    var approxNum = 4.294967296e9 * (rhi >>> 0.0) + (rlo >>> 0.0);
    var approxQuot = +Math.floor(1.0e-9 * approxNum);
    var approxRem = (rlo - Math.imul(1000000000, approxQuot | 0.0)) | 0;
    if (approxRem < 0) {
      approxQuot = approxQuot - 1.0;
      approxRem = (1000000000 + approxRem) | 0;
    } else if (approxRem >= 1000000000) {
      approxQuot = approxQuot + 1.0;
      approxRem = (-1000000000 + approxRem) | 0;
    }
    var this$4 = approxRem;
    var remStr = "" + this$4;
    var $x_1 = approxQuot;
    var start = remStr.length;
    var s = "" + $x_1 + "000000000".substring(start) + remStr;
    return hi < 0 ? "-" + s : s;
  }
};
$p.cn = function (value) {
  if (value < -9.223372036854776e18) {
    this.h = -2147483648;
    return 0;
  } else if (value >= 9.223372036854776e18) {
    this.h = 2147483647;
    return -1;
  } else {
    var rawLo = value | 0.0;
    var rawHi = (value / 4.294967296e9) | 0.0;
    this.h = value < 0.0 && rawLo !== 0 ? (-1 + rawHi) | 0 : rawHi;
    return rawLo;
  }
};
$p.cm = function (alo, ahi, blo, bhi) {
  return ahi === bhi
    ? alo === blo
      ? 0
      : alo >>> 0 < blo >>> 0
      ? -1
      : 1
    : ahi < bhi
    ? -1
    : 1;
};
$p.cJ = function (alo, ahi, blo, bhi) {
  if ((blo | bhi) === 0) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if (ahi === alo >> 31) {
    if (bhi === blo >> 31) {
      if (alo === -2147483648 && blo === -1) {
        this.h = 0;
        return -2147483648;
      } else {
        var lo = (alo / $checkIntDivisor(blo)) | 0;
        this.h = lo >> 31;
        return lo;
      }
    } else if (alo === -2147483648 && blo === -2147483648 && bhi === 0) {
      this.h = -1;
      return -1;
    } else {
      this.h = 0;
      return 0;
    }
  } else {
    var sign = ahi >> 31;
    var xlo = alo ^ sign;
    var rlo = (xlo - sign) | 0;
    var rhi = ((ahi ^ sign) + (((xlo & ~rlo) >>> 31) | 0)) | 0;
    var sign$1 = bhi >> 31;
    var xlo$1 = blo ^ sign$1;
    var rlo$1 = (xlo$1 - sign$1) | 0;
    var rhi$1 = ((bhi ^ sign$1) + (((xlo$1 & ~rlo$1) >>> 31) | 0)) | 0;
    var absRLo = $p_RTLong$__unsigned_$div__I__I__I__I__I(
      this,
      rlo,
      rhi,
      rlo$1,
      rhi$1
    );
    if ((ahi ^ bhi) >= 0) {
      return absRLo;
    } else {
      var hi = this.h;
      var lo$1 = -absRLo | 0;
      var hi$1 = ((-hi | 0) + ((absRLo | lo$1) >> 31)) | 0;
      this.h = hi$1;
      return lo$1;
    }
  }
};
$p.cK = function (alo, ahi, blo, bhi) {
  if ((blo | bhi) === 0) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if (ahi === 0) {
    if (bhi === 0) {
      this.h = 0;
      return ((alo >>> 0) / ($checkIntDivisor(blo) >>> 0)) | 0;
    } else {
      this.h = 0;
      return 0;
    }
  } else {
    return $p_RTLong$__unsigned_$div__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
};
$p.d5 = function (alo, ahi, blo, bhi) {
  if ((blo | bhi) === 0) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if (ahi === alo >> 31) {
    if (bhi === blo >> 31) {
      var lo = alo % $checkIntDivisor(blo) | 0;
      this.h = lo >> 31;
      return lo;
    } else if (alo === -2147483648 && blo === -2147483648 && bhi === 0) {
      this.h = 0;
      return 0;
    } else {
      this.h = ahi;
      return alo;
    }
  } else {
    var sign = ahi >> 31;
    var xlo = alo ^ sign;
    var rlo = (xlo - sign) | 0;
    var rhi = ((ahi ^ sign) + (((xlo & ~rlo) >>> 31) | 0)) | 0;
    var sign$1 = bhi >> 31;
    var xlo$1 = blo ^ sign$1;
    var rlo$1 = (xlo$1 - sign$1) | 0;
    var rhi$1 = ((bhi ^ sign$1) + (((xlo$1 & ~rlo$1) >>> 31) | 0)) | 0;
    var absRLo = $p_RTLong$__unsigned_$percent__I__I__I__I__I(
      this,
      rlo,
      rhi,
      rlo$1,
      rhi$1
    );
    if (ahi < 0) {
      var hi = this.h;
      var lo$1 = -absRLo | 0;
      var hi$1 = ((-hi | 0) + ((absRLo | lo$1) >> 31)) | 0;
      this.h = hi$1;
      return lo$1;
    } else {
      return absRLo;
    }
  }
};
$p.d6 = function (alo, ahi, blo, bhi) {
  if ((blo | bhi) === 0) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if (ahi === 0) {
    if (bhi === 0) {
      this.h = 0;
      return (alo >>> 0) % ($checkIntDivisor(blo) >>> 0) | 0;
    } else {
      this.h = ahi;
      return alo;
    }
  } else {
    return $p_RTLong$__unsigned_$percent__I__I__I__I__I(
      this,
      alo,
      ahi,
      blo,
      bhi
    );
  }
};
var $d_RTLong$ = new $TypeData().i(
  $c_RTLong$,
  "org.scalajs.linker.runtime.RuntimeLong$",
  {
    bg: 1,
  }
);
var $n_RTLong$;
function $m_RTLong$() {
  if (!$n_RTLong$) {
    $n_RTLong$ = new $c_RTLong$();
  }
  return $n_RTLong$;
}
function $p_Lpreact_lib1_ElementBuilder__hasProps__Z($thiz) {
  return (Object.keys($thiz.aU).length | 0) > 0;
}
/** @constructor */
function $c_Lpreact_lib1_ElementBuilder() {
  this.aU = null;
  this.bc = null;
  this.aU = {};
  this.bc = [];
}
$p = $c_Lpreact_lib1_ElementBuilder.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_ElementBuilder;
/** @constructor */
function $h_Lpreact_lib1_ElementBuilder() {}
$h_Lpreact_lib1_ElementBuilder.prototype = $p;
$p.cC = function (mod) {
  if (mod instanceof $c_Lpreact_lib1_PropModifier) {
    var x7 = mod.aV;
    var x8 = mod.aW;
    this.aU[x7] = x8;
    return void 0;
  }
  if (mod instanceof $c_Lpreact_lib1_ChildModifier) {
    var x4 = mod.aT;
    var array = this.bc;
    array.push(x4);
    return void 0;
  }
  if ($m_Lpreact_lib1_EmptyModifier$() === mod) {
    return void 0;
  }
  throw new $c_s_MatchError(mod);
};
$p.bq = function (mods) {
  mods.aw(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (mod$3) => {
        this.cC(mod$3);
      }
    )
  );
};
$p.bs = function (tag) {
  var jsProps = $p_Lpreact_lib1_ElementBuilder__hasProps__Z(this)
    ? this.aU
    : void 0;
  return (0, $i_preact.h)(tag, jsProps, this.bc);
};
var $d_Lpreact_lib1_ElementBuilder = new $TypeData().i(
  $c_Lpreact_lib1_ElementBuilder,
  "preact.lib1.ElementBuilder",
  {
    bi: 1,
  }
);
/** @constructor */
function $c_Lpreact_lib1_Types$package$() {
  this.bF = null;
  this.bG = false;
  this.bH = null;
  this.bI = false;
}
$p = $c_Lpreact_lib1_Types$package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_Types$package$;
/** @constructor */
function $h_Lpreact_lib1_Types$package$() {}
$h_Lpreact_lib1_Types$package$.prototype = $p;
$p.K = function () {
  if (!this.bG) {
    this.bF = new $c_Lpreact_lib1_Types$package$$anon$1();
    this.bG = true;
  }
  return this.bF;
};
$p.v = function () {
  if (!this.bI) {
    this.bH = new $c_Lpreact_lib1_Types$package$$anon$4();
    this.bI = true;
  }
  return this.bH;
};
var $d_Lpreact_lib1_Types$package$ = new $TypeData().i(
  $c_Lpreact_lib1_Types$package$,
  "preact.lib1.Types$package$",
  {
    bl: 1,
  }
);
var $n_Lpreact_lib1_Types$package$;
function $m_Lpreact_lib1_Types$package$() {
  if (!$n_Lpreact_lib1_Types$package$) {
    $n_Lpreact_lib1_Types$package$ = new $c_Lpreact_lib1_Types$package$();
  }
  return $n_Lpreact_lib1_Types$package$;
}
/** @constructor */
function $c_Lpreact_lib1_button$() {}
$p = $c_Lpreact_lib1_button$.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_button$;
/** @constructor */
function $h_Lpreact_lib1_button$() {}
$h_Lpreact_lib1_button$.prototype = $p;
$p.p = function (modifiers) {
  var builder = new $c_Lpreact_lib1_ElementBuilder();
  builder.bq(modifiers);
  return builder.bs("button");
};
var $d_Lpreact_lib1_button$ = new $TypeData().i(
  $c_Lpreact_lib1_button$,
  "preact.lib1.button$",
  {
    bo: 1,
  }
);
var $n_Lpreact_lib1_button$;
function $m_Lpreact_lib1_button$() {
  if (!$n_Lpreact_lib1_button$) {
    $n_Lpreact_lib1_button$ = new $c_Lpreact_lib1_button$();
  }
  return $n_Lpreact_lib1_button$;
}
/** @constructor */
function $c_Lpreact_lib1_div$() {}
$p = $c_Lpreact_lib1_div$.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_div$;
/** @constructor */
function $h_Lpreact_lib1_div$() {}
$h_Lpreact_lib1_div$.prototype = $p;
$p.p = function (modifiers) {
  var builder = new $c_Lpreact_lib1_ElementBuilder();
  builder.bq(modifiers);
  return builder.bs("div");
};
var $d_Lpreact_lib1_div$ = new $TypeData().i(
  $c_Lpreact_lib1_div$,
  "preact.lib1.div$",
  {
    bp: 1,
  }
);
var $n_Lpreact_lib1_div$;
function $m_Lpreact_lib1_div$() {
  if (!$n_Lpreact_lib1_div$) {
    $n_Lpreact_lib1_div$ = new $c_Lpreact_lib1_div$();
  }
  return $n_Lpreact_lib1_div$;
}
/** @constructor */
function $c_Lpreact_lib1_span$() {}
$p = $c_Lpreact_lib1_span$.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_span$;
/** @constructor */
function $h_Lpreact_lib1_span$() {}
$h_Lpreact_lib1_span$.prototype = $p;
$p.p = function (modifiers) {
  var builder = new $c_Lpreact_lib1_ElementBuilder();
  builder.bq(modifiers);
  return builder.bs("span");
};
var $d_Lpreact_lib1_span$ = new $TypeData().i(
  $c_Lpreact_lib1_span$,
  "preact.lib1.span$",
  {
    bq: 1,
  }
);
var $n_Lpreact_lib1_span$;
function $m_Lpreact_lib1_span$() {
  if (!$n_Lpreact_lib1_span$) {
    $n_Lpreact_lib1_span$ = new $c_Lpreact_lib1_span$();
  }
  return $n_Lpreact_lib1_span$;
}
/** @constructor */
function $c_Lpreact_test_AttributeModifier(key, value) {
  this.bJ = null;
  this.bd = null;
  this.bJ = key;
  this.bd = value;
}
$p = $c_Lpreact_test_AttributeModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_AttributeModifier;
/** @constructor */
function $h_Lpreact_test_AttributeModifier() {}
$h_Lpreact_test_AttributeModifier.prototype = $p;
function $isArrayOf_Lpreact_test_AttributeModifier(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.am
  );
}
var $d_Lpreact_test_AttributeModifier = new $TypeData().i(
  $c_Lpreact_test_AttributeModifier,
  "preact.test.AttributeModifier",
  {
    am: 1,
  }
);
/** @constructor */
function $c_Lpreact_test_ChildModifier(child) {
  this.bg = null;
  this.bg = child;
}
$p = $c_Lpreact_test_ChildModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_ChildModifier;
/** @constructor */
function $h_Lpreact_test_ChildModifier() {}
$h_Lpreact_test_ChildModifier.prototype = $p;
function $isArrayOf_Lpreact_test_ChildModifier(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.an
  );
}
var $d_Lpreact_test_ChildModifier = new $TypeData().i(
  $c_Lpreact_test_ChildModifier,
  "preact.test.ChildModifier",
  {
    an: 1,
  }
);
/** @constructor */
function $c_Lpreact_test_test$package$() {}
$p = $c_Lpreact_test_test$package$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_test$package$;
/** @constructor */
function $h_Lpreact_test_test$package$() {}
$h_Lpreact_test_test$package$.prototype = $p;
$p.S = function (tag, modifiers) {
  var jsAttribs = new $c_sr_ObjectRef({});
  var childrenArray = new $c_sr_ObjectRef([]);
  modifiers.aw(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (x$1$3) => {
        matchResult5: {
          if (x$1$3 instanceof $c_Lpreact_test_AttributeModifier) {
            var jsAttribs$proxy1 = jsAttribs.H;
            jsAttribs$proxy1[x$1$3.bJ] = x$1$3.bd;
            break matchResult5;
          }
          if (x$1$3 instanceof $c_Lpreact_test_ChildModifier) {
            var childrenArray$proxy1 = childrenArray.H;
            childrenArray$proxy1.push(x$1$3.bg);
            break matchResult5;
          }
          throw new $c_s_MatchError(x$1$3);
        }
      }
    )
  );
  return (0, $i_preact.h)(tag, jsAttribs.H, childrenArray.H);
};
$p.br = function () {
  return $m_Lpreact_test_test$package$().S(
    "div",
    $m_sr_ScalaRunTime$().W(
      new $ac_O([
        new $c_Lpreact_test_AttributeModifier("id", "greeting"),
        new $c_Lpreact_test_AttributeModifier("class", "container"),
        new $c_Lpreact_test_ChildModifier("This is a div element."),
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_test$package$().S(
            "span",
            $m_sr_ScalaRunTime$().W(
              new $ac_O([
                new $c_Lpreact_test_AttributeModifier("class", "nested"),
                new $c_Lpreact_test_ChildModifier("Nested span child element."),
              ])
            )
          )
        ),
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_test$package$().S(
            "button",
            $m_sr_ScalaRunTime$().W(
              new $ac_O([
                new $c_Lpreact_test_AttributeModifier("disabled", true),
                new $c_Lpreact_test_ChildModifier("Disabled Button"),
              ])
            )
          )
        ),
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_test$package$().S(
            "button",
            $m_sr_ScalaRunTime$().W(
              new $ac_O([
                new $c_Lpreact_test_AttributeModifier("onClick", (e$3) => {
                  $m_s_Console$().cp().ci("Button clicked!\n");
                }),
                new $c_Lpreact_test_ChildModifier("Click me"),
              ])
            )
          )
        ),
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_Card$().p(
            new $c_sjsr_WrappedVarArgs([
              new $c_Lpreact_test_AttributeModifier("title", "My Card Title"),
              new $c_Lpreact_test_ChildModifier(
                "This is the content of the card."
              ),
              new $c_Lpreact_test_ChildModifier(
                $m_Lpreact_test_test$package$().S(
                  "div",
                  $m_sr_ScalaRunTime$().W(
                    new $ac_O([
                      new $c_Lpreact_test_ChildModifier(
                        "A nested div inside the card."
                      ),
                      new $c_Lpreact_test_ChildModifier(
                        $m_Lpreact_test_test$package$().S(
                          "button",
                          $m_sr_ScalaRunTime$().W(
                            new $ac_O([
                              new $c_Lpreact_test_ChildModifier(
                                "Nested Button"
                              ),
                            ])
                          )
                        )
                      ),
                    ])
                  )
                )
              ),
            ])
          )
        ),
      ])
    )
  );
};
$p.d8 = function () {
  var rootElement = document.body;
  (0, $i_preact.render)($m_Lpreact_test_test$package$().br(), rootElement);
};
var $d_Lpreact_test_test$package$ = new $TypeData().i(
  $c_Lpreact_test_test$package$,
  "preact.test.test$package$",
  {
    bt: 1,
  }
);
var $n_Lpreact_test_test$package$;
function $m_Lpreact_test_test$package$() {
  if (!$n_Lpreact_test_test$package$) {
    $n_Lpreact_test_test$package$ = new $c_Lpreact_test_test$package$();
  }
  return $n_Lpreact_test_test$package$;
}
function $p_s_Array$__slowcopy__O__I__O__I__I__V(
  $thiz,
  src,
  srcPos,
  dest,
  destPos,
  length
) {
  var i = srcPos;
  var j = destPos;
  var srcUntil = (srcPos + length) | 0;
  while (i < srcUntil) {
    $m_sr_ScalaRunTime$().b5(dest, j, $m_sr_ScalaRunTime$().a9(src, i));
    i = (1 + i) | 0;
    j = (1 + j) | 0;
  }
}
/** @constructor */
function $c_s_Array$() {}
$p = $c_s_Array$.prototype = new $h_O();
$p.constructor = $c_s_Array$;
/** @constructor */
function $h_s_Array$() {}
$h_s_Array$.prototype = $p;
$p.cf = function (it, evidence$1) {
  var n = it.q();
  if (n > -1) {
    var elements = evidence$1.bx(n);
    var iterator = it.e();
    var i = 0;
    while (i < n) {
      $m_sr_ScalaRunTime$().b5(elements, i, iterator.j());
      i = (1 + i) | 0;
    }
    return elements;
  } else {
    var capacity = 0;
    var size = 0;
    var jsElems = null;
    var elementClass = evidence$1.b9();
    capacity = 0;
    size = 0;
    var isCharArrayBuilder = elementClass === $d_C.l();
    jsElems = [];
    var iterator$2 = it.e();
    while (iterator$2.l()) {
      var elem = iterator$2.j();
      var unboxedElem = isCharArrayBuilder
        ? $uC(elem)
        : elem === null
        ? $m_scm_ArrayBuilder$().bz(elementClass)
        : elem;
      jsElems.push(unboxedElem);
    }
    return $m_scm_ArrayBuilder$().by(
      elementClass === $d_V.l()
        ? $d_jl_Void.l()
        : elementClass === $d_sr_Null$.l() ||
          elementClass === $d_sr_Nothing$.l()
        ? $d_O.l()
        : elementClass,
      jsElems
    );
  }
};
$p.b6 = function (src, srcPos, dest, destPos, length) {
  var srcClass = $objectGetClass(src);
  if (srcClass.ac.Z && $objectGetClass(dest).ac.R(srcClass.ac)) {
    src.F(srcPos, dest, destPos, length);
  } else {
    $p_s_Array$__slowcopy__O__I__O__I__I__V(
      this,
      src,
      srcPos,
      dest,
      destPos,
      length
    );
  }
};
var $d_s_Array$ = new $TypeData().i($c_s_Array$, "scala.Array$", {
  bu: 1,
});
var $n_s_Array$;
function $m_s_Array$() {
  if (!$n_s_Array$) {
    $n_s_Array$ = new $c_s_Array$();
  }
  return $n_s_Array$;
}
function $f_sc_IterableOnceOps__foreach__F1__V($thiz, f) {
  var it = $thiz.e();
  while (it.l()) {
    f.d(it.j());
  }
}
function $f_sc_IterableOnceOps__copyToArray__O__I__I__I($thiz, dest, start, n) {
  var it = $thiz.e();
  var i = start;
  matchResult18: {
    var srclen;
    var x31 = $thiz.q();
    if (x31 === -1) {
      var srclen = $m_jl_reflect_Array$().a3(dest);
      break matchResult18;
    }
    var srclen = x31;
  }
  var destLen = $m_jl_reflect_Array$().a3(dest);
  var limit = n < srclen ? n : srclen;
  var capacity = start < 0 ? destLen : (destLen - start) | 0;
  var total = capacity < limit ? capacity : limit;
  var end = (start + (total < 0 ? 0 : total)) | 0;
  while (i < end && it.l()) {
    $m_sr_ScalaRunTime$().b5(dest, i, it.j());
    i = (1 + i) | 0;
  }
  return (i - start) | 0;
}
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return $thiz.q() === 0
    ? "" + start + end
    : $thiz.av(
        $ct_scm_StringBuilder__(new $c_scm_StringBuilder()),
        start,
        sep,
        end
      ).C.k;
}
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(
  $thiz,
  b,
  start,
  sep,
  end
) {
  var jsb = b.C;
  if (start.length !== 0) {
    jsb.k = "" + jsb.k + start;
  }
  var it = $thiz.e();
  if (it.l()) {
    var obj = it.j();
    jsb.k = "" + jsb.k + obj;
    while (it.l()) {
      if (sep.length !== 0) {
        jsb.k = "" + jsb.k + sep;
      }
      var obj$1 = it.j();
      jsb.k = "" + jsb.k + obj$1;
    }
  }
  if (end.length !== 0) {
    jsb.k = "" + jsb.k + end;
  }
  return b;
}
function $f_sc_IterableOnceOps__toArray__s_reflect_ClassTag__O(
  $thiz,
  evidence$1
) {
  if ($thiz.q() >= 0) {
    var length = $thiz.q();
    var destination = evidence$1.bx(length);
    $thiz.a1(destination, 0, 2147483647);
    return destination;
  } else {
    var capacity = 0;
    var size = 0;
    var jsElems = null;
    var elementClass = evidence$1.b9();
    capacity = 0;
    size = 0;
    var isCharArrayBuilder = elementClass === $d_C.l();
    jsElems = [];
    var it = $thiz.e();
    while (it.l()) {
      var elem = it.j();
      var unboxedElem = isCharArrayBuilder
        ? $uC(elem)
        : elem === null
        ? $m_scm_ArrayBuilder$().bz(elementClass)
        : elem;
      jsElems.push(unboxedElem);
    }
    return $m_scm_ArrayBuilder$().by(
      elementClass === $d_V.l()
        ? $d_jl_Void.l()
        : elementClass === $d_sr_Null$.l() ||
          elementClass === $d_sr_Nothing$.l()
        ? $d_O.l()
        : elementClass,
      jsElems
    );
  }
}
/** @constructor */
function $c_sc_Iterator$ConcatIteratorCell(head, tail) {
  this.bQ = null;
  this.aB = null;
  this.bQ = head;
  this.aB = tail;
}
$p = $c_sc_Iterator$ConcatIteratorCell.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$ConcatIteratorCell;
/** @constructor */
function $h_sc_Iterator$ConcatIteratorCell() {}
$h_sc_Iterator$ConcatIteratorCell.prototype = $p;
$p.cT = function () {
  return this.bQ.aS().e();
};
var $d_sc_Iterator$ConcatIteratorCell = new $TypeData().i(
  $c_sc_Iterator$ConcatIteratorCell,
  "scala.collection.Iterator$ConcatIteratorCell",
  {
    bI: 1,
  }
);
/** @constructor */
function $c_scg_CommonErrors$() {}
$p = $c_scg_CommonErrors$.prototype = new $h_O();
$p.constructor = $c_scg_CommonErrors$;
/** @constructor */
function $h_scg_CommonErrors$() {}
$h_scg_CommonErrors$.prototype = $p;
$p.ch = function (index, max) {
  return $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    index + " is out of bounds (min 0, max " + max + ")"
  );
};
var $d_scg_CommonErrors$ = new $TypeData().i(
  $c_scg_CommonErrors$,
  "scala.collection.generic.CommonErrors$",
  {
    bL: 1,
  }
);
var $n_scg_CommonErrors$;
function $m_scg_CommonErrors$() {
  if (!$n_scg_CommonErrors$) {
    $n_scg_CommonErrors$ = new $c_scg_CommonErrors$();
  }
  return $n_scg_CommonErrors$;
}
/** @constructor */
function $c_scm_ArrayBuilder$() {}
$p = $c_scm_ArrayBuilder$.prototype = new $h_O();
$p.constructor = $c_scm_ArrayBuilder$;
/** @constructor */
function $h_scm_ArrayBuilder$() {}
$h_scm_ArrayBuilder$.prototype = $p;
$p.bz = function (runtimeClass) {
  return runtimeClass === $d_B.l()
    ? 0
    : runtimeClass === $d_S.l()
    ? 0
    : runtimeClass === $d_C.l()
    ? 0
    : runtimeClass === $d_I.l()
    ? 0
    : runtimeClass === $d_J.l()
    ? $L0
    : runtimeClass === $d_F.l()
    ? 0.0
    : runtimeClass === $d_D.l()
    ? 0.0
    : runtimeClass === $d_Z.l()
    ? false
    : runtimeClass === $d_V.l()
    ? void 0
    : null;
};
$p.by = function (runtimeClass, a) {
  var len = a.length | 0;
  if (runtimeClass === $d_C.l()) {
    var result = new $ac_C(len);
    var i = 0;
    while (i !== len) {
      result.a[i] = 65535 & (a[i] | 0);
      i = (1 + i) | 0;
    }
    return result;
  } else {
    var result$2 = runtimeClass.ac.U(len);
    var i$2 = 0;
    while (i$2 !== len) {
      $m_sr_ScalaRunTime$().b5(result$2, i$2, a[i$2]);
      i$2 = (1 + i$2) | 0;
    }
    return result$2;
  }
};
var $d_scm_ArrayBuilder$ = new $TypeData().i(
  $c_scm_ArrayBuilder$,
  "scala.collection.mutable.ArrayBuilder$",
  {
    c5: 1,
  }
);
var $n_scm_ArrayBuilder$;
function $m_scm_ArrayBuilder$() {
  if (!$n_scm_ArrayBuilder$) {
    $n_scm_ArrayBuilder$ = new $c_scm_ArrayBuilder$();
  }
  return $n_scm_ArrayBuilder$;
}
/** @constructor */
function $c_scm_MutationTracker$() {}
$p = $c_scm_MutationTracker$.prototype = new $h_O();
$p.constructor = $c_scm_MutationTracker$;
/** @constructor */
function $h_scm_MutationTracker$() {}
$h_scm_MutationTracker$.prototype = $p;
$p.cc = function (expectedCount, actualCount, message) {
  if (actualCount !== expectedCount) {
    throw new $c_ju_ConcurrentModificationException(message);
  }
};
var $d_scm_MutationTracker$ = new $TypeData().i(
  $c_scm_MutationTracker$,
  "scala.collection.mutable.MutationTracker$",
  {
    cn: 1,
  }
);
var $n_scm_MutationTracker$;
function $m_scm_MutationTracker$() {
  if (!$n_scm_MutationTracker$) {
    $n_scm_MutationTracker$ = new $c_scm_MutationTracker$();
  }
  return $n_scm_MutationTracker$;
}
var $d_sr_Null$ = new $TypeData().i(0, "scala.runtime.Null$", {
  cz: 1,
});
/** @constructor */
function $c_sr_Scala3RunTime$() {}
$p = $c_sr_Scala3RunTime$.prototype = new $h_O();
$p.constructor = $c_sr_Scala3RunTime$;
/** @constructor */
function $h_sr_Scala3RunTime$() {}
$h_sr_Scala3RunTime$.prototype = $p;
$p.ax = function () {
  throw $ct_jl_NullPointerException__T__(
    new $c_jl_NullPointerException(),
    "tried to cast away nullability, but value is null"
  );
};
var $d_sr_Scala3RunTime$ = new $TypeData().i(
  $c_sr_Scala3RunTime$,
  "scala.runtime.Scala3RunTime$",
  {
    cB: 1,
  }
);
var $n_sr_Scala3RunTime$;
function $m_sr_Scala3RunTime$() {
  if (!$n_sr_Scala3RunTime$) {
    $n_sr_Scala3RunTime$ = new $c_sr_Scala3RunTime$();
  }
  return $n_sr_Scala3RunTime$;
}
/** @constructor */
function $c_sr_ScalaRunTime$() {}
$p = $c_sr_ScalaRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_ScalaRunTime$;
/** @constructor */
function $h_sr_ScalaRunTime$() {}
$h_sr_ScalaRunTime$.prototype = $p;
$p.a9 = function (xs, idx) {
  if (xs instanceof $ac_O) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_I) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_D) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_J) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_F) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_C) {
    return $bC(xs.a[idx]);
  }
  if (xs instanceof $ac_B) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_S) {
    return xs.a[idx];
  }
  if (xs instanceof $ac_Z) {
    return xs.a[idx];
  }
  if (xs === null) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  throw new $c_s_MatchError(xs);
};
$p.b5 = function (xs, idx, value) {
  if (xs instanceof $ac_O) {
    xs.a[idx] = value;
    return void 0;
  }
  if (xs instanceof $ac_I) {
    xs.a[idx] = value | 0;
    return void 0;
  }
  if (xs instanceof $ac_D) {
    xs.a[idx] = +value;
    return void 0;
  }
  if (xs instanceof $ac_J) {
    xs.a[idx] = $uJ(value);
    return void 0;
  }
  if (xs instanceof $ac_F) {
    xs.a[idx] = Math.fround(value);
    return void 0;
  }
  if (xs instanceof $ac_C) {
    xs.a[idx] = $uC(value);
    return void 0;
  }
  if (xs instanceof $ac_B) {
    xs.a[idx] = value | 0;
    return void 0;
  }
  if (xs instanceof $ac_S) {
    xs.a[idx] = value | 0;
    return void 0;
  }
  if (xs instanceof $ac_Z) {
    xs.a[idx] = !!value;
    return void 0;
  }
  if (xs === null) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  throw new $c_s_MatchError(xs);
};
$p.b4 = function (x) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(
    x.ab(),
    x.U() + "(",
    ",",
    ")"
  );
};
$p.W = function (xs) {
  if (xs === null) {
    return null;
  } else if (xs.a.length === 0) {
    var this$2 = $m_sci_ArraySeq$();
    $m_s_reflect_ManifestFactory$ObjectManifest$();
    return $p_sci_ArraySeq$__emptyImpl__sci_ArraySeq$ofRef(this$2);
  } else {
    return new $c_sci_ArraySeq$ofRef(xs);
  }
};
var $d_sr_ScalaRunTime$ = new $TypeData().i(
  $c_sr_ScalaRunTime$,
  "scala.runtime.ScalaRunTime$",
  {
    cC: 1,
  }
);
var $n_sr_ScalaRunTime$;
function $m_sr_ScalaRunTime$() {
  if (!$n_sr_ScalaRunTime$) {
    $n_sr_ScalaRunTime$ = new $c_sr_ScalaRunTime$();
  }
  return $n_sr_ScalaRunTime$;
}
/** @constructor */
function $c_sr_Statics$() {}
$p = $c_sr_Statics$.prototype = new $h_O();
$p.constructor = $c_sr_Statics$;
/** @constructor */
function $h_sr_Statics$() {}
$h_sr_Statics$.prototype = $p;
$p.cW = function (lv) {
  var lo = lv.b;
  var hi = lv.c;
  return hi === lo >> 31 ? lo : lo ^ hi;
};
$p.cL = function (dv) {
  var iv = $doubleToInt(dv);
  if (iv === dv) {
    return iv;
  } else {
    var this$1 = $m_RTLong$();
    var lo = this$1.cn(dv);
    var hi = this$1.h;
    if (4.294967296e9 * hi + (lo >>> 0.0) === dv) {
      return lo ^ hi;
    } else {
      var valueInt = dv | 0;
      if (valueInt === dv && 1.0 / dv !== -Infinity) {
        return valueInt;
      } else if (dv !== dv) {
        return 2146959360;
      } else {
        var fpBitsDataView = $fpBitsDataView;
        fpBitsDataView.setFloat64(0, dv, true);
        return (
          (fpBitsDataView.getInt32(0, true) | 0) ^
          (fpBitsDataView.getInt32(4, true) | 0)
        );
      }
    }
  }
};
$p.s = function (x) {
  if (x === null) {
    return 0;
  } else if (typeof x === "number") {
    return this.cL(+x);
  } else if (x instanceof $c_RTLong) {
    var t = $uJ(x);
    return this.cW(new $c_RTLong(t.b, t.c));
  } else {
    return $dp_hashCode__I(x);
  }
};
var $d_sr_Statics$ = new $TypeData().i(
  $c_sr_Statics$,
  "scala.runtime.Statics$",
  {
    cD: 1,
  }
);
var $n_sr_Statics$;
function $m_sr_Statics$() {
  if (!$n_sr_Statics$) {
    $n_sr_Statics$ = new $c_sr_Statics$();
  }
  return $n_sr_Statics$;
}
/** @constructor */
function $c_s_util_DynamicVariable(init) {
  this.bp = null;
  this.bp = init;
}
$p = $c_s_util_DynamicVariable.prototype = new $h_O();
$p.constructor = $c_s_util_DynamicVariable;
/** @constructor */
function $h_s_util_DynamicVariable() {}
$h_s_util_DynamicVariable.prototype = $p;
$p.o = function () {
  return "DynamicVariable(" + this.bp + ")";
};
var $d_s_util_DynamicVariable = new $TypeData().i(
  $c_s_util_DynamicVariable,
  "scala.util.DynamicVariable",
  {
    cJ: 1,
  }
);
function $p_s_util_hashing_MurmurHash3__avalanche__I__I($thiz, hash) {
  var h = hash;
  h = h ^ ((h >>> 16) | 0);
  h = Math.imul(-2048144789, h);
  h = h ^ ((h >>> 13) | 0);
  h = Math.imul(-1028477387, h);
  h = h ^ ((h >>> 16) | 0);
  return h;
}
/** @constructor */
function $c_s_util_hashing_MurmurHash3() {}
$p = $c_s_util_hashing_MurmurHash3.prototype = new $h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3;
/** @constructor */
function $h_s_util_hashing_MurmurHash3() {}
$h_s_util_hashing_MurmurHash3.prototype = $p;
$p.m = function (hash, data) {
  var h = this.ck(hash, data);
  var i = h;
  h = (i << 13) | ((i >>> 19) | 0);
  return (-430675100 + Math.imul(5, h)) | 0;
};
$p.ck = function (hash, data) {
  var k = data;
  k = Math.imul(-862048943, k);
  var i = k;
  k = (i << 15) | ((i >>> 17) | 0);
  k = Math.imul(461845907, k);
  return hash ^ k;
};
$p.A = function (hash, length) {
  return $p_s_util_hashing_MurmurHash3__avalanche__I__I(this, hash ^ length);
};
$p.b8 = function (x, seed, ignorePrefix) {
  var arr = x.a4();
  if (arr === 0) {
    return !ignorePrefix ? $f_T__hashCode__I(x.U()) : seed;
  } else {
    var h = seed;
    if (!ignorePrefix) {
      h = this.m(h, $f_T__hashCode__I(x.U()));
    }
    var i = 0;
    while (i < arr) {
      h = this.m(h, $m_sr_Statics$().s(x.a5(i)));
      i = (1 + i) | 0;
    }
    return this.A(h, arr);
  }
};
$p.db = function (xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.e();
  while (iterator.l()) {
    var x = iterator.j();
    var h = $m_sr_Statics$().s(x);
    a = (a + h) | 0;
    b = b ^ h;
    c = Math.imul(c, 1 | h);
    n = (1 + n) | 0;
  }
  var h$2 = seed;
  h$2 = this.m(h$2, a);
  h$2 = this.m(h$2, b);
  h$2 = this.ck(h$2, c);
  return this.A(h$2, n);
};
$p.d2 = function (xs, seed) {
  var it = xs.e();
  var h = seed;
  if (!it.l()) {
    return this.A(h, 0);
  }
  var x0 = it.j();
  if (!it.l()) {
    return this.A(this.m(h, $m_sr_Statics$().s(x0)), 1);
  }
  var x1 = it.j();
  var initial = $m_sr_Statics$().s(x0);
  h = this.m(h, initial);
  var h0 = h;
  var prev = $m_sr_Statics$().s(x1);
  var rangeDiff = (prev - initial) | 0;
  var i = 2;
  while (it.l()) {
    h = this.m(h, prev);
    var hash = $m_sr_Statics$().s(it.j());
    if (rangeDiff !== ((hash - prev) | 0) || rangeDiff === 0) {
      h = this.m(h, hash);
      i = (1 + i) | 0;
      while (it.l()) {
        h = this.m(h, $m_sr_Statics$().s(it.j()));
        i = (1 + i) | 0;
      }
      return this.A(h, i);
    }
    prev = hash;
    i = (1 + i) | 0;
  }
  return $p_s_util_hashing_MurmurHash3__avalanche__I__I(
    this,
    this.m(this.m(h0, rangeDiff), prev)
  );
};
$p.r = function (a, seed) {
  var h = seed;
  var l = $m_jl_reflect_Array$().a3(a);
  if (l === 0) {
    return this.A(h, 0);
  } else if (l === 1) {
    return this.A(
      this.m(h, $m_sr_Statics$().s($m_sr_ScalaRunTime$().a9(a, 0))),
      1
    );
  } else {
    var initial = $m_sr_Statics$().s($m_sr_ScalaRunTime$().a9(a, 0));
    h = this.m(h, initial);
    var h0 = h;
    var prev = $m_sr_Statics$().s($m_sr_ScalaRunTime$().a9(a, 1));
    var rangeDiff = (prev - initial) | 0;
    var i = 2;
    while (i < l) {
      h = this.m(h, prev);
      var hash = $m_sr_Statics$().s($m_sr_ScalaRunTime$().a9(a, i));
      if (rangeDiff !== ((hash - prev) | 0) || rangeDiff === 0) {
        h = this.m(h, hash);
        i = (1 + i) | 0;
        while (i < l) {
          h = this.m(h, $m_sr_Statics$().s($m_sr_ScalaRunTime$().a9(a, i)));
          i = (1 + i) | 0;
        }
        return this.A(h, l);
      }
      prev = hash;
      i = (1 + i) | 0;
    }
    return $p_s_util_hashing_MurmurHash3__avalanche__I__I(
      this,
      this.m(this.m(h0, rangeDiff), prev)
    );
  }
};
$p.d4 = function (start, step, last, seed) {
  return $p_s_util_hashing_MurmurHash3__avalanche__I__I(
    this,
    this.m(this.m(this.m(seed, start), step), last)
  );
};
$p.cU = function (a, seed) {
  var h = seed;
  var l = a.f();
  if (l === 0) {
    return this.A(h, 0);
  } else if (l === 1) {
    return this.A(this.m(h, $m_sr_Statics$().s(a.g(0))), 1);
  } else {
    var initial = $m_sr_Statics$().s(a.g(0));
    h = this.m(h, initial);
    var h0 = h;
    var prev = $m_sr_Statics$().s(a.g(1));
    var rangeDiff = (prev - initial) | 0;
    var i = 2;
    while (i < l) {
      h = this.m(h, prev);
      var hash = $m_sr_Statics$().s(a.g(i));
      if (rangeDiff !== ((hash - prev) | 0) || rangeDiff === 0) {
        h = this.m(h, hash);
        i = (1 + i) | 0;
        while (i < l) {
          h = this.m(h, $m_sr_Statics$().s(a.g(i)));
          i = (1 + i) | 0;
        }
        return this.A(h, l);
      }
      prev = hash;
      i = (1 + i) | 0;
    }
    return $p_s_util_hashing_MurmurHash3__avalanche__I__I(
      this,
      this.m(this.m(h0, rangeDiff), prev)
    );
  }
};
$p.cV = function (xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while (!elems.B()) {
    var head = elems.T();
    var tail = elems.N();
    var hash = $m_sr_Statics$().s(head);
    h = this.m(h, hash);
    switch (rangeState) {
      case 0: {
        initial = hash;
        rangeState = 1;
        break;
      }
      case 1: {
        rangeDiff = (hash - prev) | 0;
        rangeState = 2;
        break;
      }
      case 2: {
        if (rangeDiff !== ((hash - prev) | 0) || rangeDiff === 0) {
          rangeState = 3;
        }
        break;
      }
    }
    prev = hash;
    n = (1 + n) | 0;
    elems = tail;
  }
  return rangeState === 2
    ? this.d4(initial, rangeDiff, prev, seed)
    : this.A(h, n);
};
/** @constructor */
function $c_jl_Number() {}
$p = $c_jl_Number.prototype = new $h_O();
$p.constructor = $c_jl_Number;
/** @constructor */
function $h_jl_Number() {}
$h_jl_Number.prototype = $p;
/** @constructor */
function $c_jl_String$() {}
$p = $c_jl_String$.prototype = new $h_O();
$p.constructor = $c_jl_String$;
/** @constructor */
function $h_jl_String$() {}
$h_jl_String$.prototype = $p;
$p.d0 = function (value, offset, count) {
  var end = (offset + count) | 0;
  if (offset < 0 || end < offset || end > value.a.length) {
    throw new $c_jl_StringIndexOutOfBoundsException();
  }
  var result = "";
  var i = offset;
  while (i !== end) {
    result = result + ("" + $cToS(value.a[i]));
    i = (1 + i) | 0;
  }
  return result;
};
var $d_jl_String$ = new $TypeData().i($c_jl_String$, "java.lang.String$", {
  b8: 1,
  a: 1,
});
var $n_jl_String$;
function $m_jl_String$() {
  if (!$n_jl_String$) {
    $n_jl_String$ = new $c_jl_String$();
  }
  return $n_jl_String$;
}
function $ct_jl_Throwable__T__jl_Throwable__Z__Z__(
  $thiz,
  s,
  e,
  enableSuppression,
  writableStackTrace
) {
  $thiz.bE = s;
  if (writableStackTrace) {
    $thiz.cN();
  }
  return $thiz;
}
class $c_jl_Throwable extends Error {
  constructor() {
    super();
    this.bE = null;
  }
  bv() {
    return this.bE;
  }
  cN() {
    var reference = false ? this.dd : this;
    if (Object.prototype.toString.call(reference) !== "[object Error]") {
      if (Error.captureStackTrace === void 0 || !!Object.isSealed(this)) {
        new Error();
      } else {
        Error.captureStackTrace(this);
      }
    }
    return this;
  }
  o() {
    var className = $objectClassName(this);
    var message = this.bv();
    return message === null ? className : className + ": " + message;
  }
  i() {
    return $c_O.prototype.i.call(this);
  }
  get message() {
    var m = this.bv();
    return m === null ? "" : m;
  }
  get name() {
    return $objectClassName(this);
  }
  toString() {
    return this.o();
  }
}
function $ct_Lpreact_lib1_SimpleComponentCompanion__F1__F1__(
  $thiz,
  create,
  render
) {
  return $thiz;
}
/** @constructor */
function $c_Lpreact_lib1_SimpleComponentCompanion() {}
$p = $c_Lpreact_lib1_SimpleComponentCompanion.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_SimpleComponentCompanion;
/** @constructor */
function $h_Lpreact_lib1_SimpleComponentCompanion() {}
$h_Lpreact_lib1_SimpleComponentCompanion.prototype = $p;
/** @constructor */
function $c_s_Console$() {
  this.bK = null;
  $n_s_Console$ = this;
  this.bK = new $c_s_util_DynamicVariable($m_jl_System$Streams$().bD);
}
$p = $c_s_Console$.prototype = new $h_O();
$p.constructor = $c_s_Console$;
/** @constructor */
function $h_s_Console$() {}
$h_s_Console$.prototype = $p;
$p.cp = function () {
  return this.bK.bp;
};
var $d_s_Console$ = new $TypeData().i($c_s_Console$, "scala.Console$", {
  bv: 1,
  cr: 1,
});
var $n_s_Console$;
function $m_s_Console$() {
  if (!$n_s_Console$) {
    $n_s_Console$ = new $c_s_Console$();
  }
  return $n_s_Console$;
}
/** @constructor */
function $c_s_Conversion() {}
$p = $c_s_Conversion.prototype = new $h_O();
$p.constructor = $c_s_Conversion;
/** @constructor */
function $h_s_Conversion() {}
$h_s_Conversion.prototype = $p;
$p.o = function () {
  return "<function1>";
};
function $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable($thiz, elems) {
  if (elems === $thiz) {
    $thiz.D($m_scm_Buffer$().b7(elems));
  } else {
    var it = elems.e();
    while (it.l()) {
      $thiz.E(it.j());
    }
  }
  return $thiz;
}
/** @constructor */
function $c_sr_AbstractFunction0() {}
$p = $c_sr_AbstractFunction0.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction0;
/** @constructor */
function $h_sr_AbstractFunction0() {}
$h_sr_AbstractFunction0.prototype = $p;
$p.o = function () {
  return "<function0>";
};
/** @constructor */
function $c_sr_AbstractFunction1() {}
$p = $c_sr_AbstractFunction1.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction1;
/** @constructor */
function $h_sr_AbstractFunction1() {}
$h_sr_AbstractFunction1.prototype = $p;
$p.o = function () {
  return "<function1>";
};
/** @constructor */
function $c_sr_ObjectRef(elem) {
  this.H = null;
  this.H = elem;
}
$p = $c_sr_ObjectRef.prototype = new $h_O();
$p.constructor = $c_sr_ObjectRef;
/** @constructor */
function $h_sr_ObjectRef() {}
$h_sr_ObjectRef.prototype = $p;
$p.o = function () {
  return "" + this.H;
};
var $d_sr_ObjectRef = new $TypeData().i(
  $c_sr_ObjectRef,
  "scala.runtime.ObjectRef",
  {
    cA: 1,
    a: 1,
  }
);
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.n = 0;
  this.c7 = 0;
  this.cw = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.n = $f_T__hashCode__I("Seq");
  this.c7 = $f_T__hashCode__I("Map");
  this.cw = $f_T__hashCode__I("Set");
  this.db($m_sci_Nil$(), this.c7);
}
$p = $c_s_util_hashing_MurmurHash3$.prototype =
  new $h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {}
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.cs = function (xs) {
  return $is_sc_IndexedSeq(xs)
    ? this.cU(xs, this.n)
    : xs instanceof $c_sci_List
    ? this.cV(xs, this.n)
    : this.d2(xs, this.n);
};
var $d_s_util_hashing_MurmurHash3$ = new $TypeData().i(
  $c_s_util_hashing_MurmurHash3$,
  "scala.util.hashing.MurmurHash3$",
  {
    cL: 1,
    cK: 1,
  }
);
var $n_s_util_hashing_MurmurHash3$;
function $m_s_util_hashing_MurmurHash3$() {
  if (!$n_s_util_hashing_MurmurHash3$) {
    $n_s_util_hashing_MurmurHash3$ = new $c_s_util_hashing_MurmurHash3$();
  }
  return $n_s_util_hashing_MurmurHash3$;
}
/** @constructor */
function $c_jl_Class($data) {
  this.ac = $data;
}
$p = $c_jl_Class.prototype = new $h_O();
$p.constructor = $c_jl_Class;
/** @constructor */
function $h_jl_Class() {}
$h_jl_Class.prototype = $p;
$p.o = function () {
  return (this.ac.Y ? "interface " : this.ac.X ? "" : "class ") + this.ac.N;
};
var $d_jl_Class = new $TypeData().i($c_jl_Class, "java.lang.Class", {
  aZ: 1,
  a: 1,
  K: 1,
});
class $c_jl_Exception extends $c_jl_Throwable {}
/** @constructor */
function $c_Lpreact_lib1_Types$package$$anon$1() {}
$p = $c_Lpreact_lib1_Types$package$$anon$1.prototype = new $h_s_Conversion();
$p.constructor = $c_Lpreact_lib1_Types$package$$anon$1;
/** @constructor */
function $h_Lpreact_lib1_Types$package$$anon$1() {}
$h_Lpreact_lib1_Types$package$$anon$1.prototype = $p;
$p.d = function (x) {
  return new $c_Lpreact_lib1_ChildModifier(x);
};
var $d_Lpreact_lib1_Types$package$$anon$1 = new $TypeData().i(
  $c_Lpreact_lib1_Types$package$$anon$1,
  "preact.lib1.Types$package$$anon$1",
  {
    bm: 1,
    ao: 1,
    f: 1,
  }
);
/** @constructor */
function $c_Lpreact_lib1_Types$package$$anon$4() {}
$p = $c_Lpreact_lib1_Types$package$$anon$4.prototype = new $h_s_Conversion();
$p.constructor = $c_Lpreact_lib1_Types$package$$anon$4;
/** @constructor */
function $h_Lpreact_lib1_Types$package$$anon$4() {}
$h_Lpreact_lib1_Types$package$$anon$4.prototype = $p;
$p.d = function (x) {
  return new $c_Lpreact_lib1_ChildModifier(x);
};
var $d_Lpreact_lib1_Types$package$$anon$4 = new $TypeData().i(
  $c_Lpreact_lib1_Types$package$$anon$4,
  "preact.lib1.Types$package$$anon$4",
  {
    bn: 1,
    ao: 1,
    f: 1,
  }
);
/** @constructor */
function $c_Lpreact_test_Card$() {}
$p = $c_Lpreact_test_Card$.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card$;
/** @constructor */
function $h_Lpreact_test_Card$() {}
$h_Lpreact_test_Card$.prototype = $p;
$p.p = function (ms) {
  var titleValue = new $c_sr_ObjectRef("");
  var childMods = [];
  ms.aw(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (x$1$2) => {
        if (x$1$2 instanceof $c_Lpreact_test_AttributeModifier) {
          titleValue.H = x$1$2.bd;
          return void 0;
        }
        if (x$1$2 instanceof $c_Lpreact_test_ChildModifier) {
          var elem = x$1$2.bg;
          childMods.push(elem);
          return childMods;
        }
        throw new $c_s_MatchError(x$1$2);
      }
    )
  );
  var card = new $c_Lpreact_test_Card(titleValue.H, childMods);
  return card.d7(card);
};
var $d_Lpreact_test_Card$ = new $TypeData().i(
  $c_Lpreact_test_Card$,
  "preact.test.Card$",
  {
    bs: 1,
    a7: 1,
    a8: 1,
  }
);
var $n_Lpreact_test_Card$;
function $m_Lpreact_test_Card$() {
  if (!$n_Lpreact_test_Card$) {
    $n_Lpreact_test_Card$ = new $c_Lpreact_test_Card$();
  }
  return $n_Lpreact_test_Card$;
}
function $ct_sc_ClassTagIterableFactory$AnyIterableDelegate__sc_ClassTagIterableFactory__(
  $thiz,
  delegate
) {
  $thiz.aY = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_ClassTagIterableFactory$AnyIterableDelegate() {
  this.aY = null;
}
$p = $c_sc_ClassTagIterableFactory$AnyIterableDelegate.prototype = new $h_O();
$p.constructor = $c_sc_ClassTagIterableFactory$AnyIterableDelegate;
/** @constructor */
function $h_sc_ClassTagIterableFactory$AnyIterableDelegate() {}
$h_sc_ClassTagIterableFactory$AnyIterableDelegate.prototype = $p;
$p.a2 = function (it) {
  return this.aY.ce(it, $m_s_reflect_ManifestFactory$AnyManifest$());
};
$p.L = function () {
  return this.aY.cl($m_s_reflect_ManifestFactory$AnyManifest$());
};
function $f_sc_Iterator__concat__F0__sc_Iterator($thiz, xs) {
  return new $c_sc_Iterator$ConcatIterator($thiz).bt(xs);
}
/** @constructor */
function $c_sc_Iterator$() {
  this.Y = null;
  $n_sc_Iterator$ = this;
  this.Y = new $c_sc_Iterator$$anon$19();
}
$p = $c_sc_Iterator$.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {}
$h_sc_Iterator$.prototype = $p;
$p.L = function () {
  return new $c_sc_Iterator$$anon$21();
};
var $d_sc_Iterator$ = new $TypeData().i(
  $c_sc_Iterator$,
  "scala.collection.Iterator$",
  {
    bE: 1,
    a: 1,
    P: 1,
  }
);
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if (!$n_sc_Iterator$) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
/** @constructor */
function $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(
  f
) {
  this.c5 = null;
  this.c5 = f;
}
$p =
  $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype =
    new $h_sr_AbstractFunction0();
$p.constructor =
  $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855;
/** @constructor */
function $h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855() {}
$h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype =
  $p;
$p.aS = function () {
  return (0, this.c5)();
};
var $d_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855 =
  new $TypeData().i(
    $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855,
    "scala.runtime.AbstractFunction0.$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855",
    {
      cv: 1,
      cu: 1,
      bw: 1,
    }
  );
/** @constructor */
function $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
  f
) {
  this.c6 = null;
  this.c6 = f;
}
$p =
  $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype =
    new $h_sr_AbstractFunction1();
$p.constructor =
  $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28;
/** @constructor */
function $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28() {}
$h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype =
  $p;
$p.d = function (x0) {
  return (0, this.c6)(x0);
};
var $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 =
  new $TypeData().i(
    $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28,
    "scala.runtime.AbstractFunction1.$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28",
    {
      cx: 1,
      cw: 1,
      f: 1,
    }
  );
var $d_sr_Nothing$ = new $TypeData().i(0, "scala.runtime.Nothing$", {
  cy: 1,
  D: 1,
  a: 1,
});
/** @constructor */
function $c_Lexamples_minimal_Card(title, children) {
  this.bb = null;
  this.ba = null;
  this.bb = title;
  this.ba = children;
}
$p = $c_Lexamples_minimal_Card.prototype = new $h_O();
$p.constructor = $c_Lexamples_minimal_Card;
/** @constructor */
function $h_Lexamples_minimal_Card() {}
$h_Lexamples_minimal_Card.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().b8(this, -590018411, true);
};
$p.o = function () {
  return $m_sr_ScalaRunTime$().b4(this);
};
$p.a4 = function () {
  return 2;
};
$p.U = function () {
  return "Card";
};
$p.a5 = function (n) {
  if (n === 0) {
    return this.bb;
  }
  if (n === 1) {
    return this.ba;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
$p.cq = function () {
  return $m_Lpreact_lib1_div$().p(
    new $c_sjsr_WrappedVarArgs([
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_span$().p(
            new $c_sjsr_WrappedVarArgs([
              $m_Lpreact_lib1_Types$package$().K().d(this.bb),
            ])
          )
        ),
      $m_Lpreact_lib1_Types$package$()
        .v()
        .d(
          $m_Lpreact_lib1_div$().p(
            this.ba.bw(
              new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
                (c$2) => new $c_Lpreact_lib1_ChildModifier(c$2)
              )
            )
          )
        ),
    ])
  );
};
var $d_Lexamples_minimal_Card = new $TypeData().i(
  $c_Lexamples_minimal_Card,
  "examples.minimal.Card",
  {
    aQ: 1,
    d: 1,
    V: 1,
    a: 1,
  }
);
/** @constructor */
function $c_Ljava_io_OutputStream() {}
$p = $c_Ljava_io_OutputStream.prototype = new $h_O();
$p.constructor = $c_Ljava_io_OutputStream;
/** @constructor */
function $h_Ljava_io_OutputStream() {}
$h_Ljava_io_OutputStream.prototype = $p;
function $f_jl_Boolean__hashCode__I($thiz) {
  return $thiz ? 1231 : 1237;
}
function $f_jl_Boolean__toString__T($thiz) {
  return "" + $thiz;
}
var $d_jl_Boolean = new $TypeData().i(
  0,
  "java.lang.Boolean",
  {
    aW: 1,
    a: 1,
    N: 1,
    K: 1,
  },
  (x) => typeof x === "boolean"
);
function $f_jl_Character__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Character__toString__T($thiz) {
  return "" + $cToS($thiz);
}
var $d_jl_Character = new $TypeData().i(
  0,
  "java.lang.Character",
  {
    aY: 1,
    a: 1,
    N: 1,
    K: 1,
  },
  (x) => x instanceof $Char
);
function $ct_jl_RuntimeException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_jl_RuntimeException extends $c_jl_Exception {}
var $d_jl_RuntimeException = new $TypeData().i(
  $c_jl_RuntimeException,
  "java.lang.RuntimeException",
  {
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
/** @constructor */
function $c_jl_StringBuilder() {
  this.k = null;
  this.k = "";
}
$p = $c_jl_StringBuilder.prototype = new $h_O();
$p.constructor = $c_jl_StringBuilder;
/** @constructor */
function $h_jl_StringBuilder() {}
$h_jl_StringBuilder.prototype = $p;
$p.cI = function (str) {
  var str$1 = $m_jl_String$().d0(str, 0, str.a.length);
  this.k = "" + this.k + str$1;
  return this;
};
$p.o = function () {
  return this.k;
};
$p.f = function () {
  return this.k.length;
};
$p.cb = function (index) {
  return this.k.charCodeAt(index);
};
var $d_jl_StringBuilder = new $TypeData().i(
  $c_jl_StringBuilder,
  "java.lang.StringBuilder",
  {
    b9: 1,
    a1: 1,
    ac: 1,
    a: 1,
  }
);
/** @constructor */
function $c_Lpreact_test_Card(title, children) {
  this.bf = null;
  this.be = null;
  this.bf = title;
  this.be = children;
}
$p = $c_Lpreact_test_Card.prototype = new $h_O();
$p.constructor = $c_Lpreact_test_Card;
/** @constructor */
function $h_Lpreact_test_Card() {}
$h_Lpreact_test_Card.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().b8(this, -590018411, true);
};
$p.o = function () {
  return $m_sr_ScalaRunTime$().b4(this);
};
$p.a4 = function () {
  return 2;
};
$p.U = function () {
  return "Card";
};
$p.a5 = function (n) {
  if (n === 0) {
    return this.bf;
  }
  if (n === 1) {
    return this.be;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
$p.d7 = function (self) {
  return $m_Lpreact_test_test$package$().S(
    "div",
    $m_sr_ScalaRunTime$().W(
      new $ac_O([
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_test$package$().S(
            "h3",
            $m_sr_ScalaRunTime$().W(
              new $ac_O([new $c_Lpreact_test_ChildModifier(this.bf)])
            )
          )
        ),
        new $c_Lpreact_test_ChildModifier(
          $m_Lpreact_test_test$package$().S(
            "div",
            $m_sr_ScalaRunTime$().W(
              new $ac_O([new $c_Lpreact_test_ChildModifier(this.be)])
            )
          )
        ),
      ])
    )
  );
};
var $d_Lpreact_test_Card = new $TypeData().i(
  $c_Lpreact_test_Card,
  "preact.test.Card",
  {
    br: 1,
    d: 1,
    V: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sc_AbstractIterator() {}
$p = $c_sc_AbstractIterator.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterator;
/** @constructor */
function $h_sc_AbstractIterator() {}
$h_sc_AbstractIterator.prototype = $p;
$p.q = function () {
  return -1;
};
$p.a1 = function (dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
};
$p.av = function (b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(
    this,
    b,
    start,
    sep,
    end
  );
};
$p.e = function () {
  return this;
};
$p.bt = function (xs) {
  return $f_sc_Iterator__concat__F0__sc_Iterator(this, xs);
};
$p.o = function () {
  return "<iterator>";
};
function $ct_sc_SeqFactory$Delegate__sc_SeqFactory__($thiz, delegate) {
  $thiz.aC = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqFactory$Delegate() {
  this.aC = null;
}
$p = $c_sc_SeqFactory$Delegate.prototype = new $h_O();
$p.constructor = $c_sc_SeqFactory$Delegate;
/** @constructor */
function $h_sc_SeqFactory$Delegate() {}
$h_sc_SeqFactory$Delegate.prototype = $p;
$p.b7 = function (it) {
  return this.aC.a2(it);
};
$p.L = function () {
  return this.aC.L();
};
$p.a2 = function (source) {
  return this.b7(source);
};
function $f_sc_StrictOptimizedIterableOps__map__F1__O($thiz, f) {
  var b = $thiz.aa().L();
  var it = $thiz.e();
  while (it.l()) {
    b.E(f.d(it.j()));
  }
  return b.M();
}
/** @constructor */
function $c_scm_Builder$$anon$1(f$2, outer) {
  this.c0 = null;
  this.b1 = null;
  this.c0 = f$2;
  if (outer === null) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.b1 = outer;
}
$p = $c_scm_Builder$$anon$1.prototype = new $h_O();
$p.constructor = $c_scm_Builder$$anon$1;
/** @constructor */
function $h_scm_Builder$$anon$1() {}
$h_scm_Builder$$anon$1.prototype = $p;
$p.cF = function (x) {
  this.b1.E(x);
  return this;
};
$p.cz = function (xs) {
  this.b1.D(xs);
  return this;
};
$p.M = function () {
  return this.c0.d(this.b1.M());
};
$p.E = function (elem) {
  return this.cF(elem);
};
$p.D = function (elems) {
  return this.cz(elems);
};
var $d_scm_Builder$$anon$1 = new $TypeData().i(
  $c_scm_Builder$$anon$1,
  "scala.collection.mutable.Builder$$anon$1",
  {
    cj: 1,
    R: 1,
    S: 1,
    U: 1,
  }
);
function $ct_scm_GrowableBuilder__scm_Growable__($thiz, elems) {
  $thiz.aG = elems;
  return $thiz;
}
/** @constructor */
function $c_scm_GrowableBuilder() {
  this.aG = null;
}
$p = $c_scm_GrowableBuilder.prototype = new $h_O();
$p.constructor = $c_scm_GrowableBuilder;
/** @constructor */
function $h_scm_GrowableBuilder() {}
$h_scm_GrowableBuilder.prototype = $p;
$p.cG = function (elem) {
  this.aG.E(elem);
  return this;
};
$p.cA = function (xs) {
  this.aG.D(xs);
  return this;
};
$p.M = function () {
  return this.aG;
};
$p.E = function (elem) {
  return this.cG(elem);
};
$p.D = function (elems) {
  return this.cA(elems);
};
var $d_scm_GrowableBuilder = new $TypeData().i(
  $c_scm_GrowableBuilder,
  "scala.collection.mutable.GrowableBuilder",
  {
    aH: 1,
    R: 1,
    S: 1,
    U: 1,
  }
);
function $ps_Lexamples_minimal_Card$__Card$$superArg$1__F1() {
  return new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
    (children$2) => {
      $m_Lexamples_minimal_Card$();
      return new $c_Lexamples_minimal_Card("Untitled", children$2);
    }
  );
}
function $ps_Lexamples_minimal_Card$__Card$$superArg$2__F1() {
  return new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
    (card$2) => card$2.cq()
  );
}
/** @constructor */
function $c_Lexamples_minimal_Card$() {
  $ct_Lpreact_lib1_SimpleComponentCompanion__F1__F1__(
    this,
    $ps_Lexamples_minimal_Card$__Card$$superArg$1__F1(),
    $ps_Lexamples_minimal_Card$__Card$$superArg$2__F1()
  );
}
$p = $c_Lexamples_minimal_Card$.prototype =
  new $h_Lpreact_lib1_SimpleComponentCompanion();
$p.constructor = $c_Lexamples_minimal_Card$;
/** @constructor */
function $h_Lexamples_minimal_Card$() {}
$h_Lexamples_minimal_Card$.prototype = $p;
$p.p = function (modifiers) {
  var titleValue = new $c_sr_ObjectRef("Untitled");
  var childMods = $m_scm_ArrayBuffer$().cg(new $c_sjsr_WrappedVarArgs([]));
  modifiers.aw(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (x$1$2) => {
        if (x$1$2 instanceof $c_Lpreact_lib1_PropModifier) {
          var x11 = x$1$2.aV;
          var x12 = x$1$2.aW;
          if (x11 === "title" && typeof x12 === "string") {
            titleValue.H = x12;
            return void 0;
          }
        }
        if (x$1$2 instanceof $c_Lpreact_lib1_ChildModifier) {
          return childMods.c9(x$1$2.aT);
        }
      }
    )
  );
  return ($m_Lexamples_minimal_Card$(),
  new $c_Lexamples_minimal_Card(
    titleValue.H,
    $m_sci_Seq$().bu(childMods)
  )).cq();
};
var $d_Lexamples_minimal_Card$ = new $TypeData().i(
  $c_Lexamples_minimal_Card$,
  "examples.minimal.Card$",
  {
    aR: 1,
    bk: 1,
    bh: 1,
    a7: 1,
    a8: 1,
  }
);
var $n_Lexamples_minimal_Card$;
function $m_Lexamples_minimal_Card$() {
  if (!$n_Lexamples_minimal_Card$) {
    $n_Lexamples_minimal_Card$ = new $c_Lexamples_minimal_Card$();
  }
  return $n_Lexamples_minimal_Card$;
}
function $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, out) {
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_FilterOutputStream() {}
$p = $c_Ljava_io_FilterOutputStream.prototype = new $h_Ljava_io_OutputStream();
$p.constructor = $c_Ljava_io_FilterOutputStream;
/** @constructor */
function $h_Ljava_io_FilterOutputStream() {}
$h_Ljava_io_FilterOutputStream.prototype = $p;
class $c_jl_ArithmeticException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_ArithmeticException = new $TypeData().i(
  $c_jl_ArithmeticException,
  "java.lang.ArithmeticException",
  {
    aV: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
function $f_jl_Byte__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Byte__toString__T($thiz) {
  return "" + $thiz;
}
var $d_jl_Byte = new $TypeData().i(
  0,
  "java.lang.Byte",
  {
    aX: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
  },
  (x) => $isByte(x)
);
function $ct_jl_IllegalArgumentException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_IllegalArgumentException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_IllegalArgumentException extends $c_jl_RuntimeException {}
var $d_jl_IllegalArgumentException = new $TypeData().i(
  $c_jl_IllegalArgumentException,
  "java.lang.IllegalArgumentException",
  {
    b1: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
class $c_jl_IllegalStateException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_IllegalStateException = new $TypeData().i(
  $c_jl_IllegalStateException,
  "java.lang.IllegalStateException",
  {
    b2: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
function $ct_jl_IndexOutOfBoundsException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_jl_IndexOutOfBoundsException extends $c_jl_RuntimeException {}
var $d_jl_IndexOutOfBoundsException = new $TypeData().i(
  $c_jl_IndexOutOfBoundsException,
  "java.lang.IndexOutOfBoundsException",
  {
    af: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream$DummyOutputStream() {}
$p = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype =
  new $h_Ljava_io_OutputStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream$DummyOutputStream() {}
$h_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype = $p;
var $d_jl_JSConsoleBasedPrintStream$DummyOutputStream = new $TypeData().i(
  $c_jl_JSConsoleBasedPrintStream$DummyOutputStream,
  "java.lang.JSConsoleBasedPrintStream$DummyOutputStream",
  {
    b5: 1,
    ab: 1,
    a9: 1,
    ad: 1,
    aa: 1,
  }
);
function $ct_jl_NullPointerException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_NullPointerException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_NullPointerException extends $c_jl_RuntimeException {}
var $d_jl_NullPointerException = new $TypeData().i(
  $c_jl_NullPointerException,
  "java.lang.NullPointerException",
  {
    b6: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
function $f_jl_Short__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Short__toString__T($thiz) {
  return "" + $thiz;
}
var $d_jl_Short = new $TypeData().i(
  0,
  "java.lang.Short",
  {
    b7: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
  },
  (x) => $isShort(x)
);
class $c_jl_UnsupportedOperationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_UnsupportedOperationException = new $TypeData().i(
  $c_jl_UnsupportedOperationException,
  "java.lang.UnsupportedOperationException",
  {
    bc: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
class $c_ju_ConcurrentModificationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_ju_ConcurrentModificationException = new $TypeData().i(
  $c_ju_ConcurrentModificationException,
  "java.util.ConcurrentModificationException",
  {
    be: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
class $c_ju_NoSuchElementException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_ju_NoSuchElementException = new $TypeData().i(
  $c_ju_NoSuchElementException,
  "java.util.NoSuchElementException",
  {
    bf: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
/** @constructor */
function $c_Lpreact_lib1_ChildModifier(child) {
  this.aT = null;
  this.aT = child;
}
$p = $c_Lpreact_lib1_ChildModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_ChildModifier;
/** @constructor */
function $h_Lpreact_lib1_ChildModifier() {}
$h_Lpreact_lib1_ChildModifier.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().b8(this, 70822939, true);
};
$p.o = function () {
  return $m_sr_ScalaRunTime$().b4(this);
};
$p.a4 = function () {
  return 1;
};
$p.U = function () {
  return "ChildModifier";
};
$p.a5 = function (n) {
  if (n === 0) {
    return this.aT;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
function $isArrayOf_Lpreact_lib1_ChildModifier(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.ak
  );
}
var $d_Lpreact_lib1_ChildModifier = new $TypeData().i(
  $c_Lpreact_lib1_ChildModifier,
  "preact.lib1.ChildModifier",
  {
    ak: 1,
    a2: 1,
    d: 1,
    V: 1,
    a: 1,
  }
);
/** @constructor */
function $c_Lpreact_lib1_PropModifier(key, value) {
  this.aV = null;
  this.aW = null;
  this.aV = key;
  this.aW = value;
}
$p = $c_Lpreact_lib1_PropModifier.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_PropModifier;
/** @constructor */
function $h_Lpreact_lib1_PropModifier() {}
$h_Lpreact_lib1_PropModifier.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().b8(this, -1884433327, true);
};
$p.o = function () {
  return $m_sr_ScalaRunTime$().b4(this);
};
$p.a4 = function () {
  return 2;
};
$p.U = function () {
  return "PropModifier";
};
$p.a5 = function (n) {
  if (n === 0) {
    return this.aV;
  }
  if (n === 1) {
    return this.aW;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
function $isArrayOf_Lpreact_lib1_PropModifier(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.al
  );
}
var $d_Lpreact_lib1_PropModifier = new $TypeData().i(
  $c_Lpreact_lib1_PropModifier,
  "preact.lib1.PropModifier",
  {
    al: 1,
    a2: 1,
    d: 1,
    V: 1,
    a: 1,
  }
);
function $p_s_MatchError__objString__T($thiz) {
  if (!$thiz.bM) {
    if ($thiz.aX === null) {
      var $x_1 = "null";
    } else {
      try {
        var $x_1 = $thiz.aX + " (" + $p_s_MatchError__ofClass$1__T($thiz) + ")";
      } catch (e) {
        var $x_1 = "an instance " + $p_s_MatchError__ofClass$1__T($thiz);
      }
    }
    $thiz.bL = $x_1;
    $thiz.bM = true;
  }
  return $thiz.bL;
}
function $p_s_MatchError__ofClass$1__T($thiz) {
  var this$1 = $thiz.aX;
  return "of class " + $objectClassName(this$1);
}
class $c_s_MatchError extends $c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.aX = null;
    this.bL = null;
    this.bM = false;
    this.aX = obj;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  bv() {
    return $p_s_MatchError__objString__T(this);
  }
}
var $d_s_MatchError = new $TypeData().i($c_s_MatchError, "scala.MatchError", {
  bx: 1,
  G: 1,
  F: 1,
  D: 1,
  a: 1,
});
/** @constructor */
function $c_s_Product$$anon$1(outer) {
  this.az = 0;
  this.bO = 0;
  this.bN = null;
  if (outer === null) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.bN = outer;
  this.az = 0;
  this.bO = outer.a4();
}
$p = $c_s_Product$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_s_Product$$anon$1;
/** @constructor */
function $h_s_Product$$anon$1() {}
$h_s_Product$$anon$1.prototype = $p;
$p.l = function () {
  return this.az < this.bO;
};
$p.j = function () {
  var result = this.bN.a5(this.az);
  this.az = (1 + this.az) | 0;
  return result;
};
var $d_s_Product$$anon$1 = new $TypeData().i(
  $c_s_Product$$anon$1,
  "scala.Product$$anon$1",
  {
    by: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
/** @constructor */
function $c_sc_ClassTagSeqFactory$AnySeqDelegate(delegate) {
  this.aY = null;
  $ct_sc_ClassTagIterableFactory$AnyIterableDelegate__sc_ClassTagIterableFactory__(
    this,
    delegate
  );
}
$p = $c_sc_ClassTagSeqFactory$AnySeqDelegate.prototype =
  new $h_sc_ClassTagIterableFactory$AnyIterableDelegate();
$p.constructor = $c_sc_ClassTagSeqFactory$AnySeqDelegate;
/** @constructor */
function $h_sc_ClassTagSeqFactory$AnySeqDelegate() {}
$h_sc_ClassTagSeqFactory$AnySeqDelegate.prototype = $p;
var $d_sc_ClassTagSeqFactory$AnySeqDelegate = new $TypeData().i(
  $c_sc_ClassTagSeqFactory$AnySeqDelegate,
  "scala.collection.ClassTagSeqFactory$AnySeqDelegate",
  {
    bC: 1,
    bB: 1,
    a: 1,
    P: 1,
    T: 1,
  }
);
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(
    $thiz,
    $thiz.a0() + "(",
    ", ",
    ")"
  );
}
function $is_sc_Iterable(obj) {
  return !!(obj && obj.$classData && obj.$classData.n.e);
}
function $isArrayOf_sc_Iterable(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.e
  );
}
/** @constructor */
function $c_sc_Iterator$$anon$19() {}
$p = $c_sc_Iterator$$anon$19.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$19;
/** @constructor */
function $h_sc_Iterator$$anon$19() {}
$h_sc_Iterator$$anon$19.prototype = $p;
$p.l = function () {
  return false;
};
$p.d1 = function () {
  throw new $c_ju_NoSuchElementException("next on empty iterator");
};
$p.q = function () {
  return 0;
};
$p.j = function () {
  this.d1();
};
var $d_sc_Iterator$$anon$19 = new $TypeData().i(
  $c_sc_Iterator$$anon$19,
  "scala.collection.Iterator$$anon$19",
  {
    bF: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.bP = null;
  this.aZ = false;
  this.bP = a$2;
  this.aZ = false;
}
$p = $c_sc_Iterator$$anon$20.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$20;
/** @constructor */
function $h_sc_Iterator$$anon$20() {}
$h_sc_Iterator$$anon$20.prototype = $p;
$p.l = function () {
  return !this.aZ;
};
$p.j = function () {
  if (this.aZ) {
    return $m_sc_Iterator$().Y.j();
  } else {
    this.aZ = true;
    return this.bP;
  }
};
var $d_sc_Iterator$$anon$20 = new $TypeData().i(
  $c_sc_Iterator$$anon$20,
  "scala.collection.Iterator$$anon$20",
  {
    bG: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
function $p_sc_Iterator$ConcatIterator__merge$1__V($thiz) {
  while (true) {
    if ($thiz.u instanceof $c_sc_Iterator$ConcatIterator) {
      var c = $thiz.u;
      $thiz.u = c.u;
      $thiz.Z = c.Z;
      if (c.x !== null) {
        if ($thiz.w === null) {
          $thiz.w = c.w;
        }
        var x$proxy10 = c.w;
        if (x$proxy10 === null) {
          $m_sr_Scala3RunTime$().ax();
        }
        x$proxy10.aB = $thiz.x;
        $thiz.x = c.x;
      }
    } else {
      return void 0;
    }
  }
}
function $p_sc_Iterator$ConcatIterator__advance$1__Z($thiz) {
  while (true) {
    if ($thiz.x === null) {
      $thiz.u = null;
      $thiz.w = null;
      return false;
    } else {
      $thiz.u = $thiz.x.cT();
      if ($thiz.w === $thiz.x) {
        var x$proxy12 = $thiz.w;
        if (x$proxy12 === null) {
          $m_sr_Scala3RunTime$().ax();
        }
        $thiz.w = x$proxy12.aB;
      }
      $thiz.x = $thiz.x.aB;
      $p_sc_Iterator$ConcatIterator__merge$1__V($thiz);
      if ($thiz.Z) {
        return true;
      } else if ($thiz.u !== null && $thiz.u.l()) {
        $thiz.Z = true;
        return true;
      }
    }
  }
}
/** @constructor */
function $c_sc_Iterator$ConcatIterator(from) {
  this.u = null;
  this.x = null;
  this.w = null;
  this.Z = false;
  this.u = from;
  this.x = null;
  this.w = null;
  this.Z = false;
}
$p = $c_sc_Iterator$ConcatIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$ConcatIterator;
/** @constructor */
function $h_sc_Iterator$ConcatIterator() {}
$h_sc_Iterator$ConcatIterator.prototype = $p;
$p.l = function () {
  if (this.Z) {
    return true;
  } else if (this.u !== null) {
    if (this.u.l()) {
      this.Z = true;
      return true;
    } else {
      return $p_sc_Iterator$ConcatIterator__advance$1__Z(this);
    }
  } else {
    return false;
  }
};
$p.j = function () {
  if (this.l()) {
    this.Z = false;
    var x$proxy13 = this.u;
    if (x$proxy13 === null) {
      $m_sr_Scala3RunTime$().ax();
    }
    return x$proxy13.j();
  } else {
    return $m_sc_Iterator$().Y.j();
  }
};
$p.bt = function (that) {
  var c = new $c_sc_Iterator$ConcatIteratorCell(that, null);
  if (this.x === null) {
    this.x = c;
    this.w = c;
  } else {
    var x$proxy14 = this.w;
    if (x$proxy14 === null) {
      $m_sr_Scala3RunTime$().ax();
    }
    x$proxy14.aB = c;
    this.w = c;
  }
  if (this.u === null) {
    this.u = $m_sc_Iterator$().Y;
  }
  return this;
};
function $isArrayOf_sc_Iterator$ConcatIterator(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.aw
  );
}
var $d_sc_Iterator$ConcatIterator = new $TypeData().i(
  $c_sc_Iterator$ConcatIterator,
  "scala.collection.Iterator$ConcatIterator",
  {
    aw: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if (n < 0) {
    throw $ct_jl_IndexOutOfBoundsException__T__(
      new $c_jl_IndexOutOfBoundsException(),
      "" + n
    );
  }
  var skipped = $thiz.cM(n);
  if (skipped.B()) {
    throw $ct_jl_IndexOutOfBoundsException__T__(
      new $c_jl_IndexOutOfBoundsException(),
      "" + n
    );
  }
  return skipped.T();
}
/** @constructor */
function $c_sc_StrictOptimizedLinearSeqOps$$anon$1(outer) {
  this.aD = null;
  if (outer === null) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.aD = outer;
}
$p = $c_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype =
  new $h_sc_AbstractIterator();
$p.constructor = $c_sc_StrictOptimizedLinearSeqOps$$anon$1;
/** @constructor */
function $h_sc_StrictOptimizedLinearSeqOps$$anon$1() {}
$h_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = $p;
$p.l = function () {
  return !this.aD.B();
};
$p.j = function () {
  var r = this.aD.T();
  this.aD = this.aD.N();
  return r;
};
var $d_sc_StrictOptimizedLinearSeqOps$$anon$1 = new $TypeData().i(
  $c_sc_StrictOptimizedLinearSeqOps$$anon$1,
  "scala.collection.StrictOptimizedLinearSeqOps$$anon$1",
  {
    bK: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
/** @constructor */
function $c_sci_List$() {
  $n_sci_List$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
$p = $c_sci_List$.prototype = new $h_O();
$p.constructor = $c_sci_List$;
/** @constructor */
function $h_sci_List$() {}
$h_sci_List$.prototype = $p;
$p.L = function () {
  return new $c_scm_ListBuffer();
};
$p.a2 = function (source) {
  return $m_sci_Nil$().d3(source);
};
var $d_sci_List$ = new $TypeData().i(
  $c_sci_List$,
  "scala.collection.immutable.List$",
  {
    bY: 1,
    a: 1,
    P: 1,
    T: 1,
    Y: 1,
  }
);
var $n_sci_List$;
function $m_sci_List$() {
  if (!$n_sci_List$) {
    $n_sci_List$ = new $c_sci_List$();
  }
  return $n_sci_List$;
}
/** @constructor */
function $c_sci_Seq$() {
  this.aC = null;
  $ct_sc_SeqFactory$Delegate__sc_SeqFactory__(this, $m_sci_List$());
}
$p = $c_sci_Seq$.prototype = new $h_sc_SeqFactory$Delegate();
$p.constructor = $c_sci_Seq$;
/** @constructor */
function $h_sci_Seq$() {}
$h_sci_Seq$.prototype = $p;
$p.bu = function (it) {
  return $is_sci_Seq(it)
    ? it
    : $c_sc_SeqFactory$Delegate.prototype.b7.call(this, it);
};
$p.b7 = function (it) {
  return this.bu(it);
};
$p.a2 = function (source) {
  return this.bu(source);
};
var $d_sci_Seq$ = new $TypeData().i(
  $c_sci_Seq$,
  "scala.collection.immutable.Seq$",
  {
    c0: 1,
    az: 1,
    a: 1,
    P: 1,
    T: 1,
  }
);
var $n_sci_Seq$;
function $m_sci_Seq$() {
  if (!$n_sci_Seq$) {
    $n_sci_Seq$ = new $c_sci_Seq$();
  }
  return $n_sci_Seq$;
}
/** @constructor */
function $c_scm_ArrayBuffer$() {
  this.bU = null;
  $n_scm_ArrayBuffer$ = this;
  this.bU = new $ac_O(0);
}
$p = $c_scm_ArrayBuffer$.prototype = new $h_O();
$p.constructor = $c_scm_ArrayBuffer$;
/** @constructor */
function $h_scm_ArrayBuffer$() {}
$h_scm_ArrayBuffer$.prototype = $p;
$p.cg = function (coll) {
  var k = coll.q();
  if (k >= 0) {
    var array = this.cr(this.bU, 0, k);
    var actual = $is_sc_Iterable(coll)
      ? coll.a1(array, 0, 2147483647)
      : coll.e().a1(array, 0, 2147483647);
    if (actual !== k) {
      throw new $c_jl_IllegalStateException("Copied " + actual + " of " + k);
    }
    return $ct_scm_ArrayBuffer__AO__I__(new $c_scm_ArrayBuffer(), array, k);
  } else {
    return $ct_scm_ArrayBuffer__(new $c_scm_ArrayBuffer()).c8(coll);
  }
};
$p.L = function () {
  return new $c_scm_ArrayBuffer$$anon$1();
};
$p.d9 = function (arrayLen, targetLen) {
  if (targetLen < 0) {
    throw $ct_jl_RuntimeException__T__(
      new $c_jl_RuntimeException(),
      "Overflow while resizing array of array-backed collection. Requested length: " +
        targetLen +
        "; current length: " +
        arrayLen +
        "; increase: " +
        ((targetLen - arrayLen) | 0)
    );
  } else if (targetLen <= arrayLen) {
    return -1;
  } else if (targetLen > 2147483639) {
    throw $ct_jl_RuntimeException__T__(
      new $c_jl_RuntimeException(),
      "Array of array-backed collection exceeds VM length limit of 2147483639. Requested length: " +
        targetLen +
        "; current length: " +
        arrayLen
    );
  } else if (arrayLen > 1073741819) {
    return 2147483639;
  } else {
    var x = arrayLen << 1;
    var y = x > 16 ? x : 16;
    return targetLen > y ? targetLen : y;
  }
};
$p.cr = function (array, curSize, targetSize) {
  var newLen = this.d9(array.a.length, targetSize);
  if (newLen < 0) {
    return array;
  } else {
    var res = new $ac_O(newLen);
    array.F(0, res, 0, curSize);
    return res;
  }
};
$p.a2 = function (source) {
  return this.cg(source);
};
var $d_scm_ArrayBuffer$ = new $TypeData().i(
  $c_scm_ArrayBuffer$,
  "scala.collection.mutable.ArrayBuffer$",
  {
    c1: 1,
    a: 1,
    P: 1,
    T: 1,
    Y: 1,
  }
);
var $n_scm_ArrayBuffer$;
function $m_scm_ArrayBuffer$() {
  if (!$n_scm_ArrayBuffer$) {
    $n_scm_ArrayBuffer$ = new $c_scm_ArrayBuffer$();
  }
  return $n_scm_ArrayBuffer$;
}
/** @constructor */
function $c_scm_ArrayBuffer$$anon$1() {
  this.aG = null;
  $ct_scm_GrowableBuilder__scm_Growable__(
    this,
    ($m_scm_ArrayBuffer$(), $ct_scm_ArrayBuffer__(new $c_scm_ArrayBuffer()))
  );
}
$p = $c_scm_ArrayBuffer$$anon$1.prototype = new $h_scm_GrowableBuilder();
$p.constructor = $c_scm_ArrayBuffer$$anon$1;
/** @constructor */
function $h_scm_ArrayBuffer$$anon$1() {}
$h_scm_ArrayBuffer$$anon$1.prototype = $p;
var $d_scm_ArrayBuffer$$anon$1 = new $TypeData().i(
  $c_scm_ArrayBuffer$$anon$1,
  "scala.collection.mutable.ArrayBuffer$$anon$1",
  {
    c2: 1,
    aH: 1,
    R: 1,
    S: 1,
    U: 1,
  }
);
/** @constructor */
function $c_scm_Buffer$() {
  this.aC = null;
  $ct_sc_SeqFactory$Delegate__sc_SeqFactory__(this, $m_sjs_js_WrappedArray$());
}
$p = $c_scm_Buffer$.prototype = new $h_sc_SeqFactory$Delegate();
$p.constructor = $c_scm_Buffer$;
/** @constructor */
function $h_scm_Buffer$() {}
$h_scm_Buffer$.prototype = $p;
var $d_scm_Buffer$ = new $TypeData().i(
  $c_scm_Buffer$,
  "scala.collection.mutable.Buffer$",
  {
    ci: 1,
    az: 1,
    a: 1,
    P: 1,
    T: 1,
  }
);
var $n_scm_Buffer$;
function $m_scm_Buffer$() {
  if (!$n_scm_Buffer$) {
    $n_scm_Buffer$ = new $c_scm_Buffer$();
  }
  return $n_scm_Buffer$;
}
function $ct_scm_ImmutableBuilder__sc_IterableOnce__($thiz, empty) {
  $thiz.aH = empty;
  return $thiz;
}
/** @constructor */
function $c_scm_ImmutableBuilder() {
  this.aH = null;
}
$p = $c_scm_ImmutableBuilder.prototype = new $h_O();
$p.constructor = $c_scm_ImmutableBuilder;
/** @constructor */
function $h_scm_ImmutableBuilder() {}
$h_scm_ImmutableBuilder.prototype = $p;
$p.D = function (elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
};
$p.M = function () {
  return this.aH;
};
/** @constructor */
function $c_scm_ListBuffer$() {}
$p = $c_scm_ListBuffer$.prototype = new $h_O();
$p.constructor = $c_scm_ListBuffer$;
/** @constructor */
function $h_scm_ListBuffer$() {}
$h_scm_ListBuffer$.prototype = $p;
$p.L = function () {
  return $ct_scm_GrowableBuilder__scm_Growable__(
    new $c_scm_GrowableBuilder(),
    new $c_scm_ListBuffer()
  );
};
$p.a2 = function (source) {
  return new $c_scm_ListBuffer().bA(source);
};
var $d_scm_ListBuffer$ = new $TypeData().i(
  $c_scm_ListBuffer$,
  "scala.collection.mutable.ListBuffer$",
  {
    cm: 1,
    a: 1,
    P: 1,
    T: 1,
    Y: 1,
  }
);
var $n_scm_ListBuffer$;
function $m_scm_ListBuffer$() {
  if (!$n_scm_ListBuffer$) {
    $n_scm_ListBuffer$ = new $c_scm_ListBuffer$();
  }
  return $n_scm_ListBuffer$;
}
/** @constructor */
function $c_scm_MutationTracker$CheckedIterator(underlying, mutationCount) {
  this.bn = null;
  this.c4 = null;
  this.c3 = 0;
  this.bn = underlying;
  this.c4 = mutationCount;
  this.c3 = mutationCount.aS() | 0;
}
$p = $c_scm_MutationTracker$CheckedIterator.prototype =
  new $h_sc_AbstractIterator();
$p.constructor = $c_scm_MutationTracker$CheckedIterator;
/** @constructor */
function $h_scm_MutationTracker$CheckedIterator() {}
$h_scm_MutationTracker$CheckedIterator.prototype = $p;
$p.l = function () {
  $m_scm_MutationTracker$().cc(
    this.c3,
    this.c4.aS() | 0,
    "mutation occurred during iteration"
  );
  return this.bn.l();
};
$p.j = function () {
  return this.bn.j();
};
var $d_scm_MutationTracker$CheckedIterator = new $TypeData().i(
  $c_scm_MutationTracker$CheckedIterator,
  "scala.collection.mutable.MutationTracker$CheckedIterator",
  {
    co: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
  }
);
/** @constructor */
function $c_sjs_js_WrappedArray$() {}
$p = $c_sjs_js_WrappedArray$.prototype = new $h_O();
$p.constructor = $c_sjs_js_WrappedArray$;
/** @constructor */
function $h_sjs_js_WrappedArray$() {}
$h_sjs_js_WrappedArray$.prototype = $p;
$p.L = function () {
  return $ct_sjs_js_WrappedArray__(new $c_sjs_js_WrappedArray());
};
$p.cQ = function (source) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(
    $ct_sjs_js_WrappedArray__(new $c_sjs_js_WrappedArray()),
    source
  ).M();
};
$p.a2 = function (source) {
  return this.cQ(source);
};
var $d_sjs_js_WrappedArray$ = new $TypeData().i(
  $c_sjs_js_WrappedArray$,
  "scala.scalajs.js.WrappedArray$",
  {
    cG: 1,
    Y: 1,
    a: 1,
    P: 1,
    T: 1,
  }
);
var $n_sjs_js_WrappedArray$;
function $m_sjs_js_WrappedArray$() {
  if (!$n_sjs_js_WrappedArray$) {
    $n_sjs_js_WrappedArray$ = new $c_sjs_js_WrappedArray$();
  }
  return $n_sjs_js_WrappedArray$;
}
/** @constructor */
function $c_sjsr_WrappedVarArgs$() {}
$p = $c_sjsr_WrappedVarArgs$.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs$;
/** @constructor */
function $h_sjsr_WrappedVarArgs$() {}
$h_sjsr_WrappedVarArgs$.prototype = $p;
$p.cR = function (source) {
  return this.L().D(source).M();
};
$p.L = function () {
  return new $c_scm_Builder$$anon$1(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (x$1$2$2) => new $c_sjsr_WrappedVarArgs(x$1$2$2.a8)
    ),
    $ct_sjs_js_WrappedArray__sjs_js_Array__(new $c_sjs_js_WrappedArray(), [])
  );
};
$p.a2 = function (source) {
  return this.cR(source);
};
var $d_sjsr_WrappedVarArgs$ = new $TypeData().i(
  $c_sjsr_WrappedVarArgs$,
  "scala.scalajs.runtime.WrappedVarArgs$",
  {
    cI: 1,
    Y: 1,
    a: 1,
    P: 1,
    T: 1,
  }
);
var $n_sjsr_WrappedVarArgs$;
function $m_sjsr_WrappedVarArgs$() {
  if (!$n_sjsr_WrappedVarArgs$) {
    $n_sjsr_WrappedVarArgs$ = new $c_sjsr_WrappedVarArgs$();
  }
  return $n_sjsr_WrappedVarArgs$;
}
function $f_jl_Double__hashCode__I($thiz) {
  var valueInt = $thiz | 0;
  if (valueInt === $thiz && 1.0 / $thiz !== -Infinity) {
    return valueInt;
  } else if ($thiz !== $thiz) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, $thiz, true);
    return (
      (fpBitsDataView.getInt32(0, true) | 0) ^
      (fpBitsDataView.getInt32(4, true) | 0)
    );
  }
}
function $f_jl_Double__toString__T($thiz) {
  return "" + $thiz;
}
function $isArrayOf_jl_Double(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.ae
  );
}
var $d_jl_Double = new $TypeData().i(
  0,
  "java.lang.Double",
  {
    ae: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
    X: 1,
  },
  (x) => typeof x === "number"
);
function $f_jl_Float__hashCode__I($thiz) {
  var value = $thiz;
  var valueInt = value | 0;
  if (valueInt === value && 1.0 / value !== -Infinity) {
    return valueInt;
  } else if (value !== value) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, value, true);
    return (
      (fpBitsDataView.getInt32(0, true) | 0) ^
      (fpBitsDataView.getInt32(4, true) | 0)
    );
  }
}
function $f_jl_Float__toString__T($thiz) {
  return "" + $thiz;
}
var $d_jl_Float = new $TypeData().i(
  0,
  "java.lang.Float",
  {
    b0: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
    X: 1,
  },
  (x) => $isFloat(x)
);
function $f_jl_Integer__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Integer__toString__T($thiz) {
  return "" + $thiz;
}
var $d_jl_Integer = new $TypeData().i(
  0,
  "java.lang.Integer",
  {
    b3: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
    X: 1,
  },
  (x) => $isInt(x)
);
function $f_jl_Long__hashCode__I($thiz) {
  return $thiz.b ^ $thiz.c;
}
function $f_jl_Long__toString__T($thiz) {
  return $m_RTLong$().co($thiz.b, $thiz.c);
}
function $isArrayOf_jl_Long(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.ag
  );
}
var $d_jl_Long = new $TypeData().i(
  0,
  "java.lang.Long",
  {
    ag: 1,
    W: 1,
    a: 1,
    N: 1,
    K: 1,
    X: 1,
  },
  (x) => x instanceof $c_RTLong
);
function $f_T__hashCode__I($thiz) {
  var n = $thiz.length;
  var h = 0;
  var i = 0;
  while (i !== n) {
    h = ((((h << 5) - h) | 0) + $thiz.charCodeAt(i)) | 0;
    i = (1 + i) | 0;
  }
  return h;
}
function $f_T__toString__T($thiz) {
  return $thiz;
}
function $isArrayOf_T(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.ah
  );
}
var $d_T = new $TypeData().i(
  0,
  "java.lang.String",
  {
    ah: 1,
    a: 1,
    N: 1,
    a1: 1,
    K: 1,
    X: 1,
  },
  (x) => typeof x === "string"
);
class $c_jl_StringIndexOutOfBoundsException extends $c_jl_IndexOutOfBoundsException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
var $d_jl_StringIndexOutOfBoundsException = new $TypeData().i(
  $c_jl_StringIndexOutOfBoundsException,
  "java.lang.StringIndexOutOfBoundsException",
  {
    ba: 1,
    af: 1,
    G: 1,
    F: 1,
    D: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sc_AbstractIterable() {}
$p = $c_sc_AbstractIterable.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {}
$h_sc_AbstractIterable.prototype = $p;
$p.q = function () {
  return -1;
};
$p.aw = function (f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
};
$p.a1 = function (dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
};
$p.av = function (b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(
    this,
    b,
    start,
    sep,
    end
  );
};
$p.a0 = function () {
  return this.V();
};
/** @constructor */
function $c_sc_ArrayOps$ArrayIterator(xs) {
  this.bi = null;
  this.a6 = 0;
  this.bh = 0;
  this.bi = xs;
  this.a6 = 0;
  this.bh = $m_jl_reflect_Array$().a3(xs);
}
$p = $c_sc_ArrayOps$ArrayIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_ArrayOps$ArrayIterator;
/** @constructor */
function $h_sc_ArrayOps$ArrayIterator() {}
$h_sc_ArrayOps$ArrayIterator.prototype = $p;
$p.q = function () {
  return (this.bh - this.a6) | 0;
};
$p.l = function () {
  return this.a6 < this.bh;
};
$p.j = function () {
  if (this.a6 >= $m_jl_reflect_Array$().a3(this.bi)) {
    $m_sc_Iterator$().Y.j();
  }
  var r = $m_sr_ScalaRunTime$().a9(this.bi, this.a6);
  this.a6 = (1 + this.a6) | 0;
  return r;
};
var $d_sc_ArrayOps$ArrayIterator = new $TypeData().i(
  $c_sc_ArrayOps$ArrayIterator,
  "scala.collection.ArrayOps$ArrayIterator",
  {
    bA: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
    a: 1,
  }
);
function $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(
  $thiz,
  self
) {
  $thiz.bj = self;
  $thiz.aA = 0;
  $thiz.X = self.f();
  return $thiz;
}
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator() {
  this.bj = null;
  this.aA = 0;
  this.X = 0;
}
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype =
  new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {}
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.q = function () {
  return this.X;
};
$p.l = function () {
  return this.X > 0;
};
$p.j = function () {
  if (this.X > 0) {
    var r = this.bj.g(this.aA);
    this.aA = (1 + this.aA) | 0;
    this.X = (-1 + this.X) | 0;
    return r;
  } else {
    return $m_sc_Iterator$().Y.j();
  }
};
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $TypeData().i(
  $c_sc_IndexedSeqView$IndexedSeqViewIterator,
  "scala.collection.IndexedSeqView$IndexedSeqViewIterator",
  {
    av: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sc_Iterator$$anon$21() {
  this.aH = null;
  $ct_scm_ImmutableBuilder__sc_IterableOnce__(this, $m_sc_Iterator$().Y);
}
$p = $c_sc_Iterator$$anon$21.prototype = new $h_scm_ImmutableBuilder();
$p.constructor = $c_sc_Iterator$$anon$21;
/** @constructor */
function $h_sc_Iterator$$anon$21() {}
$h_sc_Iterator$$anon$21.prototype = $p;
$p.cE = function (elem) {
  this.aH = this.aH.bt(
    new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(
      () => new $c_sc_Iterator$$anon$20(elem)
    )
  );
  return this;
};
$p.E = function (elem) {
  return this.cE(elem);
};
var $d_sc_Iterator$$anon$21 = new $TypeData().i(
  $c_sc_Iterator$$anon$21,
  "scala.collection.Iterator$$anon$21",
  {
    bH: 1,
    cl: 1,
    R: 1,
    S: 1,
    U: 1,
    a0: 1,
  }
);
function $p_sci_ArraySeq$__emptyImpl__sci_ArraySeq$ofRef($thiz) {
  if (!$thiz.bS) {
    $thiz.bR = new $c_sci_ArraySeq$ofRef(new ($d_sr_Nothing$.r().C)(0));
    $thiz.bS = true;
  }
  return $thiz.bR;
}
/** @constructor */
function $c_sci_ArraySeq$() {
  this.bT = null;
  this.bR = null;
  this.bS = false;
  $n_sci_ArraySeq$ = this;
  this.bT = new $c_sc_ClassTagSeqFactory$AnySeqDelegate(this);
}
$p = $c_sci_ArraySeq$.prototype = new $h_O();
$p.constructor = $c_sci_ArraySeq$;
/** @constructor */
function $h_sci_ArraySeq$() {}
$h_sci_ArraySeq$.prototype = $p;
$p.cO = function (it, tag) {
  return it instanceof $c_sci_ArraySeq
    ? it
    : this.bB($m_s_Array$().cf(it, tag));
};
$p.cl = function (evidence$1) {
  return new $c_scm_Builder$$anon$1(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (b$2) =>
        this.bB(
          $f_sc_IterableOnceOps__toArray__s_reflect_ClassTag__O(b$2, evidence$1)
        )
    ),
    ($m_scm_ArrayBuffer$(), new $c_scm_ArrayBuffer$$anon$1())
  );
};
$p.bB = function (x) {
  if (x === null) {
    return null;
  }
  if (x instanceof $ac_O) {
    return new $c_sci_ArraySeq$ofRef(x);
  }
  if (x instanceof $ac_I) {
    return new $c_sci_ArraySeq$ofInt(x);
  }
  if (x instanceof $ac_D) {
    return new $c_sci_ArraySeq$ofDouble(x);
  }
  if (x instanceof $ac_J) {
    return new $c_sci_ArraySeq$ofLong(x);
  }
  if (x instanceof $ac_F) {
    return new $c_sci_ArraySeq$ofFloat(x);
  }
  if (x instanceof $ac_C) {
    return new $c_sci_ArraySeq$ofChar(x);
  }
  if (x instanceof $ac_B) {
    return new $c_sci_ArraySeq$ofByte(x);
  }
  if (x instanceof $ac_S) {
    return new $c_sci_ArraySeq$ofShort(x);
  }
  if (x instanceof $ac_Z) {
    return new $c_sci_ArraySeq$ofBoolean(x);
  }
  if ($isArrayOf_jl_Void(x, 1)) {
    return new $c_sci_ArraySeq$ofUnit(x);
  }
  throw new $c_s_MatchError(x);
};
$p.ce = function (it, evidence$1) {
  return this.cO(it, evidence$1);
};
var $d_sci_ArraySeq$ = new $TypeData().i(
  $c_sci_ArraySeq$,
  "scala.collection.immutable.ArraySeq$",
  {
    bN: 1,
    a: 1,
    at: 1,
    ar: 1,
    as: 1,
    aB: 1,
  }
);
var $n_sci_ArraySeq$;
function $m_sci_ArraySeq$() {
  if (!$n_sci_ArraySeq$) {
    $n_sci_ArraySeq$ = new $c_sci_ArraySeq$();
  }
  return $n_sci_ArraySeq$;
}
function $ct_scm_ArrayBuilder__($thiz) {
  $thiz.bW = 0;
  $thiz.bX = 0;
  return $thiz;
}
/** @constructor */
function $c_scm_ArrayBuilder() {
  this.bW = 0;
  this.bX = 0;
}
$p = $c_scm_ArrayBuilder.prototype = new $h_O();
$p.constructor = $c_scm_ArrayBuilder;
/** @constructor */
function $h_scm_ArrayBuilder() {}
$h_scm_ArrayBuilder.prototype = $p;
/** @constructor */
function $c_scm_ArraySeq$() {
  this.bZ = null;
  this.cv = null;
  $n_scm_ArraySeq$ = this;
  this.bZ = new $c_sc_ClassTagSeqFactory$AnySeqDelegate(this);
  this.cv = new $c_scm_ArraySeq$ofRef(new $ac_O(0));
}
$p = $c_scm_ArraySeq$.prototype = new $h_O();
$p.constructor = $c_scm_ArraySeq$;
/** @constructor */
function $h_scm_ArraySeq$() {}
$h_scm_ArraySeq$.prototype = $p;
$p.cP = function (it, evidence$1) {
  return this.cj($m_s_Array$().cf(it, evidence$1));
};
$p.cl = function (evidence$1) {
  return new $c_scm_Builder$$anon$1(
    new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(
      (x$2) => this.cj(x$2)
    ),
    new $c_scm_ArrayBuilder$generic(evidence$1.b9())
  );
};
$p.cj = function (x) {
  if (x === null) {
    return null;
  }
  if (x instanceof $ac_O) {
    return new $c_scm_ArraySeq$ofRef(x);
  }
  if (x instanceof $ac_I) {
    return new $c_scm_ArraySeq$ofInt(x);
  }
  if (x instanceof $ac_D) {
    return new $c_scm_ArraySeq$ofDouble(x);
  }
  if (x instanceof $ac_J) {
    return new $c_scm_ArraySeq$ofLong(x);
  }
  if (x instanceof $ac_F) {
    return new $c_scm_ArraySeq$ofFloat(x);
  }
  if (x instanceof $ac_C) {
    return new $c_scm_ArraySeq$ofChar(x);
  }
  if (x instanceof $ac_B) {
    return new $c_scm_ArraySeq$ofByte(x);
  }
  if (x instanceof $ac_S) {
    return new $c_scm_ArraySeq$ofShort(x);
  }
  if (x instanceof $ac_Z) {
    return new $c_scm_ArraySeq$ofBoolean(x);
  }
  if ($isArrayOf_jl_Void(x, 1)) {
    return new $c_scm_ArraySeq$ofUnit(x);
  }
  throw new $c_s_MatchError(x);
};
$p.ce = function (it, evidence$1) {
  return this.cP(it, evidence$1);
};
var $d_scm_ArraySeq$ = new $TypeData().i(
  $c_scm_ArraySeq$,
  "scala.collection.mutable.ArraySeq$",
  {
    c7: 1,
    a: 1,
    at: 1,
    ar: 1,
    as: 1,
    aB: 1,
  }
);
var $n_scm_ArraySeq$;
function $m_scm_ArraySeq$() {
  if (!$n_scm_ArraySeq$) {
    $n_scm_ArraySeq$ = new $c_scm_ArraySeq$();
  }
  return $n_scm_ArraySeq$;
}
function $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__(
  $thiz,
  _out,
  autoFlush,
  charset
) {
  $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, _out);
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_PrintStream() {}
$p = $c_Ljava_io_PrintStream.prototype = new $h_Ljava_io_FilterOutputStream();
$p.constructor = $c_Ljava_io_PrintStream;
/** @constructor */
function $h_Ljava_io_PrintStream() {}
$h_Ljava_io_PrintStream.prototype = $p;
function $f_sc_View__toString__T($thiz) {
  return $thiz.a0() + "(<not computed>)";
}
/** @constructor */
function $c_scm_ArrayBuilder$generic(elementClass) {
  this.bW = 0;
  this.bX = 0;
  this.am = null;
  this.bY = false;
  this.bm = null;
  this.am = elementClass;
  $ct_scm_ArrayBuilder__(this);
  this.bY = elementClass === $d_C.l();
  this.bm = [];
}
$p = $c_scm_ArrayBuilder$generic.prototype = new $h_scm_ArrayBuilder();
$p.constructor = $c_scm_ArrayBuilder$generic;
/** @constructor */
function $h_scm_ArrayBuilder$generic() {}
$h_scm_ArrayBuilder$generic.prototype = $p;
$p.ca = function (elem) {
  var unboxedElem = this.bY
    ? $uC(elem)
    : elem === null
    ? $m_scm_ArrayBuilder$().bz(this.am)
    : elem;
  this.bm.push(unboxedElem);
  return this;
};
$p.cy = function (xs) {
  var it = xs.e();
  while (it.l()) {
    this.ca(it.j());
  }
  return this;
};
$p.M = function () {
  return $m_scm_ArrayBuilder$().by(
    this.am === $d_V.l()
      ? $d_jl_Void.l()
      : this.am === $d_sr_Null$.l() || this.am === $d_sr_Nothing$.l()
      ? $d_O.l()
      : this.am,
    this.bm
  );
};
$p.o = function () {
  return "ArrayBuilder.generic";
};
$p.E = function (elem) {
  return this.ca(elem);
};
$p.D = function (elems) {
  return this.cy(elems);
};
var $d_scm_ArrayBuilder$generic = new $TypeData().i(
  $c_scm_ArrayBuilder$generic,
  "scala.collection.mutable.ArrayBuilder$generic",
  {
    c6: 1,
    c4: 1,
    R: 1,
    S: 1,
    U: 1,
    a0: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_CheckedIndexedSeqView$CheckedIterator(self, mutationCount) {
  this.bj = null;
  this.aA = 0;
  this.X = 0;
  this.c2 = null;
  this.c1 = 0;
  this.c2 = mutationCount;
  $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(this, self);
  this.c1 = mutationCount.aS() | 0;
}
$p = $c_scm_CheckedIndexedSeqView$CheckedIterator.prototype =
  new $h_sc_IndexedSeqView$IndexedSeqViewIterator();
$p.constructor = $c_scm_CheckedIndexedSeqView$CheckedIterator;
/** @constructor */
function $h_scm_CheckedIndexedSeqView$CheckedIterator() {}
$h_scm_CheckedIndexedSeqView$CheckedIterator.prototype = $p;
$p.l = function () {
  $m_scm_MutationTracker$().cc(
    this.c1,
    this.c2.aS() | 0,
    "mutation occurred during iteration"
  );
  return this.X > 0;
};
var $d_scm_CheckedIndexedSeqView$CheckedIterator = new $TypeData().i(
  $c_scm_CheckedIndexedSeqView$CheckedIterator,
  "scala.collection.mutable.CheckedIndexedSeqView$CheckedIterator",
  {
    ck: 1,
    av: 1,
    O: 1,
    b: 1,
    c: 1,
    Q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_s_reflect_ManifestFactory$ClassTypeManifest() {}
$p = $c_s_reflect_ManifestFactory$ClassTypeManifest.prototype = new $h_O();
$p.constructor = $c_s_reflect_ManifestFactory$ClassTypeManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$ClassTypeManifest() {}
$h_s_reflect_ManifestFactory$ClassTypeManifest.prototype = $p;
function $isArrayOf_sjs_js_JavaScriptException(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.cE
  );
}
function $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V($thiz, line) {
  if (typeof console !== "undefined") {
    if ($thiz.bC && !!!!console.error) {
      console.error(line);
    } else {
      console.log(line);
    }
  }
}
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream(isErr) {
  this.bC = false;
  this.ay = null;
  this.bC = isErr;
  $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__(
    this,
    new $c_jl_JSConsoleBasedPrintStream$DummyOutputStream(),
    false,
    null
  );
  this.ay = "";
}
$p = $c_jl_JSConsoleBasedPrintStream.prototype = new $h_Ljava_io_PrintStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream() {}
$h_jl_JSConsoleBasedPrintStream.prototype = $p;
$p.ci = function (s) {
  var rest = s;
  while (rest !== "") {
    var this$1 = rest;
    var nlPos = this$1.indexOf("\n") | 0;
    if (nlPos < 0) {
      this.ay = "" + this.ay + rest;
      rest = "";
    } else {
      var $x_1 = this.ay;
      var this$2 = rest;
      $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V(
        this,
        "" + $x_1 + this$2.substring(0, nlPos)
      );
      this.ay = "";
      var this$3 = rest;
      var beginIndex = (1 + nlPos) | 0;
      rest = this$3.substring(beginIndex);
    }
  }
};
var $d_jl_JSConsoleBasedPrintStream = new $TypeData().i(
  $c_jl_JSConsoleBasedPrintStream,
  "java.lang.JSConsoleBasedPrintStream",
  {
    b4: 1,
    aU: 1,
    aT: 1,
    ab: 1,
    a9: 1,
    ad: 1,
    aa: 1,
    ac: 1,
  }
);
/** @constructor */
function $c_Lpreact_lib1_EmptyModifier$() {}
$p = $c_Lpreact_lib1_EmptyModifier$.prototype = new $h_O();
$p.constructor = $c_Lpreact_lib1_EmptyModifier$;
/** @constructor */
function $h_Lpreact_lib1_EmptyModifier$() {}
$h_Lpreact_lib1_EmptyModifier$.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.i = function () {
  return 1489796900;
};
$p.o = function () {
  return "EmptyModifier";
};
$p.a4 = function () {
  return 0;
};
$p.U = function () {
  return "EmptyModifier";
};
$p.a5 = function (n) {
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
var $d_Lpreact_lib1_EmptyModifier$ = new $TypeData().i(
  $c_Lpreact_lib1_EmptyModifier$,
  "preact.lib1.EmptyModifier$",
  {
    bj: 1,
    a2: 1,
    d: 1,
    V: 1,
    a: 1,
    a7: 1,
    a8: 1,
    cq: 1,
  }
);
var $n_Lpreact_lib1_EmptyModifier$;
function $m_Lpreact_lib1_EmptyModifier$() {
  if (!$n_Lpreact_lib1_EmptyModifier$) {
    $n_Lpreact_lib1_EmptyModifier$ = new $c_Lpreact_lib1_EmptyModifier$();
  }
  return $n_Lpreact_lib1_EmptyModifier$;
}
function $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(
  $thiz,
  n,
  s
) {
  var s$tailLocal1 = s;
  var n$tailLocal1 = n;
  while (true) {
    if (n$tailLocal1 <= 0 || s$tailLocal1.B()) {
      return s$tailLocal1;
    } else {
      var n$tailLocal1$tmp1 = (-1 + n$tailLocal1) | 0;
      var s$tailLocal1$tmp1 = s$tailLocal1.N();
      n$tailLocal1 = n$tailLocal1$tmp1;
      s$tailLocal1 = s$tailLocal1$tmp1;
    }
  }
}
/** @constructor */
function $c_s_reflect_ManifestFactory$PhantomManifest() {
  this.aI = null;
}
$p = $c_s_reflect_ManifestFactory$PhantomManifest.prototype =
  new $h_s_reflect_ManifestFactory$ClassTypeManifest();
$p.constructor = $c_s_reflect_ManifestFactory$PhantomManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$PhantomManifest() {}
$h_s_reflect_ManifestFactory$PhantomManifest.prototype = $p;
$p.o = function () {
  return this.aI;
};
$p.i = function () {
  return $systemIdentityHashCode(this);
};
/** @constructor */
function $c_sc_AbstractView() {}
$p = $c_sc_AbstractView.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractView;
/** @constructor */
function $h_sc_AbstractView() {}
$h_sc_AbstractView.prototype = $p;
$p.o = function () {
  return $f_sc_View__toString__T(this);
};
/** @constructor */
function $c_s_reflect_ManifestFactory$AnyManifest$() {
  this.aI = null;
  this.aI = "Any";
  $m_sci_Nil$();
}
$p = $c_s_reflect_ManifestFactory$AnyManifest$.prototype =
  new $h_s_reflect_ManifestFactory$PhantomManifest();
$p.constructor = $c_s_reflect_ManifestFactory$AnyManifest$;
/** @constructor */
function $h_s_reflect_ManifestFactory$AnyManifest$() {}
$h_s_reflect_ManifestFactory$AnyManifest$.prototype = $p;
$p.b9 = function () {
  return $d_O.l();
};
$p.bx = function (len) {
  return new $ac_O(len);
};
var $d_s_reflect_ManifestFactory$AnyManifest$ = new $TypeData().i(
  $c_s_reflect_ManifestFactory$AnyManifest$,
  "scala.reflect.ManifestFactory$AnyManifest$",
  {
    cs: 1,
    aO: 1,
    aN: 1,
    a: 1,
    aP: 1,
    aK: 1,
    d: 1,
    aL: 1,
    aM: 1,
  }
);
var $n_s_reflect_ManifestFactory$AnyManifest$;
function $m_s_reflect_ManifestFactory$AnyManifest$() {
  if (!$n_s_reflect_ManifestFactory$AnyManifest$) {
    $n_s_reflect_ManifestFactory$AnyManifest$ =
      new $c_s_reflect_ManifestFactory$AnyManifest$();
  }
  return $n_s_reflect_ManifestFactory$AnyManifest$;
}
/** @constructor */
function $c_s_reflect_ManifestFactory$ObjectManifest$() {
  this.aI = null;
  this.aI = "Object";
  $m_sci_Nil$();
}
$p = $c_s_reflect_ManifestFactory$ObjectManifest$.prototype =
  new $h_s_reflect_ManifestFactory$PhantomManifest();
$p.constructor = $c_s_reflect_ManifestFactory$ObjectManifest$;
/** @constructor */
function $h_s_reflect_ManifestFactory$ObjectManifest$() {}
$h_s_reflect_ManifestFactory$ObjectManifest$.prototype = $p;
$p.b9 = function () {
  return $d_O.l();
};
$p.bx = function (len) {
  return new $ac_O(len);
};
var $d_s_reflect_ManifestFactory$ObjectManifest$ = new $TypeData().i(
  $c_s_reflect_ManifestFactory$ObjectManifest$,
  "scala.reflect.ManifestFactory$ObjectManifest$",
  {
    ct: 1,
    aO: 1,
    aN: 1,
    a: 1,
    aP: 1,
    aK: 1,
    d: 1,
    aL: 1,
    aM: 1,
  }
);
var $n_s_reflect_ManifestFactory$ObjectManifest$;
function $m_s_reflect_ManifestFactory$ObjectManifest$() {
  if (!$n_s_reflect_ManifestFactory$ObjectManifest$) {
    $n_s_reflect_ManifestFactory$ObjectManifest$ =
      new $c_s_reflect_ManifestFactory$ObjectManifest$();
  }
  return $n_s_reflect_ManifestFactory$ObjectManifest$;
}
/** @constructor */
function $c_sc_AbstractSeq() {}
$p = $c_sc_AbstractSeq.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractSeq;
/** @constructor */
function $h_sc_AbstractSeq() {}
$h_sc_AbstractSeq.prototype = $p;
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().cs(this);
};
$p.o = function () {
  return $f_sc_Iterable__toString__T(this);
};
/** @constructor */
function $c_sc_AbstractSeqView() {}
$p = $c_sc_AbstractSeqView.prototype = new $h_sc_AbstractView();
$p.constructor = $c_sc_AbstractSeqView;
/** @constructor */
function $h_sc_AbstractSeqView() {}
$h_sc_AbstractSeqView.prototype = $p;
function $is_sc_IndexedSeq(obj) {
  return !!(obj && obj.$classData && obj.$classData.n.n);
}
function $isArrayOf_sc_IndexedSeq(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.n
  );
}
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.b0 = underlying;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqView$Id() {
  this.b0 = null;
}
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {}
$h_sc_SeqView$Id.prototype = $p;
$p.g = function (idx) {
  return this.b0.g(idx);
};
$p.f = function () {
  return this.b0.f();
};
function $is_sci_Seq(obj) {
  return !!(obj && obj.$classData && obj.$classData.n.s);
}
function $isArrayOf_sci_Seq(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.s
  );
}
/** @constructor */
function $c_sc_AbstractIndexedSeqView() {}
$p = $c_sc_AbstractIndexedSeqView.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_AbstractIndexedSeqView;
/** @constructor */
function $h_sc_AbstractIndexedSeqView() {}
$h_sc_AbstractIndexedSeqView.prototype = $p;
$p.q = function () {
  return this.f();
};
$p.V = function () {
  return "IndexedSeqView";
};
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.b0 = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {}
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.q = function () {
  return this.f();
};
$p.e = function () {
  return $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(
    new $c_sc_IndexedSeqView$IndexedSeqViewIterator(),
    this
  );
};
$p.V = function () {
  return "IndexedSeqView";
};
var $d_sc_IndexedSeqView$Id = new $TypeData().i(
  $c_sc_IndexedSeqView$Id,
  "scala.collection.IndexedSeqView$Id",
  {
    bD: 1,
    bJ: 1,
    ap: 1,
    aq: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    a: 1,
    aD: 1,
    i: 1,
    aA: 1,
    o: 1,
    au: 1,
  }
);
/** @constructor */
function $c_sci_AbstractSeq() {}
$p = $c_sci_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_sci_AbstractSeq;
/** @constructor */
function $h_sci_AbstractSeq() {}
$h_sci_AbstractSeq.prototype = $p;
/** @constructor */
function $c_scm_ArrayBufferView(underlying, mutationCount) {
  this.bl = null;
  this.bV = null;
  this.bl = underlying;
  this.bV = mutationCount;
}
$p = $c_scm_ArrayBufferView.prototype = new $h_sc_AbstractIndexedSeqView();
$p.constructor = $c_scm_ArrayBufferView;
/** @constructor */
function $h_scm_ArrayBufferView() {}
$h_scm_ArrayBufferView.prototype = $p;
$p.g = function (n) {
  return this.bl.g(n);
};
$p.f = function () {
  return this.bl.t;
};
$p.a0 = function () {
  return "ArrayBufferView";
};
$p.e = function () {
  return new $c_scm_CheckedIndexedSeqView$CheckedIterator(this, this.bV);
};
var $d_scm_ArrayBufferView = new $TypeData().i(
  $c_scm_ArrayBufferView,
  "scala.collection.mutable.ArrayBufferView",
  {
    c3: 1,
    bz: 1,
    ap: 1,
    aq: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    a: 1,
    aD: 1,
    i: 1,
    aA: 1,
    o: 1,
    au: 1,
  }
);
/** @constructor */
function $c_scm_AbstractSeq() {}
$p = $c_scm_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_scm_AbstractSeq;
/** @constructor */
function $h_scm_AbstractSeq() {}
$h_scm_AbstractSeq.prototype = $p;
/** @constructor */
function $c_sjsr_WrappedVarArgs(array) {
  this.bo = null;
  this.bo = array;
}
$p = $c_sjsr_WrappedVarArgs.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs;
/** @constructor */
function $h_sjsr_WrappedVarArgs() {}
$h_sjsr_WrappedVarArgs.prototype = $p;
$p.bw = function (f) {
  return $f_sc_StrictOptimizedIterableOps__map__F1__O(this, f);
};
$p.e = function () {
  return $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(
    new $c_sc_IndexedSeqView$IndexedSeqViewIterator(),
    new $c_sc_IndexedSeqView$Id(this)
  );
};
$p.q = function () {
  return this.f();
};
$p.i = function () {
  return $m_s_util_hashing_MurmurHash3$().cs(this);
};
$p.o = function () {
  return $f_sc_Iterable__toString__T(this);
};
$p.aw = function (f) {
  $f_sc_IterableOnceOps__foreach__F1__V(this, f);
};
$p.a1 = function (dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
};
$p.av = function (b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(
    this,
    b,
    start,
    sep,
    end
  );
};
$p.f = function () {
  return this.bo.length | 0;
};
$p.g = function (idx) {
  return this.bo[idx];
};
$p.a0 = function () {
  return "WrappedVarArgs";
};
$p.d = function (v1) {
  return this.g(v1 | 0);
};
$p.aa = function () {
  return $m_sjsr_WrappedVarArgs$();
};
var $d_sjsr_WrappedVarArgs = new $TypeData().i(
  $c_sjsr_WrappedVarArgs,
  "scala.scalajs.runtime.WrappedVarArgs",
  {
    cH: 1,
    I: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    y: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    A: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_AbstractBuffer() {}
$p = $c_scm_AbstractBuffer.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_AbstractBuffer;
/** @constructor */
function $h_scm_AbstractBuffer() {}
$h_scm_AbstractBuffer.prototype = $p;
$p.D = function (elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
};
/** @constructor */
function $c_sci_ArraySeq() {}
$p = $c_sci_ArraySeq.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_ArraySeq;
/** @constructor */
function $h_sci_ArraySeq() {}
$h_sci_ArraySeq.prototype = $p;
$p.q = function () {
  return this.f();
};
$p.V = function () {
  return "IndexedSeq";
};
$p.cY = function (f) {
  var a = new $ac_O(this.f());
  var i = 0;
  while (i < a.a.length) {
    a.a[i] = f.d(this.g(i));
    i = (1 + i) | 0;
  }
  return $m_sci_ArraySeq$().bB(a);
};
$p.a0 = function () {
  return "ArraySeq";
};
$p.a1 = function (xs, start, len) {
  var srcLen = this.f();
  var destLen = $m_jl_reflect_Array$().a3(xs);
  var limit = len < srcLen ? len : srcLen;
  var capacity = start < 0 ? destLen : (destLen - start) | 0;
  var total = capacity < limit ? capacity : limit;
  var copied = total < 0 ? 0 : total;
  if (copied > 0) {
    $m_s_Array$().b6(this.O(), 0, xs, start, copied);
  }
  return copied;
};
$p.aa = function () {
  return $m_sci_ArraySeq$().bT;
};
$p.bw = function (f) {
  return this.cY(f);
};
function $isArrayOf_sci_ArraySeq(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.H
  );
}
/** @constructor */
function $c_scm_ArraySeq() {}
$p = $c_scm_ArraySeq.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_ArraySeq;
/** @constructor */
function $h_scm_ArraySeq() {}
$h_scm_ArraySeq.prototype = $p;
$p.q = function () {
  return this.f();
};
$p.V = function () {
  return "IndexedSeq";
};
$p.a0 = function () {
  return "ArraySeq";
};
$p.a1 = function (xs, start, len) {
  var srcLen = this.f();
  var destLen = $m_jl_reflect_Array$().a3(xs);
  var limit = len < srcLen ? len : srcLen;
  var capacity = start < 0 ? destLen : (destLen - start) | 0;
  var total = capacity < limit ? capacity : limit;
  var copied = total < 0 ? 0 : total;
  if (copied > 0) {
    $m_s_Array$().b6(this.I(), 0, xs, start, copied);
  }
  return copied;
};
$p.aa = function () {
  return $m_scm_ArraySeq$().bZ;
};
/** @constructor */
function $c_sci_ArraySeq$ofBoolean(unsafeArray) {
  this.ad = null;
  this.ad = unsafeArray;
}
$p = $c_sci_ArraySeq$ofBoolean.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofBoolean;
/** @constructor */
function $h_sci_ArraySeq$ofBoolean() {}
$h_sci_ArraySeq$ofBoolean.prototype = $p;
$p.f = function () {
  return this.ad.a.length;
};
$p.aR = function (i) {
  return this.ad.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ad, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ad);
};
$p.O = function () {
  return this.ad;
};
$p.g = function (i) {
  return this.aR(i);
};
$p.d = function (v1) {
  return this.aR(v1 | 0);
};
var $d_sci_ArraySeq$ofBoolean = new $TypeData().i(
  $c_sci_ArraySeq$ofBoolean,
  "scala.collection.immutable.ArraySeq$ofBoolean",
  {
    bO: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofByte(unsafeArray) {
  this.ae = null;
  this.ae = unsafeArray;
}
$p = $c_sci_ArraySeq$ofByte.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofByte;
/** @constructor */
function $h_sci_ArraySeq$ofByte() {}
$h_sci_ArraySeq$ofByte.prototype = $p;
$p.f = function () {
  return this.ae.a.length;
};
$p.aJ = function (i) {
  return this.ae.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ae, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ae);
};
$p.O = function () {
  return this.ae;
};
$p.g = function (i) {
  return this.aJ(i);
};
$p.d = function (v1) {
  return this.aJ(v1 | 0);
};
var $d_sci_ArraySeq$ofByte = new $TypeData().i(
  $c_sci_ArraySeq$ofByte,
  "scala.collection.immutable.ArraySeq$ofByte",
  {
    bP: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofChar(unsafeArray) {
  this.a7 = null;
  this.a7 = unsafeArray;
}
$p = $c_sci_ArraySeq$ofChar.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofChar;
/** @constructor */
function $h_sci_ArraySeq$ofChar() {}
$h_sci_ArraySeq$ofChar.prototype = $p;
$p.f = function () {
  return this.a7.a.length;
};
$p.aK = function (i) {
  return this.a7.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.a7, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.a7);
};
$p.av = function (sb, start, sep, end) {
  return new $c_scm_ArraySeq$ofChar(this.a7).av(sb, start, sep, end);
};
$p.O = function () {
  return this.a7;
};
$p.g = function (i) {
  return $bC(this.aK(i));
};
$p.d = function (v1) {
  return $bC(this.aK(v1 | 0));
};
var $d_sci_ArraySeq$ofChar = new $TypeData().i(
  $c_sci_ArraySeq$ofChar,
  "scala.collection.immutable.ArraySeq$ofChar",
  {
    bQ: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofDouble(unsafeArray) {
  this.af = null;
  this.af = unsafeArray;
}
$p = $c_sci_ArraySeq$ofDouble.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofDouble;
/** @constructor */
function $h_sci_ArraySeq$ofDouble() {}
$h_sci_ArraySeq$ofDouble.prototype = $p;
$p.f = function () {
  return this.af.a.length;
};
$p.aL = function (i) {
  return this.af.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.af, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.af);
};
$p.O = function () {
  return this.af;
};
$p.g = function (i) {
  return this.aL(i);
};
$p.d = function (v1) {
  return this.aL(v1 | 0);
};
var $d_sci_ArraySeq$ofDouble = new $TypeData().i(
  $c_sci_ArraySeq$ofDouble,
  "scala.collection.immutable.ArraySeq$ofDouble",
  {
    bR: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofFloat(unsafeArray) {
  this.ag = null;
  this.ag = unsafeArray;
}
$p = $c_sci_ArraySeq$ofFloat.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofFloat;
/** @constructor */
function $h_sci_ArraySeq$ofFloat() {}
$h_sci_ArraySeq$ofFloat.prototype = $p;
$p.f = function () {
  return this.ag.a.length;
};
$p.aM = function (i) {
  return this.ag.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ag, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ag);
};
$p.O = function () {
  return this.ag;
};
$p.g = function (i) {
  return this.aM(i);
};
$p.d = function (v1) {
  return this.aM(v1 | 0);
};
var $d_sci_ArraySeq$ofFloat = new $TypeData().i(
  $c_sci_ArraySeq$ofFloat,
  "scala.collection.immutable.ArraySeq$ofFloat",
  {
    bS: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofInt(unsafeArray) {
  this.ah = null;
  this.ah = unsafeArray;
}
$p = $c_sci_ArraySeq$ofInt.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofInt;
/** @constructor */
function $h_sci_ArraySeq$ofInt() {}
$h_sci_ArraySeq$ofInt.prototype = $p;
$p.f = function () {
  return this.ah.a.length;
};
$p.aN = function (i) {
  return this.ah.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ah, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ah);
};
$p.O = function () {
  return this.ah;
};
$p.g = function (i) {
  return this.aN(i);
};
$p.d = function (v1) {
  return this.aN(v1 | 0);
};
var $d_sci_ArraySeq$ofInt = new $TypeData().i(
  $c_sci_ArraySeq$ofInt,
  "scala.collection.immutable.ArraySeq$ofInt",
  {
    bT: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofLong(unsafeArray) {
  this.ai = null;
  this.ai = unsafeArray;
}
$p = $c_sci_ArraySeq$ofLong.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofLong;
/** @constructor */
function $h_sci_ArraySeq$ofLong() {}
$h_sci_ArraySeq$ofLong.prototype = $p;
$p.f = function () {
  return this.ai.a.length;
};
$p.aO = function (i) {
  return this.ai.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ai, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ai);
};
$p.O = function () {
  return this.ai;
};
$p.g = function (i) {
  return this.aO(i);
};
$p.d = function (v1) {
  return this.aO(v1 | 0);
};
var $d_sci_ArraySeq$ofLong = new $TypeData().i(
  $c_sci_ArraySeq$ofLong,
  "scala.collection.immutable.ArraySeq$ofLong",
  {
    bU: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofRef(unsafeArray) {
  this.aj = null;
  this.aj = unsafeArray;
}
$p = $c_sci_ArraySeq$ofRef.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofRef;
/** @constructor */
function $h_sci_ArraySeq$ofRef() {}
$h_sci_ArraySeq$ofRef.prototype = $p;
$p.f = function () {
  return this.aj.a.length;
};
$p.g = function (i) {
  return this.aj.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.aj, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.aj);
};
$p.O = function () {
  return this.aj;
};
$p.d = function (v1) {
  return this.g(v1 | 0);
};
var $d_sci_ArraySeq$ofRef = new $TypeData().i(
  $c_sci_ArraySeq$ofRef,
  "scala.collection.immutable.ArraySeq$ofRef",
  {
    bV: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofShort(unsafeArray) {
  this.ak = null;
  this.ak = unsafeArray;
}
$p = $c_sci_ArraySeq$ofShort.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofShort;
/** @constructor */
function $h_sci_ArraySeq$ofShort() {}
$h_sci_ArraySeq$ofShort.prototype = $p;
$p.f = function () {
  return this.ak.a.length;
};
$p.aP = function (i) {
  return this.ak.a[i];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ak, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ak);
};
$p.O = function () {
  return this.ak;
};
$p.g = function (i) {
  return this.aP(i);
};
$p.d = function (v1) {
  return this.aP(v1 | 0);
};
var $d_sci_ArraySeq$ofShort = new $TypeData().i(
  $c_sci_ArraySeq$ofShort,
  "scala.collection.immutable.ArraySeq$ofShort",
  {
    bW: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_ArraySeq$ofUnit(unsafeArray) {
  this.aE = null;
  this.aE = unsafeArray;
}
$p = $c_sci_ArraySeq$ofUnit.prototype = new $h_sci_ArraySeq();
$p.constructor = $c_sci_ArraySeq$ofUnit;
/** @constructor */
function $h_sci_ArraySeq$ofUnit() {}
$h_sci_ArraySeq$ofUnit.prototype = $p;
$p.f = function () {
  return this.aE.a.length;
};
$p.aQ = function (i) {};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.aE, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.aE);
};
$p.O = function () {
  return this.aE;
};
$p.g = function (i) {
  this.aQ(i);
};
$p.d = function (v1) {
  this.aQ(v1 | 0);
};
var $d_sci_ArraySeq$ofUnit = new $TypeData().i(
  $c_sci_ArraySeq$ofUnit,
  "scala.collection.immutable.ArraySeq$ofUnit",
  {
    bX: 1,
    H: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    o: 1,
    n: 1,
    J: 1,
    I: 1,
    p: 1,
    q: 1,
    A: 1,
    L: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_List() {}
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {}
$h_sci_List.prototype = $p;
$p.g = function (n) {
  return $f_sc_LinearSeqOps__apply__I__O(this, n);
};
$p.V = function () {
  return "LinearSeq";
};
$p.e = function () {
  return new $c_sc_StrictOptimizedLinearSeqOps$$anon$1(this);
};
$p.cx = function (prefix) {
  if (this.B()) {
    return prefix;
  } else if (prefix.B()) {
    return this;
  } else {
    var result = new $c_sci_$colon$colon(prefix.T(), this);
    var curr = result;
    var that = prefix.N();
    while (!that.B()) {
      var temp = new $c_sci_$colon$colon(that.T(), this);
      curr.P = temp;
      curr = temp;
      that = that.N();
    }
    return result;
  }
};
$p.B = function () {
  return this === $m_sci_Nil$();
};
$p.d3 = function (prefix) {
  if (prefix instanceof $c_sci_List) {
    return this.cx(prefix);
  }
  if (prefix.q() === 0) {
    return this;
  }
  if (prefix instanceof $c_scm_ListBuffer) {
    if (this.B()) {
      return prefix.ct();
    }
  }
  var iter = prefix.e();
  if (iter.l()) {
    var result = new $c_sci_$colon$colon(iter.j(), this);
    var curr = result;
    while (iter.l()) {
      var temp = new $c_sci_$colon$colon(iter.j(), this);
      curr.P = temp;
      curr = temp;
    }
    return result;
  } else {
    return this;
  }
};
$p.cZ = function (f) {
  if (this === $m_sci_Nil$()) {
    var $x_1 = $m_sci_Nil$();
  } else {
    var h = new $c_sci_$colon$colon(f.d(this.T()), $m_sci_Nil$());
    var t = h;
    var rest = this.N();
    while (rest !== $m_sci_Nil$()) {
      var nx = new $c_sci_$colon$colon(f.d(rest.T()), $m_sci_Nil$());
      t.P = nx;
      t = nx;
      rest = rest.N();
    }
    var $x_1 = h;
  }
  return $x_1;
};
$p.aw = function (f) {
  var these = this;
  while (!these.B()) {
    f.d(these.T());
    these = these.N();
  }
};
$p.f = function () {
  var these = this;
  var len = 0;
  while (!these.B()) {
    len = (1 + len) | 0;
    these = these.N();
  }
  return len;
};
$p.a0 = function () {
  return "List";
};
$p.aa = function () {
  return $m_sci_List$();
};
$p.bw = function (f) {
  return this.cZ(f);
};
$p.cM = function (n) {
  return $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(
    this,
    n,
    this
  );
};
$p.d = function (v1) {
  return $f_sc_LinearSeqOps__apply__I__O(this, v1 | 0);
};
function $isArrayOf_sci_List(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.a3
  );
}
/** @constructor */
function $c_scm_ArraySeq$ofBoolean(array) {
  this.an = null;
  this.an = array;
}
$p = $c_scm_ArraySeq$ofBoolean.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofBoolean;
/** @constructor */
function $h_scm_ArraySeq$ofBoolean() {}
$h_scm_ArraySeq$ofBoolean.prototype = $p;
$p.f = function () {
  return this.an.a.length;
};
$p.aR = function (index) {
  return this.an.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.an, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.an);
};
$p.I = function () {
  return this.an;
};
$p.g = function (i) {
  return this.aR(i);
};
$p.d = function (v1) {
  return this.aR(v1 | 0);
};
var $d_scm_ArraySeq$ofBoolean = new $TypeData().i(
  $c_scm_ArraySeq$ofBoolean,
  "scala.collection.mutable.ArraySeq$ofBoolean",
  {
    c8: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofByte(array) {
  this.ao = null;
  this.ao = array;
}
$p = $c_scm_ArraySeq$ofByte.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofByte;
/** @constructor */
function $h_scm_ArraySeq$ofByte() {}
$h_scm_ArraySeq$ofByte.prototype = $p;
$p.f = function () {
  return this.ao.a.length;
};
$p.aJ = function (index) {
  return this.ao.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ao, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ao);
};
$p.I = function () {
  return this.ao;
};
$p.g = function (i) {
  return this.aJ(i);
};
$p.d = function (v1) {
  return this.aJ(v1 | 0);
};
var $d_scm_ArraySeq$ofByte = new $TypeData().i(
  $c_scm_ArraySeq$ofByte,
  "scala.collection.mutable.ArraySeq$ofByte",
  {
    c9: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofChar(array) {
  this.G = null;
  this.G = array;
}
$p = $c_scm_ArraySeq$ofChar.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofChar;
/** @constructor */
function $h_scm_ArraySeq$ofChar() {}
$h_scm_ArraySeq$ofChar.prototype = $p;
$p.f = function () {
  return this.G.a.length;
};
$p.aK = function (index) {
  return this.G.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.G, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.G);
};
$p.av = function (sb, start, sep, end) {
  var jsb = sb.C;
  if (start.length !== 0) {
    jsb.k = "" + jsb.k + start;
  }
  var len = this.G.a.length;
  if (len !== 0) {
    if (sep === "") {
      jsb.cI(this.G);
    } else {
      jsb.f();
      var c = this.G.a[0];
      var str = "" + $cToS(c);
      jsb.k = jsb.k + str;
      var i = 1;
      while (i < len) {
        jsb.k = "" + jsb.k + sep;
        var c$1 = this.G.a[i];
        var str$1 = "" + $cToS(c$1);
        jsb.k = jsb.k + str$1;
        i = (1 + i) | 0;
      }
    }
  }
  if (end.length !== 0) {
    jsb.k = "" + jsb.k + end;
  }
  return sb;
};
$p.I = function () {
  return this.G;
};
$p.g = function (i) {
  return $bC(this.aK(i));
};
$p.d = function (v1) {
  return $bC(this.aK(v1 | 0));
};
var $d_scm_ArraySeq$ofChar = new $TypeData().i(
  $c_scm_ArraySeq$ofChar,
  "scala.collection.mutable.ArraySeq$ofChar",
  {
    ca: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofDouble(array) {
  this.ap = null;
  this.ap = array;
}
$p = $c_scm_ArraySeq$ofDouble.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofDouble;
/** @constructor */
function $h_scm_ArraySeq$ofDouble() {}
$h_scm_ArraySeq$ofDouble.prototype = $p;
$p.f = function () {
  return this.ap.a.length;
};
$p.aL = function (index) {
  return this.ap.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ap, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ap);
};
$p.I = function () {
  return this.ap;
};
$p.g = function (i) {
  return this.aL(i);
};
$p.d = function (v1) {
  return this.aL(v1 | 0);
};
var $d_scm_ArraySeq$ofDouble = new $TypeData().i(
  $c_scm_ArraySeq$ofDouble,
  "scala.collection.mutable.ArraySeq$ofDouble",
  {
    cb: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofFloat(array) {
  this.aq = null;
  this.aq = array;
}
$p = $c_scm_ArraySeq$ofFloat.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofFloat;
/** @constructor */
function $h_scm_ArraySeq$ofFloat() {}
$h_scm_ArraySeq$ofFloat.prototype = $p;
$p.f = function () {
  return this.aq.a.length;
};
$p.aM = function (index) {
  return this.aq.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.aq, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.aq);
};
$p.I = function () {
  return this.aq;
};
$p.g = function (i) {
  return this.aM(i);
};
$p.d = function (v1) {
  return this.aM(v1 | 0);
};
var $d_scm_ArraySeq$ofFloat = new $TypeData().i(
  $c_scm_ArraySeq$ofFloat,
  "scala.collection.mutable.ArraySeq$ofFloat",
  {
    cc: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofInt(array) {
  this.ar = null;
  this.ar = array;
}
$p = $c_scm_ArraySeq$ofInt.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofInt;
/** @constructor */
function $h_scm_ArraySeq$ofInt() {}
$h_scm_ArraySeq$ofInt.prototype = $p;
$p.f = function () {
  return this.ar.a.length;
};
$p.aN = function (index) {
  return this.ar.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.ar, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.ar);
};
$p.I = function () {
  return this.ar;
};
$p.g = function (i) {
  return this.aN(i);
};
$p.d = function (v1) {
  return this.aN(v1 | 0);
};
var $d_scm_ArraySeq$ofInt = new $TypeData().i(
  $c_scm_ArraySeq$ofInt,
  "scala.collection.mutable.ArraySeq$ofInt",
  {
    cd: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofLong(array) {
  this.as = null;
  this.as = array;
}
$p = $c_scm_ArraySeq$ofLong.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofLong;
/** @constructor */
function $h_scm_ArraySeq$ofLong() {}
$h_scm_ArraySeq$ofLong.prototype = $p;
$p.f = function () {
  return this.as.a.length;
};
$p.aO = function (index) {
  return this.as.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.as, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.as);
};
$p.I = function () {
  return this.as;
};
$p.g = function (i) {
  return this.aO(i);
};
$p.d = function (v1) {
  return this.aO(v1 | 0);
};
var $d_scm_ArraySeq$ofLong = new $TypeData().i(
  $c_scm_ArraySeq$ofLong,
  "scala.collection.mutable.ArraySeq$ofLong",
  {
    ce: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofRef(array) {
  this.at = null;
  this.at = array;
}
$p = $c_scm_ArraySeq$ofRef.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofRef;
/** @constructor */
function $h_scm_ArraySeq$ofRef() {}
$h_scm_ArraySeq$ofRef.prototype = $p;
$p.f = function () {
  return this.at.a.length;
};
$p.g = function (index) {
  return this.at.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.at, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.at);
};
$p.I = function () {
  return this.at;
};
$p.d = function (v1) {
  return this.g(v1 | 0);
};
var $d_scm_ArraySeq$ofRef = new $TypeData().i(
  $c_scm_ArraySeq$ofRef,
  "scala.collection.mutable.ArraySeq$ofRef",
  {
    cf: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofShort(array) {
  this.au = null;
  this.au = array;
}
$p = $c_scm_ArraySeq$ofShort.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofShort;
/** @constructor */
function $h_scm_ArraySeq$ofShort() {}
$h_scm_ArraySeq$ofShort.prototype = $p;
$p.f = function () {
  return this.au.a.length;
};
$p.aP = function (index) {
  return this.au.a[index];
};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.au, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.au);
};
$p.I = function () {
  return this.au;
};
$p.g = function (i) {
  return this.aP(i);
};
$p.d = function (v1) {
  return this.aP(v1 | 0);
};
var $d_scm_ArraySeq$ofShort = new $TypeData().i(
  $c_scm_ArraySeq$ofShort,
  "scala.collection.mutable.ArraySeq$ofShort",
  {
    cg: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_scm_ArraySeq$ofUnit(array) {
  this.aF = null;
  this.aF = array;
}
$p = $c_scm_ArraySeq$ofUnit.prototype = new $h_scm_ArraySeq();
$p.constructor = $c_scm_ArraySeq$ofUnit;
/** @constructor */
function $h_scm_ArraySeq$ofUnit() {}
$h_scm_ArraySeq$ofUnit.prototype = $p;
$p.f = function () {
  return this.aF.a.length;
};
$p.aQ = function (index) {};
$p.i = function () {
  var this$1 = $m_s_util_hashing_MurmurHash3$();
  return this$1.r(this.aF, this$1.n);
};
$p.e = function () {
  return new $c_sc_ArrayOps$ArrayIterator(this.aF);
};
$p.I = function () {
  return this.aF;
};
$p.g = function (i) {
  this.aQ(i);
};
$p.d = function (v1) {
  this.aQ(v1 | 0);
};
var $d_scm_ArraySeq$ofUnit = new $TypeData().i(
  $c_scm_ArraySeq$ofUnit,
  "scala.collection.mutable.ArraySeq$ofUnit",
  {
    ch: 1,
    M: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    p: 1,
    q: 1,
    a: 1,
  }
);
/** @constructor */
function $c_sci_$colon$colon(head, next) {
  this.bk = null;
  this.P = null;
  this.bk = head;
  this.P = next;
}
$p = $c_sci_$colon$colon.prototype = new $h_sci_List();
$p.constructor = $c_sci_$colon$colon;
/** @constructor */
function $h_sci_$colon$colon() {}
$h_sci_$colon$colon.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.a4 = function () {
  return 2;
};
$p.U = function () {
  return "::";
};
$p.a5 = function (n) {
  if (n === 0) {
    return this.bk;
  }
  if (n === 1) {
    return this.P;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
$p.T = function () {
  return this.bk;
};
$p.N = function () {
  return this.P;
};
var $d_sci_$colon$colon = new $TypeData().i(
  $c_sci_$colon$colon,
  "scala.collection.immutable.$colon$colon",
  {
    bM: 1,
    a3: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    ay: 1,
    ax: 1,
    aF: 1,
    aE: 1,
    p: 1,
    q: 1,
    aC: 1,
    A: 1,
    a: 1,
    Z: 1,
    V: 1,
  }
);
/** @constructor */
function $c_sci_Nil$() {
  $n_sci_Nil$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
$p = $c_sci_Nil$.prototype = new $h_sci_List();
$p.constructor = $c_sci_Nil$;
/** @constructor */
function $h_sci_Nil$() {}
$h_sci_Nil$.prototype = $p;
$p.ab = function () {
  return new $c_s_Product$$anon$1(this);
};
$p.a4 = function () {
  return 0;
};
$p.U = function () {
  return "Nil";
};
$p.a5 = function (n) {
  throw $ct_jl_IndexOutOfBoundsException__T__(
    new $c_jl_IndexOutOfBoundsException(),
    "" + n
  );
};
$p.cS = function () {
  throw new $c_ju_NoSuchElementException("head of empty list");
};
$p.da = function () {
  throw new $c_jl_UnsupportedOperationException("tail of empty list");
};
$p.q = function () {
  return 0;
};
$p.e = function () {
  return $m_sc_Iterator$().Y;
};
$p.T = function () {
  this.cS();
};
$p.N = function () {
  this.da();
};
var $d_sci_Nil$ = new $TypeData().i(
  $c_sci_Nil$,
  "scala.collection.immutable.Nil$",
  {
    bZ: 1,
    a3: 1,
    E: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    y: 1,
    z: 1,
    s: 1,
    ay: 1,
    ax: 1,
    aF: 1,
    aE: 1,
    p: 1,
    q: 1,
    aC: 1,
    A: 1,
    a: 1,
    Z: 1,
    V: 1,
  }
);
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if (!$n_sci_Nil$) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.C = underlying;
  return $thiz;
}
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, new $c_jl_StringBuilder());
  return $thiz;
}
/** @constructor */
function $c_scm_StringBuilder() {
  this.C = null;
}
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {}
$h_scm_StringBuilder.prototype = $p;
$p.D = function (elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
};
$p.e = function () {
  return $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(
    new $c_sc_IndexedSeqView$IndexedSeqViewIterator(),
    new $c_sc_IndexedSeqView$Id(this)
  );
};
$p.V = function () {
  return "IndexedSeq";
};
$p.f = function () {
  return this.C.f();
};
$p.q = function () {
  return this.C.f();
};
$p.cD = function (x) {
  var this$1 = this.C;
  var str = "" + $cToS(x);
  this$1.k = this$1.k + str;
  return this;
};
$p.o = function () {
  return this.C.k;
};
$p.g = function (i) {
  return $bC(this.C.cb(i));
};
$p.d = function (v1) {
  var i = v1 | 0;
  return $bC(this.C.cb(i));
};
$p.E = function (elem) {
  return this.cD($uC(elem));
};
$p.M = function () {
  return this.C.k;
};
var $d_scm_StringBuilder = new $TypeData().i(
  $c_scm_StringBuilder,
  "scala.collection.mutable.StringBuilder",
  {
    cp: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    R: 1,
    S: 1,
    U: 1,
    a0: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    a1: 1,
    a: 1,
  }
);
function $p_scm_ListBuffer__copyElems__V($thiz) {
  var buf = new $c_scm_ListBuffer().bA($thiz);
  $thiz.y = buf.y;
  $thiz.R = buf.R;
  $thiz.b2 = false;
}
function $p_scm_ListBuffer__ensureUnaliased__V($thiz) {
  $thiz.b3 = (1 + $thiz.b3) | 0;
  if ($thiz.b2) {
    $p_scm_ListBuffer__copyElems__V($thiz);
  }
}
/** @constructor */
function $c_scm_ListBuffer() {
  this.b3 = 0;
  this.y = null;
  this.R = null;
  this.b2 = false;
  this.z = 0;
  this.b3 = 0;
  this.y = $m_sci_Nil$();
  this.R = null;
  this.b2 = false;
  this.z = 0;
}
$p = $c_scm_ListBuffer.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_scm_ListBuffer;
/** @constructor */
function $h_scm_ListBuffer() {}
$h_scm_ListBuffer.prototype = $p;
$p.e = function () {
  return new $c_scm_MutationTracker$CheckedIterator(
    this.y.e(),
    new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(
      () => this.b3
    )
  );
};
$p.g = function (i) {
  return $f_sc_LinearSeqOps__apply__I__O(this.y, i);
};
$p.f = function () {
  return this.z;
};
$p.q = function () {
  return this.z;
};
$p.B = function () {
  return this.z === 0;
};
$p.ct = function () {
  this.b2 = !this.B();
  return this.y;
};
$p.cH = function (elem) {
  $p_scm_ListBuffer__ensureUnaliased__V(this);
  var last1 = new $c_sci_$colon$colon(elem, $m_sci_Nil$());
  if (this.z === 0) {
    this.y = last1;
  } else {
    var x$proxy2 = this.R;
    if (x$proxy2 === null) {
      $m_sr_Scala3RunTime$().ax();
    }
    x$proxy2.P = last1;
  }
  this.R = last1;
  this.z = (1 + this.z) | 0;
  return this;
};
$p.bA = function (xs) {
  var it = xs.e();
  if (it.l()) {
    var len = 1;
    var last0 = new $c_sci_$colon$colon(it.j(), $m_sci_Nil$());
    this.y = last0;
    while (it.l()) {
      var last1 = new $c_sci_$colon$colon(it.j(), $m_sci_Nil$());
      last0.P = last1;
      last0 = last1;
      len = (1 + len) | 0;
    }
    this.z = len;
    this.R = last0;
  }
  return this;
};
$p.cB = function (xs) {
  var it = xs.e();
  if (it.l()) {
    var fresh = new $c_scm_ListBuffer().bA(it);
    $p_scm_ListBuffer__ensureUnaliased__V(this);
    if (this.z === 0) {
      this.y = fresh.y;
    } else {
      var x$proxy3 = this.R;
      if (x$proxy3 === null) {
        $m_sr_Scala3RunTime$().ax();
      }
      x$proxy3.P = fresh.y;
    }
    this.R = fresh.R;
    this.z = (this.z + fresh.z) | 0;
  }
  return this;
};
$p.V = function () {
  return "ListBuffer";
};
$p.aa = function () {
  return $m_scm_ListBuffer$();
};
$p.d = function (v1) {
  var i = v1 | 0;
  return $f_sc_LinearSeqOps__apply__I__O(this.y, i);
};
$p.M = function () {
  return this.ct();
};
$p.E = function (elem) {
  return this.cH(elem);
};
$p.D = function (elems) {
  return this.cB(elems);
};
function $isArrayOf_scm_ListBuffer(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.aJ
  );
}
var $d_scm_ListBuffer = new $TypeData().i(
  $c_scm_ListBuffer,
  "scala.collection.mutable.ListBuffer",
  {
    aJ: 1,
    a4: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    R: 1,
    S: 1,
    a6: 1,
    a5: 1,
    p: 1,
    q: 1,
    U: 1,
    a0: 1,
    a: 1,
    Z: 1,
  }
);
function $ct_scm_ArrayBuffer__AO__I__($thiz, initialElements, initialSize) {
  $thiz.al = 0;
  $thiz.Q = initialElements;
  $thiz.t = initialSize;
  return $thiz;
}
function $ct_scm_ArrayBuffer__($thiz) {
  $ct_scm_ArrayBuffer__AO__I__($thiz, new $ac_O(16), 0);
  return $thiz;
}
/** @constructor */
function $c_scm_ArrayBuffer() {
  this.al = 0;
  this.Q = null;
  this.t = 0;
}
$p = $c_scm_ArrayBuffer.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_scm_ArrayBuffer;
/** @constructor */
function $h_scm_ArrayBuffer() {}
$h_scm_ArrayBuffer.prototype = $p;
$p.e = function () {
  return this.dc().e();
};
$p.q = function () {
  return this.t;
};
$p.cd = function (n) {
  this.Q = $m_scm_ArrayBuffer$().cr(this.Q, this.t, n);
};
$p.g = function (n) {
  var hi = (1 + n) | 0;
  if (n < 0) {
    throw $m_scg_CommonErrors$().ch(n, (-1 + this.t) | 0);
  }
  if (hi > this.t) {
    throw $m_scg_CommonErrors$().ch((-1 + hi) | 0, (-1 + this.t) | 0);
  }
  return this.Q.a[n];
};
$p.f = function () {
  return this.t;
};
$p.dc = function () {
  return new $c_scm_ArrayBufferView(
    this,
    new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(
      () => this.al
    )
  );
};
$p.c9 = function (elem) {
  this.al = (1 + this.al) | 0;
  var newSize = (1 + this.t) | 0;
  if (this.Q.a.length <= ((-1 + newSize) | 0)) {
    this.cd(newSize);
  }
  this.t = newSize;
  this.Q.a[(-1 + newSize) | 0] = elem;
  return this;
};
$p.c8 = function (elems) {
  if (elems instanceof $c_scm_ArrayBuffer) {
    var elemsLength = elems.t;
    if (elemsLength > 0) {
      this.al = (1 + this.al) | 0;
      this.cd((this.t + elemsLength) | 0);
      $m_s_Array$().b6(elems.Q, 0, this.Q, this.t, elemsLength);
      this.t = (this.t + elemsLength) | 0;
    }
  } else {
    $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
  }
  return this;
};
$p.V = function () {
  return "ArrayBuffer";
};
$p.a1 = function (xs, start, len) {
  var srcLen = this.t;
  var destLen = $m_jl_reflect_Array$().a3(xs);
  var limit = len < srcLen ? len : srcLen;
  var capacity = start < 0 ? destLen : (destLen - start) | 0;
  var total = capacity < limit ? capacity : limit;
  var copied = total < 0 ? 0 : total;
  if (copied > 0) {
    $m_s_Array$().b6(this.Q, 0, xs, start, copied);
  }
  return copied;
};
$p.d = function (v1) {
  return this.g(v1 | 0);
};
$p.aa = function () {
  return $m_scm_ArrayBuffer$();
};
$p.E = function (elem) {
  return this.c9(elem);
};
$p.D = function (elems) {
  return this.c8(elems);
};
function $isArrayOf_scm_ArrayBuffer(obj, depth) {
  return !!(
    obj &&
    obj.$classData &&
    obj.$classData.D === depth &&
    obj.$classData.B.n.aG
  );
}
var $d_scm_ArrayBuffer = new $TypeData().i(
  $c_scm_ArrayBuffer,
  "scala.collection.mutable.ArrayBuffer",
  {
    aG: 1,
    a4: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    R: 1,
    S: 1,
    a6: 1,
    a5: 1,
    o: 1,
    n: 1,
    C: 1,
    B: 1,
    aI: 1,
    p: 1,
    q: 1,
    a: 1,
    Z: 1,
  }
);
function $ct_sjs_js_WrappedArray__sjs_js_Array__($thiz, array) {
  $thiz.a8 = array;
  return $thiz;
}
function $ct_sjs_js_WrappedArray__($thiz) {
  $ct_sjs_js_WrappedArray__sjs_js_Array__($thiz, []);
  return $thiz;
}
/** @constructor */
function $c_sjs_js_WrappedArray() {
  this.a8 = null;
}
$p = $c_sjs_js_WrappedArray.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_sjs_js_WrappedArray;
/** @constructor */
function $h_sjs_js_WrappedArray() {}
$h_sjs_js_WrappedArray.prototype = $p;
$p.V = function () {
  return "IndexedSeq";
};
$p.e = function () {
  return $ct_sc_IndexedSeqView$IndexedSeqViewIterator__sc_IndexedSeqView__(
    new $c_sc_IndexedSeqView$IndexedSeqViewIterator(),
    new $c_sc_IndexedSeqView$Id(this)
  );
};
$p.g = function (index) {
  return this.a8[index];
};
$p.f = function () {
  return this.a8.length | 0;
};
$p.q = function () {
  return this.a8.length | 0;
};
$p.a0 = function () {
  return "WrappedArray";
};
$p.M = function () {
  return this;
};
$p.E = function (elem) {
  this.a8.push(elem);
  return this;
};
$p.d = function (v1) {
  var index = v1 | 0;
  return this.a8[index];
};
$p.aa = function () {
  return $m_sjs_js_WrappedArray$();
};
var $d_sjs_js_WrappedArray = new $TypeData().i(
  $c_sjs_js_WrappedArray,
  "scala.scalajs.js.WrappedArray",
  {
    cF: 1,
    a4: 1,
    t: 1,
    m: 1,
    j: 1,
    b: 1,
    c: 1,
    h: 1,
    g: 1,
    e: 1,
    f: 1,
    k: 1,
    i: 1,
    d: 1,
    l: 1,
    v: 1,
    r: 1,
    u: 1,
    x: 1,
    w: 1,
    R: 1,
    S: 1,
    a6: 1,
    a5: 1,
    q: 1,
    p: 1,
    B: 1,
    o: 1,
    n: 1,
    C: 1,
    aI: 1,
    U: 1,
    a: 1,
  }
);
$L0 = new $c_RTLong(0, 0);
$d_J.z = $L0;
let $e_renderApp = function () {
  $m_Lexamples_minimal_MinimalExample$().cX();
};
export { $e_renderApp as renderApp };
let $e_renderApp2 = function () {
  $m_Lpreact_test_test$package$().d8();
};
export { $e_renderApp2 as renderApp2 };
