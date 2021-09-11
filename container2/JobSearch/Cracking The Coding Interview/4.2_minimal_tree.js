// I AM ENOUGH

// Given a sorted (increasing order) array with unique integer elements, write an
// algo­rithm to create a binary search tree with minimal height.

// Input: Array
// Example: [1, 3, 5, 8, 19, 23, 24, 31]
// Expected Output:
//         19
//        /   \
//      5      24
//    /  \    /  \
//   3    8  23   31
//  /
// 1

class TreeNode {
  constructor(val){
    this.value = val
    this.left = this.right = null
  }
}

function buildBST(array) {
  if (!array.length) return null
  let midIdx = Math.floor(array.length / 2)
  let root = new TreeNode(array[midIdx])
  root.left = buildBST(array.slice(0, midIdx))
  root.right = buildBST(array.slice(midIdx + 1))
  
  return root
}

// console.log(buildBST([1, 3, 5, 8, 19, 23, 24, 31]))

exports.TreeNode = TreeNode
exports.buildBST = buildBST
exports.SampleTree = buildBST([1, 3, 5, 8, 19, 23, 24, 31])