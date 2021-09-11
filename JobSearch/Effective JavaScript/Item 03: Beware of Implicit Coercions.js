// Javascript allows this:

console.log(3 + true) // => 4
// WAT!

// "hello"(1) // error: not a function
// null.x     // error: cannot read property 'x' of null


// In most other cases, JS will coerce numbers
console.log(2 + 3) // => 5
console.log("hello" + " world") // "hello world"
console.log("2" + 3) // => "23"
console.log(2 + "3") // => "23"

// String coercion takes precedence
console.log(1 + 2 + "3") // => "33"
console.log((1 + 2) + "3") // => "33"
console.log((1 + "2") + 3) // => "123"