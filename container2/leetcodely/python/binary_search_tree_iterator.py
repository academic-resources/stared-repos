"""Created by sgoswami on 8/3/17."""
"""Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
Calling next() will return the next smallest number in the BST.
Note: next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.
"""
import collections

# Definition for a  binary tree node
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class BSTIterator(object):
    def __init__(self, root):
        """
        :type root: TreeNode
        """
        self.array = []
        self.inorder_helper(root, self.array)
        self.index = 0

    def inorder_helper(self, root, array):
        if root is None:
            return
        self.inorder_helper(root.left, array)
        array.append(root)
        self.inorder_helper(root.right, array)

    def hasNext(self):
        """
        :rtype: bool
        """
        while self.index < len(self.array):
            return True
        return False

    def next(self):
        """
        :rtype: int
        """
        curr = self.array[self.index]
        self.index += 1
        return curr.val

