/*
`Set` object lets you store UNIQUE values of any type,
whether primitive values or object references.

new Set([iterable])

You an iterate through the elements of a set in insertion order.

VALUE EQUALITY:
Because each value in the Set has to be unique, the value equality
will be checked. In an earlier version of ECMAScript specification,
this was not based on the same algorithm as the one used in the ===.

All NaN values are equated even though NaN !== NaN.
 */

/*
PROTOTYPE

+ constructor
+ size

+ add(value)

+ clear()

+ delete(value)
returns boolean

+ entries()
returns new Iterator that contains an array of [value, value] in insertion order

+ forEach(callbackFn[, thisValue])

+ has(value)

+ keys()

+ values()

+ [@@iterator]()
 */

/*
EXAMPLES
 */

// Using Set object
let mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add('sth');
// [1, 5, 'sth']

// Iterating Sets
for(let item of mySet) console.log(item);

for(let item of mySet.keys()) console.log(item);

for(let item of mySet.values()) console.log(item);

mySet.forEach(function(value) {
	console.log(value);
});

// key and value are the same here
for (let [key, value] of mySet.entries()) console.log(key);

// Convert to Array
let myArr = Array.from(mySet);
// Set from array
let mySet2 = new Set([1,2,3]);

// Intersect
let intersection = new Set([...mySet]).filter(x => mySet2.has(x));

// Difference
let difference = new Set([...mySet]).filter(x => !mySet2.has(x));
