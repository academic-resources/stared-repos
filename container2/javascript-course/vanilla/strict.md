# Strict Mode

JS's strict mode was introduced in ES5, as a way to opt in to a restricted variant of JavaScript that implictly opts-out of "sloppy mode". Strict mode can coexist with non-strict mode, so scripts can opt into strict mode incrementally.

Browsers not support strinct mode will run it with idfferent behavior from browsers that do, so don't rely on strict mode without feature-testing for support for the relevant aspects of it.

```js
function strict() {
	'use strict'; // function-level scope
	function nested() { return 'And so am I!'; }
	return `Hi, I am a strict mode function ${nested()}`
}
```

## Different semantics

1. Eliminates some JS silent errors by changing them to throw errors.
2. Fixes mistakes that make it difficult for JS engines to perform optimizations.
3. Prohibits some syntax likely to be defined in future versions of ECMAScript.

### Examples

Following examples will throw errors in Strict mode:

```js
mistypedGlobalVariable = 17; // ReferenceError

var undefined = 5; // TypeError (non-writable global) 

var obj1 = {}
Object.defineProperty(obj1, 'x', { value: 42, writable: true })
obj1.x = 9 // TypeError (non-writable property)

var fixed = {}
Object.preventExtensions(fixed)
fixed.newProp = 'ohai' // TypeError (non-extensible object)
```
