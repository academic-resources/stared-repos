/* VARIABLES */

/*
let: block-level scope variables
 */
for (let myLetVariable = 0; myLetVariable < 2; myLetVariable++) {
	// myLetVariable is only visible in here
}
// myLetVariable is *not* visible out here

/*
const: variables whose values are never intended to change
and have block-level scope
 */
function blockScope() {
	const Pi = 3.14;
	Pi = 1 // will throw an error because you cannot change a constant variable
}
// Pi is *not* visible out here

/*
var: variables available from the function it is declared in
 */

function varScope() {
	for (var myVarVariable = 0; myVarVariable < 2; myVarVariable++) {
	}
	myVarVariable = 3;
}

/* DYNAMIC TYPING */
let dynamic = 1;
dynamic = 'string';
dynamic = true;

/* TYPES */

// PRIMITIVES
// All types expect objects define IMMUTABLE values (which are incapable of
// being changed).

// NUMBERS: "double-precision 64-bit format", integers do not exist in Javascript
// So you have to be a little careful with arithmetic if you're used to math in C or Java
// BIGINT

// Conversion
// parseInt and parseFloat parse a string until they react a invalid character
// and return the number parsd up to that point
// however '+' operator converts the string to NaN if there is an invalid character
parseInt('123', 10); // 123
parseInt('0x10', 8); // 16

// STRING: sequences of Unicode characters.
// You can use string as object too...
// They have methods that allow you to manipulate and access its information
'hello'.length; // 5
'hello'.charAt(0); // 'h'
'hello, world'.replace('world', 'mars'); // 'hello, mars'
'hello'.toUpperCase(); // 'HELLO'

// null, indicates a deliberate non-value
// undefined, indicates an un-initialized variable

// BOOLEAN
const falses = [false, 0, "", NaN, null, undefined]; // Everyone becomes balse
// Any other value become true
Boolean(''); // false
Boolean(234); // true

// OBJECTS

// Create them in two ways...
let obj = new Object();
obj = {};

let newObj = {
	name: 'Carrot',
	_for: 'Max',
	details: {
		color: 'orange',
		size: 12
	}
};

// Access properties
obj['details'].size; // 12

// Create a object prototype Person, and an instance of that prototype
function Person(name, age) {
	this.name = name;
	this.age = age;
}

const you = new Person('you', 24);

you.name = 'New you';
console.log(you);

// ARRAYS
const myArray = new Array();
myArray[0] = 0;
myArray[1] = 1;

const prettierArray = [0, 1];
prettierArray.length; // 2

// length isnt necessarily the number of items in the array...
prettierArray[100] = 100;
prettierArray.length; // 101
typeof prettierArray[90]; // undefined
prettierArray.push(101);
// More methods later...


// FUNCTIONS
function add(x, y) {
	return x + y;
}
add(); // NaN
add(2,3,4) // 5

const newAdd = function() {
	let sum = 0;
	for (let i = 0, j = arguments.length; i < j; i++) {
		sum += arguments[i];
	}
	return sum;
};

const prettierAdd = (...ags) => {
	let sum = 0;
	for (let value of args) {
		sum += value;
	}
	return sum;
};

// Immediate functions
const aSum = (function(){
	return 2 + 2;
})();

// CUSTOM OBJECTS
// Objects are collections of data and methods
// Javascript

/* OPERATORS */

// Numeric operators are +. -, *, / and %
// Values are assigned using =
// Compound assignment statements such as += and -=
// Increment and decrement ++ --
// Comparision ==, ===, >=, <=, >, <
// Boolean: && || ! !!
// Bitwise operators
let x = 1;
let y = 2;
console.log(`x + y = ${x + y}`);
console.log(`x - y = ${x - y}`);
console.log(`x * y = ${x * y}`);
console.log(`x / y = ${x / y}`);
console.log(`x % y = ${x % y}`);
console.log(`x += 1 = ${x+=1}`);
console.log(`x -= 1 = ${x-=1}`);
console.log(`y++ = ${y++}`);
console.log(`++y = ${++y}`);

// You can also use operators with other types such as strings and booleans
console.log(`hello + world = ${'hello' + 'world'}`);
console.log(`true == false = ${true === false}`);
