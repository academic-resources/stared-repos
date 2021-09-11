// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

// Example:

// Input:  [1,2,3,4]
// Output: [24,12,8,6]
// Note: Please solve it without division and in O(n).

// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)


/**
 * @param {number[]} nums
 * @return {number[]}
 */

// input: [1, 2, 3, 4]

// **if empty, default to: 1
// LEFT SIDE
//     2   3   4  => [1,
// 1       3   4  =>  1,
// 1 * 2       4  =>  2,
// 1 * 2 * 3      =>  6]

// RIGHT SIDE
//     2 * 3 * 4  => [24,
// 1       3 * 4  =>  12,
// 1   2       4  =>  4,
// 1   2   3      =>  1]

function productExceptSelf(nums) {
  let length = nums.length

  let left = new Array(length)
  let right = new Array(length)

  let results = new Array(length)

  // iterate forward, multiplying all elements, stopping at index before last
  left[0] = 1
  for (let i = 1; i < length; i++) {
    left[i] = nums[i - 1] * left[i - 1]
  }
  //console.log(left)
  
  // iterate backward, multiplying all elements, stopping at index before first
  right[length - 1] = 1
  for (let i = length - 2; i >= 0; i--) {
    right[i] = nums[i + 1] * right[i + 1]
  }
  //console.log(right)

  // iterate through all indexes evenly and multiply left and right together
  for (let i = 0; i < length; i++) {
    results[i] = left[i] * right[i]
  }

  return results
};

console.log(productExceptSelf([1,2,3,4]))
console.log(productExceptSelf([1,2,3,4,5,6]))
console.log(productExceptSelf([9, 2, 26, 31]))
