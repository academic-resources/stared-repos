// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) { //iterated
    for (idx; idx < array.length; idx++) {
        let curr = array[idx]
        let left = array[idx * 2] === undefined ? -Infinity : array[idx * 2]
        let right = array[idx * 2 + 1] === undefined ? -Infinity : array[idx * 2 + 1]
        if (curr < left || curr < right) return false
    }
    return true
}

function isMaxHeapRecur(array, idx=1) {
    if (array[idx] === undefined) return true
    let leftIdx = idx * 2
    let rightIdx = idx * 2 + 1
    let leftVal = array[leftIdx] === undefined ? -Infinity : array[leftIdx]
    let rightVal = array[rightIdx] === undefined ? -Infinity : array[rightIdx]

    return array[idx] > leftVal && array[idx] > rightVal
        && isMaxHeap(array, leftIdx) 
        && isMaxHeap(array, rightIdx)
}

module.exports = {
    isMaxHeap
};