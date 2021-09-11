const getDigitFrom = (num, place) =>
  Math.floor(Math.abs(num) / Math.pow(10, place)) % 10

const getIntLength = num =>
  num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1

const getMaxDigits = arr => {
  let numDigits = 0
  for (let i = 0; i < arr.length; i++) {
    numDigits = Math.max(numDigits, getIntLength(arr[i]))
  }
  return numDigits
}

function radixSort(arr) {
  if (!Array.isArray(arr)) {
    return null
  }

  let maxDigits = getMaxDigits(arr)

  for (let k = 0; k < maxDigits; k++) {
    let buckets = new Array(10).fill(0).map(el => [])

    for (let i = 0; i < arr.length; i++) {
      let digit = getDigitFrom(arr[i], k)
      buckets[digit].push(arr[i])
    }

    arr = [].concat(...buckets)
  }
  return arr
}

module.exports = {
  radixSort
}
