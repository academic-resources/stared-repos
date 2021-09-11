// Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.

// Example:

// nums = [1, 2, 3]
// target = 4

// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)

// Note that different sequences are counted as different combinations.

// Therefore the output is 7.
 

// Follow up:
// What if negative numbers are allowed in the given array?
// How does it change the problem?
// What limitation we need to add to the question to allow negative numbers?

// Credits:
// Special thanks to @pbrother for adding this problem and creating all test cases.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// function combinationSum4(nums, target) {
//   let currNum = nums[0]
//   if (curNum = target) return 
//   if (target - currNum > 0) combinationSum4(nums, target - currNum)
// };

function combinationSum4Recur(nums, target, i, memo) {
  memo = memo || new Array(target + 1).fill(-1)
  //Our constraints : We can't go beyond target, we can take more element than available in array
  if (i >= nums.length) return 0

  //3. Our goal: when currentSum = target
  if (0 === target) return 1

  if (memo[target] !== -1) return memo[target]

  let result = 0;
  //1. Our choices: We can choose a number from the list any number of times and all the numbers
  for (let s = 0; s < nums.length; s++) {
    //Our constraints : We can't go beyond target, we can take more element than available in array
    if (target - nums[s] >= 0) {
      target -= nums[s];
      result += combinationSum4Recur(nums, target, s, memo);
      //backtrack
      target += nums[s];
    }
  }
  return memo[target] = result;
}


console.log(combinationSum4Recur([1, 2, 3], 4))
console.log(combinationSum4Recur([5, 6, 1], 8))
console.log(combinationSum4Recur([1, 2], 3))


function combinationSum4DP(nums, target) {
  if (nums == null || nums.length == 0) return 0;
  dp = new Array(target + 1).fill(0)
  //base case
  dp[0] = 1;

  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i >= nums[j]) dp[i] += dp[i - nums[j]];
    }
  }
  // console.log(dp)
  return dp[target];
}

console.log("==========")
console.log(combinationSum4DP([1, 2, 3], 4))
console.log(combinationSum4DP([5, 6, 1], 8))
console.log(combinationSum4DP([1, 2], 3))


/**
     * Recurrence relation
     * *     comb[target] = {
     * *         sum(comb[target - nums[i]]) target> 0
     * *         1: when target=0,
     * *     }
     * Overlapping sub-problems; cache it
     * Complexity: O(n*n)
     * <p>
     * Runtime: 0 ms, faster than 100.00% of Java online submissions for Combination Sum IV.
     * Memory Usage: 34.2 MB, less than 100.00% of Java online submissions for Combination Sum IV.
     */

function combinationSum4(nums, target, currSum = 0, dp) {
  dp = dp || new Array(target + 1).fill(-1)
  if (currSum > target) return 0 //base case
  if (target === currSum) return 1;
  if (dp[currSum] != -1) return dp[currSum];

  let result = 0;
  for (let i = 0; i < nums.length; i++) //O(n)
      result += combinationSum4(nums, target, currSum + nums[i], dp); //O(n)

  return result;
}

console.log("===========")
console.log(combinationSum4([1, 2, 3], 4))
console.log(combinationSum4([5, 6, 1], 8))
console.log(combinationSum4([1, 2], 3))
