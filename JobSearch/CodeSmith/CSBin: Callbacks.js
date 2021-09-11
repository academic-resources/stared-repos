// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return num + 2
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));


// Challenge 2
function addS(word) {
	return word + "s"
}

// uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
	return array.map(ele => callback(ele))
}

console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
	array.forEach(ele => callback(ele))
}

// see for yourself if your forEach works!
let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, function(char) {
  alphabet += char;
});
console.log(alphabet);   //prints 'abcd'

//--------------------------------------------------
// Extension
//--------------------------------------------------

//Extension 1
function mapWith(array, callback) {
	let mapped = []
  array.forEach(ele => mapped.push(callback(ele)))
  return mapped
}

//Extension 2
function reduce(array, callback, initialValue) {
	let accumulator = initialValue === undefined ? array[0] : initialValue
  array.forEach(ele => accumulator = callback(accumulator, ele))
  return accumulator
}

const nums = [4, 1, 3];
const add = function(a, b) { return a + b; }
console.log(reduce(nums, add, 0))   //-> 8

//Extension 3
function intersection(...arrays) {
  return arrays.reduce((intersects, currArray) => {
    return intersects.filter(ele => currArray.indexOf(ele) > -1)
  })
}
// O(n^2)

console.log(intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]));
// should log: [5, 15]

//Extension 4
function union(...arrays) {
	let unitedSet = new Set()
  arrays.forEach(array => array.forEach(ele => unitedSet.add(ele)))
  return Array.from(unitedSet)
}

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

//Extension 5
function objOfMatches(array1, array2, callback) {
	let matches = {}
  array1.forEach(ele => {
  	const i = array2.indexOf(callback(ele))
    if (i > -1) matches[ele] = array2[i]
  })
  return matches
}

console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

//Extension 6
function multiMap(arrVals, arrCallbacks) {
	let valueMods = {}
  arrVals.forEach(val => {
    let mods = []
    arrCallbacks.forEach(callback => mods.push(callback(val)))
    valueMods[val] = mods
  })
  return valueMods
}

console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


//Extension 7
function objectFilter(obj, callback) {
	let filteredObj = {}
  Object.keys(obj).forEach(key => {
    if (obj[key] === callback(key)) filteredObj[key] = obj[key]
  })
  return filteredObj
}

const cities = {
London: 'LONDON',
LA: 'Los Angeles',
Paris: 'PARIS',
};
console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}

