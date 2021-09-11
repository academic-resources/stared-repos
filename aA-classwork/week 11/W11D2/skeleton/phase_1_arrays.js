// Array.prototype.uniq = function () {
//     const unique = [];
//     for (let i = 0; i < this.length; i++) {
//         if (!unique.includes(this[i])) {
//             unique.push(this[i]);
//         }
//     } 
//     return unique;
// }

// // array = [1,1,2,3,4,4,5]
// // console.log(array.uniq())

// Array.prototype.twoSum = function () {
//     const twoSums = []
//     for (let i = 0; i < this.length; i++) {
//         for (let j = i + 1; j < this.length; j++) {
//             if (this[i] + this[j] === 0) {
//                 twoSums.push([i, j]);
//             }
//         }
//     } return twoSums;
// }

// // array = [1, -1, 2, 3, 4, -4, 5];
// // console.log(array.twoSum());


// // array = [[1,2], [3,4]].transpose() // -> [[1,3],[2,4]]
// // [[1,2,3],
// // [4,5,6],  
// // [7,8,9]]
// // 
// // [1,4,7]
// // [2,5,8]
// // [3,6,9]

// Array.prototype.transpose = function () {
//   const result = []
//   for (let i = 0; i < this.length; i++) {
//     const inner = [];
//     for (let j = 0; j < this[i].length; j++) {
//       // push to inner
//       inner.push(this[j][i]);
//     }
//     result.push(inner)
//   }
//   return result;
// }

// // const array = [[1, 2, 3], [4, 5, 6], [7,8,9]]
// console.log(array.transpose())