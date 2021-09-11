// Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

// You may assume that the intervals were initially sorted according to their start times.

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

function insert(intervals, newInterval) {
  const updatedIntervals = []
  let mergeStart = newInterval[0]
  let mergeEnd = newInterval[1]

  if (intervals.length === 1) {
    return intervals[0][0] > mergeEnd ? [newInterval, ...intervals] :
    intervals[0][1] < mergeStart ? [...intervals, newInterval] :
    [[Math.min(mergeStart, intervals[0][0]), Math.max(mergeEnd, intervals[0][1])]]
  }
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] < mergeStart && intervals[i][1] > mergeEnd) mergeStart = Infinity
    if (intervals[i][0] > mergeEnd && intervals[i][0] > mergeStart) {
      updatedIntervals.push(newInterval)
      mergeStart = Infinity
    }
    if (intervals[i][1] >= mergeStart) {
      mergeStart = Math.min(mergeStart, intervals[i][0])
      while (i < intervals.length - 1 && mergeEnd >= intervals[i + 1][0]) i++
      mergeEnd = Math.max(mergeEnd, intervals[i][1])
      updatedIntervals.push([mergeStart, mergeEnd])
      mergeStart = Infinity
    } else updatedIntervals.push(intervals[i])
  }
  if (mergeStart !== Infinity) updatedIntervals.push(newInterval)
  return updatedIntervals
};

console.log(insert([[1,3],[6,9]], [2,5]))                       //=> [[1,5], [6,9]]
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]))  //=> [[1,2], [3,10], [12,16]]
console.log(insert([[1,2],[3,5]], [0,1]))                       //=> [[0,2], [3,5]]
console.log(insert([[3,5],[6,7]], [1,2]))                       //=> [[1,2], [3,5], [6,7]]
console.log(insert([[3,5],[6,7]], [8,9]))                       //=> [[3,5], [6,7], [8,9]]
console.log(insert([[3,5],[8,9]], [6,7]))                       //=> [[3,5], [6,7], [8,9]]
console.log(insert([[3,5],[8,9]], [0,0]))                       //=> [[0,0], [3,5], [8,9]]
console.log(insert([[3,5],[8,9]], [3,5]))                       //=> [[3,5], [8,9]]
console.log(insert([[1,5]], [2,3]))                             //=> [[1,5]]
console.log(insert([[1,5]], [2,7]))                             //=> [[1,7]]
console.log(insert([[1,5]], [0,1]))                             //=> [[0,5]]
console.log(insert([[1,5],[6,8]], [5,6]))                       //=> [[1,8]]
console.log(insert([[1,5],[6,8]], [0,9]))                       //=> [[0,9]]
console.log(insert([[1,2],[6,8], [10,12]], [5,9]))              //=> [[1,2], [5,9], [10,12]]

