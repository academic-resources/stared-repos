"""Created by sgoswami on 7/19/17."""
"""Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right,
 level by level)."""
from collections import deque, defaultdict
from python.ds.binary_search_tree import BinarySearchTree


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def levelOrder(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
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
        return [v for v in dic.values()]


if __name__ == '__main__':
    bst = BinarySearchTree()
    bst.insert(3)
    bst.insert(9)
    bst.insert(15)
    bst.insert(7)
    solution = Solution()
    print(solution.levelOrder(bst.root))
