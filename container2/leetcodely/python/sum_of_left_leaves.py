"""Created by sgoswami on 7/22/17."""
"""Find the sum of all left leaves in a given binary tree."""

# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

import collections

class Solution(object):
    def sumOfLeftLeaves(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        count = 0

        if root.left:
            if root.left.left is None and root.left.right is None:
                count += root.left.val
            else:
                count += self.sumOfLeftLeaves(root.left)
        count += self.sumOfLeftLeaves(root.right)
        return count


