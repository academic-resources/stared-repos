// Given an array of integers, find if the array contains any duplicates.

// Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

// Example 1:

// Input: [1,2,3,1]
// Output: true
// Example 2:

// Input: [1,2,3,4]
// Output: false
// Example 3:

// Input: [1,1,1,3,3,4,3,2,4,2]
// Output: true

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// T(n) S(n)
function containsDuplicate(nums) {
  const seen = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) return true
    seen.add(nums[i])
  }
  return false
};

// T(n log n) S(1)
function containsDuplicateSort(nums) {
  nums.sort()
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) return true
  }
  return false
}
