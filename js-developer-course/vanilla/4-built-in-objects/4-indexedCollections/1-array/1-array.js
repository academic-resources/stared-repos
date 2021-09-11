/*
`Array` class is a global object that is used in the construction
of arrays, which are high-level, list-like objects.

Arrays are list-like objects whose prototype has methods to perform
traversal and mutation operations.
Neither the length of a Javascript array nor the types of its elements
are fixed. Since array's length can change at any time, and data can be
stored at non-contiguous locations in the array, JS's arrays are not
guaranteed to be dense (array that has been created with each of its
elements being assigned a specific value, declared and initialized at
the same time).

Typed Arrays are available if these features are not desirable.

Arrays cannot use strings as element indexes, but must use integers.
Setting or accessing via non-integers using bracket/dot notation
will not set or retrieve an element from the array itself, but will
set or access a variable associated with that array's object property
collection.

Array's object properties and list of array elements are separate,
and the array's traversal and mutation operations cannot be applied
to these named properties.
 */

/*
COMMON OPERATIONS
 */

// Create an Array
let fruits = ['Apple', 'Banana'];
console.log(fruits.length); // 2

// Access an Array item
let first = fruits[0]; // Apple
let last = fruits[fruits.length - 1]; // Banana

// Loop over an Array
fruits.forEach(function(item, index, array) {
	console.log(item, index)
});
// Apple 0
// Banana 1

// Add to the end of an Array
let newLength = fruits.push('Orange');
// [Apple, Banana, Orange]

// Remove from end of an Array
let last = fruits.pop();
// [Apple, Banana]

// Add to the front of an Array
let newLength = fruits.unshift('Strawberry'); // add to the front
// ['Strawberry', 'Apple', 'Banana']

// Remove from front of an Array
let first = fruits.shift();
// [Apple, Banana]

// Find the index of an item in the Array
let pos = fruits.indexOf('Banana');
// 1

// Remove an item by index position
let removedItem = fruits.splice(pos, 1);
// [Apple]

// Remove multiple items from index position
let vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
pos = 1;
let n = 2;

let removedItems = vegetables.splice(pos, n);
// [Cabagge, Carrot]

// Copy an Array
let shallowCopy = fruits.slice();
shallowCopy = [...fruits];


/*
STATIC METHODS
 */

/*
+ Array.from(arrayLike[, mapFn[, thisArg]])
Creates a new Array instance from an array-like or iterable object
 */
console.log(Array.from('foo')); // [f, o, o]
console.log(Array.from([1, 2, 3], x => x + x)); // 2, 4, 6



/*
+ Array.isArray(value)
Returns true if value is an array, false otherwise
 */

console.log(Array.isArray([1, 2, 3])); // true

/*
+ Array.of(element0[, element1[, ...[, elementN]]])
Creates a new Array instance with a variable number of args,
regardless of number or type arguments
 */

console.log(Array.of(1, 2, 3)); // [1,2,3]
console.log(Array.of(7)); // [7]
console.log(Array(7)); // array of 7 empty slots
