# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def inorderTraversal(self, root: TreeNode) -> [int]:
        res = []

        def inorder_recursive(root, res):
            if not root:
                return
            inorder_recursive(root.left, res)
            res.append(root.val)
            inorder_recursive(root.right, res)

        # inorder_recursive(root, res)

        def inorder_iterative(root, res):
            stack = []
            curr = root
            while True:
                if curr:
                    stack.append(curr)
                    curr = curr.left
                else:
                    if len(stack) == 0:
                        break
                    curr = stack.pop()
                    res.append(curr.value)
                    curr = curr.right

        inorder_iterative(root, res)
        return res
