const { MaxHeap } = require('./heaps')


// HEAP SORT
function heapSort(array) {
  // Step 1: build the heap
  let heap = new MaxHeap();
  array.forEach(num => heap.insert(num));

  // Step 2: constructed the sorted array
  let sorted = [];
  while (heap.array.length > 1) {
      sorted.push(heap.deleteMax());
  }

  return sorted;
}
// Time Complexity Analysis: O(nlog(n))
// n is the size of the input array
// step-1 requires O(n) time as previously discussed
// step-2's while loop requires n steps in isolation and each deleteMax will require log(n) steps to restore max heap property (due to sifting-down). This means step 2 costs O(nlog(n))
// the total time complexity of the algorithm is O(n + nlog(n)) = O(nlog(n))
// Space Complexity Analysis:
// So heapSort performs as fast as our other efficient sorting algorithms, but how does it fair in space complexity? Our implementation above requires an extra O(n) amount of space because the heap is maintained separately from the input array. If we can figure out a way to do all of these heap operations in-place we can get constant O(1) space! Let's work on this now.



// IN-PLACE HEAP SORT
// swap the elements at indices i and j of array
function swap(array, i, j) {
  [ array[i], array[j] ] = [ array[j], array[i] ];
}

// sift-down the node at index i until max heap property is restored
// n represents the size of the heap
function heapify(array, n, i) {
  let leftIdx = 2 * i + 1;
  let rightIdx = 2 * i + 2;

  let leftVal = array[leftIdx];
  let rightVal = array[rightIdx];

  if (leftIdx >= n) leftVal = -Infinity;
  if (rightIdx >= n) rightVal = -Infinity;

  if (array[i] > leftVal && array[i] > rightVal) return;

  let swapIdx;
  if (leftVal < rightVal) {
      swapIdx = rightIdx;
  } else {
      swapIdx = leftIdx;
  }
  swap(array, i, swapIdx);
  heapify(array, n, swapIdx);
}

console.log('===========================')

// Given a node at index i, it's left index is 2 * i + 1 and it's right index is 2 * i + 2
// Using these as our child index formulas will allow us to avoid using a placeholder element at index 0. The root of the heap will be at index 0.
// The parameter n represents the number of nodes in the heap
// You may feel that array.length also represents the number of nodes in the heap. That is true, but only in step-1. Later we will need to dynamically state the size of the heap. Remember, we are trying to do this without creating any extra arrays. We'll need to separate the heap and sorted regions of the array and n will dictate the end of the heap.
// We created a separate swap helper function.
// Nothing fancy here. Swapping will be valuable in step-2 of the algorithm as well, so we'll want to keep our code DRY (don't repeat yourself).
// To correctly convert the input array into a heap, we'll need to call heapify on children nodes before their parents. This is easy to do, just call heapify on each element right-to-left in the array:

function inHeapSort(array) {
  console.log(array)
  // heapify the tree from the bottom up
  for (let i = array.length - 1; i >= 0; i--) {
      heapify(array, array.length, i);
  }
  console.log('Heapified')
  console.log(array)
  console.log('Sorting')
  // the entire array is now a heap
  // until the heap is empty, continue to "delete max"
  for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
    // swap the root of the heap with the last element of the heap,
    // this effecively shrinks the heap by one and grows the sorted array by one
    swap(array, endOfHeap, 0);

    // sift down the new root, but not past the end of the heap
    heapify(array, endOfHeap, 0);
    console.log(array)
}
return array;
}

console.log(inHeapSort([1,5,2,4,3,8,7,6]))