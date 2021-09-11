// I AM ENOUGH

// Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.

class BiTreeNode {
  constructor(val){
    this.value = val
    this.left = this.right = null
    this.parent = null
  }
}

function buildBiBST(array, parentNode = null) {
  if (!array.length) return null
  let midIdx = Math.floor(array.length / 2)
  let root = new BiTreeNode(array[midIdx])
  root.parent = parentNode
  root.left = buildBiBST(array.slice(0, midIdx), root)
  root.right = buildBiBST(array.slice(midIdx + 1), root)
  
  return root
}

let biTree = buildBiBST([1, 3, 5, 8, 11, 15, 16, 19, 23, 24, 27, 31, 32])
// console.log(biTree)
// console.log(biTree.left)
// console.log(biTree.right)
//            16
//         /      \
//       8          27
//    /    \      /    \
//   3     15    23     32
//  / \    /    / \    /
// 1   5  11  19  24  31


function findNextNode(node) {
  if (!node) return null

  // if current node has a right child, find left most node from right child
  if (node.right) {
    return findLeftMostNode(node.right)
  }
  // else if currNode is a right child and parent exists,
  // go up lineage until not right child
  else {
    while (node.parent && node === node.parent.right) {
      node = node.parent // go up
    }
    return node.parent
  }
  // else null
}

function findLeftMostNode(node) {
  if (!node) return null
  if (node.left) {
    return findLeftMostNode(node.left)
  } else {
    return node
  }
}

// console.log(findLeftMostNode(biTree))
// console.log(findLeftMostNode(biTree.right))

//            16
//         /      \
//       8          27
//    /    \      /    \
//   3     15    23     32
//  / \    /    / \    /
// 1   5  11  19  24  31

console.log(findNextNode(biTree).value)                    // node: 16 => 19
console.log(findNextNode(biTree.right.right))              // node: 32 => null
console.log(findNextNode(biTree.left.right).value)         // node: 15 => 16
console.log(findNextNode(biTree.right.left.right).value)   // node: 24 => 27