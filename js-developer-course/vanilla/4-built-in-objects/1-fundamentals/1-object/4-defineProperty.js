/*
`Object.defineProperty()` defines a new property directly on an object,
or modifies existing one, and returns the object.

A Property in Javascript consists of either a string-value name or a Symbol,
and a property DESCRIPTOR.

There are two types of OBJECT PROPERTIES which have certain attributes:
- Data property
- Accessor property

// DATA PROPERTY
Associates a key with a value and has following attributes
- Value  (Any)
- Writable (Boolean)
	- Property value can be changed
- Enumerable (Boolean)
	- Properties that show up in for...in loops unless property's key is a Symbol
- Configurable (Boolean)
	- Property descriptor and existence, if you can delete or change attributes

// Accessor property
/*
Associates a key with one of two accessor functions (get and set)
to retrieve or store a value and has following attributes:
- Get (function)
- Set (function)
- Enumerable (Boolean)
- Configurable (Boolean)
*/

const obj = {};

Object.defineProperty(obj, 'property1', {
	value: 42,
	writable: false
});

obj.property1 = 77;
// throws an error in strict mode

console.log(obj.property1); // 42

let bValue = 38;
// Accessors example
Object.defineProperty(obj, 'b', {
	// This is equivalent to:
	// get: function() { return bValue; },
	// set: function(newValue) { bValue = newValue; },
	get() { return bValue },
	set(newValue) { bValue = newValue },
	enumerable: true,
	configurable: true
});

/*
enumerable:
defines whether	property is picked by `Object.assign()` or spread operator `...`.
For non-Symbol properties it also defines whether it shows up in a
`for...in` loop and `Object.keys()` or not
You can ask with `obj.propertyIsEnumerable(<property_name>)`
 */

const o = {};
Object.defineProperty(o, 'a', { value: 1, enumerable: true });
Object.defineProperty(o, 'b', { value: 2, enumerable: false });
o.c = 3; // enumerable defaults to true when creating property by setting it
Object.defineProperty(o, Symbol.for('d'), { value: 4, enumerable: true });
Object.defineProperty(o, Symbol.for('e'), { value: 5, enumerable: false });

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // true
o.propertyIsEnumerable('d'); // true
o.propertyIsEnumerable('e'); // false

const p = { ...o };
p.a; // 1
p.b; // undefined
p.c; // undefined
p.d; // 4
p.e; // undefined

// Default values...
Object.defineProperty(o, 'a', { value: 1 });
// is equivalent to:
Object.defineProperty(o, 'a', {
	value: 1,
	writable: false,
	configurable: false,
	enumerable: false
});

// INHERITANCE OF PROPERTIES

function MyClass() {}

MyClass.prototype.x = 1;
Object.defineProperty(MyClass.prototype, 'y', {
	// Unlike accessor properties, value properties are always
	// set on the object itself, not on a prototype.
	// However, non-writable properties still prevent from
	// modifying the property on the object
	writable: false,
	value: 1
});
Object.defineProperty(MyClass.prototype, 'z', {
	// In get and set methods, this points to the object
	// which is used to access or modify the property
	get() { return this.stored_z },
	set(z) { this.stored_z = z }
});

let a = new MyClass();
a.x = 2;
console.log(a.x); // 2
console.log(MyClass.prototype.x); // 2
a.y = 3; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(MyClass.prototype.y); // 1
a.z = 4; // stored_z = 4

/*
`Object.defineProperties()` method defines new or modifies
existing properties directly on an object, returning the object
 */

Object.defineProperties(o, {
	a: {
		value: 42,
		writable: true
	},
	b: {}
});
