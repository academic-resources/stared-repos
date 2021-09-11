// Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

 

// Example 1:

// Input: [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of intervals are non-overlapping.
// Example 2:

// Input: [[1,2],[1,2],[1,2]]
// Output: 2
// Explanation: You need to remove two [1,2] to make the rest of intervals non-overlapping.
// Example 3:

// Input: [[1,2],[2,3]]
// Output: 0
// Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 

// Note:

// You may assume the interval's end point is always bigger than its start point.
// Intervals like [1,2] and [2,3] have borders "touching" but they don't overlap each other.

/**
 * @param {number[][]} intervals
 * @return {number}
 */

function eraseOverlapIntervals(intervals) {
  if (intervals.length < 2) return 0
  intervals.sort((a,b) => a[0] - b[0])
  let count = 0
  let lastEnd = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
		if (intervals[i][0] < lastEnd) {
			count++;
			lastEnd = Math.min(lastEnd, intervals[i][1])
		} else {
			lastEnd = intervals[i][1]
    }
	}
	return count;
}


console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))         //=> 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]))               //=> 2
console.log(eraseOverlapIntervals([[1,2],[2,3]]))                     //=> 0
console.log(eraseOverlapIntervals([[0,2],[1,3],[2,4],[3,5],[4,6]]))   //=> 2
console.log(eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]]))   //=> 2


function eraseOverlapIntervals2(intervals) {
    intervals.sort((a,b) => a[1] - b[1])
  	let prevInterval = intervals[0]
	  let counter = 0
    for (let i = 1; i < intervals.length; i++) {
        if (prevInterval[1] > intervals[i][0]) counter++
        else prevInterval = intervals[i];
	  }
	  return counter;
}

console.log("===========")
console.log(eraseOverlapIntervals2([[1,2],[2,3],[3,4],[1,3]]))         //=> 1
console.log(eraseOverlapIntervals2([[1,2],[1,2],[1,2]]))               //=> 2
console.log(eraseOverlapIntervals2([[1,2],[2,3]]))                     //=> 0
console.log(eraseOverlapIntervals2([[0,2],[1,3],[2,4],[3,5],[4,6]]))   //=> 2
console.log(eraseOverlapIntervals2([[1,100],[11,22],[1,11],[2,12]]))   //=> 2

