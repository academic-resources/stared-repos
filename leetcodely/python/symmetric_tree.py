"""Created by sgoswami on 8/9/17."""
"""Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center)."""


# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def isSymmetric(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        if not root:
            return True

        def helper(left, right):
            if not left and not right:
                return True
            if not left and right:
                return False
            if left and not right:
                return False
            if left.val != right.val:
                return False
            return helper(left.left, right.right) and helper(left.right, right.left)

        return helper(root.left, root.right)
