"""Created by sgoswami on 8/6/17."""

"""Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are
 overlapped while the others are not.
You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up 
as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree."""

# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def mergeTrees(self, t1, t2):
        """
        :type t1: TreeNode
        :type t2: TreeNode
        :rtype: TreeNode
        """
        if not t1:
            return t2
        if not t2:
            return t1
        stack = [[t1, t2]]
        while len(stack) > 0:
            current = stack.pop()
            if not current[0] or not current[1]:
                continue
            current[0].val += current[1].val
            if not current[0].left:
                current[0].left = current[1].left
            else:
                stack.append([current[0].left, current[1].left])
            if not current[0].right:
                current[0].right = current[1].right
            else:
                stack.append([current[0].right, current[1].right])
        return t1



