// Given a sorted array of numbers and a target num, return a boolean indicating whether or not that target is contained in the array.

// Programmatically, we want to satisfy the following behavior:

// binarySearch([5, 10, 12, 15, 20, 30, 70], 12);  // => true
// binarySearch([5, 10, 12, 15, 20, 30, 70], 24);  // => false

function binarySearch (array, target) {
  //if target not found, return false
  if (array.length === 0) return false

  let midIdx = Math.floor(array.length / 2)
  let leftSide = array.slice(0, midIdx)
  let rightSide = array.slice(midIdx + 1)

  if (target < array[midIdx]) {
    return binarySearch(leftSide, target)
  } else if (target > array[midIdx]) {
    return binarySearch(rightSide, target)
  } else {
    // if target is neither less than or great than, then must be target
    return true
  }
}

console.log(binarySearch([5, 10, 12, 15, 20, 30, 70], 12))  // => true
console.log(binarySearch([5, 10, 12, 15, 20, 30, 70], 24))  // => false

// Time Complexity: O(log(n))
// n is the length of the input array
// We have no loops, so we must only consider the number of recursive calls it takes to hit the base case
// The number of recursive calls is the number of times we must halve the array until it's length becomes 0. This number can be described by log(n)
// for example, say we had an array of 8 elements, n = 8
// the length would halve as 8 -> 4 -> 2 -> 1
// it takes 3 calls, log(8) = 3
// Space Complexity: O(n)
// Our implementation uses n space due to half arrays we create using slice. Note that JavaScript slice creates a new array, so it requires additional memory to be allocated.

// When should we use Binary Search?
// Use this algorithm when the input data is sorted!!! This is a heavy requirement, but if you have it,you'll have an insanely fast algorithm.