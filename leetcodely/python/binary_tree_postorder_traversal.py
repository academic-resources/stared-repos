# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        def _helper(root, res):
            if not root:
                return
            _helper(root.left, res)
            _helper(root.right, res)
            res.append(root.val)
        res = []
        _helper(root, res)
        return res