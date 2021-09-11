// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Example:

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Follow up:

// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/**
 * @param {number[]} nums
 * @return {number}
 */

// Input:   [-2,1,-3,4,-1,2,1,-5,4]
// currArr: [-2]  =>  [-2, 1] =>  [1]  =>  [1, -3] =>  [1, -3, 4]
// currSum:  -2   =>  -1      =>   1   =>  -2      =>
// currVal:  -2   =>   1      =>   1   =>   1      =>
// max:      -2   =>   1      =>   1   =>   1      =>
//  


// Kadane's algorithm

function maxSubArray (nums) {
  let runningMax = nums[0]
  let currMax = runningMax

  for (let i = 1; i < nums.length; i++) {
    currMax > 0 ? currMax += nums[i] : currMax = nums[i]
    runningMax = Math.max(runningMax, currMax)
  }

  return runningMax
}