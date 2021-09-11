// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */


function searchRecur(nums, target, left = 0, right = nums.length - 1) {
  // let right lookup with pivot
  if (left > right) return -1;
  let mid = left + Math.floor((right - left) / 2);

  if (nums[mid] === target) return mid;
  if (nums[left] === target) return left;
  if (nums[right] === target) return right;

  // IF left side is sorted AND target between left and middle *OR*
  // IF left side is unsorted AND target NOT between middle and right
  // THEN search left
  // ELSE search right
  if ((nums[left] < nums[mid] && target > nums[left] && target < nums[mid]) ||
    (nums[left] > nums[mid] && !(target > nums[mid] && target <= nums[right])))
    return searchRecur(nums, target, left, mid - 1);
  else return searchRecur(nums, target, mid + 1, right);

}



var searchIter = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
    
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid
    
    // When dividing the roated array into two halves, one must be sorted.
    // if left side sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
      } else {
        // target is in the right
        left = mid + 1;
      }
    } 
    // if left side unsorted
    if (nums[left] >= nums[mid]) {
      if (!(nums[mid] <= target && target <= nums[right])) {
        // target is in the left
        right = mid - 1;
      } else {
        // target is in the right
        left = mid + 1;
      }
    }
  }
  return -1;
};


console.log(searchIter([1,2,3,4,5,6], 6))            // => 5
console.log(searchIter([4,5,6,7,0,1,2], 0))          // => 4
console.log(searchIter([4,5,6,7,0,1,2], 5))          // => 1
console.log(searchIter([4,5,6,7,0,1,2], 1))          // => 5
console.log(searchIter([4,5,6,7,0,1,2], 3))          // => -1
console.log(searchIter([4,5,6,7,8,9,10,0,1,2,3], 5)) // => 1
console.log(searchIter([8,9,10,0,1,2,3,4,5,6,7], 5)) // => 8
console.log(searchIter([8,9,10,0,1,2,3,4,5,6,7], 9)) // => 1