/*
* JS is a prototype-base language, to provide inheritance,
* objects have a prototype object, which acts as a template
* object so that they can inherit methods and properties from it.
*
* A prototype object, may also have a prototype object of its own,
* which it inherits methods and properties from, and so on.
* This is often referred to as a PROTOTYPE CHAIN.
*
* In JS, a link is made between the object instance and its prototype.
* Properties and methods are found by walking up the chain of
* prototypes.
*
 */

function Person(name) {
	this.name = name;
	this.greeting = function() {
		console.log('Hi there!');
	}
}

let person1 = new Person('Nacho');

// person1
// -> inherits from Person.prototype
// -> inherits from Object.prototype

// We can call methods defined on Object
console.log(person1.valueOf());
