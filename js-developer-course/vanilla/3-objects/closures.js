// INNER FUNCTIONS

function parentFunc() {
	var a = 1;

	function nestedFunc() {
		var b = 4; // parentFunc can't use this
		return a+b;
	}
	return nestedFunc(); // 5
}

// CLOSURES

function makeAdder(a) {
	return function(b) {
		return a + b;
	}
}

const add5 = makeAdder(5);
const add20 = makeAdder(20);
add5(6); // 11
add20(7); // 27

// Whenever Javascript executes a function, a 'scope' object is created
// to hold the local variables created within that function.
// It is initialized with any variables passed in as function parameters.
// This is similar to the global object, but with important differences:
// 1) Brand new scope object is created every time a function starts executing
// 2) Unlike global object which is accessible as `this` and in browsers as `window`
// these scope objects cannot be directly accessed from your JS code,
// there is no mechanism for iterating over the properties of the current scope object

// In this case, `makeAdder()` returns a newly created function.
// Normally, JavaScript's garbage collector would clean up the scope object created
// for makeAdder() at this point, but the returned function maintains a reference
// back to that scope object.
// As a result, the scope object will not be garbage-collected until there are no more
// references to the function object that makeAdder() returned.

// Scope objects form a chain called the `scope chain` similar to the `prototype chain`.

// A CLOSURE is the combination of a function and the scope object in which it was created.
// Closures let you save state,

// If you are using `function` keyword inside another function, you are creating a closure...
// If you declare a function within another function, then outers function's local variables
// can remain accessible after returning fom it, to the inner function.

// Closures let us simulate private/protected values, for example:

const person = {
	firstName: 'Jimmy',
	lastName: 'Smith',
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	set fullName(name) {
		const words = name.toString().split(' ');
		this.firstName = words[0] || '';
		this.lastName = words[1] || '';
	}
};

// You can do this for existing properties too

person.fullName; // 'Jimmy Smith'
person.fullName = 'Jack Franklin';

// Official explicit way... Object.defineProperty
// also give us the change to pass following keys:
// * configurable: if true, property's configuration will be modifiable in future
// * enumerable: if true, property will appear when looping over the object (for..in)


Object.defineProperty(person, 'fullName', {
	get: function() {/*...*/},
	set: function() {/*...*/},
});

// We can also define properties that don't have explicit getters or setters and won't
// be writable

Object.defineProperty(person, 'age', {
	value: 42,
	// writable: true
});
