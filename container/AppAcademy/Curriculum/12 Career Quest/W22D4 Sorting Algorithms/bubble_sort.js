function swap(array, idx1, idx2) {
  let temp = array[idx1];     // save a copy of the first ele
  array[idx1] = array[idx2];  // overwrite the first ele with the second ele
  array[idx2] = temp;         // overwrite the second ele with the first ele copy
}

let arr1 = [2, 8, 5, 2, 6];
swap(arr1, 1, 2);
console.log(arr1); // => [ 2, 5, 8, 2, 6 ]

// commented
function bubbleSort(array) {
  let swapped = true; // this variable will be used to track whether or not we
                      // made a swap on the previous pass. If we did not make any
                      // swap on the previous pass, then the array must already be sorted

  // this while will keep doing passes if a swap was made on the previous pass
  while(swapped) {
    swapped = false;  // reset to swap to false

    // this for will perform a single pass
    for (let i = 0; i < array.length; i++) {  
      if (array[i] > array[i+1]) {  // if the two eles are not ordered...

        swap(array, i, i+1);          // swap them.

        swapped = true;               // since we made a swap, remember that we did so
                                      // b/c we should perform another pass after this one
      }
    }
  }
  return array;
}

console.log(bubbleSort(arr1))

// Complexity
// Time: T(n * n) = O(n^2)
// Space: O(1)

// When should we use Bubble Sort?
// Nearly never, but it may be a good choice in the following list of special cases:

// When sorting really small arrays where run time will be negligible no matter what algorithm we choose.
// When sorting arrays that we expect to already be nearly sorted.
// At parties