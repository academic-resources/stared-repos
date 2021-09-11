// Given two strings s and t , write a function to determine if t is an anagram of s.

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false
// Note:
// You may assume the string contains only lowercase alphabets.

// Follow up:
// What if the inputs contain unicode characters? How would you adapt your solution to such case?

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false

  charCts = {}
  for (let char of s) {
    if (charCts[char]) charCts[char]++
    else charCts[char] = 1
  }
  for (let char of t) {
    if (charCts[char]) charCts[char]--
    else return false
  }
  return true
};

console.log(isAnagram("happy", "happy"))      // => true
console.log(isAnagram("happy", "happpy"))     // => false
console.log(isAnagram("anagram", "nagaram"))  // => true
console.log(isAnagram("apple", "leppa"))      // => true
console.log(isAnagram("apple", "leppo"))      // => false
console.log(isAnagram("aacc", "cacc"))        // => false


function isAnagramFast(s, t) {
  if (s.length !== t.length) return false

  let charCts = (object, string) => {
    for (let char = 0; char < string.length; char++) {
      if (string[char] in object) object[string[char]]++
      else object[string[char]] = 1
    }
  }

  const sChar = {}
  const tChar = {}

  charCts(sChar, s)
  charCts(tChar, t)
  
  let keys = Object.keys(sChar)
  for (let key of keys) {
    if (!(key in tChar) || tChar[key] !== sChar[key]) return false
  }

  return true
};

console.log("===================")
console.log(isAnagramFast("happy", "happy"))      // => true
console.log(isAnagramFast("happy", "happpy"))     // => false
console.log(isAnagramFast("anagram", "nagaram"))  // => true
console.log(isAnagramFast("apple", "leppa"))      // => true
console.log(isAnagramFast("apple", "leppo"))      // => false
console.log(isAnagramFast("aacc", "cacc"))        // => false