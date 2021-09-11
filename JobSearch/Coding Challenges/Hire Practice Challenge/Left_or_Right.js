// Suppor you're given a binary tree represented as an array.  For example,
// [3,6,2,9,-1,10] represents the following binary tree (where -1 is a non-existent node)

//      3
//   6     2
// 9     10

// Write a function that determines whether the left or right branch of the three is laregr.  The size of each branch is the sum of the node values.  The function should return the string "Right" if the right side is larger and "left" if the left side is larger. If the tree has 0 nodes or if the size of the branches are equal, return the empty string.

const solution = (arr) => {
  let branchCt = 1
  let currCt = branchCt
  let left = true
  let leftCt = 0
  let rightCt = 0
  
  for (let i = 1; i < arr.length; i++) {
      if (left && arr[i] >= 0) leftCt += arr[i]
      else if (arr[i] >= 0) rightCt += arr[i]
      if (!--currCt) {
          if (!left) branchCt *= 2
              currCt = branchCt
              left = !left                
      }
  }
  if (leftCt === rightCt) return ""
  return leftCt > rightCt ? "Left" : "Right"
};

console.log(solution([3,6,2,9,-1,10]))
console.log(solution([1,4,100,5]))