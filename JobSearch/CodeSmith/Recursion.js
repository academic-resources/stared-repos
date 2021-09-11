// MY SOLUTION
console.log('Hello, world!');

function repeater(char) {
	if (char.length === 5) return char
  return repeater(char += char[0])
}

// To check if you've completed the challenge, uncomment these console.logs!
console.log(repeater('g'));
console.log(repeater('j'));

//=========================
// Write a function that takes an input character and returns that character repeated 5 times using recursion. For example, if the input is 'g', then the output should be 'ggggg'.

// Input: {String} char
// Output: {String}

let output = ''
// strategy: build output string to return
function repeaterCSXSolution(char) {
  // base case: when output has length 5; return output
  if (output.length === 5) return output
  
  // concat char to output
  output += char

  // recurive call
  return repeaterCSXSolution(char)
}

console.log(repeaterCSXSolution("g"))

output = ''
function repeaterCSXSolutionUpdated(char, maxLength = 5) {
  // base case: when output has length 5; return output
  if (output.length === maxLength) return output
  
  // concat char to output
  output += char

  // recurive call
  return repeaterCSXSolutionUpdated(char, maxLength)
}

console.log(repeaterCSXSolutionUpdated("j"))
console.log(repeaterCSXSolutionUpdated("g", 8))


//MY SOLUTION
function factorial(num) {
  if (num === 0) return 1
	return num * factorial(num - 1)
}

// To check if you've completed the challenge, uncomment these console.logs!
console.log(factorial(4)); // -> 24
console.log(factorial(6)); // -> 720
console.log(factorial(0)); // -> 1

// Write a function that returns the factorial of a number.

// EXAMPLE4! = 4 * 3 * 2 * 1 = 24, so calling factorial(4) should return 24.

// Input: {Number} num - number whose factorial is sought
// Output: {Number}

function factorialCSXSolution(num, product = 1) {
  // base case: when num is 1, return product
  if (num === 1) return product
  if (num === 0) return 1 // necessary for argument of 0
  // multiply the product and num into a new product
  const newProduct = product * num

  // decrement num
  const newNum = num - 1

  // recurse with updated inputs
  return factorialCSXSolution(newNum, newProduct)
}

console.log(factorialCSXSolution(4)); // -> 24
console.log(factorialCSXSolution(6)); // -> 720
console.log(factorialCSXSolution(0)); // -> 1



// take in an array and return a number
// store length in paramaters
function getLength(array, length = 0) {
  // base case: if array index is undefined; return length
  if (array[length] === undefined) return length
  
  // increment length
	let newLength = length + 1
  
  // recurse with new length
  return getLength(array, newLength)
}

// To check if you've completed the challenge, uncomment these console.logs!
console.log(getLength([1])); // -> 1
console.log(getLength([1, 2])); // -> 2
console.log(getLength([1, 2, 3, 4, 5])); // -> 5
console.log(getLength([])); // -> 0

// Get the length of an array using recursion without accessing its length property.

// Input: {Array} array - array whose length is sought
// Output: {Number}

// Don't like their solution - O(n^2)
function getLengthCSXSolution(array, length = 0) {
  // base case: if array index is undefined; return length
  if (array[0] === undefined) return length
  
  // increment length
	length++
  
  // recurse with new length
  return getLengthCSXSolution(array.slice(1), length)
}

// To check if you've completed the challenge, uncomment these console.logs!
console.log(getLengthCSXSolution([1])); // -> 1
console.log(getLengthCSXSolution([1, 2])); // -> 2
console.log(getLengthCSXSolution([1, 2, 3, 4, 5])); // -> 5
console.log(getLengthCSXSolution([])); // -> 0


function pow(base, exponent) {
  if (exponent > 0) {
    return base * pow(base, exponent - 1)
  } else if (exponent < 0) {
    return 1 / base * pow(base, exponent + 1)
  } else return 1  
}

// To check if you've completed the challenge, uncomment these console.logs!
console.log(pow(2, 4)); // -> 16
console.log(pow(3, 5)); // -> 243
console.log(pow(2, -2)) // -> 0.2


function flow(input, funcArray) {
  if (funcArray.length === 1) return funcArray[0](input)
	return flow(funcArray[0](input), funcArray.slice(1))
}

// To check if you've completed the challenge, uncomment this code!
function multiplyBy2(num) { return num * 2; }
function add7(num) { return num + 7; }
function modulo4(num) { return num % 4; }
function subtract10(num) { return num - 10; }
const arrayOfFunctions = [multiplyBy2, add7, modulo4, subtract10];
console.log(flow(2, arrayOfFunctions)); // -> -7