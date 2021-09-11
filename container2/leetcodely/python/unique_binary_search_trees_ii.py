# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def generateTrees(self, n: int) -> list[TreeNode]:

        def helper(start, stop):
            res = []

            if start > stop:
                res.append(None)
                return res
            if start == stop:
                res.append(TreeNode(start))
                return res
            left, right = [], []
            for i in range(start, stop+1):
                left = helper(start, i-1)
                right = helper(i+1, stop)

                for lnode in left:
                    for rnode in right:
                        root = TreeNode(i)
                        root.left = lnode
                        root.right = rnode
                        res.append(root)
            return res
        return helper(1, n)


