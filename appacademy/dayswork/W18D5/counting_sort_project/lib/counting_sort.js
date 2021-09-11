function countingSort(arr, max) {
  const output = []
  const counter = new Array(max + 1).fill(0)

  for (let i = 0; i < arr.length; i++) {
    counter[arr[i]]++
  }

  for (let i = 0; i < counter.length; i++) {
    while (counter[i] > 0) {
      output.push(i)
      counter[i]--
    }
  }

  return output
}

module.exports = {
  countingSort
}
