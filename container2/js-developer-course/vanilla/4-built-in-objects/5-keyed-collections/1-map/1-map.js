/*
`Map` object holds KEY-VALUE pairs and remembers original insertion order.
Any value (both objects and primitive) may be used as either key or value.

Map iterates its elements in insertion order:
A `for...of` loop returns an array of [key, value] for each iteration.

Map may perform better than Object in scenarios involving
frequent additions and removals of key-value pairs.
 */

/*
PROTOTYPE

+ constructor
+ size

+ clear()
removes all key-value pairs

+ delete(key)
returns true if element existed and has been removed

+ entries()
returns new Iterator that contains an array of [key, value] in insertion order

+ forEach(callbackFn[, thisValue])

+ get(key)
Returns value associated or undefined

+ has(key)
Returns boolean

+ keys()
returns new Iterator that contains keys in insertion order

+ set(key, value)
sets the `value` for `key` in the Map object. Returns the Map.

+ values()
returns new Iterator object that contains the values for each
element in the Map object in insertion order

+ [@@iterator]()
Returns a new Iterator object that contains an array of
[key, value] for each element in the Map object in insertion order
 */

/*
EXAMPLES
 */

// Using Map object
let myMap = new Map();

let keyString = 'a string';
let keyObj = {};
let keyFunc = function() {};

// settings the values
myMap.set(keyString, 'value associated with a key string');
myMap.set(keyObj, 'value associated with a key object');
myMap.set(keyFunc, 'value associated with a key function');
myMap.size; // 3;

// getting the values
myMap.get(keyString); // 'value associated with a key string'
myMap.get('a string'); // same ...
myMap.get({}); // undefined, because keyObj !== {}

// Iterating Map with for...of
for (let [key, value] of myMap) {
	console.log(`${key} = ${value}`)
}
for (let key of myMap.keys()) {
	console.log(key)
}
for (let value of myMap.values()) {
	console.log(value);
}
for (let [key, value] of myMap.entries()) {
	console.log`${key} = ${value}`
}

// Iterating Map with forEach()
myMap.forEach(function(key, value) {
	console.log(`${key} = ${value}`)
});

// Relation with Array objects
let kvArray = [['key1', 'value1'], ['key2', 'value2']];
let myMap2 = new Map(kvArray);
// Transform a map into a 2D key-value Array
console.log(Array.from(myMap2));
console.log([...myMap2]);
console.log(Array.from(myMap2.keys()));
console.log(Array.from(myMap2.values()));

// Cloning Maps
let original = new Map([
	[1, 'one']
]);
let clone = new Map(original);
console.log(clone === original); // false

// Merging Maps
let second = new Map([
	[2, 'two']
]);
// spread operator essentially converts a Map to a key-value array
let merged = new map([...original, ...second]);
