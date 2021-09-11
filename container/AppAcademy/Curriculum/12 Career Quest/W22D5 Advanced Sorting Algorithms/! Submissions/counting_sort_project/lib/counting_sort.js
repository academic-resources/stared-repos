function countingSort(arr, max) {
    let counter = new Array(max + 1).fill(0)

    for (let i = 0; i < arr.length; i++) counter[arr[i]]++

    let result = []
    for (let i = 0; i < counter.length; i++) {
        while(counter[i] > 0) {
            result.push(i)
            counter[i]--
        }
    }

    return result
}

let arr = [1,523,38811,5,2,3,56,1,1,]
console.log(countingSort(arr, 38811))

module.exports = {
    countingSort
};