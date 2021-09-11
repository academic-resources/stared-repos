/*
In addition to your own symbols, Javascript has some built-in symbols
which represent internal language behaviors which were not exposed
to developers in ECMAScript 5 and before.

These symbols can be accessed using the following properties
 */


/*
`Symbol.iterator`: method returning the default iterator for an object.
Used by `for...of`.
 */

const iterable1 = new Object();
iterable1[Symbol.iterator] = function* () {
	yield 1;
	yield 2;
	yield 3;
};

console.log([...iterable1]); // Array [1, 2, 3]

/*
`Symbol.asyncIterator`: method returning the default AsyncIterator
 for an object. Used by `for await...of`.
 */

const myAsyncIterable = new Object();
myAsyncIterable[Symbol.asyncIterator] = async function*() {
	yield 'hello';
	yield 'async';
	yield 'iteration!';
};

(async () => {
	for await (const x of myAsyncIterable) {
		console.log(x);
		// hello
		// async
		// iteration!
	}
})();

/*
`Symbol.match`: specifies the matching of a regular expression
against a string. This function is called by the
`String.prototype.match()` method.

This function is used to identify if objects have the behavior
of regular expressions. Methods `String.prototype.startsWith`
and `String.prototype.endsWith` check if their first argument
is a regular expression and will throw TypeError if they are.
Now if the match symbol is set to false, it indicates that the
object is not intended to be used as a regular expression object.
 */

const regexp1 = /foo/;
regexp1[Symbol.match] = false;

console.log('/foo/'.startsWith(regexp1)); // true
console.log('/baz/'.endsWith(regexp1)); // false

/*
`Symbol.matchAll` returns an iterator, that yields matches of
regular expression against a string. This function is called by
the `String.prototype.matchAll()` method.
 */

let re = /[0-9]+/g;
let str = '2016-01-02|2019-03-07';
let result = re[Symbol.matchAll](str);
console.log(Array.from(result, x => x[0]));
// Array [2016, 01, 02, 2019, 03, 07];

/*
`Symbol.replace`: specifies the method that replaces matched
substrings of a string. This function is called by
`String.prototype.replace()` method.
 */

class Replace1 {
	constructor(value) {
		this.value = value;
	}
	[Symbol.replace](string) {
		return `s/${string}/${this.value}/g`;
	}
}

console.log('foo'.replace(new Replace1('bar')));
// expected output: "s/foo/bar/g"

/*
`Symbol.search`: specifies method that returns the index
within a string that matches the regular expression.
This method is called by the `String.prototype.search()` method.
 */

class Search1 {
	constructor(value) {
		this.value = value;
	}
	[Symbol.search](string) {
		return string.indexOf(this.value);
	}
}

console.log('foobar'.search(new Search1('bar'))); // 3

/*
`Symbol.split`: specifies method that splits a string at the
indices that match a regular expression.
This method is called by the `String.prototype.split()` method.
 */

class Split1 {
	constructor(value) {
		this.value = value;
	}
	[Symbol.split](string) {
		const index = string.indexOf(this.value);
		return this.value + string.substr(0, index) + "/"
			+ string.substr(index + this.value.length);
	}
}

console.log('foobar'.split(new Split1('foo')));
// expected output: "foo/bar"

/*
`Symbol.hasInstance`: determine if a constructor object
recognizes an object as its instance. Used by `instanceof`.
 */

class Array1 {
	static [Symbol.hasInstance](instance) {
		return Array.isArray(instance);
	}
}


console.log([] instanceof Array1); // true

/*
`Symbol.isConcatSpreadable`: configure if an object should
be flattened to its array elements when using the
`Array.prototype.concat()` method.
 */

const alpha = ['a', 'b', 'c'];
const numeric = [1, 2, 3];
let alphaNumeric = alpha.concat(numeric);

console.log(alphaNumeric); // Array [a, b, c, 1, 2, 3]

numeric[Symbol.isConcatSpreadable] = false;
alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric); // Array [a, b, c, Array [1, 2, 3]]

/*
`Symbol.unscopables`: specify an object value of whose own
and inherited property names are excluded from the `with`
environment bindings of the associated objects.
Not that if using Strict mode, `with` statements are not available.
 */

const object1 = {
	property1: 42
};

object1[Symbol.unscopables] = {
	property1: true
};

with (object1) {
	console.log(property1);
	// Error: property1 is not defined
}

/*
`Symbol.species`: specifies a function-valued property that
the constructor function uses to create derived objects.
This allows subclasses to override the default constructor for
objects, when using methods such as `map()` that return the
default constructor.
 */

class MyArray extends Array {
	static get [Symbol.species]() { return Array; }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map(x => x*x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

/*
`Symbol.toPrimitive` is a symbol that specifies a function
valued property that is called to convert an object
to a corresponding primitive value.
 */

const object1 = {
	[Symbol.toPrimitive](hint) {
		if (hint == 'number') {
			return 42;
		}
		return null;
	}
}

console.log(+object1); // 42

/*
`Symbol.toStringTag`: string valued property that is used in the
creation of the default string description of an object. it is
accessed internally by the `Object.prototype.toString()` method.
 */

class ValidatorClass {
	get [Symbol.toStringTag]() {
		return 'Validator';
	}
}

console.log(Object.prototype.toString.call(new ValidatorClass()));
// "[object Validator]"
