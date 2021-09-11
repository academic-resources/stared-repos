// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// brute force T(n^2) S(1)
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) return [i, j]
      }
    }
    return null
};

console.log(twoSum([2, 7, 11, 15], 9))


function twoSumHash(nums, target) {
  let numsHash = {}
  for (let i = 0; i < nums.length; i++) {
    let delta = target - nums[i]
    if (delta in numsHash) return [numsHash[delta], i]
    numsHash[nums[i]] = i
  }
  return null
}

console.log(twoSumHash([2, 7, 11, 15], 9))