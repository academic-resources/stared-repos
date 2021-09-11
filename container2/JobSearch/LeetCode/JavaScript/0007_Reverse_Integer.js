// Given a 32-bit signed integer, reverse digits of an integer.

// Example 1:

// Input: 123
// Output: 321
// Example 2:

// Input: -123
// Output: -321
// Example 3:

// Input: 120
// Output: 21
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

/**
 * @param {number} x
 * @return {number}
 */

// naive approach
function reverse(x) {
  let sign = x < 0 ? "-" : ""
  let reversed = Math.abs(x).toString().split('').reverse().join('')
  if (Number(reversed) > 2**31-1) return 0
  return Number(sign + reversed)
};

console.log(reverse(123))
console.log(reverse(-123))
console.log(reverse(120))

function reverseMod(x) {
  const sign = Math.sign(x)
  x = Math.abs(x)
  let reversed = 0

  while (x > 0) {
    reversed = reversed * 10 + x % 10
    x = x / 10 | 0
  }
  if (reversed > 2**31) return 0
  return reversed * sign
}



console.log("===========")
console.log(reverseMod(123))
console.log(reverseMod(-123))
console.log(reverseMod(120))
console.log(reverseMod(-1))
console.log(reverseMod(4294967294))
console.log(reverseMod(429496729))


