// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

// Example 1:

// Input: 121
// Output: true
// Example 2:

// Input: -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
// Follow up:

// Could you solve it without converting the integer to a string?

/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  let xCopy = x
  let reversed = 0
  while (x > 0) {
    reversed = reversed * 10 + x % 10
    x = x / 10 | 0
  }
  return reversed === xCopy
}

console.log(isPalindrome(121))
console.log(isPalindrome(-121))
console.log(isPalindrome(10))

function isPalindromeString(x) {
  return x.toString().split('').reverse().join('') === x.toString()
}

console.log("==================")
console.log(isPalindromeString(121))
console.log(isPalindromeString(-121))
console.log(isPalindromeString(10))