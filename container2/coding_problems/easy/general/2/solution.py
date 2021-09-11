class BinaryTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None

def depth_first_search(node, sums, current_sum):
  if node.left:
    depth_first_search(node.left, sums, current_sum + node.value)
  if node.right:
    depth_first_search(node.right, sums, current_sum + node.value)
  if not (node.left or node.right):
    sums.append(current_sum + node.value)

def branch_sums(root):
  sums = []
  depth_first_search(root, sums, 0)
  return sums
