function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
    return arr
}

function selectionSort(arr) {
    
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) 
            minIndex = j
        }
        // if change occurred, i swaps with j, else i swaps with itself
        swap(arr, i, minIndex)
    }
    return arr
}

let arr = [2, 5, 1, 3, 4]
console.log(selectionSort(arr))

module.exports = {
    selectionSort,
    swap
};