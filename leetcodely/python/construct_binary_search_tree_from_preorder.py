# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def bstFromPreorder(self, preorder: [int]) -> TreeNode:
        root = TreeNode(preorder[0])
        stack = [root]
        for item in preorder[1:]:
            if item < stack[-1].val:
                stack[-1].left = TreeNode(item)
                stack.append(stack[-1].left)
            else:
                while stack and stack[-1].val < item:
                    last = stack.pop()
                last.right = TreeNode(item)
                stack.append(last.right)
        return root

