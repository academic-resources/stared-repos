#Definition for a binary tree node.
import collections


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def findFrequentTreeSum(self, root: TreeNode) -> list[int]:
        if not root:
            return []

        def dfs(node):
            if not node:
                return 0
            s = node.val + dfs(node.left) + dfs(node.right)
            count[s] += 1
            return s
        count = collections.Counter()
        dfs(root)
        max_val = max(count.values())
        return [s for s in count if count[s] == max_val]



