// Given two strings text1 and text2, return the length of their longest common subsequence.

// A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

// If there is no common subsequence, return 0.

 

// Example 1:

// Input: text1 = "abcde", text2 = "ace" 
// Output: 3  
// Explanation: The longest common subsequence is "ace" and its length is 3.
// Example 2:

// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.
// Example 3:

// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.
 

// Constraints:

// 1 <= text1.length <= 1000
// 1 <= text2.length <= 1000
// The input strings consist of lowercase English characters only.

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

function longestCommonSubsequence(text1, text2) {
  let m = text1.length 
  let n = text2.length 
  let dp = new Array(m + 1).fill(0).map(sub => new Array(n + 1).fill(0))
  for (let i = 0; i < m; i++)  
    for (let j = 0; j < n; j++)  
      dp[i+1][j+1] = text1[i] === text2[j] ? dp[i][j] + 1 : Math.max(dp[i][j+1], dp[i+1][j])
  return dp[m][n]
}

console.log(longestCommonSubsequence("abcde", "ace"))
console.log(longestCommonSubsequence("abc", "abc"))
console.log(longestCommonSubsequence("abc", "def"))
console.log(longestCommonSubsequence("aefbcd", "def"))
console.log(longestCommonSubsequence("abbcdefghaefbcd", "defbbcdghae"))
console.log(longestCommonSubsequence("hofubmnylkra", "pqhgxgdofcvmr"))