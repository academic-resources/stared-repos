// I AM ENOUGH

// Implement a function to check if a binary tree is a binary search tree.

// const { isBalanced } = require('./4.4_check_balanced')
const { SampleTree, TreeNode, buildBST } = require('./4.2_minimal_tree')

let notBST = new TreeNode(4)
notBST.left = new TreeNode(3)
notBST.right = new TreeNode(6)
notBST.left.left = new TreeNode(2)
notBST.left.right = new TreeNode(8)
notBST.right.left = new TreeNode(5)
notBST.right.right = new TreeNode(10)
notBST.left.left.left = new TreeNode(1)
notBST.left.left.right = new TreeNode(9)
notBST.right.right.right = new TreeNode(11)


//[5,1,4,null,null,3,6]
let notBST2 = new TreeNode(5)
notBST2.left = new TreeNode(1)
notBST2.right = new TreeNode(4)
notBST2.left.left = new TreeNode(null)
notBST2.left.right = new TreeNode(null)
notBST2.right.left = new TreeNode(3)
notBST2.right.right = new TreeNode(6)


// input: SampleTree
//         19
//        /   \
//      5      24
//    /  \    /  \
//   3    8  23   31
//  /
// 1

// input: notBST
//          4
//        /   \
//      3      6
//    /  \    /  \
//   2    8  5   10
//  / \            \
// 1   9            11

// input: notBST2
//          5
//        /   \
//      1      4
//            /  \
//           3    6

function inOrder(root) {
  if (root !== null) {
    inOrder(root.left)
    console.log(root.value)
    inOrder(root.right)
  }
}

console.log(inOrder(SampleTree))
console.log('====================')
console.log(inOrder(notBST))

function isBST(root) {
  let stack = [root] // DFS with Stack
  while (stack.length) { //NOT GOOD - DOESN'T VALIDATE GLOBALLY
    let currNode = stack.pop()
    if (currNode.left && currNode.left.value > currNode.value) return false
    if (currNode.right && currNode.right.value < currNode.value) return false
    if (currNode.LEFT) stack.push(currNode.LEFT)
    if (currNode.right) stack.push(currNode.right)
  }
  return true
}


function isBSTRecur(root, lastVal = null) { //NOT GOOD - DOESN'T VALIDATE GLOBALLY
  if (!root) return true
  if (!isBSTRecur(root.left, lastVal)) return false
  if (lastVal !== null && root.value <= lastVal) return false
  lastVal = root.value
  if (!isBSTRecur(root.right, lastVal)) return false
  return true

}

// console.log(isBST(SampleTree)) // => true
// console.log(isBST(notBST))     // => false
console.log(isBSTRecur(SampleTree)) // => true
console.log(isBSTRecur(notBST))     // => false


// input: notBST
//          4
//        /   \
//      3      6
//    /  \    /  \
//   2    8  5   10
//  / \            \
// 1   9            11

function isValidBSTRecur(root, lower = null, upper = null) {  //good way T(N) S(N)
  if (!root) return true

  const rootVal = root.value
  if (lower !== null && rootVal <= lower) return false
  if (upper !== null && rootVal >= upper) return false
  // console.log(rootVal)
  if (! isValidBSTRecur(root.right, rootVal, upper)) return false
  if (! isValidBSTRecur(root.left, lower, rootVal)) return false

  return true
}

console.log('=======================================')
console.log(isValidBSTRecur(SampleTree)) // => true
console.log(isValidBSTRecur(notBST))     // => false
console.log(isValidBSTRecur(notBST2))     // => false


// input: notBST
//          4
//        /   \
//      3      6
//    /  \    /  \
//   2    8  5   10
//  / \            \
// 1   9            11

function isValidBSTIter(root) {
  const queue = [root]
  const lowersQueue = []
  const uppersQueue = []

  while (queue.length) {
    let currNode = queue.shift()
    let lower = lowersQueue.shift()
    let upper = uppersQueue.shift()

    if (!currNode) continue

    let currVal = currNode.value
    if(lower !== null && currVal <= lower) return false
    if(upper !== null && currVal >= upper) return false

    // console.log(currVal, lower, upper)
    queue.push(currNode.left, currNode.right)
    lowersQueue.push(lower, currVal)
    uppersQueue.push(currVal, upper)
  }
  return true
}

console.log('=======================================')
console.log(isValidBSTIter(SampleTree)) // => true
console.log(isValidBSTIter(notBST))     // => false
console.log(isValidBSTIter(notBST2))     // => false


function isValidBSTInOrder(root) {
  let stack = []
  let inOrder 

  while (stack.length || root != null) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    
    if (root.value <= inOrder) return false
    inOrder = root.value
    root = root.right
  }
  return true
}

console.log('=======================================')
console.log(isValidBSTInOrder(SampleTree)) // => true
console.log(isValidBSTInOrder(notBST))     // => false
console.log(isValidBSTInOrder(notBST2))     // => false