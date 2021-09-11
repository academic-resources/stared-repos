/*
`Object.isFrozen()`: An object is frozen if and only if:
* it is NOT EXTENSIBLE
* all properties are non-configurable
* all data properties are non-writable (properties which are
not accessor properties with getter or setter components)
 */

const object1 = {
	property1: 42
};

console.log(Object.isFrozen(object1)); // false

Object.freeze(object1);

console.log(Object.isFrozen(object1)); // true
