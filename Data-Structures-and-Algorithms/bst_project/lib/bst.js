class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val, root = this.root) {
    if (!this.root) {
      this.root = new TreeNode(val);
      return;
    }

    if (val < root.val) {
      if (root.left) {
        this.insert(val, root.left);
      } else {
        root.left = new TreeNode(val);
      }
    } else {
      if (root.right) {
        this.insert(val, root.right);
      } else {
        root.right = new TreeNode(val);
      }
    }
  }

  searchRecur(val, root = this.root) {
    if (!root) return false;
    if (val < root.val) {
      return this.searchRecur(val, root.left);
    } else if (val > root.val) {
      return this.searchRecur(val, root.right);
    } else {
      return true;
    }
  }

  searchIter(val, root = this.root) {
    if (!root) return false;
    const stack = [root];
    while (stack.length) {
      const node = stack.pop();
      if (val === node.val) return true;
      if (val < node.val) {
        if (node.left) stack.push(node.left);
      } else {
        if (node.right) stack.push(node.right);
      }
    }
    return false;
  }
}

module.exports = {
  TreeNode,
  BST
};
