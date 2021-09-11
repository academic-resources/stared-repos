/*
Boolean object is an object wrapper for a boolean value.

The value passed as the first parameter is converted to
a boolean value.

Following gets evaluated to `false`:
* omitted
* 0
* -0
* null
* false
* NaN
* undefined
* ""

All other values, including {} and [], or the string "false",
get evaluated to `true`.
 */


// ANY object which the value is not undefined or null, including a
// Boolean object whose value is `false`, evaluates to `true`
// when passed to a conditional statement.

const x = new Boolean(false);
if (x) {
	// this code is executed
}

// This does not apply to Boolean primitives...
const y = false;
if (y) {
	// this code is not executed
}

// Do not use a Boolean constructor to convert a non-boolean value...
const expression = false;
let z = Boolean(expression); // Use this...
z = !!(expression); // or this
z = new Boolean(expression); // Dont use this!!

/*
`Boolean.prototype.toString()`: returns either "true" or "false",
overrides Object's method.
 */

/*
`Boolean.prototype.valueOf()`: returns primitive value of Boolean Object.
 */
