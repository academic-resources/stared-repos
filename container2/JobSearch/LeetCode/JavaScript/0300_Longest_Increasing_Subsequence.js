// Given an unsorted array of integers, find the length of longest increasing subsequence.

// Example:

// Input: [10,9,2,5,3,7,101,18]
// Output: 4 
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
// Note:

// There may be more than one LIS combination, it is only necessary for you to return the length.
// Your algorithm should run in O(n2) complexity.
// Follow up: Could you improve it to O(n log n) time complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */

function lengthOfLIS(nums) {
  if (!nums.length) return 0
  
  let res = new Array(nums.length).fill(1)
  let max = 1
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) res[i] = Math.max(res[i], res[j] + 1)
    }
    max = Math.max(max, res[i])
  }
  return max
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])) //=> 4
console.log(lengthOfLIS([2,1,3,5,4,6,0]))       //=> 4
console.log(lengthOfLIS([1,2]))                 //=> 2
console.log(lengthOfLIS([2,2]))                 //=> 1
console.log(lengthOfLIS([1,2,2,3,4]))           //=> 4
console.log(lengthOfLIS([4,10,4,3,8,9]))        //=> 3
console.log(lengthOfLIS([]))                    //=> 0
console.log(lengthOfLIS([1]))                   //=> 1
console.log(lengthOfLIS([18,55,66,2,3,54]))     //=> 3


function lengthOfLISDP(nums) {
  if (!nums.length) return 0
  
  let res = new Array(nums.length).fill(1), glbMax = 1
  
  for (let i = 1; i < nums.length; i++) {
    let max = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j])
        max = Math.max(max, res[j] + 1)
    }
    res[i] = max
    glbMax = Math.max(res[i], glbMax)
  }
  return glbMax
};


var lengthOfLISDPFast = function(nums) {
  const lis = [];
  for (let n = 0; n < nums.length; n++) {
    insertLIS(lis, nums[n]);
  }
  return lis.length;
};

function insertLIS(lis, n) {
  const len = lis.length;
  if (len < 1 || n > lis[len - 1]) {
    // console.log("exit 1")
    return lis.push(n)
  }
  if (n < lis[0] && len === 1) {
    // console.log("exit 2")
    return lis[0] = n
  }
  if (n < lis[0] && len > 1) {
    // console.log("exit 3")
    return
  }
  
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    let mid = Math.ceil((left + right) / 2);
    // console.log(lis, n, lis[left], left, lis[right], right,  lis[mid])
    if (n > lis[mid]) left = mid + 1;
    else right = mid - 1;
  }
  lis[left] = n;
  // console.log("final", lis, n, lis[left], lis[right])
}

console.log("=============")
console.log(lengthOfLISDPFast([10,9,2,5,3,7,101,18])) //=> 4
console.log(lengthOfLISDPFast([2,1,3,5,4,6,0]))       //=> 4
console.log(lengthOfLISDPFast([1,2]))                 //=> 2
console.log(lengthOfLISDPFast([2,2]))                 //=> 1
console.log(lengthOfLISDPFast([1,2,2,3,4]))           //=> 4
console.log(lengthOfLISDPFast([4,10,4,3,8,9]))        //=> 3
console.log(lengthOfLISDPFast([]))                    //=> 0
console.log(lengthOfLISDPFast([1]))                   //=> 1
console.log(lengthOfLISDPFast([18,55,66,2,3,54]))     //=> 3
