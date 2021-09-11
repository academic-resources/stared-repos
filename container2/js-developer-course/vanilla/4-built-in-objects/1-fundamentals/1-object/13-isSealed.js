/*
`Object.isSealed()`: An object is sealed if:
* It is NOT EXTENSIBLE
* All its properties are non-configurable and therefore
not removable (but not necessarily non-writable);
 */

const object1 = {
	property1: 42
};

console.log(Object.isSealed(object1)); // false

Object.seal(object1);

console.log(Object.isSealed(object1)); // true
