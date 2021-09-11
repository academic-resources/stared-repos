// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

// Example 1:

// Input: [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
//              Total amount you can rob = 1 + 3 = 4.
// Example 2:

// Input: [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
//              Total amount you can rob = 2 + 9 + 1 = 12.

/**
 * @param {number[]} nums
 * @return {number}
 */

function rob(nums) {
  let dp = new Array(nums.length).fill(0)
  let maxNum = 0
  let maxIdx = 0
  let maxSec = 0
  for (let i = 0; i < nums.length + 1; i++) {
    // console.log(dp, maxNum, maxSec)
    if (i - maxIdx > 1) {
      dp[i] = nums[i] + maxNum
    } else {
      dp[i] = nums[i] + maxSec
    }
    if (maxNum < dp[i]) {
      maxSec = maxNum
      maxNum = dp[i]
      maxIdx = i
    }
  }
  return maxNum
};

//dp [0, 0, 0, 0]

console.log(rob([1,2,3,1]))               // => 4
console.log(rob([2,7,9 ,3 ,1]))             // => 12
//               [0,2,0,0 ,0 ,0 ]  Max = 2  Sec = 0   MaxIdx = 0
//               [0,2,7,0 ,0 ,0 ]  Max = 7  Sec = 2   MaxIdx = 1
//               [0,2,7,11,0 ,0 ]  Max = 11 Sec = 7   MaxIdx = 2
//               [0,2,7,11,10,0 ]  Max = 11 Sec = 7  MaxIdx = 2
//               [0,2,7,11,10,12]  Max = 12 Sec = 11  MaxIdx = 2


console.log(rob([1,3,1]))                 // => 3
console.log(rob([1,3,1,3,1,1,4, 1,4, 1])) // => 14
          //  [0,1,3,0,0,0,0,0, 0,0, 0 ]  => max 3
          //  [0,1,3,2,0,0,0,0, 0,0, 0 ]
          //  [0,1,3,2,6,0,0,0, 0,0, 0 ]
          //  [0,1,3,2,6,4,0,0, 0,0, 0 ]
          //  [0,1,3,2,6,4,7,0, 0,0, 0 ]
          //  [0,1,3,2,6,4,7,10,0,0, 0 ]
          //  [0,1,3,2,6,4,7,10,8,0, 0 ]
          //  [0,1,3,2,6,4,7,10,8,14,0 ]
          //  [0,1,3,2,6,4,7,10,8,14,11]
          //    maxNum = 14
          //    maxSec = 10
console.log(rob([]))
console.log(rob([1]))
console.log(rob([1,2]))


function robSolution(nums) {
  let prevMax = 0
  let currMax = 0
  for (let num of nums) {
    let temp = currMax
    currMax = Math.max(prevMax + num, currMax)
    prevMax = temp
  }
  return currMax
}
// console.log(robSolution([1,2,3,1]))               // => 4
// console.log(robSolution([2,7,9,3,1]))             // => 12
// console.log(robSolution([1,3,1]))                 // => 3
// console.log(robSolution([1,3,1,3,1,1,4, 1,4, 1])) // => 14



function rob2(nums) {
  let n = nums.length;
  if (n <= 0) return 0;
  if (n == 1) return nums[0];
  if (n == 2) return Math.max(nums[0], nums[1]);
  let dirtyMoney = new Array(n)
  dirtyMoney[0] = nums[0];
  dirtyMoney[1] = Math.max(nums[0], nums[1]);
  let maxRob = 0;
  for (let i = 2; i < n; i++) {
    console.log(dirtyMoney)
      dirtyMoney[i] = Math.max(dirtyMoney[i - 1], nums[i] + dirtyMoney[i - 2]);
      maxRob = Math.max(maxRob, dirtyMoney[i])
  }
  return maxRob;
}

// console.log("==============")
// console.log(rob2([1,2,3,1]))               // => 4
// console.log(rob2([2,7,9,3,1]))             // => 12
// console.log(rob2([1,3,1]))                 // => 3
// console.log(rob2([1,3,1,3,1,1,4, 1,4, 1])) // => 14