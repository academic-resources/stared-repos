function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let el = arr[i]
    for (var j = i - 1; j >= 0 && el < arr[j]; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = el
  }
  return arr
}

module.exports = {
  insertionSort
}
