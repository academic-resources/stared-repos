// Given an array of strings, group anagrams together.

// Example:

// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// Note:

// All inputs will be in lowercase.
// The order of your output does not matter.

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

// brute force
function groupAnagrams(strs) {
  if (strs.length <= 1) return [strs]
  let anagrams = {}
  anagrams[strs[0]] = [strs[0]]

  strLoop: for (let i = 1; i < strs.length; i++) {
    let bases = Object.keys(anagrams)
    let currWord = strs[i]
    for (let base of bases) {
      if (isAnagram(currWord, base)) {
        anagrams[base].push(currWord)
        continue strLoop
      }
    }
    anagrams[currWord] = [currWord]
  }
  return Object.values(anagrams)
}

function isAnagram(word1, word2) {
  if (word1.length !== word2.length) return false

  charCts = {}
  for (let char of word1) {
    if (charCts[char]) charCts[char]++
    else charCts[char] = 1
  }
  for (let char of word2) {
    if (charCts[char]) charCts[char]--
    else return false
  }
  return true
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(groupAnagrams([""]))


function groupAnagramsSort(strs) {
  let anagrams = {}
    strs.forEach(str => {
      let sortedStr = str.split('').sort().join('')
      if (anagrams[sortedStr]) anagrams[sortedStr].push(str)
      else anagrams[sortedStr] = [str]
    })
  return Object.values(anagrams)
}

console.log(groupAnagramsSort(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(groupAnagramsSort([""]))


function groupAnagramsCountingSort(strs) {
  let anagrams = {}
  let charCts = new Array(26)
  
  for (let word of strs) {
    charCts.fill(0)
    for (let char of word) charCts[char.charCodeAt(0) - 97]++
    let charKey = charCts.join('')
    if (!(charKey in anagrams)) anagrams[charKey] = []
    anagrams[charKey].push(word)
  }
  return Object.values(anagrams)
}

console.log(groupAnagramsCountingSort(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(groupAnagramsCountingSort([""]))