"""Created by sgoswami on 8/3/17."""
"""You need to find the largest value in each row of a binary tree."""
import sys, collections

# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def largestValues(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        result = []
        curr_row_largest = -sys.maxsize
        queue = collections.deque()
        delimiter = '#'
        queue.appendleft(root)
        queue.appendleft(delimiter)
        while len(queue) > 0:
            curr = queue.pop()
            if curr == delimiter:
                result.append(curr_row_largest)
                if len(queue) > 0:
                    queue.appendleft(delimiter)
            else:
                curr_row_largest = max(curr.val, curr_row_largest)
                if curr.left:
                    queue.appendleft(curr.left)
                if curr.right:
                    queue.appendleft(curr.right)
        return result