/*
Math has properties and methods for mathematical constants and functions.
Works with Number type, not BigInt.

Unlike other global objects, Math is not a constructor. All its properties
and methods are static. Constants are defined with the full precision of real
numbers in JavaScript.
 */

// PROPERTIES
Math.E; // 2.718
Math.LN2; // 0.693
Math.LN10; // 2.303
Math.LOG2E; // 1.443
Math.LOG10E; // 0.434
Math.PI; // 3.14159
Math.SQRT1_2; // 0.707
Math.SQRT2; // 1.414

// METHODS
// Note: trigonometric functions expect and return angles in radians
const x = Math.PI;
const y = 0;
Math.abs(x);
Math.acos(x);
Math.acosh(x); // hyperbolic
Math.asin(x);
Math.asinh(x); // hyperbolic
Math.atan(x);
Math.atanh(x); // hyperbolic
Math.atan2(y, x); // arctangent of quotient of args
Math.cbrt(x); // cube root of a number
Math.ceil(x);
Math.clz32(x); // leading zeroes of a 32-bit integer
Math.cos(x);
Math.cosh(x);
Math.exp(x); // e^x
Math.expm1(x); // exp(x) - 1
Math.floor(x);
Math.fround(x); // nearest single precision float
Math.hypot(...args); // square root of sum of squares of its arguments
Math.imul(x, y); // 32-bit integer multiplication
Math.log(x); // ln
Math.log1p(x); // ln (1+x)
Math.log10(x);
Math.log2(x);
Math.max(...args);
Math.min(...args);
Math.pow(x, y);
Math.random(); // 0 to 1
Math.round(x);
Math.sign(x);
Math.sin(x);
Math.sinh(x);
Math.sqrt(x);
Math.tan(x);
Math.tanh(x);
Math.trunc(x);
