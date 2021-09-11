/*
* PROTOTYPAL INHERITANCE
*
 */

function Person(name) {
	this.name = name;
}
Person.prototype.greeting = function() {
	console.log('Hi, I am a person');
};

function Teacher(name, subject) {
	Person.call(this, name);
	this.subject = subject;
	// problem here, greeting is not inherited yet
}

// Inheriting from a constructor with no parameters
function Brick() {
	this.width = 10;
	this.height = 20;
}
function BlueGlassBrick() {
	Brick.call(this);
	this.opacity = 0.5;
	this.color = 'blue';
}

/*
* Setting prototype and constructor reference
*
* We have a PROBLEM... we have defined a new constructor,
* and it has a prototype property, which by default contains
* an object with a reference to the constructor function
* itself. It does not contain the methods of the Person constructor's
* prototype property.
*
* We need to get Teacher() to inherit methods defined on Person()'s prototype.
*
 */

console.log(Object.getOwnPropertyNames(Teacher.prototype)); // only constructor
// const teacher1 = new Teacher('test', 'test');
// teacher1.greeting(); // undefined

Teacher.prototype = Object.create(Person.prototype); // shallow copy

/*
* After adding this line, another PROBLEM
* Teacher.prototype.constructor === Person()
* because we just set Teacher.prototype to reference an object
* that inherits its properties from Person.prototype!
*
 */

Object.defineProperty(Teacher.prototype, 'constructor', {
	value: Teacher,
	enumerable: false, // so that it does not appear in 'for...in'
	writable: true
});
