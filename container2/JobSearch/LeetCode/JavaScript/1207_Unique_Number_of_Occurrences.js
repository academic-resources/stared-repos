// 1207. Unique Number of Occurrences
// Easy

// 31

// 2

// Favorite

// Share
// Given an array of integers arr, write a function that returns true if and only if the number of occurrences of each value in the array is unique.

 

// Example 1:

// Input: arr = [1,2,2,1,1,3]
// Output: true
// Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
// Example 2:

// Input: arr = [1,2]
// Output: false
// Example 3:

// Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
// Output: true
 

// Constraints:

// 1 <= arr.length <= 1000
// -1000 <= arr[i] <= 1000

/**
 * @param {number[]} arr
 * @return {boolean}
 */

function uniqueOccurrences(arr) {
  let counts = {}
  arr.forEach(num => {
    if (counts[num]++) null
    else counts[num] = 1
  })

  counts = Object.values(counts)
  const uniques = new Set()

  for (let i = 0; i < counts.length; i++) {  
    if (uniques.has(counts[i])) return false
    uniques.add(counts[i])
  }

  return true
};

console.log(uniqueOccurrences([1,2,2,1,1,3]))               // => true
console.log(uniqueOccurrences([1,2]))                       // => false
console.log(uniqueOccurrences([-3,0,1,-3,1,1,1,-3,10,0]))   // => true
console.log(uniqueOccurrences([]))                          // => true

function uniqueOccurrences2(arr) {
  let counts = {}
  arr.forEach(num => {
    if (counts[num]++) 1
    else counts[num] = 1
  })

  counts = Object.values(counts)
  const uniques = new Set(counts)

  return counts.length === uniques.size
};

console.log("==========")
console.log(uniqueOccurrences2([1,2,2,1,1,3]))               // => true
console.log(uniqueOccurrences2([1,2]))                       // => false
console.log(uniqueOccurrences2([-3,0,1,-3,1,1,1,-3,10,0]))   // => true
console.log(uniqueOccurrences2([]))                          // => true