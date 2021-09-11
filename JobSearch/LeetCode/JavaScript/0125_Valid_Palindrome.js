// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

// Note: For the purpose of this problem, we define empty string as valid palindrome.

// Example 1:
// Input: "A man, a plan, a canal: Panama"
// Output: true
// Example 2:

// Input: "race a car"
// Output: false

/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  let i = 0
  let j = s.length - 1
  // let alpha = /[0-9a-z]/ // uses more memory

  while (i < j) {
    // let iChar = s[i].toLowerCase()
    // let jChar = s[j].toLowerCase()
    if (!isLowerAlpha(s[i].toLowerCase())) { i++ ; continue }
    if (!isLowerAlpha(s[j].toLowerCase())) { j-- ; continue }
    if (s[i].toLowerCase() === s[j].toLowerCase()) { i++ ; j-- }
    else return false
  }
  return true
}

const isLowerAlpha = char => {
  let check = char.charCodeAt(0)
  return (check >= 97 && check <= 122) || (check >= 48 && check <= 57)
}

function isPalindrome2(string) {
  const checkIfCorrectCharacter = elem => (
      (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122)
  || 
      (elem.charCodeAt(0) >= 48 && elem.charCodeAt(0) <= 57)
  );
  const emptyString = string.toLowerCase().split('').filter(checkIfCorrectCharacter);
  return emptyString.join('') === emptyString.reverse().join('');
};
console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("race a car"))
console.log(isPalindrome("a"))
console.log(isPalindrome(""))
console.log(isPalindrome("0P"))