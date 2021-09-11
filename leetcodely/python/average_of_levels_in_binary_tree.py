"""Created by sgoswami on 7/21/17."""
"""Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array."""
import collections

# Definition for a binary tree node.

class BST:
    def __init__(self):
        self.root = None

    def insert(self, item):
        self.root = self.insert_helper(self.root, item)
        return self.root

    def insert_helper(self, root, item):
        if root is None:
            root = TreeNode(item)
            return root
        if item < root.val:
            root.left = self.insert_helper(root.left, item)
        else:
            root.right = self.insert_helper(root.right, item)
        return root


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

# TODO: Giving a different result on the onlin editor
class Solution(object):
    def averageOfLevels(self, root):
        """
        :type root: TreeNode
        :rtype: List[float]
        """
        queue = collections.deque()
        delimiter = '#'

        queue.appendleft(root)
        queue.appendleft(delimiter)
        res, curr_count, curr_total = [], 0, 0

        while len(queue) > 0:
            curr = queue.pop()
            if curr == delimiter:
                if len(queue) != 0:
                    res.append(curr_total/curr_count)
                    queue.appendleft(delimiter)
                    curr_count, curr_total = 0, 0
                else:
                    res.append(curr_total/curr_count)
                continue
            curr_total += curr.val
            curr_count += 1
            if curr.left:
                queue.appendleft(curr.left)
            if curr.right:
                queue.appendleft(curr.right)
        return res

if __name__ == '__main__':
    bst = BST()
    bst.insert(3)
    bst.insert(9)
    bst.insert(20)
    bst.insert(15)
    bst.insert(7)
    solution = Solution()
    print(solution.averageOfLevels(bst.root))