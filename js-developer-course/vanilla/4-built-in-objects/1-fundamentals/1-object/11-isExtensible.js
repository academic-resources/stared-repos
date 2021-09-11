/*
`Object.isExtensible()` method determines if an object is extensible
(whether it can have new properties added to it).

Objects can be marked as non-extensible using:
* Object.preventExtensions()
* Object.seal()
* Object.freeze()
 */

const object1 = {};

console.log(Object.isExtensible(object1)); // true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1)); // false

