# Definition for a binary tree node.
import collections


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def findMode(self, root: TreeNode) -> [int]:
        if not root:
            return []

        def dfs(node):
            if not node:
                return
            count[node.val] += 1
            dfs(node.left)
            dfs(node.right)
        count = collections.Counter()
        dfs(root)
        max_val = max(count.values())
        return [s for s in count if count[s] == max_val]


root = TreeNode(12)
root.left = TreeNode(9)
root.right = TreeNode(13)

solution = Solution()
print(solution.findMode(root))
