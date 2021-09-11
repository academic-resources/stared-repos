# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def constructMaximumBinaryTree(self, nums: [int]) -> TreeNode:

        def construct(arr):
            if not arr or len(arr) == 0:
                return
            max_value = max(arr)
            max_index = arr.index(max_value)
            p = TreeNode(max_value)
            p.left = construct(arr[:max_index])
            p.right = construct(arr[max_index + 1:])
            return p
        return construct(nums)
