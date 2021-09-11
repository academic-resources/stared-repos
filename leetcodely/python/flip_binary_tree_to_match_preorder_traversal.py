"""
You are given the root of a binary tree with n nodes, where each node is uniquely assigned a value from 1 to n.
You are also given a sequence of n values voyage, which is the desired pre-order traversal of the binary tree.
"""


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flipMatchVoyage(self, root: TreeNode, voyage: List[int]) -> List[int]:
        self.flipped = []
        self.i = 0

        def dfs(p):
            if p:
                if p.val != voyage[self.i]:
                    self.flipped = [-1]
                    return
                self.i += 1

                if self.i < len(voyage) and p.left and p.left.val != voyage[self.i]:
                    self.flipped.append(p.val)
                    dfs(p.right)
                    dfs(p.left)
                else:
                    dfs(p.left)
                    dfs(p.right)
        dfs(root)
        if self.flipped and self.flipped[0] == -1:
            self.flipped = [-1]
        return self.flipped
