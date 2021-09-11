"""Given a Binary Search Tree (BST) with the root node root, return the minimum difference between the values of any
two different nodes in the tree."""

from python.ds.binary_search_tree import BinarySearchTree
import sys


class Solution(object):
    def minDiffInBST(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        def _helper(root, min_val, prev):
            if not root:
                return
            arr[0] = min(arr[0], abs(root.val - prev))
            if root.left:
                _helper(root.left, min_val, root.val)
            if root.right:
                _helper(root.right, min_val, root.val)

        arr = [sys.maxsize]
        _helper(root, arr, 0)
        return arr[0]


if __name__ == '__main__':
    bst = BinarySearchTree()
    bst.insert(90)
    bst.insert(69)
    bst.insert(49)
    bst.insert(89)
    bst.insert(52)
    solution = Solution()
    print(solution.minDiffInBST(bst.root))
