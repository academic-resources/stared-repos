// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

// Example 1:

// Input: [3,0,1]
// Output: 2
// Example 2:

// Input: [9,6,4,2,3,5,7,0,1]
// Output: 8
// Note:
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
  let currSum = 0
  let largestNum = 0
  nums.forEach(num => {
    currSum += num
    largestNum = Math.max(largestNum, num)
  })
  let expectedSum = (largestNum * (largestNum + 1)) / 2
  if (largestNum === nums.length - 1) return largestNum + 1
  return expectedSum - currSum
}

console.log(missingNumber([3,0,1]))
console.log(missingNumber([9,6,4,2,3,5,7,0,1]))
console.log(missingNumber([9,6,4,2,3,5,7,8,1]))
console.log(missingNumber([0]))
console.log(missingNumber([0, 1]))
console.log(missingNumber([]))


function missingNumber2(nums) {
  let currSum = nums.reduce((total, num) => total + num, 0)
  let expectedSum = (nums.length * (nums.length + 1)) / 2
  return expectedSum - currSum
}

console.log("==============")
console.log(missingNumber2([3,0,1]))
console.log(missingNumber2([9,6,4,2,3,5,7,0,1]))
console.log(missingNumber2([9,6,4,2,3,5,7,8,1]))
console.log(missingNumber2([0]))
console.log(missingNumber2([0, 1]))
console.log(missingNumber2([]))


const missingNumberBitManip = (nums) =>
  nums.reduce((prev, cur, idx) => prev ^ cur ^ idx, nums.length)

function missingNumberBitManipBreakDown(nums) {
  return nums.reduce((prev,cur,idx) => {
    console.log("prev:", prev, " cur:", cur, " prev & cur:", prev ^ cur, " idx:", idx, " out:", prev ^ cur ^ idx)
    console.log(prev.toString(2), "     ", cur.toString(2), "     ", (prev ^ cur).toString(2))
    return prev ^ cur ^ idx
  }, nums.length)
}

console.log("=================================")
console.log(missingNumberBitManip([3,0,1]))
console.log(missingNumberBitManip([9,6,4,2,3,5,7,0,1]))
console.log(missingNumberBitManip([9,6,4,2,3,5,7,8,1]))
console.log(missingNumberBitManip([0]))
console.log(missingNumberBitManip([0, 1]))
console.log(missingNumberBitManip([]))