/*
`Object.entries()` returns an array of a given object's own
enumerable string-keyed properties `[key, value]` pairs,
in the same order as that provided by a `for...in` loop
(the difference being that a `for...in` loop enumerates
properties in the prototype chain as well).
This order does not depend on how an object is defined,
if there is a need for certain ordering then the array should
be sorted first like:
`Object.entries(obj).sort((a, b) => b[0].localCompare(a[0]));`
 */

let o = { foo: 'bar', baz: 42 };
console.log(Object.entries(o)); // [['foo', 'bar'], ['baz', 42]];

// getFoo is a non-enumerable property
const myObj = Object.create({}, {
	getFoo: {
		value() { return this.foo }
	}
});
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [['foo', 'bar']];

// non-object argument will be coerced to an object
console.log(Object.entries('foo')); // [['0', 'f'], ..., ['2', 'o']]

// Iterate through key - value gracefully
for (const [key, value] of Object.entries(o)) {
	console.log(`${key} ${value}`); // 'foo bar', 'baz 42'
}

// Or using array forEach
Object.entries(o).forEach(([key, value]) => {
	// ...
});

// CONVERTING OBJECT TO MAP
const map = new Map(Object.entries(o));
console.log(map); // Map { foo: "bar", baz: 42 }

// POLYFILL
if (!Object.entries) {
	Object.entries = function ( obj ) {
		const ownProps = Object.keys(obj);
		let i = ownProps.length,
			resArray = new Array(i); // preallocate the Array

		while (i--) {
			resArray[i] = [ownProps[i], obj[ownProps[i]]];
		}

		return resArray;
	};
}
