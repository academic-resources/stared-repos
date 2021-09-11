function countingSort(arr, max) {
  const result = [];
  const counters = new Array(max + 1).fill(0);

  // fill up counters array with counts of any interger occurence
  for (let i = 0; i < arr.length; i++) {
    counters[arr[i]]++;
  }

  // iterate through counters array
  for (let i = 0; i < counters.length; i++) {
    // while el is positive, push the actual index number into results array until the value in counter at that index is 0
    while (counters[i] > 0) {
      result.push(i);
      counters[i]--;
    }
  }

  return result;
}

let arr = [1,523,38811,5,2,3,56,1,1,]
console.log(countingSort(arr, 38811))


// Time and Space Complexity Analysis
// Time Complexity
// In general, the best, average, and worst case time complexities of Counting Sort are all the same.

// Since this algorithm requires iterating over all n elements of the input array, and then subsequently iterating over our each element of our counter array (which has length k), we wind up with a run time of O(n + k). This makes Counting Sort faster than any of the previous comparison-based algorithms, and also faster than Radix Sort!

// Space Complexity
// The trade off for Counting Sort comes with its space complexity. The smaller the range of integers that can possibly occur in our input array, the more memory efficient Counting Sort will be. The larger k is, the larger the number of elements we'll have to allocate in our counter array. Thus, the space complexity of Counting Sort is O(k).

// NOTE: In an interview setting, always ask the interviewer if you can be guaranteed that the largest element in the input array is not huge.

// If asked why, mention that you may choose to use the Counting Sort algorithm to achieve a linear sort, but are considering the memory-cost trade offs involved. According to the ECMA-262 5th edition spec, due to 32-bit numbers, the upper-bound length of a JavaScript array is 232 - 1, which is 4,294,967,295. If the largest possible integer in your array is larger than this, you'll have to optimize the Counting Sort algorithm to use less total memory if you intend to use it.

// When should we use Counting Sort?
// You should consider using Counting Sort whenever you need to:

// Sort a list of integer data, and you do know the value of the largest element in the list.
// If you do not know the largest element in the list, see radixSort!
// Counting Sort's run time, O(n + k), is depedendent on the size of the largest integer in the input, k. For this reason, it is fastest when k is relatively small.