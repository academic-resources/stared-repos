// Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.

// Example 1:

// Input: a = 1, b = 2
// Output: 3
// Example 2:

// Input: a = -2, b = 3
// Output: 1

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function getSum(a, b) {
  while (b !== 0) {
    let carry = (a & b) << 1
    a = a ^ b
    b = carry
  }
  return a
}

console.log(getSum(1, 2))
console.log(getSum(-2, 3))
console.log(getSum(1000000000000000, 1000000000000000))

function getSumRecur(a, b) {
  if (!b) return a
  return getSumRecur(a ^ b, (a & b) << 1)
}

console.log(getSumRecur(1, 2))
console.log(getSumRecur(-2, 3))
console.log(getSumRecur(1))
