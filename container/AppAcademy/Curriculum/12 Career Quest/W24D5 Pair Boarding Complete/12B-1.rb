# is_bst?
# Given a binary tree, write a function to check whether it’s a binary search tree or not.

# Solution
# O(n): must check every node (stops at first detected violation).
def is_bst?(node, min = nil, max = nil)
  return true if node.nil?

  # does this node violate constraints?
  if (min && (min > node.value)) || (max && (max < node.value))
    return false
  end

  # this node follows constraints; do its children, too?
  is_bst?(node.left, min, node.value) && is_bst?(node.right, node.value, max)
end

# We can check to see if a tree is a BST recursively. We know that in a valid BST, all nodes to the left of a given node must have a lower value, and all nodes to the right of a given node have a greater value. With this in mind, as we traverse each node, we return true if a node is nil (we've reached the leaves of our tree), and return false if a node's left and right leaves do not satisfy the BST property. We then make our recursive call on the left and right children, passing in the min and max constraints that they must satisfy. The time complexity of this solution is O(n) since we need to visit each node once.

