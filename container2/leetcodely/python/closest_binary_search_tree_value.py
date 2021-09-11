"""Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target"""
import sys
from python.ds.binary_search_tree import BinarySearchTree


# Definition for a binary tree node.

class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def closestValue(self, root, target):
        """
        :type root: TreeNode
        :type target: float
        :rtype: int
        """
        closest = sys.maxsize

        def helper(root, target, closest):
            if not root:
                return
            if root.left:
                closest = root.val if abs(root.val - target) <= abs(closest - target) else closest
                helper(root.left, target, closest)
            if root.right:
                closest = root.val if abs(root.val - target) <= abs(closest - target) else closest
                helper(root.left, target, closest)

        helper(root, target, closest)
        return closest


if __name__ == '__main__':
    bst = BinarySearchTree()
    bst.insert(1)
    bst.insert(2)
    solution = Solution()
    print(solution.closestValue(bst.root, 3.714286))
