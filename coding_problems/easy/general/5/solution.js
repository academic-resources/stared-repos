function productSum(array, depth = 1) {
  let sum = 0
  let i = 0
  while (i < array.length) {
    if (Array.isArray(array[i])) {
      sum += (depth + 1) * productSum(array[i], depth + 1)
    } else {
      sum += array[i]
    }
    i++
  }
  return sum
}

const test = [5,2,[7,-1],3,[6,[-13,8],4]]
console.log(productSum(test))