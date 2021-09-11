function binarySearch(array, target) {
    if (!array.length) return false

    let midIdx = Math.floor(array.length / 2)
    let leftSide = array.slice(0, midIdx)
    let rightSide = array.slice(midIdx + 1)

    if (target < array[midIdx]) {
        return binarySearch(leftSide, target)
    } else if (target > array[midIdx]) {
        return binarySearch(rightSide, target)
    } else {
        return true
    }
}

function myBinarySearchIndex(array, target) {
    if (!array.length) return -1

    let midIdx = Math.floor(array.length / 2)
    let midVal = array[midIdx]
    let leftSide = array.slice(0, midIdx)
    let rightSide = array.slice(midIdx + 1)

    if (target === midVal) {
        return midIdx
    } else if (target < midVal) {
        return myBinarySearchIndex(leftSide, target)
    } else {
        const subIdx = myBinarySearchIndex(rightSide, target)
        return subIdx === -1 ? -1 : subIdx + midIdx + 1
    }
}

console.log(myBinarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12))  // => 2
console.log(myBinarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24))  // => null

//The Array that we consider goes from array.slice(lo, hi + 1)
function binarySearchIndex(array, target, lo = 0, hi = array.length - 1) {
    if (lo === hi) return -1

    let midIdx = Math.floor((lo + hi) / 2)
    // let leftSide = array.slice(0, midIdx)
    // let rightSide = array.slice(midIdx + 1)

    if (target < array[midIdx]) {
        return binarySearchIndex(array, target, lo, midIdx)
    } else if (target > array[midIdx]) {
        return binarySearchIndex(array, target, midIdx + 1, hi)
    } else {
        return midIdx
    }
}


console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12))  // => 2
console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24))  // => null

module.exports = {
    binarySearch,
    binarySearchIndex
};