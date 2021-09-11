// isBalancedTree
// Write a JavaScript function to check if a binary tree is balanced. A tree is balanced if, at every node, the depth of subtree on the left hand side is equal to the depth of the subtree on the right (plus or minus one).

// Solution
// In our brute-force solution, we traverse our tree, finding the depth at each node using a helper getDepth function, which travels all the way to the leaf nodes of the tree and returns a depth. We then make recursive calls to make sure that both the left and right sides of the tree are also balanced. getDepth takes O(n) time, where n is the number of nodes, and isBalanced takes O(n) time, since we must call it once for each node. This leads to a total time complexity of O(n**2).

// Take in the root node
function isBalanced (node) {
  // Base case: the tree is empty.  Return true.
  if (!node) {
    return true;
  }

  // Get the depths of left and right subtrees and compare
  var leftDepth = getDepth(node.left);
  var rightDepth = getDepth(node.right);
  var depthDiff = Math.abs(leftDepth - rightDepth);

  // The tree is balanced if both subtrees are balanced AND
  // the difference in depths of those subtrees is between -1 and 1
  return (isBalanced(node.left) && isBalanced(node.right)) && depthDiff < 2;
}

function getDepth (node) {
  // Base case: empty tree.  Depth is 0.
  if (!node) {
    return 0;
  }

  // Take the larger depth of the two subtrees, calculated recursively
  return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
}

// We can do better by avoiding repetitive calls to isBalanced. Rather than checking all the way to the leaf nodes at each point in our tree, we can simply make it to the leaf nodes first and return a depth as we traverse back up.

function isBalanced (node) {
  return isBalancedNode(node).isBalanced;
}

function isBalancedNode (node) {
  if (!node) {
    return {isBalanced: true, depth: -1};
  }

  let left = isBalancedNode(node.left);
  let right = isBalancedNode(node.right);

  if (left.isBalanced && right.isBalanced &&
        Math.abs(left.depth - right.depth) <= 1) {
    return {isBalanced: true, depth: Math.max(right.depth, left.depth) + 1};
  } else {
    return {isBalanced: false, depth: 0};
  }
}

// In this solution, we use a helper function isBalancedNode which returns an object containing both whether a node is balanced, and the depth. In our base case, we find a null node which returns true with a depth of -1. In our recursive step, we check the left and right nodes. If either is unbalanced, or if the difference between their depths is more than one, we set the isBalanced property of the returned object to false. We call this helper function from our main function and then call the isBalanced property of the object to get our result. This solution only needs to visit every node once, so it takes only O(n) time with O(1) extra space.