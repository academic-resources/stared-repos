/*
The `AsyncFunction` constructor creates a new `async function` object.
In JS every asynchronous function is actually an AsyncFunction object.

new AsyncFunction([arg1[, ...[, argN]]], function Body);
 */

console.log(
	Object.getPrototypeOf(async function() {}).constructor
); // AsyncFunction

// EXAMPLE

function resolveAfter2Seconds(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(x);
		}, 2000);
	});
}

let AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;

let a = new AsyncFunction('a', 'b',
	'return await resolveAfter2Seconds(a) + wait resolveAfter2Seconds(b)');

a(10, 20)
.then(v => {
	console.log(v); // prints 30 after 4 seconds
});
