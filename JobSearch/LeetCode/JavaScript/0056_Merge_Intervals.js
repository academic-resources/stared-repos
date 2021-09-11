// Given a collection of intervals, merge all overlapping intervals.

// Example 1:

// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
// Example 2:

// Input: [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

function merge(intervals) {
  if (intervals.length < 2) return intervals
  intervals.sort((a, b) => a[0] - b[0])
  const updatedIntervals = []
  for (let i = 0; i < intervals.length; i++) {
    let currentStart = intervals[i][0]
    let currentEnd = intervals[i][1]
    while (intervals[i + 1] && intervals[i + 1][0] <= currentEnd) {
      currentEnd = Math.max(currentEnd, intervals[++i][1])
    }
    updatedIntervals.push([currentStart, currentEnd])
  }
  return updatedIntervals
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))      //=> [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]))                     //=> [[1,5]]
console.log(merge([[1,4],[1,4]]))                     //=> [[1,4]]
console.log(merge([[1,4],[2,3]]))                     //=> [[1,4]]
console.log(merge([[1,2],[2,3],[3,4],[4,5]]))         //=> [[1,5]]
console.log(merge([[1,5]]))                           //=> [[1,5]]
console.log(merge([[]]))                              //=> [[]]
console.log(merge([[1,4],[0,4]]))                     //=> [[0,4]]
console.log(merge([[1,4],[0,0]]))                     //=> [[1,4],[0,0]]
console.log(merge([[1,4],[0,1]]))                     //=> [[0,4]]
console.log(merge([[2,3],[4,5],[6,7],[8,9],[1,10]]))  //=> [[1,10]]
console.log(merge([[1,2],[0,5],[0,2]]))               //=> [[0,5]]


