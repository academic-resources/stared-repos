let arr1 = [1, 5, 10, 15];
let arr2 = [0, 2, 3, 7, 10];
merge(arr1, arr2); // => [0, 1, 2, 3, 5, 7, 10, 10, 15]

// Merge
// Merging two sorted arrays is simple. Since both arrays are sorted, we know the smallest numbers to always be at the front of the arrays. We can construct the new array by comparing the first elements of both input arrays. We remove the smaller element from it's respective array and add it to our new array. Do this until both input arrays are empty:


// commented
function merge(array1, array2) {
  let merged = [];

  // keep running while either array still contains elements
  while (array1.length || array2.length) {
      // if array1 is nonempty, take its the first element as ele1
      // otherwise array1 is empty, so take Infinity as ele1
      let ele1 = array1.length ? array1[0] : Infinity;
      
      // do the same for array2, ele2
      let ele2 = array2.length ? array2[0] : Infinity;

      let next;
      // remove the smaller of the eles from it's array
      if (ele1 < ele2) {
          next = array1.shift();
      } else {
          next = array2.shift();
      }

      // and add that ele to the new array
      merged.push(next);
  }

  return merged;
}

// It's worth mentioning that merge will have a O(n) runtime where n is the combined length of the two input arrays. This is what we meant when we said it was "easy" to merge two sorted arrays; linear time is fast! We'll find fact this useful later.

function mergeSort(array) {
  if (array.length <= 1) return array

  let midIdx = Math.floor(array.length / 2)
  let leftSide = array.slice(0, midIdx)
  let rightSide = array.slice(midIdx)

  let sortedLeft = mergeSort(leftSide)
  let sortedRight = mergeSort(rightSide)
  return merge(sortedLeft, sortedRight)
}

let arr = [6,2,1,7,3,8,5,4]
console.log(mergeSort(arr))

// Complexity:
// Time: Merge = T(n) mergeSort = T(log(n)) : O(n * log(n))
// Space: O(n)

// When should we use Merge Sort?
// Unless we, the engineers, have access in advance to some unique, exploitable insight about our dataset, it turns out that O(n log n) time is the best we can do when sorting unknown datasets.

// That means that Merge Sort is fast! It's way faster than Bubble Sort, Selection Sort, and Insertion Sort. However, due to its linear space complexity, we must always weigh the tradeoff between speed and memory consumption when making the choice to use Merge Sort. Consider the following:

// If you have unlimited memory available, use it, it's fast!
// If you have a decent amount of memory available and a medium sized dataset, run some tests first, but use it!
// If you have very limited memory and you've got time to kill, maybe you should consider other options.
// If you have very limited memory and no time to kill...well, you're going to have to do some data analysis to look for some exploitable feature of the data set, but that takes human time.