/*
* A closure is the combination of a function bundled together
* with references to its surrounding state (lexical environment).
* A closure gives you access to an outer function's scope
* from an inner function.
*
 */

function makeFunc() {
	const name = 'Nacho'; // local variable created by init
	function displayName() {
		// inner function, a closure
		// we can use variable declared in the outer function
		console.log(name);
	}
	return displayName;
}

const myFunc = makeFunc();
myFunc(); // Nacho

/*
* In some other programming languages, local variables
* within a function, exist only for the duration of
* that function's execution.
* In JavaScript, function form closures. This allows
* inner functions to maintain a reference to its
* lexical environment.
*
 */

// Practical example
function makeAdder(x) {
	return function(y) {
		return x + y
	};
}
const add5 = makeAdder(5);
// console.log(add5(2)); // 7

// Emulating private methods and managing namespaces
const counter = (function() {
	let privateCounter = 0;
	function changeBy(val) {
		privateCounter += val;
	}
	return {
		increment: function() {
			changeBy(1);
		},
		decrement: function() {
			changeBy(-1);
		},
		value: function() {
			return privateCounter;
		}
	}
})();

console.log(counter.value()); // 0
counter.increment();
console.log(counter.value()); // 1
counter.decrement();
console.log(counter.value()); // 0
let myVal = counter.value();
myVal = 5; // this will just modify a copy of the privateCounter
console.log(counter.value()); // 0

