// let range = function (min, max) {
//   let increasing = true;

//   if (min > max) {
//     let temp = min;
//     min = max;
//     max = temp;
//     increasing = false;
//   }

//   if (min === max) {
//     return [];
//   }

//   if (min + 1 === max) {
//     return [];
//   }

//   let recurResult = range(min, max - 1);
//   recurResult.push(max - 1);
//   if (increasing) {
//     return recurResult;
//   } else {
//     return recurResult.reverse();
//   }
// };
//range(1,5)
//recurse = (1,4)
