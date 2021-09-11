// Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

// Example 1:

// Input: [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:

// Input: [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

/**
 * @param {number[]} nums
 * @return {number}
 */

function maxProduct (nums) {
  if (!(nums.length)) return 0
  if (nums.length === 1) return nums[0]
  let fullProduct = productFromAll(nums)
  if (fullProduct > 0) return fullProduct
  let leftSlice = fullProduct / productFromLastNeg(nums)
  let rightSlice = fullProduct / productToFirstNeg(nums)

  return Math.max(fullProduct, leftSlice, rightSlice, Math.max(nums))
}

function productToFirstNeg(nums) {
  if (!nums) return 0
  let result = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (result < 0) return result
    result *= nums[i]
  }
  return result < 0 ? result : null
}

function productFromLastNeg(nums) {
  let result = nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) { result = nums[i]; continue }
    result *= nums[i]
  }
  return result < 0 ? result : null
}

function productFromAll(nums) {
  if (!(nums.length)) return 0
  return nums.reduce((prodTotal, num) => prodTotal * num)
}

// console.log(maxProduct([-3,1,2,3,-1,4,2,-2,2,3]))
console.log(maxProduct([-2,3,-4]))


function maxProductSolution(nums) {
  if (!(nums.length)) return 0

  let max = currMax = currMin = nums[0]
  for (let i = 1; i < nums.length; i++) {
    let prevMax = currMax
    currMax = Math.max(nums[i], currMax * nums[i], currMin * nums[i])
    currMin = Math.min(nums[i], currMin * nums[i], prevMax * nums[i])
    max = Math.max(max, currMax)
  }
  return max
}

console.log(maxProductSolution([-2,3,-4]))
console.log(maxProductSolution([-3,1,2,3,-1,4,2,-2,2,3]))
console.log(maxProductSolution([-3,0,1,-2]))