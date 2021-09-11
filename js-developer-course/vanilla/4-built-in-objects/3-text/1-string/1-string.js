/*
`String` global object is a constructor for string or a
sequence of characters.

Js makes no distinction between single-quoted and double-quoted
strings.
 */

// STRING LITERALS
'string text';
'This is a very long string which needs \
to wrap across multiple lanes';

// Can also be created using String object directly
String('string text');

// TEMPLATE LITERALS
const who = 'me';
`hello ${who}`;

// CHARACTER ACCESS
console.log('cat'.charAt(1)); // 'a'
console.log('cat'[1]); // 'a'

// Comparing strings
let a = 'a';
let b = 'b';
console.log(a > b); // true
console.log(a.localeCompare(b)); // 1 (true)

// String primitives vs String objects
let s_prim = 'foo'
let s_obj = new String(s_prim)

console.log(typeof s_prim) // string
console.log(typeof s_obj) // object

console.log(eval('2 + 2')) // 4
console.log(eval(new String('2 + 2'))) // "2 + 2"
console.log(eval(new String('2 + 2').valueOf())) // 4

/*
+ String.fromCharCode(num1 [, ... [, numN]])
	returns string created by using specified sequence of Unicode values
+ String.fromCodePoint(num1 [, ... [,numN]])
	returns string created by using specified sequence of code points
+ String.raw()
	returns string created from a raw template string
 */
