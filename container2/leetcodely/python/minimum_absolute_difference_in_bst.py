# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


import heapq
import sys


class Solution:
    def getMinimumDifference(self, root: TreeNode) -> int:

        heap = []

        def dfs(node):
            if not node:
                return
            heapq.heappush(heap, node.val)
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        diff = sys.maxsize
        res = heapq.nsmallest(len(heap), heap)
        for i in range(1, len(res)):
            diff = min(diff, res[i] - res[i - 1])
        return diff


solution = Solution()
t = TreeNode(1)
t.right = TreeNode(3)
t.left = TreeNode(2)
print(solution.getMinimumDifference(t))
