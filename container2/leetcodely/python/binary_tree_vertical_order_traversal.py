"""Created by sgoswami on 7/4/17."""
"""Given a binary tree, return the vertical order traversal of its nodes' values. (ie, from top to bottom, column by column).
If two nodes are in the same row and column, the order should be from left to right."""

import collections

# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def verticalOrder(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        if root is None:
            return []
        rootNode = ColumnNode(root, 0)
        levels = {}
        queue = collections.deque()
        queue.appendleft(rootNode)

        while len(queue) > 0:
            curr_node = queue.pop()
            levels.setdefault(curr_node.dist, []).append(curr_node.tree_node.val)

            if curr_node.tree_node.left is not None:
                queue.appendleft(ColumnNode(curr_node.tree_node.left, curr_node.dist - 1))
            if curr_node.tree_node.right is not None:
                queue.appendleft(ColumnNode(curr_node.tree_node.right, curr_node.dist + 1))
        res = []
        d = collections.OrderedDict(sorted(levels.items()))
        for k, v in d.items():
            res.append(v)
        return res


class ColumnNode:
    def __init__(self, tree_node, dist):
        self.tree_node = tree_node
        self.dist = dist

if __name__ == '__main__':
    treeNode = TreeNode()


