/*
The `Number` JS object is a wrapper object allowing you to work with numerical values.
A Number object is created using the constructor, while a primitive type object
number is created using the `Number()` function.

The JS Number type is DOUBLE-PRECISION 64-bit BINARY FORMAT IEEE 754 value.
In more recent implementations, Javascript also supports integers with
arbitrary precision using BigInt type.

Primary uses of Number object:
+ Argument cannot be converted into a number, returns NaN
+ non-constructor context, Number can be used for type conversion
 */

Number.EPSILON; // smallest interval between two representable numers

Number.MAX_SAFE_INTEGER; // (2^53 - 1)

Number.MAX_VALUE; // largest positive representable number

Number.MIN_SAFE_INTEGER; // (-(2^53 - 1))

Number.MIN_VALUE; //  Smallest positive representable number (closest to zero)

Number.NaN; // Not a Number

Number.NEGATIVE_INFINITY; // Returned on overflow
Number.POSITIVE_INFINITY; // Returned on overflow

Number.prototype; // Allows addition of properties to the Number object
