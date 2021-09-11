// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

// Note: You may not slant the container and n is at least 2.

 



// The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

 

// Example:

// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49

/**
 * @param {number[]} height
 * @return {number}
 */

function maxArea(height) {
  let maxArea = 0
  let left = 0
  let right = height.length - 1

  while (left < right) {
    let width = right - left
    let maxHeight = Math.min(height[right], height[left])
    let currArea = width * maxHeight
    maxArea = Math.max(maxArea, currArea)
    height[left] >= height[right] ? right-- : left ++
  }
  return maxArea
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
console.log(maxArea([1]))
console.log(maxArea([]))
console.log(maxArea([8,8]))
console.log(maxArea([1,1,1,1,8,8,1,1,1,1]))