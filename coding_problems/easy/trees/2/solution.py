def nodeDepthAux(node, currentDepth):
	if not node:
		return 0
	return currentDepth + nodeDepthAux(node.left, currentDepth + 1) + nodeDepthAux(node.right, currentDepth + 1)

def nodeDepths(root):
	return nodeDepthAux(root, 0)


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

