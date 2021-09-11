// Given an array of integers, find the first missing positive integer
// in linear time and constant space. In other words, find the lowest
// positive integer that does not exist in the array. The array can
// contain duplicates and negative numbers as well.

// For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0]
// should give 3.

// You can modify the input array in-place.

function missing_positive_integer(arr) {
  debugger
  let idx = 0

  while (idx < arr.length) {
    if (arr[idx] > 0 && arr[idx] <= arr.length) {
      while (arr[idx] !== idx + 1) {
        let squatter = arr[arr[idx] - 1]
        arr[arr[idx] - 1] = arr[idx]
        arr[idx] = squatter
        if (arr[idx] < 0 || arr[idx] > arr.length) {
          break
        }
      }
    }
    idx++
  }

  idx = 0
  while (idx < arr.length) {
    if (arr[idx] !== idx + 1) return idx + 1
    idx++
  }

  return null
}

console.log(missing_positive_integer([3, 4, -1, 1]))
console.log(missing_positive_integer([1, 2, 0]))
