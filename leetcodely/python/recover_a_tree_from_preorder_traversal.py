# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


import re

class Solution:
    def recoverFromPreorder(self, S: str) -> TreeNode:
        tokens = [i for i in re.split(r'(\d+|\W+)', S) if i]
        itr = iter(tokens)
        def recover_tree(arr, i):
            item = next(arr, None)
            



solution = Solution()
solution.recoverFromPreorder("1-2--3--4-5--6--7")