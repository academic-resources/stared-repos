/*
Symbol is a primitive data type. `Symbol()` function returns a value of
type symbol, has static properties that expose several members of built-in
objects, has static methods that expose the global symbol registry, and
resembles a built-in object class, but is incomplete as a constructor
because it does not support the syntax `new Symbol()`.

Every symbol value returned from `Symbol()` is UNIQUE. This symbol value
may be used as an identifier for object properties, although other use-cases
exist, such as enabling opaque data types, or serving as an implementation
supported unique identifier in general.

Symbol([description]):
A description of the symbol can e used for debugging but not to access the
symbol itself.
 */

const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1); // symbol

console.log(symbol3.toString()); // Symbol(foo)

consolelog(Symbol('foo') === Symbol('foo')); // false

/*
`Object.getOwnPropertySymbols()` returns an array of symbols and lets
you find symbol properties on a given object.
 */
