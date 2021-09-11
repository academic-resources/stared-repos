function test(input) {
  return !input
}

console.log(test("hi")) // => false
console.log(test(""))
console.log(test(NaN))
console.log(test(0))
console.log(test(true))
console.log(test(1))
