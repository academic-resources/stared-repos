// Hi, here's your problem today. This problem was recently asked by Microsoft:

// Given a string, find the length of the longest substring without repeating characters.

// Here is an example solution in Python language. (Any language is OK to use in an interview, though we'd recommend Python as a generalist language utilized by companies like Google, Facebook, Netflix, Dropbox, Pinterest, Uber, etc.,)

// class Solution:
//   def lengthOfLongestSubstring(self, s):
//     # Fill this in.

function lengthOfLongestSubstring(string) {
  let seen = new Set()
  let start = 0
  let end = 0
  let size = 0

  while (end < string.length) {
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
}

// print Solution().lengthOfLongestSubstring('abrkaabcdefghijjxxx')
// # 10

console.log(lengthOfLongestSubstring('abrkaabcdefghijjxxx')) // => 10

// Can you find a solution in linear time?