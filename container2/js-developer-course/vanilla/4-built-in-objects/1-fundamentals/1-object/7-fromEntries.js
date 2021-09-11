/*
`Object.fromEntries()` method transforms a list of key-value pairs into an object
 */

const entries = new Map([
	['foo', 'bar'],
	['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Object { foo: 'bar", baz: 42 }

const obj1 = {
	a: 1,
	b: 2,
	c: 3
};

const obj2 = Object.fromEntries(
	Object.entries(obj1)
		.map(([key, val]) => [key, val * 2])
);

console.log(obj2);
// { a: 2, b: 4, c: 6 }
