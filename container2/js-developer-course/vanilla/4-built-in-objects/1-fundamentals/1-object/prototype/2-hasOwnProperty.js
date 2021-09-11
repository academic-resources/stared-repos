/*
`hasOwnProperty()` method returns a boolean indicating whether
the object has the specified property as its own property
(as opposed to inheriting it).
 */

const object1 = new Object();
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1')); // true
console.log(object1.hasOwnProperty('toString')); // false
console.log(object1.hasOwnProperty('hasOwnProperty')); // false
