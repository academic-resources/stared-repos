"""Created by sgoswami on 9/13/17."""
"""You're given an array as an input, form a binary tree with the following characteristics,
1. Should satisfy binary heap property at every node, thus the value if the node should be less than both its children.
2. An inorder traversal should return the array."""

import sys

class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def buildTree(self, arr):
        """
        :type list
        :rtype: TreeNode
        """
        if len(arr) == 0:
            return None
        index = self.find_min_index(arr)
        root = TreeNode(arr[index])
        root.left = self.buildTree(arr[:index])
        root.right = self.buildTree(arr[index:])
        return root

    def find_min_index(self, arr):
        min_index, min_val = -1, sys.maxsize
        for i, v in enumerate(arr):
            if v < min_val:
                min_index, min_val = i, v
        return min_index

