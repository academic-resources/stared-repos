// Write a function that takes a list of SVGAnimatedNumberList, numbers, and returns the largest number in the list.  If there are no numbers in the list, return 0.

// Input: [7, 2, 6, 3]
// Output: 7


// const solution = (numbers) => {
//   let largest = 0
//   for (let i = 0; i < numbers.length; i++) {
//       largest = Math.max(largest, numbers[i])
//   }
//   return largest
// };
const solution = (numbers) => {
  return numbers.reduce((largest, num) => largest = Math.max(largest, num))
};

console.log(solution([7,2,6,3]))
console.log(solution([7,2,6,3,8]))
console.log(solution([7,2,6,3,8,9]))