// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

// Example 1:

// Input: [2,3,2]
// Output: 3
// Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
//              because they are adjacent houses.
// Example 2:

// Input: [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
//              Total amount you can rob = 1 + 3 = 4.

/**
 * @param {number[]} nums
 * @return {number}
 */

var rob = function(nums) {
  const N = nums.length
  if (N === 0) return 0;
  if (N === 1) return nums[0];
  
  // robbing first house
  const dp = [nums[0], Math.max(nums[0], nums[1])]
  
  // robbing last house
  const dp2 = [0, nums[1]]
  
  for (let i = 2; i < N; i++) {
    dp[i] = i === N - 1 ? dp[i-1] : Math.max(dp[i-1], dp[i - 2] + nums[i]);
    dp2[i] = Math.max(dp2[i-1], dp2[i - 2] + nums[i])
  
  }

  return Math.max(dp[N - 1], dp2[N - 1])
};


console.log(rob([1,2,3,1]))   // => 4
console.log(rob([2,3,2]))     // => 3
console.log(rob([2,3,5]))     // => 5
console.log(rob([1,3,1,5,1])) // => 8
console.log(rob([1,3,1,1,5])) // => 8
console.log(rob([3,1,1,5]))   // => 6