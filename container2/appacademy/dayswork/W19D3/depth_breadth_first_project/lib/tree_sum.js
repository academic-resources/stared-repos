function treeSum(node) {
  if (!node) return 0

  return treeSum(node.left) + node.val + treeSum(node.right)
}

module.exports = {
  treeSum
}
