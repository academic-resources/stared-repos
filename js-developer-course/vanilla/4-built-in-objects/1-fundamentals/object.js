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
although these may be shadowed (a.k.a overriden).

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
Child.prototype = Object.create(Parent.prototype) // re-definition
Child.prototype.constructor = Child // return original constructor to child

/* METHODS */

/*
`Object.assign()` copies all enumerable own properties from one or more
source objects to a target object. It returs the target object.
- Merging objects
- Shallow copy
- Copying symbol-typed properties
- Properties on prototype chain and non-enumerable properties cannot be copied
- Copying accessors
*/

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target); // Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // Object { a: 1, b: 4, c: 5 }

// Copying accessors
o = {
	foo: 1,
	get bar() {
		return 2;
	}
};

let copy = Object.assign({}, obj);
console.log(copy);
// { foo: 1, bar: 2 }, value of copy.bar is obj.bar's getter's return value

// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
	sources.forEach(source => {
		let descriptors = Object.keys(source).reduce((descriptors, keys) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
			return descriptors;
		}, {});
		// by default, Object.assign copies enumerable Symbols too

	})
}
