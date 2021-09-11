/*
All Number instances inherit from Number.prototype.
`Number.prototype.constructor` can be modified to affect all
Number instances.
 */

const num = Number(33);

num.prototype.toExponential(10);
// Returns a string representing number in exponential notation

num.prototype.toFixed(10);
// Returns a string representing number in fixed-point notation

num.prototype.toLocaleString('ar-EG');
// Returns string with language sensitive representation of this number.

num.prototype.toSource();
// Object literal representing specified Number object.

num.prototype.toString(10);
// Returns a string representing object in the specified radix

num.prototype.valueOf();
// Returns primitive value of specified object
