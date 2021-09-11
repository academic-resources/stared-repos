/*
`prototype.constructor` returns a REFERENCE to the Object constructor
function that created the instance object.

Objects created without the explicit use of a constructor function,
will have a constructor property that points to the Fundamental Object
constructor type of that object.
The value is READ-ONLY for primitive values.
 */

let o = {};
console.log(o.constructor === Object); // true

o = new Object();
console.log(o.constructor === Object); // true

o = new Number(3);
console.log(o.constructor === Number); // true

function Tree(name) {
	this.name = name;
}

const theTree = new Tree('Redwood');
console.log(`theTree.constructor is ${theTree.constructor}`);

// CHANGING CONSTRUCTOR OF A FUNCTION

function Parent() {}
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);

CreatedConstructor.prototype.create = function create() {
	return new this.constructor();
};

new CreatedConstructor().create().create();
// TypeError undefined is not a function since constructor === Parent
// constructor links to Parent...

CreatedConstructor.prototype.constructor = CreatedConstructor;

new CreatedConstructor().create().create(); // works!

