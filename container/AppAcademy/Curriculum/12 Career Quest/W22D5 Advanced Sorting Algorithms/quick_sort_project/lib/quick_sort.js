function quickSort(array) {
    if (array.length <= 0) return array

    let pivot = array.shift()
    let leftSide = array.filter(el => el < pivot)
    let rightSide = array.filter(el => el >= pivot)

    return [...quickSort(leftSide), pivot, ...quickSort(rightSide)]
}


module.exports = {
    quickSort
};