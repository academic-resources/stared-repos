/*
Error objects are thrown when RUNTIME errors occur.
The Error object can also be used as a base object for
user-defined exceptions.

Besides the generic Error constructor, there are other
core error constructors in JavaScript.
 */

/*
PROTOTYPE
+ constructor
+ message
+ name

+ Vendor specific extensions
(Mozilla, Microsoft, ...)
 */

/*
CONSTRUCTOR
`new Error([message[, fileName[, lineNumber]]])`
+ message: human-readable description of the error
+ fileName: defaults to the name of file containing
the code that called Error()
+ lineNumber: defaults to the line containing the
Error() invocation
 */

// both have same functionality
const x = Error('I was created using a function call!');
const y = new Error('I was constructed via the "new" keyword!');

// EvalError
// error that occurs regarding global function eval()

// InternalError
// error in JS engine thrown (e.g. too much recursion)

// RangeError
// numeric variable or parameter is outside of its valid range

// ReferenceError
// error occurs when de-referencing an invalid reference

// SyntaxError
// syntax error while parsing code in eval()

// TypeError
// variable or parameter is not of a valid type

// URIError
// error when encoreURI() or decodeURI() are passed invalid parameters


/*
EXAMPLES
 */

// Throwing generic error
try {
	throw new Error('Whoops!')
} catch (e) {
	console.error(`${e.name}: ${e.message}`)
}

// Handling specific error
try {
	foo.bar()
} catch (e) {
	if (e instanceof EvalError) {
		console.error(`${e.name}: ${e.message}`)
	} else if (e instanceof RangeError) {
		console.error('Specific handling here...')
	}
	// ... etc
}

// CUSTOM ERROR TYPES ES6
class CustomError extends Error {
	constructor(foo = 'bar', ...params) {
		super(...params)

		// Maintains proper stack trace for where our error was thrown
		// Only available on V8
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError);
		}

		this.name = 'CustomError'
		// Custom debugging information
		this.foo = foo
		this.date = new Date()
	}
}

try {
	throw new CustomError('baz', 'bazMessage')
} catch (e) {
	// ...
}

// CUSTOM ERROR TYPES ES5
function CustomError(foo, message, fileName, lineNumber) {
	var instance = new Error(message, fileName, lineNumber);
	instance.name = 'CustomError';
	instance.foo = foo;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if (Error.captureStackTrace) {
		Error.captureStackTrace(instance, CustomError);
	}
	return instance;
}
CustomError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

if (Object.setPrototypeOf) {
	Object.setPrototypeOf(CustomError, Error);
} else {
	CustomError.__proto__ = Error;
}

try {
	throw new CustomError('baz', 'bazMessage');
} catch (e) {
	// handle ...
}
