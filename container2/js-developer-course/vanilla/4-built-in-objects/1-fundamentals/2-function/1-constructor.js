/*
Creates a new Function object. Calling the constructor directly
can create functions dynamically, but suffers from security and
similar performance issues to `eval`. However, the Function constructor
creates functions which execute in the global scope only.
 */

/*
PROPERTIES AND METHODS
The global `Function` object has no methods or properties of its own.
However, since it is a function itself, it does inherit some methods
and properties through the prototype chain from `Function.prototype`.
 */

const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6)); // 8

/*
Function.prototype.constructor:
specifies the function that creates an object's prototype.
See Object.prototype.constructor for mor details
 */
