"""Created by sgoswami on 8/30/17."""
"""Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the 
same parent node) or empty, flip it upside down and turn it into a tree where the original right nodes turned into 
left leaf nodes."""

# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def upsideDownBinaryTree(self, root):
        """
        :type root: TreeNode
        :rtype: TreeNode
        """

        if not root or not root.left:
            return root
        new_root = self.upsideDownBinaryTree(root.left)
        root.left.left = root.right
        root.left.right = root

        root.left = None
        root.right = None
        return new_root

