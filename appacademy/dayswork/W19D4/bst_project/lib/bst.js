class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(val, root = this.root) {
    debugger
    if (!this.root) {
      const newNode = new TreeNode(val)
      this.root = newNode
    } else {
      if (val < root.val) {
        if (root.left) {
          this.insert(val, root.left)
        } else {
          root.left = new TreeNode(val)
        }
      } else {
        if (root.right) {
          this.insert(val, root.right)
        } else {
          root.right = new TreeNode(val)
        }
      }
    }
  }

  searchRecur(val, root = this.root) {
    if (!root) return false
    if (val < root.val) return this.searchRecur(val, root.left)
    if (val > root.val) return this.searchRecur(val, root.right)
    return true
  }

  searchIter(val) {
    let node = this.root

    while (node) {
      if (node.val === val) return true
      if (val < node.val) {
        node = node.left
      } else {
        node = node.right
      }
    }

    return false
  }
}

module.exports = {
  TreeNode,
  BST
}
