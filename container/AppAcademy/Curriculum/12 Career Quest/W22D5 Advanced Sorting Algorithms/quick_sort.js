
function partition(array, pivot) {
  let left = array.filter(el => el < pivot);
  let right = array.filter(el => el >= pivot);
  return [ left, right ];
}

let arr = [7, 3, 8, 9, 2];
console.log(partition(arr, 5));  // => [[3, 2], [7,8,9]]


function quickSort (array) {
  if (array.length <= 1) return array

  let pivot = array.shift() //arbitrary - could be array[array.length - 1]
  let leftSide = array.filter(el => el < pivot);
  let rightSide = array.filter(el => el >= pivot);

  let leftSorted = quickSort(leftSide)
  let rightSorted = quickSort(rightSide)

  // return leftSorted.concat([pivot]).concat(rightSorted)
  return [...leftSorted, pivot, ...rightSorted]
}

console.log(quickSort(arr))

// Time and Space Complexity Analysis
// The complexity analysis of this algorithm is easier to explain through visuals, so we highly encourage you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity.

// Time Complexity
// Avg Case: O(n log(n))
// Worst Case: O(n2)
// The runtime analysis of quickSort is more complex than mergeSort

// n is the length of the input array
// The parititon step alone is O(n)
// We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. This is dependent on how we choose the pivot. Let's analyze the best and worst case:
// Best Case: We are lucky and always choose the median as the pivot. This means the left and right partitions will have equal length. This will halve the array length at every step of the recursion. We benefit from this halving with O(log(n)) recursive calls to reach the base case.
// Worst Case: We are unlucky and always choose the min or max as the pivot. This means one partition will contain everything, and the other partition is empty. This will decrease the array length by 1 at every step of the recursion. We suffer from O(n) recursive calls to reach the base case.
// The parition step occurs in every recursive call, so our total complexities are:
// Best Case: O(n * log(n))
// Worst Case: O(n2)
// Although we typically take the worst case when describing Big-O for an algorithm, much research on quickSort has shown the worst case to be an exceedingly rare occurance even if we choose the pivot at random. Because of this we still consider quickSort an efficient algorithm. This is a common interview talking point, so you should be familiar with the relationship between the choice of pivot and efficiency of the algorithm.

// Just in case: A somewhat common question a student may ask when studying quickSort is, "If the median is the best pivot, why don't we always just choose the median when we partition?" Don't overthink this. To know the median of an array, it must be sorted in the first place.

// Space Complexity
// Our implementation of quickSort uses O(n) space because of the partition arrays we create. There is an in-place version of quickSort that uses O(log(n)) space. O(log(n)) space is not huge benefit over O(n). You'll also find our version of quickSort as easier to remember, easier to implement. Just know that a O(logn) space quickSort exists.

// When should we use Quick Sort?
// When you are in a pinch and need to throw down an efficent sort (on average). The code recursive code is light and simple to implement; much smaller than mergeSort.
// When constant space is important to you, use the in-place version. This will of course trade off some simplicity of implementation.
// If you know some constraints about dataset you can make some modifications to optimize pivot choice. Here's some food for thought. Our implementation of quickSort will always take the first element as the pivot. This means we will suffer from the worst case time complexity in the event that we are given an already sorted array (ironic isn't it?). If you know your input data to be mostly already sorted, randomize the choice of pivot - this is a very easy change. Bam. Solved like a true engineer.