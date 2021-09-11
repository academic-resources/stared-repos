/*
* ECMAScript 2015 introduces Class syntax to JS,
* as a way to write reusable classes using easier
* cleaner syntax, which is more similar to common OOP languages.
*
* Under the hood, classes are being converted into Prototypal Inheritance
* models, so this is just syntactic sugar.
*
 */

class Person {
	constructor(name) {
		this.name = name;
	}

	greeting() {
		// this goes to prototype
		console.log('Hi, I am a person');
	}
}

let nacho = new Person('Nacho');

// class Teacher extends Person {
// 	/*
// * CATCH!
// * Unlike old-school constructor functions where the new operator
// * does the initialization of this to a newly-allocated object,
// * this isn't automatically initialized for a class defined by
// * the extends keyword.
//  */
// 	constructor(subject) {
// 		// ERROR!
// 		// Must call super constructor in derived class
// 		// before accessing 'this' or returning from derived
// 		// constructor
// 		this.subject = subject;
// 	}
// }

class Teacher extends Person {
	constructor (name, subject) {
		super(name); // now 'this' is initialized by calling parent constructor;
		this.subject = subject;
	}
}

/*
For sub-classes, the `this` initialization to a newly allocated object
is always dependant on the parent class constructor.
 */

/*
* GETTERS AND SETTERS
 */

class Teacher extends Person {
	constructor (name, subject) {
		super(name); // now 'this' is initialized by calling parent constructor;
		this._subject = subject;
	}

	get subject() {
		return this._subject;
	}

	set subject(newSubject) {
		this._subject = newSubject;
	}
}
