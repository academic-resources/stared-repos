"""Created by sgoswami on 9/13/17."""
"""Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
"""
import sys

# Definition for a binary tree node.

class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def isValidBST(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """

        def _helper(root, floor, ceiling):
            if not root:
                return True
            if root.val <= floor or root.val >= ceiling:
                return False
            return _helper(root.left, floor, root.val) and _helper(root.right, root.val, ceiling)

        return _helper(root, -sys.maxsize, sys.maxsize)
