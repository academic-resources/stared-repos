// Object initializer or literal
const obj1 = {};

// CONSTRUCTOR
const obj2 = new Object();
// if value is `null` or `undefined`, it will create and return empty object
// Otherwise, it will return object of according Type
// If value is an object already, it will return he value

// PROTOTYPE
/*
Object.prototype is a property of the Object constructor
and the end of a prototype chain
- Writable: false
- Enumerable: false
- Configurable: false

Nearly all objects in JavaScript are instances of `Object`.
Typical object inherits properties from `Object.prototype`,
altough these may be shadowed (a.k.a overriden).

However, an Object may be deliberately created for which is
not true:
> Object.create(null)
It may also be altered:
> Object.setPrototypeOf
*/

let o = {};
o.constructor === Object; // true
let a = [];
a.constructor === Array; // true

// You can change an object constructor
function Parent() {
	Parent.prototype.parentMethod = function parentMethod() {}
}

// This way you can call it with prototype-inherits chain
function Child() {}
Child.prototype = Object.create(Parent.prototype); // re-definition
Child.prototype.constructor = Child; // return original constructor to child
