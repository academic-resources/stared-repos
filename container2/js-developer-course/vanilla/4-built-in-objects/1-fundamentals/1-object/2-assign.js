/* METHODS */

/*
`Object.assign()` copies all enumerable own properties from one or more
source objects to a target object. It returs the target object.
- Merging objects
- Shallow copy
- Copying symbol-typed properties
- Properties on prototype chain and non-enumerable properties cannot be copied
- Copying accessors
*/

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target); // Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // Object { a: 1, b: 4, c: 5 }

// Copying accessors
let o = {
	foo: 1,
	get bar() {
		return 2;
	}
};

let copy = Object.assign({}, o);
console.log(copy);
// { foo: 1, bar: 2 }, value of copy.bar is obj.bar's getter's return value

// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
	sources.forEach(source => {
		let descriptors = Object.keys(source).reduce((descriptors, key) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
			return descriptors;
		}, {});
		// by default, Object.assign copies enumerable Symbols too
		Object.getOwnPropertySymbols(source).forEach(sym => {
			let descriptor = Object.getOwnPropertyDescriptor(source, sym);
			if (descriptor.enumerable) {
				descriptors[sym] = descriptor;
			}
		});
		Object.defineProperties(target, descriptors);
	});
	return target;
}

copy = completeAssign({}, o);
console.log(copy);
// { foo: 1, get bar() { return 2 } }
