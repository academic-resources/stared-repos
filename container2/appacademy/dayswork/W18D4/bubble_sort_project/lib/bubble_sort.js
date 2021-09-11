function swap(array, idx1, idx2) {
  let temp = array[idx1]
  array[idx1] = array[idx2]
  array[idx2] = temp
  return array
}

function bubbleSort(arr) {
  let swapped = true

  while (swapped) {
    swapped = false

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        swapped = true
      }
    }
  }

  return arr
}

module.exports = {
  bubbleSort,
  swap
}
