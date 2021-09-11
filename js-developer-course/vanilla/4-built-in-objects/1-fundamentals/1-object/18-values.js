/*
`Object.values()` method returns an array of a given object's
own enumerable property values, in the same order as that provided
by a `for...in` loop. The only difference is that a `for...in` loop
enumerates properties in the prototype chain as well.
 */

const object1 = {
	a: 'some string',
	b: 42,
	c: false
};

console.log(Object.values(object1));
// expected output: Array ["some string", 42, false]
