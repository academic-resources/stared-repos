// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

// Find the minimum element.

// You may assume no duplicate exists in the array.

// Example 1:

// Input: [3,4,5,1,2] 
// Output: 1
// Example 2:

// Input: [4,5,6,7,0,1,2]
// Output: 0
/**
 * @param {number[]} nums
 * @return {number}
 */

// O(log n)
function findMin(nums, startIdx = 0, endIdx = nums.length - 1) {
  if (nums[startIdx] <= nums[endIdx]) return nums[startIdx];
  let midIdx = Math.floor((startIdx + endIdx) / 2)
  if (nums[midIdx] < nums[endIdx]) return findMin(nums, startIdx, midIdx);
  else return findMin(nums, midIdx + 1, endIdx);
}

console.log(findMin([24,25,30,42,1,2,3,4,5,10,15,20]))
console.log(findMin([4,5,6,7,0,1,2]))