// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx = 1) {
  let thisVal = array[idx]
  let leftIdx = idx * 2
  let rightIdx = leftIdx + 1

  let leftVal = array[leftIdx] || -Infinity
  let rightVal = array[rightIdx] || -Infinity

  if (leftVal > thisVal || rightVal > thisVal) return false
  if (leftVal === -Infinity && rightVal === -Infinity) return true

  return isMaxHeap(array, leftIdx) && isMaxHeap(array, rightIdx)
}

module.exports = {
  isMaxHeap
}
