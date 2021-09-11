"""Created by sgoswami on 8/8/17."""
"""Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then 
right to left for the next level and alternate between)."""

from collections import deque, defaultdict

class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def zigzagLevelOrder(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        # res = []
        # queue = collections.deque()
        # delimiter = '#'
        # trigger = False
        # queue.appendleft(root)
        # queue.appendleft(delimiter)
        # level = collections.deque()
        # while len(queue) > 0:
        #     curr = queue.pop()
        #     if curr == delimiter:
        #         res.append(list(level))
        #         level = collections.deque()
        #         if len(queue) > 0:
        #             queue.appendleft(delimiter)
        #         trigger = not trigger
        #     else:
        #         level.append(curr.val)
        #         if trigger:
        #             if curr.right:
        #                 queue.appendleft(curr.right)
        #             if curr.left:
        #                 queue.appendleft(curr.left)
        #         else:
        #             if curr.left:
        #                 queue.appendleft(curr.left)
        #             if curr.right:
        #                 queue.appendleft(curr.right)
        # return res

        if not root:
            return []
        queue = deque()
        dic = defaultdict(list)
        queue.appendleft((root, 0))
        while len(queue) > 0:
            curr = queue.pop()
            node = curr[0]
            level = curr[1]
            dic[level].append(node.val)
            if node.left:
                queue.appendleft((node.left, level + 1))
            if node.right:
                queue.appendleft((node.right, level + 1))
        res, trigger = [], False
        for v in dic.values():
            if trigger:
                res.append(v[::-1])
            else:
                res.append(v)
            trigger = not trigger
        return res


if __name__ == '__main__':
    bst = BST()
    bst.add(9)
    bst.add(3)
    bst.add(20)
    bst.add(15)
    bst.add(21)
    solution = Solution()
    print(solution.zigzagLevelOrder(bst.root))