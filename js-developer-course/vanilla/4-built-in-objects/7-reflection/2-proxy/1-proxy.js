/*
`Proxy` object is used to define custom behavior for fundamental operations
(e.g. property lookup, assignment, enumeration, function invocation, etc)

TERMINOLOGY

+ handler
placeholder object which contains traps. Whose properties are
functions which define the behavior of the proxy when an
operation is performed on it.

+ traps
the methods that provide property access

+ target
Object which proxy virtualizes. It can be any sort of object.

SYNTAXIS

var p = new Proxy(target, handler);

METHODS

+Proxy.revocable()
Creates a revocable proxy, which is an object with two properties:
{ proxy, revoke }
	+ proxy
	Proxy object created
	+ revoke
	Function with no argument to invalidate (switch off) the proxy:
	any trap to a handler will throw a TypeError. Once revoked,
	it will remain revoked and can be garbage collected.
 */

// REVOCABLE EXAMPLE
const revocable = Proxy.revocable({}, {
	get: function(target, name) {
		return `[[${name}]]`;
	}
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError

/*
HANDLER OBJECT's METHOD

All traps are optional. If a trap has not been defined,
the default behavior is to forward the operation to the target

handler.<method>

+ getPrototypeOf()

+ setPrototypeOf()

+ isExtensible()

+ preventExtensions()

+ getOwnPropertyDescriptor()

+ defineProperty()

+ has()
trap for in operator

+ get()
trap for getting property values

+ set()
trap por setting property values

+ deleteProperty()
trap for delete operator

+ apply()

+ construct()
trap for new operator
 */

// BASIC EXAMPLE
const handler = {
	get: function(obj, prop) {
		return prop in obj ? obj[prop] : 37;
	}
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37

// A GREAT USE IS FOR VALIDATION

var validator = {
	set: function(obj, prop, value) {
		if (prop === 'age') {
			if (!Number.isInteger(value)) {
				throw new TypeError('The age is not an integer!');
			}
			if (value > 200) {
				throw new RangeError('Age seems invalid');
			}
		}

		// Default behavior to store value
		obj[prop] = value;

		// Indicate success
		return true;
	}
};
let person = new Proxy({}, validator);
person.age = 100;
person.age = 'young'; // throws an exception
person.age = 300; // throws an exception
