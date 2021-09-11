# Hoisting

A strict definition of hosting suggests that variable and function declaratis are physically moved to the top of your code, but this is not in fact what happens.

Instead, the __variable and function declarations are put into memory during the compile phase__, but stay exactly where you typed them in your code.

## Technical example

One of the advantages of JS putting function declarations into memory before it executes any code segment is that it allows you to use a function before you declare it in your code.

```js
catName("Tiger")

function catName(name) {
	console.log(`My cat name is ${name}`)
}
```

## Only Declarations Are Hoisted

JS only hoists declarations, not initializations. If a variable is declared and initialized after using it, the value will be undefined.

```js
console.log(num) // undefined
var num // declaration
num = 6 // initialization
```

```js
console.log(num) // ReferenceError
let num = 6; // declaration without hosting and initialization
```
