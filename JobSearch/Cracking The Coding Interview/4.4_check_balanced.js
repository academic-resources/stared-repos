// I AM ENOUGH

// Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.


// input: BinaryTree
//         19
//        /   \
//      5      24
//    /  \    /  \
//   3    8  23   31
//  /
// 1

const { SampleTree, TreeNode, buildBST } = require('./4.2_minimal_tree')

// input: BinaryTree
// [12, 8, 14, 5, null, null, 18]
//          12
//        /    \
//      8       14
//     /          \
//   5    ()  ()   18
//  /                \
// 1                 24

let UnbalancedTree = new TreeNode(12)
UnbalancedTree.left = new TreeNode(8)
UnbalancedTree.left.left = new TreeNode(5)
UnbalancedTree.left.left.left = new TreeNode(1)
UnbalancedTree.right = new TreeNode(14)
UnbalancedTree.right.right = new TreeNode(18)
UnbalancedTree.right.right.right = new TreeNode(24)


// input: BinaryTree
// [12, 8, 14, 5, null, null, 18]
//            12
//          /   \
//         8     14
//       /  \       \
//      5    9  null 18
//     /                
//    1                 
//   /
//  0

let UnbalancedTree2 = new TreeNode(12)
UnbalancedTree2.left = new TreeNode(8)
UnbalancedTree2.left.left = new TreeNode(5)
UnbalancedTree2.left.right = new TreeNode(9)
UnbalancedTree2.left.left.left = new TreeNode(1)
UnbalancedTree2.left.left.left.left = new TreeNode(0)
UnbalancedTree2.right = new TreeNode(14)
UnbalancedTree2.right.right = new TreeNode(18)

// console.log(SampleTree)
// console.log("=================================================")
// console.log(UnbalancedTree)

let BigArray = []
let size = 3000000
for (let i = 0; i < size; i++) BigArray.push(i)
let BigTree = buildBST(BigArray)


function isBalanced(root) {

  let stack = [[root, 0]]
  let deepestLevel = 0
  let shallowestLevel = Infinity

  while (stack.length) {
    if ((deepestLevel - shallowestLevel) > 1 ) return false
    let [currNode, level] = stack.pop()
    if (currNode) {
      // Depth First all the way down
      // when to return false?
      //  When we get a leaf node or a node with only 1 child
      if (currNode.left === null || currNode.right === null) {
        if (level > deepestLevel) deepestLevel = level
        if (level < shallowestLevel) shallowestLevel = level
      }
      stack.push([currNode.left, level + 1])
      stack.push([currNode.right, level + 1])
    }
  }
  console.log(`deepest: ${deepestLevel}`)
  console.log(`shallowest: ${shallowestLevel}`)
  return true

}

console.log(isBalanced(SampleTree))      // => true
console.log(isBalanced(UnbalancedTree))  // => false
console.log(isBalanced(UnbalancedTree2)) // => false
t1 = Date.now()
console.log(isBalanced(BigTree))         // => true
t2 = Date.now()
console.log(`runtime of isBalanced: ${(t2 - t1)} ms`)

//            12
//          /   \
//         8     14
//       /  \      \
//      5    9 null 18
//     /                
//    1                 
//   /
//  0


function isBalancedRecur(root) {
  if (!root) return true
  let heightDiff = Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1
  return heightDiff && isBalancedRecur(root.left) && isBalancedRecur(root.right)
}

function getHeight(root) {
  if (!root) return -1
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1
}

console.log('==================================================')
console.log(isBalancedRecur(SampleTree))      // => true
console.log(isBalancedRecur(UnbalancedTree))  // => false
console.log(isBalancedRecur(UnbalancedTree2)) // => false
t1 = Date.now()
console.log(isBalancedRecur(BigTree))         // => true
t2 = Date.now()
console.log(`runtime of isBalancedRecur: ${(t2 - t1)} ms`)

exports.isBalanced = isBalanced