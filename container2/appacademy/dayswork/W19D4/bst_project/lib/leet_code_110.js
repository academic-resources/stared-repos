// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const height = root => {
  if (!root) return -1
  return 1 + Math.max(height(root.left), height(root.right))
}

function isBalanced(root) {
  if (!root) return true

  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )
}
