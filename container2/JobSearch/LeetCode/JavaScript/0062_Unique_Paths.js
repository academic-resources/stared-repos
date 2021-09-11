// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

// How many possible unique paths are there?


// Above is a 7 x 3 grid. How many possible unique paths are there?

// Note: m and n will be at most 100.

// Example 1:

// Input: m = 3, n = 2
// Output: 3
// Explanation:
// From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right
// Example 2:

// Input: m = 7, n = 3
// Output: 28

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

function uniquePaths(m, n) {
  let dp = new Array(m).fill().map(_ => new Array(n).fill(1))

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};

console.log(uniquePaths(3, 2))
console.log(uniquePaths(7, 3))

function uniquePathsMath(m, n) {
  if (m === 1 || n === 1) return 1
  m--; n--
  if (m < n) [m, n] = [n, m]
  let result = 1
  for (let i = m + 1, j = 1; i <= m + n; i++, j++) {
    result *= i;
    result /= j;
  }
  return result
}

console.log("==========")
console.log(uniquePathsMath(3, 2))
console.log(uniquePathsMath(7, 3))


function uniquePathsFactCombo(m, n) {
  var fac = i => {
    let product = 1;
    for (let j = 1; j <= i; j++) product *= j
    return product;
  }
  
  let upper = fac(m - 1 + n - 1);
  let lower = fac(m - 1) * fac(n - 1);
  
  return upper / lower;
};

console.log("==========")
console.log(uniquePathsFactCombo(3, 2))
console.log(uniquePathsFactCombo(7, 3))