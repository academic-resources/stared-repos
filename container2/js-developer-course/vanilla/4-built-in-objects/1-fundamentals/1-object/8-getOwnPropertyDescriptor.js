/*
`Object.getOwnPropertyDescriptor()` returns a property descriptor
for an own property of a given object (that is, one directly present on an object,
and not in the object's prototype chain).
 */

const object1 = {
	property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(
	object1, 'property1'
);

console.log(descriptor1.configurable); // true
console.log(descriptor1.value); // 42

