// Hi, here's your problem today. This problem was recently asked by Twitter:

// A palindrome is a sequence of characters that reads the same backwards and forwards. Given a string, s, find the longest palindromic substring in s.

// Example:
// Input: "banana"
// Output: "anana"

// Input: "million"
// Output: "illi"
// class Solution: 
//     def longestPalindrome(self, s):
//       # Fill this in.


// Using Manacher's
function longestPalindrome(string) {
  //process string to allow algorithm - O(n)
  let workStr = "!#";
  for (char in string) workStr += string[char] + "#"

  const posCts = []
  let leftIdx = 0, rightIdx = 0, subLength = 0, subCenter = 0
  
  // iterate through workStr starting at index 1 to account for '!' O(2n)
  for (let i = 1; i < workStr.length; i++){
    posCts[i] = rightIdx > i ? Math.min(rightIdx - i, posCts[2 * leftIdx - i]) : 1
    
    while(i + posCts[i] < workStr.length) {
      // if symmetric, find length of palindrome
      if (workStr[i + posCts[i]] === workStr[i - posCts[i]]) posCts[i]++
      else break
    }
    if (rightIdx < i + posCts[i]) {
      leftIdx = i;
      rightIdx = i + posCts[i]
    }
    if (subLength < posCts[i]) {
      subLength = posCts[i]
      subCenter = i
    }	
  }

  let palIdx = (subCenter - subLength) / 2
  let palLength = (subCenter - subLength) / 2 + (subLength - 1)
  return string.substring(palIdx, palLength)
}

// # Test program
// s = "tracecars"
// print(str(Solution().longestPalindrome(s)))
// # racecar

console.log(longestPalindrome("tracecars"))
console.log(longestPalindrome("summummus"))
console.log(longestPalindrome("baal"))
console.log(longestPalindrome("asdffdsasummeryyremmusasdffdsa"))
console.log(longestPalindrome(""))


