/*
`Object.is()` determines whether two values are the same value.

This is NOT THE SAME as `==`.
The `==` operator applies various coercions to both sides
(if they are not the same Type) before testing for equality,
resulting in behavior as `"" == false` being true, but Object.is
does not coerce either value

This is also NOT THE SAME as `===`.
The `===` operator treats the number -0 and +0 as equal,
and treats `Number.NaN` as not equal to `NaN`.

Two values are the same if one of the following holds:
* Both undefined
* Both null
* Both true or both false
* Both strings of same length, with same characters in the same order
* Both same object (reference)
* Both numbers and:
	* Both +0
	* Both -0
	* Both NaN
	* Both non-zero and both not NaN and both same value
 */

Object.is('foo', 'foo'); // true
Object.is([], []) // false;
Object.is(-0, +0); // true
Object.is(NaN, 0/0); // true

const foo = { a: 1 };
const bar = { a: 1 };
Object.is(foo, bar); // false

// POLYFILL
if (!Object.is) {
	Object.is = function(x, y) {
		// SameValue algorithm
		if (x === y ) {
			// +0 != -0
			return x !== 0 || 1 / x === 1 / y;
		} else {
			// NaN == NaN
			return x !== x && y !== y;
		}
	}
}
