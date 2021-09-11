# next_largest
# Given a node in a Binary Search Tree, find the node with the next largest value. Assume you don't have the root of the tree, just a single node from it.

# Solution
# O(log(n)) if BST is balanced
def next_largest(node)
  if node.right
    # find smallest node to the right
    return left_most_node(node.right)
  end

  # no nodes to the right; climb up
  until true
    parent_node = node.parent
    if parent_node.nil?
      # at the top of the tree, and nothing bigger to the right.
      return nil
    elsif parent_node.left == node
      # parent is bigger than us
      return parent_node
    else
      # parent is smaller, keep climbing.
      node = parent_node
    end
  end
end

def left_most_node(node)
  # keep going down and to the left
  node = node.left until node.left.nil?

  node
end

# In this solution we have two cases. In the first case, the node has a node to the right. If this is the case, we can find the next largest node by going to the node's right, then finding the left-most node from that tree.

#   Example: (pseudocode)
  
#           5
#         /   \
#       2       7
#     /   \   /   \
#   1      3 6     8
  
#   left_most_node(node_5)
#   => node_6
#   If we pass in node_x there is nothing to the right, we instead look up to the parent node. If there is no parent, node_x is the largest node. If the parent's right node is node_x, the parent is smaller, so we move upwards again.
  
#   Example: (pseudocode)
  
#           5
#         /   \
#       2       7
#     /   \   /   \
#   1      3 6     8
  
#   left_most_node(node_3)
#   => node_5
  

