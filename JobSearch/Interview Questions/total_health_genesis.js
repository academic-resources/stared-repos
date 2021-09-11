// 1. 1) Write a function to categorize a given temperature in Fahrenheit and return one of the strings: "Freezing", "Cold", "Mild", "Hot", "Scorching".

function howIsItOutside(temp) {
  switch (true) {
    case temp < 33:
      return "Freezing"
    case temp < 63:
      return "Cold"
    case temp < 80:
      return "Mild"
    case temp < 100:
      return "Hot"
    case temp >= 100:
      return "Scorching"
    default:
      return "I need a temperature in Fahrenheit"
  }
}

console.log(howIsItOutside(32))
console.log(howIsItOutside(45))
console.log(howIsItOutside(68))
console.log(howIsItOutside(99))
console.log(howIsItOutside(105))
console.log(howIsItOutside("apple"))
console.log(howIsItOutside("0"))

// 2. 2) The value of the variable input is a string 1,2,3,4,5,6,7. How would you get the sum of the integers contained inside input?

var input = "1,2,3,4,5,6,7"

// function stringSum(input) {
//   let total = 0
//   input.split(",").forEach( el => total += Number(el) )
//   return total
// }

function stringSum(input) {
  return input.split(",").reduce( (total, el) => Number(total) + Number(el) )
}

console.log(stringSum(input))