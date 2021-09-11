function productSum(arr, depth = 1) {
  return arr.reduce((sum, elem) => {
    if (Array.isArray(elem)) return sum + (depth + 1) * productSum(elem, depth + 1)
    return sum + elem
  }, 0)
}

const test = [5,2,[7,-1],3,[6,[-13,8],4]]
console.log(productSum(test))