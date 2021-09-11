function merge(arr1, arr2) {
  let result = []

  while (arr1.length && arr2.length) {
    let next
    if (arr1[0] < arr2[0]) {
      next = arr1.shift()
    } else {
      next = arr2.shift()
    }

    result.push(next)
  }

  return result.concat(arr1).concat(arr2)
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array
  }

  let midIdx = Math.floor(array.length / 2)
  let left = mergeSort(array.slice(0, midIdx))
  let right = mergeSort(array.slice(midIdx))

  return merge(left, right)
}

module.exports = {
  merge,
  mergeSort
}
