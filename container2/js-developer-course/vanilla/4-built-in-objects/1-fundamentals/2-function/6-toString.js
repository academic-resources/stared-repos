/*
`Function.prototype.toString()` returns a string representing the
source code of the function. It does inherit Object.prototype.toString,
but rather overrides it.

For user-defined Function objects, the toString method returns a string
containing the source text segment which was used to define the function.
 */

function sum(a, b) {
	return a + b;
}

console.log(sum.toString());
// "function sum(a, b) { return a + b; }"

console.log(Math.abs.toString());
// "function abs() { [native code] }"
