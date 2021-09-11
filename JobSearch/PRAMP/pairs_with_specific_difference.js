// Given an array arr of distinct integers and a nonnegative integer k, write a function findPairsWithGivenDifference that returns an array of all pairs [x,y] in arr, such that x - y = k. If no such pairs exist, return an empty array.

// Note: the order of the pairs in the output array should maintain the order of the y element in the original array.

// Examples:
// input:  arr = [0, -1, -2, 2, 1], k = 1
// output: [[1, 0], [0, -1], [-1, -2], [2, 1]]

// input:  arr = [1, 7, 5, 3, 32, 17, 12], k = 17
// output: []

// Constraints:

// [time limit] 5000ms
// [input] array.integer arr
// 0 ≤ arr.length ≤ 100
// [input]integer k ≥ 0
// [output] array.array.integer

//==============
function findPairsWithGivenDifference(arr, k) {
  // your code goes here
  let values = {}
  let result = []
  for (let e of arr) {
    values[e] = true
  }
  for (let i = 0; i < arr.length; i++) {
    // x - y = k
    // x = k + y    y = arr[i]
    if (values[k + arr[i]]) {
      result.push([k+arr[i], arr[i]]) //x,y / k+arr[i], arr[i]
    }
  }
  return result
}