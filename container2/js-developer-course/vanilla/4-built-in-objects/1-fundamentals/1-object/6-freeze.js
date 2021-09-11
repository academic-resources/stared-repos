/*
`Object.freeze()` freezes an object. A frozen object can no longer be changed.
It prevents adding new properties, removing existing ones, preventing changing
the enumerability, value, configurability or writability of existing properties.

In addition, it also prevents object's prototype from being changed.
`freeze()` returns the same object that was passed in.
 */

const obj = {
	prop: 42
};

const obj2 = Object.freeze(obj);

console.log(obj === obj2); // true

obj.prop = 33;
// throws error in strict mode

console.log(obj.prop); // 42;

// WARNING: "SHALLOW FREEZE"
/*
Only applies to the immediate properties of object itself.
If value of those properties are objects themselves,
those objects are not frozen.
 */

var employee = {
	name: "Mayank",
	designation: "Developer",
	address: {
		street: "Rohini",
		city: "Delhi"
	}
};

Object.freeze(employee);

employee.name = "Dummy"; // fails silently in non-strict mode
employee.address.city = "Noida"; // attributes of child object can be modified

console.log(employee.address.city) // Output: "Noida"


// Making DEEP FREEZE

function deepFreeze(object) {
	// Retrieve the property names defined on object
	const propNames = Object.getOwnPropertyNames(object);

	// Freeze properties before freezing self
	for (let name of propNames) {
		let value = object[name];

		object[name] = value && typeof value === 'object' ?
			deepFreeze(value) : value;
	}

	return Object.freeze(object);
}
