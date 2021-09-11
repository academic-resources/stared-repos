// In JS, there is not distinguising between integer or float.  Both are 'number'

console.log(typeof 17)   // => number
console.log(typeof 98.6) // => number
console.log(typeof -2.1) // => number

console.log(0.1 * 1.9)
console.log(-99 + 100)
console.log(21 - 12.3)
console.log(2.5 / 5)
console.log(21 % 8)


// bitwise operators are special
console.log(8 | 1)
// they are converted to 32-bit integers (binary)
console.log((8).toString(2))
console.log((1).toString(2))
// the bitwise OR '|' operator combines the two bit sequences
radixOR = String(Number((8).toString(2)) + Number((1).toString(2))) // 1000 + 1
console.log(radixOR)
console.log(parseInt(radixOR, 2)) // => 9


//floating points look familiar but are desceptively inaccurate
console.log(0.1 + 0.2) // => 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // => false


// Things to Remember
// - JavaScript numbers are double-precistion floating-point numbers
// - Integers in JavaScript are just a subset of doubles rather than a separate datatype
// - Bitwise operators treat numbers as if they were 32-bit signed integners
// - Be aware of limitations of precisions in floating-point arithmetc