// Given a list of numbers and a number k,
// return whether any two numbers from the list add up to k.

// For example, given [10, 15, 3, 7] and k of 17,
// return true since 10 + 7 is 17.

// Bonus: Can you do this in one pass?

const add_up = (array, target) => {
  const seen = {}

  for (let num of array) {
    let needed = target - num
    if (seen[needed]) return true
    seen[num] = true
  }

  return false
}

console.log(add_up([2, 6, 4, 7, 9, 1], 12))
console.log(add_up([2, 6, 4, 7, 9, 1], 15))
