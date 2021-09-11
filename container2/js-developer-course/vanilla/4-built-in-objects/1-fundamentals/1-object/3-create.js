/*
Object.create(proto, [propertiesObject]) creates a new object, using an existing object
as the prototype of the newly create object
 */

const person = {
	isHuman: false,
	printIntroduction: function() {
		console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
	}
};

const me = Object.create(person);
me.name = 'Nacho';
me.isHuman = true;
me.printIntroduction();

// CLASSICAL INHERITANCE

function Shape() {
	// Superclass
	this.x = 0;
	this.y = 0;
}
Shape.prototype.move = function (x, y) {
	this.x += x;
	this.y += y;
	console.log('Shape moved');
};

function Rectangle() {
	// Subclass
	Shape.call(this); // call super constructor
}
Rectangle.prototype = Object.create(Shape.prototype);

// If you don't set Object.prototype.constructor to Rectangle,
// it will take prototype.constructor of Shape (parent).
Rectangle.prototype.constructor = Rectangle;

const rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape', rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved'

// CLASSICAL MULTIPLE INHERITANCE - MIXINS
function MyClass() {
	SuperClass.call(this);
	OtherSuperClass.call(this);
}
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// re-asign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
	// do sth
};
