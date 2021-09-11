function binarySearch(array, target) {
  if (array.length === 0) return false

  const midIdx = Math.floor(array.length / 2)

  if (array[midIdx] === target) return true

  if (target < array[midIdx])
    return binarySearch(array.slice(0, midIdx), target)

  return binarySearch(array.slice(midIdx + 1), target)
}

function binarySearchIndex(array, target) {
  if (array.length === 0) return -1

  const midIdx = Math.floor(array.length / 2)

  if (array[midIdx] === target) return midIdx

  if (target < array[midIdx])
    return binarySearchIndex(array.slice(0, midIdx), target)

  let subSearch

  subSearch = binarySearchIndex(array.slice(midIdx + 1), target)
  if (subSearch === -1) return -1
  return midIdx + subSearch + 1
}

module.exports = {
  binarySearch,
  binarySearchIndex
}
