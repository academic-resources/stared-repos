# Objects in detail

In classic OOP, objects are _collections of data and methods_. JS is a prototype-based that uses __functions as classes__.

In JS, objects can be seen as a __collection of properties__, which can be added and removed after initialization.

## Properties

Property types can be values of any types, including other objects, and consists of either a string-value name or `Symbol`, and a property _Descriptor_.

There are two types of Object Properties which have certain attributes.

### Data Property

Associates a key with a value and has following attributes:

* `value` (any)
* `writable` (boolean): property value can be changed.
* `enumerable` (boolean): property shows up in `for...in` loops unless property's key is a `Symbol`.
* `configurable` (boolean): property descriptor and existence, if you can delete or change attribute.

### Accessor Property

Associates a key with one of two _Accessor Functions_, `get` and `set`, to retrieve or store a value and has following attributes:

* `set` (function)
* `get` (function)
* `enumerable` (boolean)
* `configurable` (boolean)

## Example - Creating objects

```js
const obj1 = {};
Object.defineProperty(object1, 'property1', {
	value: 42,
	writable: false,
	get() { return45 }
});
obj1.property1 = 77; // error!
object1.property1; // 42
```

## Example - Functions as objects

Functions are regular objects with the additional capability of being callable. We can attach functions to another functions.

```js
function Person(first, last) {
	return {
		first: first,
		last: last,
		fullName: function() { return `${this.first}, ${this.last}` }
	}
}
const me = Person('Ignacio', 'Herrera');
me.fullName(); // Ignacio, Herrera

// Note that we can call fullName alone, without calling it from a person's object
// in this case, `this` would be bounded to the global object.
const fullName = me.fullName;
fullName(); // undefined
```

## Prototype

Let's understand Prototypes with an example.

In this case, `Person.prototype` is an object shared by all instances of Person, and forms part of a _Lookup Chain called Prototype Chain_. Any time you attempt to access a property of `Person` that isn't set, JS will check its Prototype to see if that property exists there instead. Using this, you can add extra methods to existing objects at runtime.

```js
function Person(first, last) {
	this.first = first;
	this.last = last;
}
Person.prototype.fullName = function() {
	return `${this.firstName}, ${this.lastName)`
}
```

Prototype then forms part of a chain, and the root of that chain is `Object.prototype` whose methods include `toString()` and others.o

## Copying Objects and `Object.assign()`

Sometimes we'll see ourselves wanting to make a copy of an object.

`Object.assign()` copies all enumerable own properties from one or more source objects to a target object and returns it. It does the following:

* Merging objects
* Shallow copy
* Copying symbol-typed properties
* Properties on prototype chain and non-enumerable cannot be copied
* Copying accessors

Let's see an example:

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target === returnedTarget); // true;
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
```

Something interesting happens when we try copping Accessor Properties:

```js
const o = {
	foo: 1,
	get bar() { return 2; }
}
let copy = Object.assign({}, obj);
console.log(copy); // { foo: 1, bar: 2 }
```

If we wanted to copy all descriptors, we could do something like this:

```js
function completeAssign(target, ...sources) {
	sources.forEach(source => {
		let descriptors = Object.keys(source).reduce((descriptors, key) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
			return descriptors;
		}, {});
	});
}
```

## Object Methods

Almost everything in JavaScript is built on top of Object's methods, so it would be smart to get a glance on those and understand what are they intents.

Please [refer to the MDN documentation for latest updates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

### Static Methods

#### Object.assign()

Copies the values of all enumerable own properties from one or more source objects to a target object.

#### Object.create()

Creates a new object with the specified prototype object and properties.

#### Object.defineProperty()

Adds the named property described by a given descriptor to an object.

#### `Object.defineProperties()`

Adds the named properties described by the given descriptors to an object.

#### `Object.entries()`

Returns an array containing all of the [key, value] pairs of a given object's own enumerable string properties.

#### `Object.freeze()`

Freezes an object. Other code cannot delete or change its properties.

#### `Object.fromEntries()`

Returns a new object from an iterable of [key, value] pairs. (This is the reverse of Object.entries).

#### `Object.getOwnPropertyDescriptor()`

Returns a property descriptor for a named property on an object.

#### `Object.getOwnPropertyDescriptors()`

Returns an object containing all own property descriptors for an object.

#### `Object.getOwnPropertyNames()`

Returns an array containing the names of all of the given object's own enumerable and non-enumerable properties.

#### `Object.getOwnPropertySymbols()`

Returns an array of all symbol properties found directly upon a given object.

#### `Object.getPrototypeOf()`

Returns the prototype (internal `[[Prototype]]` property) of the specified object.

#### `Object.is()`

Compares if two values are the same value. Equates all NaN values (which differs from both Abstract Equality Comparison and Strict Equality Comparison).

#### `Object.isExtensible()`

Determines if extending of an object is allowed.

#### `Object.isFrozen()`

Determines if an object was frozen.

#### `Object.isSealed()`

Determines if an object is sealed.

#### `Object.keys()`

Returns an array containing the names of all of the given object's own enumerable string properties.

#### `Object.preventExtensions()`

Prevents any extensions of an object.

#### `Object.seal()`

Prevents other code from deleting properties of an object.

#### `Object.setPrototypeOf()`

Sets the object's prototype (its internal `[[Prototype]]` property).

#### `Object.values()`

Returns an array containing the values that correspond to all of a given object's own enumerable string properties.

### Instance Properties

#### `Object.prototype.constructor`

Specifies the function that creates an object's prototype.

#### `Object.prototype.__proto__`

Points to the object which was used as prototype when the object was instantiated.

#### `Object.prototype.__noSuchMethod__`

Allows a function to be defined that will be executed when an undefined object member is called as a method.

### Instance Methods

#### `Object.prototype.__defineGetter__()`

Associates a function with a property that, when accessed, executes that function and returns its return value.

#### `Object.prototype.__defineSetter__()`

Associates a function with a property that, when set, executes that function which modifies the property.

#### `Object.prototype.__lookupGetter__()`

Returns the function associated with the specified property by the __defineGetter__() method.

#### `Object.prototype.__lookupSetter__()`

Returns the function associated with the specified property by the __defineSetter__() method.

#### `Object.prototype.hasOwnProperty()`

Returns a boolean indicating whether an object contains the specified property as a direct property of that object and not inherited through the prototype chain.

#### `Object.prototype.isPrototypeOf()`

Returns a boolean indicating whether the object this method is called upon is in the prototype chain of the specified object.

#### `Object.prototype.propertyIsEnumerable()`

Returns a boolean indicating if the internal ECMAScript [[Enumerable]] attribute is set.

#### `Object.prototype.toLocaleString()`

Calls toString().

#### `Object.prototype.toString()`

Returns a string representation of the object.

#### `Object.prototype.unwatch()`

Removes a watchpoint from a property of the object.

#### `Object.prototype.valueOf()`

Returns the primitive value of the specified object.

#### `Object.prototype.watch()`

Adds a watchpoint to a property of the object.
