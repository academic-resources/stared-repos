// I found this one online

// Even thougn we've probably never seen this before,
// we've seen other stuff that will help us do it

// 1. Given an Array, return the index of a peak.
// 2. A peak is defined as an element where the value
//    is greater than the item to the left and the right
// 3. The first element only has to be greater than the value to its right
//    and the last only has to be greater than the value to its left
// 4. You only have to return a peak, not necessarily the 1st, last or nth peak
// 5. Your solution should be time complexity O(logn n)

function peak(arr) {
  if (arr.length === 0) return null

  let mid = Math.floor(arr.length / 2)

  if (arr[mid] < arr[mid - 1]) {
    return peak(arr.slice(0, mid))
  }

  if (arr[mid] < arr[mid + 1]) {
    const result = peak(arr.slice(mid + 1))
    if (result) return mid + 1 + result
    return null
  }

  return mid
}

const arr = new Array(10000000)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100))

console.log(peak(arr))
