function myGetDigitFrom(num, place) {
  order = 10 ** (place)
  result = (num % (order * 10) - num % (order)) / order
  return result < 0 ? -result : result
}

const getDigitFrom = (num, place) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;;

console.log(myGetDigitFrom(1234, 2))
console.log(myGetDigitFrom(-1234, 2))

function myGetIntLength(num) {
  return String(num).length
}

const getIntLength = (num) => (num === 0) ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;

console.log(myGetIntLength(1234))

function myGetMaxDigits(nums) {
  return myGetIntLength(Math.max(...nums))
}

function getMaxDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, getIntLength(nums[i]));
  }
  return maxDigits;
}

console.log(myGetMaxDigits([1,123,423,4321]))

// Only positive values in arr
function radixSort(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }

  let maxDigits = getMaxDigits(arr);
  for (let k = 0; k < maxDigits; k++) {
    let buckets = Array.from({length: 10}, () => []); // Array of empty arrays
    
    for (let i = 0; i < arr.length; i++) {
      let digit = getDigitFrom(arr[i], k);
      buckets[digit].push(arr[i]);
    }

    arr = [].concat(...buckets);
  }
  return arr;
}


//Hacky Solution to allow for both positive and negative
function radixSortWithNegatives(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }

  var negatives = arr.filter(item => item < 0);
  var negativesSorted = [];
  if (negatives.length > 0) {
    negativesSorted = radixSort(negatives.map(item => Math.abs(item)))
                        .reverse()
                        .map(item => -item);
  }

  var positives = arr.filter(item => item >= 0);
  let maxDigits = getMaxDigits(positives);

  for(let k = 0; k < maxDigits; k++){
    let buckets = Array.from({length: 10}, () => []);

    for (let i = 0; i < positives.length; i++) {
        let digit = getDigitFrom(positives[i], k);
        buckets[digit].push(positives[i]);
    }
    positives = [].concat(...buckets);
  }
  return negativesSorted.concat(positives);
}

// Time and Space Complexity Analysis
// Time Complexity
// In general, the best, average, and worst case time complexities of Radix Sort are all the same.

// Since this algorithm requires iterating over all n elements of the input array, and doing so k times, where k is the length (number of digits) of the longest integer in the array, we wind up with a run time of O(n * k). This makes Radix Sort faster than any of the previous comparison-based algorithms we've seen earlier in the course!

// However, there is actually some debate in the computer science community over this topic. There exists a camp that believes that when Radix Sort's input array contains entirely unique values, due to a characteristic of the way computers store numerical data, that k becomes log k. (See Wikipedia: Radix Sort)

// If this is true, the absolute worst case scenario becomes the case where the length of the longest integer in the input array, k, is equal to (or greater than) the total number of elements in the array, n. In this scenario, we wind up with an O(n log(k)), or approximately O(n log(n)), run time, making Radix Sort, at worst, equal in speed to our fastest comparison-based sorting algorithm.

// Though it will require some additional research, this may be a worthwhile talking point in an interview setting!

// Space Complexity
// Radix Sort is an O(n + k) space algorithm.

// The amount of memory consumed by the algorithm increases relative to both the size of the input array and the length of the longest integer.

// When should we use Radix Sort?
// You should consider using Radix sort whenever you need to:

// Sort a list of any sort of binary data, including numeric, text, or image data in binary format.
// Sort a list of integers, and you don't know the value of the largest element in the list.
// If you do know the largest element in the list, see countingSort!
// Radix Sort's run time, O(n * k), is depedendent on the length (number of digits) of the largest integer in the input, k. For this reason, it is fastest when k is relatively small.