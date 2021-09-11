/*
* CONSTRUCTORS AND OBJECTS INSTANCES
* JavaScript uses constructor functions to define and initialize
* objects. They provide means to create as many objects as you
* need in an effective way, attaching data and functions
* to them as required.
*
 */

// Simple example
function createNewPerson(name) {
	const obj = {};
	obj.name = name;
	obj.greeting = function() {
		console.log(`Hi there, I am ${obj.name}.`);
	};
	return obj;
}

// const nacho = createNewPerson('Nacho');
// nacho.greeting(); // Nacho

function Person(name) {
	// this -> our object instance
	this.name = name;
	this.greeting = function() {
		console.log(`Hi there, I am ${this.name}.`);
	};
	// no need to explicitly return a new object
}

const nacho = new Person('Nacho');
nacho.greeting(); // Nacho

function PersonExtended(first, last, age, gender, interests) {
	this.name = {
		first,
		last
	};
	this.age = age;
	this.gender = gender;
	this.interests = interests;
	this.greeting = function() {
		console.log(`Hi there, I am ${this.first} ${this.last}.`);
	};
}

// Using Object constructor
const person = {
	name: 'Nacho',
	greeting: function() {
		console.log(`Hi there, I am ${this.first} ${this.last}.`);
	}
};

let person1 = new Object(person);

/*
* You can create instances as needed, without creating
* constructors, especially useful if creating only a
* few instances of an object.
*
 */

let person2 = Object.create(person1);
