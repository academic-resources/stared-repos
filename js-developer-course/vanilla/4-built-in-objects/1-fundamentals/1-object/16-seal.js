/*
`Object.seal()` method seals an object, preventing new properties
being added to it and marking all existing properties as non-configurable,
this also prevents deleting properties.
Values of present properties can still be changed as long as they are writable.

Making properties non-configurable also prevents them from being converted
from data properties to accessor properties and vice versa.
 */

const object1 = {
	property1: 42
};

Object.seal(object1);

object1.property1 = 33;
console.log(object1.property1); // 33

delete object1.property1; // cannot delete when sealed
console.log(object1.property1); // 33
