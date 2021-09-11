/*
`isPrototypeOf()` method checks if an object exists in another
object's prototype chain.
 */

function Obj1() {}
function Obj2() {}

Obj1.prototype = Object.create(Obj2.prototype);

console.log(Obj1.prototype.isPrototypeOf(Obj2)); // true

const obj3 = new Obj1();

console.log(Obj2.prototype.isPrototypeOf(obj3)); // true
