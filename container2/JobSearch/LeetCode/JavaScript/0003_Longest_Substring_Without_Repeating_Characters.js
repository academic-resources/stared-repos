// Given a string, find the length of the longest substring without repeating characters.

// Example 1:

// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 
// Example 2:

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} string
 * @return {number}
 */

function lengthOfLongestSubstring(string) {
  if (!string.length) return 0
  let start = 0
  let end = 0
  let size = 0
  const seen = new Set()
  while (start < string.length && end < string.length) {
    if (!seen.has(string[end])) {
      seen.add(string[end])
      end++
      size = Math.max(size, end - start)
    } else {
      seen.delete(string[start])
      start++
    }
  }
  return size
};

function lengthOfLongestSubstring2(string) {
  seen = {}
  currSize = 0
  maxSize = currSize
  for (let idx = 0; idx < string.length; idx++) {
    let char = string[idx]
    if ((char) in seen) currSize = Math.max(seen[char], currSize)
    maxSize = Math.max(maxSize, idx + 1 - currSize)
    seen[char] = idx + 1
  }
  return maxSize
}

// console.log(lengthOfLongestSubstring("abcabcbb"))
// console.log(lengthOfLongestSubstring("bbbbb"))
// console.log(lengthOfLongestSubstring("pwwkew"))
// console.log(lengthOfLongestSubstring("abcdefghijkasdfasdfawelfkw"))
// console.log(lengthOfLongestSubstring("zyxajslasowei"))
// console.log(lengthOfLongestSubstring("abcdefghijklmnopqrstuvwxyzabcdefghhhhhh"))
// console.log('========================')
console.log(lengthOfLongestSubstring2("abcabcbb"))
console.log(lengthOfLongestSubstring2("bbbbb"))
console.log(lengthOfLongestSubstring2("pwwkew"))
console.log(lengthOfLongestSubstring2("abcdefghijkasdfasdfawelfkw"))
console.log(lengthOfLongestSubstring2("zyxajslasowei"))
console.log(lengthOfLongestSubstring2("abcdefghijklmnopqrstuvwxyzabcdefghhhhhh"))
console.log(lengthOfLongestSubstring2("a"))
console.log(lengthOfLongestSubstring2("ab"))