"""Created by sgoswami on 7/16/17."""
"""Given a binary search tree and a node in it, find the in-order successor of that node in the BST.
Note: If the given node has no in-order successor in the tree, return null."""
import collections

# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def inorderSuccessor(self, root, p):
        """
        :type root: TreeNode
        :type p: TreeNode
        :rtype: TreeNode
        """

        # if Node has a right child, go all the way down
        if p.right:
            curr = p.right
            while curr.left:
                curr = curr.left
        return curr
        # first ancestor whose left child the node is
        ans = None
        curr = root
        while curr is not p:
            if curr.val < p.val:
                curr = curr.right
            else:
                ans = curr
                curr = curr.left
        return ans



        # ans = None
        # while root:
        #     if root.val <= p.val:
        #         root = root.right
        #     else:
        #         ans = root
        #         root = root.left
        # return ans