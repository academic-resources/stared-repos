// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/


function isBalanced(root) {
  if (!root) return true
  let heightDiff = Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1
  return heightDiff && isBalanced(root.left) && isBalanced(root.right)
}

function getHeight(root) {
  if (!root) return -1
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1
}