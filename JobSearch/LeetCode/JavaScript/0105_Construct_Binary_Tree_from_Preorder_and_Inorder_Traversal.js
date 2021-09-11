// Given preorder and inorder traversal of a tree, construct the binary tree.

// Note:
// You may assume that duplicates do not exist in the tree.

// For example, given

// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]
// Return the following binary tree:

//     3
//    / \
//   9  20
//     /  \
//    15   7

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