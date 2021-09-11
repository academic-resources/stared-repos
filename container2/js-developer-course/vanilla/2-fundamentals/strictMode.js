/*
Javascript's strict mode, introduced in ECMAScript 5, is a way to opt in
to a restricted variant of javascript, thereby implicitly opting-out of
"sloppy mode". It intentionally has different semantics from normal code.
Browsers not supporting strict mode will run it with different behavior
from browsers that do, so don't rely on strict mode without feature-testing
for support for the relevant aspects of it.

Strict mode code and non-strict mode can coexist, so scripts can opt
into strict mode incrementally.

Strict mode makes several changes to normal js semantics:

1. Eliminates some Javascript silent errors by changing them to throw errors.
2. Fixes mistakes that make it difficult for Javascript engines to perform
optimizations. It can sometimes be made to run faster than identical code
that's not strict mode.
3. Prohibits some syntax likely to be defined in future versions of ECMAScript.
 */

// Strict mode for scripts
'use strict';
// rest of script ...

// Strict mode for functions
function strict() {
	'use strict';
	function nested() { return 'And so am I!'; }
	return "Hi, I'm a strict mode function! " + nested();
}
function noStrict() {
	return "I'm not strict";
}


// CONVERTING MISTAKES INTO ERRORS!

mistypeVariable = 17;
// this line throws a ReferenceError.
// In normal JS, mistyping a variable in an assignment
// creates a new property on the global object.

// Any assignment that silently fails in normal code
// - non-writable global or property
// - a getter-only property
// - new property on a non-extensible object
// will throw in strict mode.

// Assignment to non-writable global
var undefined = 5; // throws TypeError
var Infinity = 5; // throws TypeError

// Assignment to a non-writable property
var obj1 = {};
Object.defineProperty(obj1, 'x', { value: 42, writable: false });
obj1.x = 9; // throws TypeError

// Assignment to getter-only property
var obj2 = { get x() { return 17; }};
obj2.x = 5; // TypeError

// Assignment to new property on a non-extensible object
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = 'ohai'; // throws TypeError
