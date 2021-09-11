/*
`propertyIsEnumerable()` method returns a Boolean indicating whether
the specified property is enumerable and is the object's own property
 */

const obj1 = {};
const array1 = [];
obj1.property1 = 42;
array1[0] = 42;

console.log(obj1.propertyIsEnumerable('property1')); // true

console.log(array1.propertyIsEnumerable(0)); // true

console.log(array1.propertyIsEnumerable('length')); // false
