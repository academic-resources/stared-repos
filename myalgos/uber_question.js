// Given an array of integers, return a new array such that each element
// at index i of the new array is the product of all the numbers in the
// original array except the one at i.

// For example, if our input was [1, 2, 3, 4, 5], the expected output
// would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the
// expected output would be [2, 3, 6].

// Follow-up: what if you can't use division?

function productOfOthers_1(arr) {
  const product = arr.reduce((acc, n) => acc * n, 1)
  return arr.map(n => product / n)
}

function productOfOthers_2(arr) {
  const prodBefore = []
  arr.forEach((n, i) => {
    if (i === 0) {
      prodBefore.push(1)
    } else {
      prodBefore.push(prodBefore[i - 1] * arr[i - 1])
    }
  })

  const prodAfter = new Array(arr.length).fill(0)
  for (let i = arr.length - 1; i >= 0; i--) {
    if (i === arr.length - 1) {
      prodAfter[i] = 1
    } else {
      prodAfter[i] = prodAfter[i + 1] * arr[i + 1]
    }
  }

  return arr.map((n, i) => {
    return prodBefore[i] * prodAfter[i]
  })
}

console.log(productOfOthers_1([1, 2, 3, 4, 5]))
console.log(productOfOthers_2([1, 2, 3, 4, 5]))
