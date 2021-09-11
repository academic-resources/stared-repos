/*
`Symbol.for(keys)`: searches for existing symbols with the given key
and returns if it founds. Otherwise a new symbol gets created
in global symbol registry with keys, this is the difference with Symbol().
 */

console.log(Symbol.for('bar') === Symbol.for('bar'));
// true

console.log(Symbol('bar') === Symbol('bar'));
// false

const symbol1 = Symbol.for('for');
console.log(symbol1.toString());
// "Symbol(foo)"

/*
`Symbol.keyFor(sym)`: retrieves a shared symbol key from the
global symbol registry for the given symbol
 */

const globalSym = Symbol.for('foo'); // global symbol

console.log(Symbol.keyFor(globalSym));
// "foo"

const localSym = Symbol(); // local symbol

console.log(Symbol.keyFor(localSym));
// undefined

console.log(Symbol.keyFor(Symbol.iterator));
// undefined

/*
`Symbol.prototype.constructor`:
returns function that created an instance's prototype. This is
the Symbol function by default.
 */

/*
`Symbol.prototype.description`:
A read-only string containing the description of the symbol
 */

/*
`Symbol.prototype.toString():
Returns a string containing the description of the Symbol.
Overrides `Object.prototype.valueOf()`.
 */

/*
`Symbol.prototype.valueOf()`:
Returns the primitive value of the `Symbol` object.
Overrides `Object.prototype.valueOf()`.
 */

/*
Symbol.prototype[@@toPrimitive]:
Returns the primitive value of the `Symbol` object.
Javascript invokes [@@toPrimitive]() method when encountering
an object where a primitive value is expected.
 */
