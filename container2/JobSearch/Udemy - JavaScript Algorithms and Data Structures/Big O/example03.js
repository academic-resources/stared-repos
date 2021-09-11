function sum(arr) {
  let total = 0
  for (let i = 0; i < arr.length; i++) {
    total += arr[i]
  }
  return total
}

// Space Complexity
// total = 0 is 1 number
// i = 0 is 1 number
// S(2) => O(1)

function double(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i])
  }
  return newArr
}

// Space Complexity
// newArr = [] is 1 assignment
// newArr is getting twice as longer
// S(2n) => O(n)