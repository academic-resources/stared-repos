# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def __init__(self):
        self.num_paths = 0

    def pathSum(self, root: TreeNode, sum: int) -> int:
        self.dfs(root, sum)
        return self.num_paths

    def dfs(self, node, target):
        if not node:
            return
        self.find_path(node, target)
        self.dfs(node.left, target)
        self.dfs(node.right, target)


    def find_path(self, node, target):
        if not node:
            return
        if node.val == target:
            self.num_paths += 1
        self.find_path(node.left, target - node.val)
        self.find_path(node.right, target - node.val)


