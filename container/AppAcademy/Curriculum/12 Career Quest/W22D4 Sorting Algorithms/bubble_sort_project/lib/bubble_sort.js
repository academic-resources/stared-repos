function swap(array, idx1, idx2) {
    let temp = array[idx1]
    array[idx1] = array[idx2]
    array[idx2] = temp
    return array
}

let arr = [2, 5, 1, 3, 4]
swap(arr, 0, 3)
console.log(arr);


function bubbleSort(array) {
    let sorted = false

    while (!sorted) {
        sorted = true
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i + 1] < array[i]) {
                swap(array, i + 1, i)
                sorted = false
            }
        }
    }
    return array
}

console.log(bubbleSort(arr))

module.exports = {
    bubbleSort,
    swap
};