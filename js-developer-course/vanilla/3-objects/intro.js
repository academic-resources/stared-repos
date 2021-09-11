/*
In classic Object Oriented Programming (from now on OOP),
objects are collections of data and methods.
JavaScript is a prototype-based that contains no class statements (until ES6)
instead it uses functions as classes.

PROPERTIES!

Objects can be seen as a collection of properties, which can be added
and removed after initialization. Property types can be values of any type,
including other objects, which enables building complex data structure.

A Property in Javascript consists of either a string-value name or a Symbol,
and a property DESCRIPTOR.

Further information in `Object.defineProperty`
 */

const object1 = {};
Object.defineProperty(object1, 'property1', {
	value: 42,
	writable: false,
	get() { return 45 }
});
object1.property1 = 77; //thorws error;
object1.property1; // 45

// FUNCTIONS
// Functions are regular objects with the additional capability of being callable
// Since functions are objects, we can attach functions to another functions
function makePerson(first, last) {
	return {
		first: first,
		last: last,
		fullName: function() {
			return `${this.first}, ${this.last}`;
		},
		fullNameReversed: function() {
			return `${this.last}, ${this.first}`
		}
	};
}

const myself = makePerson('Ignacio', 'Herrera');
myself.fullName(); // Ignacio, Herrera
myself.fullNameReversed(); // Herrera, Ignacio

// Comment on this...
const fullName = myself.fullName;
fullName(); // undefined undefined

// When we call fullName alone, without calling it from a person's object
// `this` is bound to the global object

// We can use this to improve our code
function Person(first, last) {
	// this.first = first;
	// ...
}

// Every time we create a person object, we are creating
// two brand new functions objects within it
// Wouldn't it be better if this code was shared?

function getFullName() {
	return `${this.first}, ${this.last}`;
}

function Person(first, last) {
	this.first = first;
	this.last = last;
	this.fullName = getFullName;
}

// We can still do it better! Welcome Prototypes!
// Person.prototype is an object shared by all instances of Person
// It forms part of a lookup chain (prototype chain):
// any time you attempt to access a property of Person that isn't set
// Javascript will check Person.prototype to see if that property exists
// there instead. As a result, anything assigned to Person.prototype
// becomes available to all instances of that constructor via `this`
// This is really powerful. You can add extra methods to existing objects
// at runtime!

function Person(first, last) {
	this.first = first;
	this.last = last;
}
Person.prototype.fullName = function() {
	// return this.first ...
};

// Prototype then forms part of a chain ...
// Root of that chain is `Object.prototype`
// Whose methods include `toString()`

function trivialNew(constructor, ...args) {
	const o = {};
	constructor.apply(o, args);
	return o;
}
