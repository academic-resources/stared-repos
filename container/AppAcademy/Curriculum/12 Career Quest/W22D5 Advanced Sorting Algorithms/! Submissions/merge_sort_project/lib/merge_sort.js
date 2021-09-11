function merge(array1, array2) {
    let merged = []
    while (array1.length || array2.length) {
        let el1 = array1.length ? array1[0] : Infinity
        let el2 = array2.length ? array2[0] : Infinity
        merged.push(el1 < el2 ? array1.shift() : array2.shift())
    }
    return merged
}

console.log(merge([1,3,6], [2,4,5,8,10]))
console.log(merge([1, 5, 10, 15], [0, 2, 3, 7, 10]))

function mergeSort(array) {
    if (array.length <= 1) return array

    let midIdx = Math.floor(array.length / 2)
    let leftSide = array.slice(0, midIdx)
    let rightSide = array.slice(midIdx)

    return merge(mergeSort(leftSide), mergeSort(rightSide))
}

console.log(mergeSort([1,3,5,2,4,5]))

module.exports = {
    merge,
    mergeSort
};