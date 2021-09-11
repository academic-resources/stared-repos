/*
GeneratorFunction constructor creates a new generator function object.
In JavaScript every generator function is actually a GeneratorFunction object.

Note that GeneratorFunction is not a global object.

generator function objects created with GeneratorFunction constructor
are parsed when the function is created. This is less efficient than
declaring a generator function with a function* expression and calling it
within your code. Also, those generator functions do not create closures
to their creation contexts, they always are created in the global scope.
 */

console.log(Object.getPrototypeOf(function*(){}).constructor);
// GeneratorFunction

/*
SYNTAX

new GeneratorFunction([arg1[, ...[, argN]]], functionBody);

+ arg1, ... argN
names to be used as formal argument names. Each must be
a string that corresponds to a valid js identifier or a list
of such strings separated with a comma.

+ functionBody
a string containing the JS statements comprising the function
definition.
 */

// EXAMPLE
var GeneratorFunction = Object.setPrototypeOf(function*(){}).constructor
var g = new GeneratorFunction('a', 'yield a * 2');
var iterator = g(10);
console.log(iterator.next().value); // 20
