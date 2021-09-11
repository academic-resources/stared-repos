def nodeDepths(root):
	sumOfDepths = 0
	stack = [{"node": root, "depth": 0}]
	while len(stack) > 0:
		nodeData = stack.pop()
		node, depth = nodeData["node"], nodeData["depth"]
		if node is not None:
			sumOfDepths += depth
			stack.append({"node": node.left, "depth": depth + 1})
			stack.append({"node": node.right, "depth": depth + 1})
	return sumOfDepths

# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

