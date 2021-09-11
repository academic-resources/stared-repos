function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currElement = arr[i];
        for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = currElement;
    }
    return arr;
}

module.exports = {
    insertionSort
};