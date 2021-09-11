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
        if not root:
            return []
        queue = deque()
        dic = defaultdict(list)
        queue.appendleft((root, 0))
        while len(queue) > 0:
            curr = queue.popleft()
            dic[curr[1]].append(curr[0].val)
            if curr[0].children:
                for child in curr[0].children:
                    queue.append((child, curr[1] + 1))
        return [v for v in dic.values()]

if __name__ == '__main__':
    bst = BST()
    bst.add(9)
    bst.add(3)
    bst.add(20)
    bst.add(15)
    bst.add(21)
    solution = Solution()
    print(solution.zigzagLevelOrder(bst.root))