// findCommonAncestor
// Find the lowest common ancestor of two nodes in a binary search tree. Write the function in JS. Assume I give you both the root and the two nodes.

// O(log(n))
function findCommonAncestor(root, nodeA, nodeB) {
  var currentNode = root;
  while (true) {
    if (currentNode == nodeA || currentNode == nodeB) {
      // one is the descendent of the other.
      return currentNode;
    }

    // is one of the nodes on the left, and the other on the right?
    var bothOnRight = ((currentNode.value < nodeA.value) &&
      (currentNode.value < nodeB.value));
    var bothOnLeft = ((currentNode.value > nodeA.value) &&
      (currentNode.value > nodeB.value));
    var onSameSide = bothOnRight || bothOnLeft;

    if (!onSameSide) {
      // the two nodes are on different sides.
      return currentNode;
    }

    currentNode = bothOnRight ? currentNode.right : currentNode.left;
  }
}

// In this solution, we can simply use the BST property to find the lowest common ancestor in O(log(n)) time. We know that for two nodes, if one of the nodes is on the left of the parent and one is on the right (or if one of the nodes is the parent), the parent must be the lowest common ancestor. Otherwise, if both nodes are on the left or right, there must be a lower common ancestor so we search that side. This solution takes O(log(n)) where n is the number of nodes because in the worst case, we will have to traverse the height of the tree.