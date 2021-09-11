// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./tree_node.js');


function buildTree(preorder, inorder) {
  if (!preorder.length && !inorder.length) return null
  let rootVal = preorder[0]
  let root = new TreeNode(rootVal)
  
  let midIdx = inorder.indexOf(rootVal)
  let leftInOrder = inorder.slice(0, midIdx)
  let rightInOrder = inorder.slice(midIdx + 1)

  let leftPreOrder = preorder.filter(val => leftInOrder.includes(val))
  let rightPreOrder = preorder.filter(val => rightInOrder.includes(val))

  let leftTree = buildTree(leftPreOrder, leftInOrder)  // returns root of left sub-tree
  let rightTree = buildTree(rightPreOrder, rightInOrder) //return root of right sub-tree

  root.left = leftTree
  root.right = rightTree

  return root
}

console.log(buildTree([], []))
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
console.log(buildTree(preorder, inorder))