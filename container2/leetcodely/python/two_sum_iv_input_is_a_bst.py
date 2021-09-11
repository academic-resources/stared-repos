"""Created by sgoswami on 9/2/17."""
"""Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that 
their sum is equal to the given target."""

# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def findTarget(self, root, k):
        """
        :type root: TreeNode
        :type k: int
        :rtype: bool
        """
        arr = []
        self.inorder_helper(root, arr)
        i, j = 0, len(arr)-1
        while i < j:
            total = arr[i] + arr[j]
            if total > k:
                j -= 1
            elif total < k:
                i += 1
            else:
                return True
        return False

    def inorder_helper(self, root, arr):
        if not root:
            return
        self.inorder_helper(root.left, arr)
        arr.append(root.val)
        self.inorder_helper(root.right, arr)