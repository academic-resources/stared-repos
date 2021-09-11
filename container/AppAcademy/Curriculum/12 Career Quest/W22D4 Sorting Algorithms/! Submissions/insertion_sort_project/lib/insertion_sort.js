function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let minValue = arr[i]
        // j needs to be var for use outside of for block
        for (var j = i - 1; j >= 0 && arr[j] > minValue; j--) {
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = minValue
    }
    return arr
}

let arr1 = [2, 8, 5, 2, 6];
console.log(insertionSort(arr1))

module.exports = {
    insertionSort
};