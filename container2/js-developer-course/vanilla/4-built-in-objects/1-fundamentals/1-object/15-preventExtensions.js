/*
`Object.preventExtensions()` prevents new properties from ever being
added to an object.

This method makes the [[prototype]] of the target immutable,
other properties will remain mutable
 */

const object1 = {};

Object.preventExtensions(object1);

try {
	Object.defineProperty(object1, 'property1', {
		value: 42
	});
} catch (e) {
	console.log(e);
	// TypeError: Cannot define property property1, object is not extensible
}

Object.isExtensible(object1); // false
