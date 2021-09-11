// Array.prototype.myEach = function (callback) {
//     for (let i = 0; i < this.length; i++) {
//         callback(this[i]);
//     }
// }


// // function print (ele) {
//     //     console.log(ele);
//     // } 
    
//     // array.myEach(print)
    
// Array.prototype.myMap = function (callback) {
//   const mapped = [];
  
//   function myEachCB (el) {
//       mapped.push(callback(el));
//   }
//   this.myEach(myEachCB);
//   return mapped;
//   // return this.myEach(callback) {
//   //   mapped.push(this);
//   // }
// }
    
// function double (ele) {
//     return ele * 2;
// }
    
// console.log(array.myMap(double));

// Array.prototype.myReduce = function (callback, initialValue) {

//   let accum = 0;
  
//   debugger
  
//   return accum;
// }



// Array.prototype.myReduce = function (callback, initialValue = this[0]) {
  
// }

// [1,2,3,4].myInject (function(acc, el) {
//   return acc + el;
// })
// // 1 + 2
// // 3 + 3
// // 6 + 4

// ['a','b','c','d'].myInject({}) (function(acc, el) {
//   acc[el] = 'garbage'
// });
// // {}[] = 'a'
// // {'a': 1}[] = 'b'

// Array.prototype.myReduce = function (callback, initialValue) {
//   let initialI = 0;
//   if (initialValue === undefined) {
//     initialValue = this[0]
//     initialI = 1;
//   }
//   let returnValue = initialValue
//   for (let i = initialI; i < this.length; i++) {
//     returnValue = callback(returnValue, this[i]);
//   }
//   return returnValue;
// }

// const array = [1, 2, 3, 4];
// const result = array.myReduce(function (accum, el) {
//   return accum + el;
// });
// console.log(result);