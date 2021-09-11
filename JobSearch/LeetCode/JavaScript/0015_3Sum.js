// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Note:

// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// a + b + c = 0
// -a = b + c

function threeSum(nums) {
  let triples = []
  let numsHash = {}
  for (let a = 0; a < nums.length - 2; a++) {
    for (let b = a + 1; nums.length - 1; b++) {
      
    }

    numsHash[-nums[a]] = a
  }
  return triples
};

// T(n^2 + n log(n)) => O(n^2)
function threeSumSolution(nums) {
  let result = []
  nums.sort((a, b) => a - b) // arrange in ascending order
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break //if always positive, stop looping
    if (i > 0 && nums[i] === nums[i - 1]) continue // skip logic if same value
    let low = i + 1
    let high = nums.length - 1
    while (low < high) {
      let triple = nums[i] + nums[low] + nums[high]
      if (triple > 0) high--
      if (triple < 0) low++
      if (triple === 0) {
        result.push([nums[i], nums[low], nums[high]])
        low++; high-- // then deal with duplicate values
        while (nums[low] === nums[low - 1]) low++
        while (nums[high] === nums[high + 1]) high--
      }
    }
  }
  return result
}

console.log(threeSumSolution([-1, 0, 1, 2, -1, -4]))
console.log(threeSumSolution([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))
console.log(threeSumSolution([-4]))
console.log(threeSumSolution([]))