# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def maxAncestorDiff(self, root: TreeNode) -> int:
        ans = [0]
        
        def dfs(node, a, b):
            if node:
                a, b = min(a, node.val), max(b, node.val)
                ans[0] = max(ans[0], b - a)
                dfs(node.left, a, b)
                dfs(node.right, a, b)
        dfs(root, root.val, root.val)
        return ans[0]
