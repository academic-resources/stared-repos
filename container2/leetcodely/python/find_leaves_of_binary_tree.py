# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def findLeaves(self, root: TreeNode) -> list[list[int]]:
        if not root:
            return []
        res, ans = [], []

        def helper(root):
            if not root:
                return
            if root.left:
                if root.left.left is None and root.left.right is None:
                    ans.append(root.left.val)
                    root.left = None
            if root.right:
                if root.right.left is None and root.right.right is None:
                    ans.append(root.right.val)
                    root.right = None
            helper(root.left)
            helper(root.right)
        while True:
            if not root.right and not root.left:
                res.append([root.val])
                break
            helper(root)
            res.append(ans)
            ans = []
        return res

