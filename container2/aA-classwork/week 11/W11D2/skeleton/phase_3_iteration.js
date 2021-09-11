// function bubbleSort(arr) {
//   let sorted = false;
//   while (!sorted) {
//     sorted = true;
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] > arr[i + 1]) {
//         sorted = false;
//         const temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

// // console.log(bubbleSort([1,4,2,5,3]));

// function subStrings(str) {
//   const subStrings = []
//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j <= str.length; j++) {
//       subStrings.push(str.slice(i, j));
//     }
//   }
//   return subStrings;
// }

// console.log(subStrings("racecar"))