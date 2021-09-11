// IF ELSE ELSE IF
const myBoolean = true;
const myOtherBoolean = false;

if (myBoolean) {
	console.log('Inside IF true branch')
}
else if (myOtherBoolean) {
	// This won't be executed
}

if (myOtherBoolean) {
	// This won't be executed
}
else {
	console.log('Inside else branch');
}

if (myBoolean) {
	console.log('You don\'t need an else branch');
}

// WHILE

let i = 0;
while (i < 3) {
	console.log(`While iteration: ${i}`);
	++i; // CAUTION!
}

// DO WHILE
let count = 0;
i = 0;
do {
	console.log(`Do While iteration: ${count}`);
	count++;
} while (i < 3);

// FOR LOOP
i = 0;
for (i = 0; i < 3; i++) {
	// Will execute 3 times
}

const myArray = [1,2,3];
for (let value of myArray) {
	console.log(`for...of ${value}`);
}

const myObject = {
	one: '1',
	two: '2',
};
for (let property in myObject) {
	if (myObject.hasOwnProperty(property)) {
		console.log(`for...in: ${property}: ${myObject[property]}`)
	}
}

// SHORT CIRCUIT
// && for checking null before accessing object properties
// || for caching values
const myShortCircuit = myBoolean && 'test';

// TERNARY OPEARTOR
const myTernaryOp = myBoolean ? 'true' : 'false'; // 'true'

// SWITCH
const action = 'sayHi';
switch(action) {
	case 'sayHi':
		console.log('Hi from switch');
		break; // Try without this
	case 'sayBye':
		console.log('Bye from switch');
		break;
	default:
		console.log('Default from switch');
}


// Array's forEach
const myArray = [1,2,3];
myArray.forEach((currentValue, index, array) => {
	// Do something with currentValue of array[index]
});
