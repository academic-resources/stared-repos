// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
// Example 2:

// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} string
 * @return {string}
 */

// manachers
function longestPalindrome(string) {
  let workStr = "!#";
  for (let char of string) workStr += char + "#"
  
  console.log(workStr)

  const posCts = []
  let leftIdx = 0, rightIdx = 0, bestPalSize = 0, bestPalCtr = 0

  for (let i = 1; i < workStr.length; i++){
    posCts[i] = rightIdx > i ? Math.min(rightIdx - i, posCts[2 * leftIdx - i]) : 1

    while(i + posCts[i] < workStr.length) {
      if (workStr[i + posCts[i]] === workStr[i - posCts[i]]) posCts[i]++
      else break
    }

    let currPalSize = posCts[i]
    if (rightIdx < i + currPalSize) {
      leftIdx = i
      rightIdx = i + currPalSize
    }
    if (bestPalSize < currPalSize) {
      bestPalSize = currPalSize
      bestPalCtr = i
    }	
  }
  console.log(posCts)
  let palIdx = (bestPalCtr - bestPalSize) / 2
  let palLength = palIdx + bestPalSize - 1
  return string.substring(palIdx, palLength)
}

console.log(longestPalindrome("babad"))
console.log(longestPalindrome("cbbd"))
console.log(longestPalindrome("tracecars"))
console.log(longestPalindrome("aca")) //   #a# c #a#
console.log(longestPalindrome("acca"))//  #a#c # #c#a#
console.log(longestPalindrome("asdf"))
console.log(longestPalindrome(""))

