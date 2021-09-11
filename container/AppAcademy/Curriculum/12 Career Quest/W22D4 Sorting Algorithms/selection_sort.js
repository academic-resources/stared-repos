
// Just for analysis.  Not to be used.
function minumumValueIndex(arr) {
  let minIndex = 0;

  for (let j = 0; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
          minIndex = j;
      }
  }

  return minIndex;
}

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// commented
function selectionSort(arr) {
  // the `i` loop will track the index that points to the first element of the unsorted region:
  //    this means that the sorted region is everything left of index i
  //    and the unsorted region is everything to the right of index i
  for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      // the `j` loop will iterate through the unsorted region and find the index of the smallest element
      for (let j = i + 1; j < arr.length; j++) {
          if (arr[minIndex] > arr[j]) {
              minIndex = j;
          }
      }

      // after we find the minIndex in the unsorted region,
      // swap that minIndex with the first index of the unsorted region
      swap(arr, i, minIndex);
  }
  return arr;
}

let arr1 = [2, 8, 5, 2, 6];
console.log(selectionSort(arr1))

// Complexity
// Time: T(n * n/2) = O(n^2)
// Space: O(1)

// When should we use Selection Sort?
// There is really only one use case where Selection Sort becomes superior to Bubble Sort. Both algorithms are quadratic in time and constant in space, but the point at which they differ is in the number of swaps they make.

// Bubble Sort, in the worst case, invokes a swap on every single comparison. Selection Sort only swaps once our inner loop has completely finished traversing the array. Therefore, Selection Sort is optimized to make the least possible number of swaps.

// Selection Sort becomes advantageous when making a swap is the most expensive operation in your system. You will likely rarely encounter this scenario, but in a situation where you've built (or have inherited) a system with suboptimal write speed ability, for instance, maybe you're sorting data in a specialized database tuned strictly for fast read speeds at the expense of slow write speeds, using Selection Sort would save you a ton of expensive operations that could potential crash your system under peak load.

// Though in industry this situation is very rare, the insights above make for a fantastic conversational piece when weighing technical tradeoffs while strategizing solutions in an interview setting. This commentary may help deliver the impression that you are well-versed in system design and technical analysis, a key indicator that someone is prepared for a senior level position.