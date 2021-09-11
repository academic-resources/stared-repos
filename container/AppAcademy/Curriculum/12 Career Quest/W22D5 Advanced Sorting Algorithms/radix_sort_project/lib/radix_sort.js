function getDigitFrom(num, place) {
    return Math.floor(Math.abs(num) / 10 ** place) % 10
}
console.log(getDigitFrom(1234, 2))

function getIntLength(num) {
    return String(num).length
}
console.log(getIntLength(1234))

function getMaxDigits(nums) {
    return getIntLength(Math.max(...nums))
}
console.log(getMaxDigits([1,2,52,332,2,3]))

function radixSort(arr) {
    if(!Array.isArray(arr)) return null

    let maxDigits = getMaxDigits(arr)
    for (let k = 0; k < maxDigits; k++) {
        let buckets = Array.from({length: 10}, () => [])
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
};