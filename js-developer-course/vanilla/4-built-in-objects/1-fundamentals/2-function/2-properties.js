/*
`Function.prototype.length` indicates the number of parameters
expected by the function. This number excludes the rest parameter
and only includes parameters before the first one with a default value.

By contrast, `arguments.length` is local to a function and provides
the number of arguments actually passed to the function.
 */

console.log((function() {}).length); // 0
console.log((function(a, b) {}).length); // 2

console.log((function(...args) {}).length); // 0
console.log((function(a, b = 1, c) {}).length); // 1


/*
`Function.prototype.name` indicates the function's name as specified when
it was created, or it may be rather `anonymous` or '' for functions
created anonymously
 */

const func1 = function() {};

const object = {
	func2: function() {}
};

console.log(func1.name); // func1
console.log(object.func2.name); // func2
(new Function).name; // anonymous
(function() {}).name; // ''
(() => {}).name; // ''


// `Function.bind()` appends 'bound ' at the beginning of the name
function foo() {}
foo.bind({}).name; // 'bound foo'

// Get and Set accessor properties will appear also at the beginning of name
let o = {
	get foo() {},
	set foo(x) {}
};

let descriptor = Object.getOwnPropertyDescriptor(o, 'foo');
descriptor.get.name; // 'get foo'
descriptor.set.name; // 'set foo'
