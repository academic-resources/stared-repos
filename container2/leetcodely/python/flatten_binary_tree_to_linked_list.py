# Definition for a binary tree node.
import collections


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        queue = collections.deque()

        def pre_order(root):
            if not root:
                return
            queue.appendleft(root)
            pre_order(root.left)
            pre_order(root.right)

        pre_order(root)
        if len(queue) > 0:
            curr = queue.pop()
            while len(queue) > 0:
                curr.left = None
                if len(queue) > 0:
                    curr.right = queue.pop()
                curr = curr.right


