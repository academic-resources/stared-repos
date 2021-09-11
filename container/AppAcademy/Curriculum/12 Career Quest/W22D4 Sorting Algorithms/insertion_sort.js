function insertionSort(arr) {
  // the `i` loop will iterate through every element of the array
  // we begin at i = 1, because we can consider the first element of the array as a
  // trivially sorted region of only one element
  // insertion sort allows us to insert new elements anywhere within the sorted region
  for (let i = 1; i < arr.length; i++) {
      // grab the first element of the unsorted region
      let currElement = arr[i];

      // the `j` loop will iterate left through the sorted region,
      // looking for a legal spot to insert currElement
      for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
          // keep moving left while currElement is less than the j-th element

          arr[j + 1] = arr[j];
          // the line above will move the j-th element to the right, 
          // leaving a gap to potentially insert currElement
      }
      // insert currElement into that gap
      arr[j + 1] = currElement;
  }
  return arr;
}

let arr1 = [2, 8, 5, 2, 6];
console.log(insertionSort(arr1))

// Complexity
// Time: T(n * n/2) = O(n^2)
// Space: O(1)

// When should we use Insertion Sort?
// "Online Algorithms": the input data is streamed in pieces
// Insertion Sort has one advantage that makes it absolutely supreme in one special case. Insertion Sort is what's known as an "online" algorithm. Online algorithms are great when you're dealing with streaming data, because they can sort the data live as it is received.

// If you must sort a set of data that is ever-incoming, for example, maybe you are sorting the most relevant posts in a social media feed so that those posts that are most likely to impact the site's audience always appear at the top of the feed, an online alogirthm like Insertion Sort is a great option.

// Insertion Sort works well in this situation because the left side of the array is always sorted, and in the case of nearly sorted arrays, it can run in linear time. The absolute best case scenario for Insertion Sort is when there is only one unsorted element, and it is located all the way to the right of the array.

// Well, if you have data constantly being pushed to the array, it will always be added to the right side. If you keep your algorithm constantly running, the left side will always be sorted. Now you have linear time sort.

// Else:
// Insertion Sort is, in general, useful in all the same situations as Bubble Sort. It's a good option when:

// You are sorting really small arrays where run time will be negligible no matter what algorithm we choose.
// You are sorting an array that you expect to already be nearly sorted.