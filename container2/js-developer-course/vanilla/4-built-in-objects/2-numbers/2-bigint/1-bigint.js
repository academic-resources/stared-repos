/*
BigInt provides a way to represent whole numbers larger than 2^53 - 1.
It cannot be used with methods in the built-in Math object and cannot be
mixed with instances of Number in operations, they must be coerced to
the same type. Be careful coercing values back and forth, however,
as the precision of a BigInt may be lost when it is coerced to a Number.
 */

// Created appending n to the end of an integer literal, or by calling BigInt()
const biggestInt = 9007199254740991n
const alsoHuge = BigInt(9007199254740991)

typeof 1n === 'bigint' // true;

// OPERATORS
// +, *, -, **, %
// Bitwise operators

0n === 0; // false
0n == 0; // true

// STATIC METHODS
biggestInt.asIntN(); // wraps to a signed integer etween -2^(width-1) and 2^(width-1) - 1
biggestInt.asUintN(); // wraps to an unsigned integer between 0 and 2^(width) - 1

// INSTANCE METHODS
biggestInt.prototype.toLocaleString(); // ...
biggestInt.prototype.toString(10); // ...
biggestInt.prototype.valueOf(); // ...
