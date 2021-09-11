/*
`Object.keys()` returns an array of a given object's own enumerable
property names, iterated in the same order that a normal loop would.
 */

const object1 = {
	a: 'some string',
	b: 42,
	c: false
};

console.log(Object.keys(object1));
// expected output: Array ["a", "b", "c"]
