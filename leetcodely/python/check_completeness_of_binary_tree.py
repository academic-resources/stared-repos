from collections import deque


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def isCompleteTree(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        seen_null = False
        queue = deque()
        queue.appendleft(root.left)
        queue.appendleft(root.right)

        while len(queue) > 0:
            curr = queue.pop()
            if curr is None:
                seen_null = True
            else:
                if seen_null:
                    return False
                queue.appendleft(curr.left)
                queue.appendleft(curr.right)

        return True
