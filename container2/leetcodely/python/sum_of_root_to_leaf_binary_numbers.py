# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def sumRootToLeaf(self, root: TreeNode) -> int:
        if not root:
            return 0
        result_arr = []

        def dfs(node, s):
            if not node:
                return
            if not node.left and not node.right:
                s += str(node.val)
                result_arr.append(s)
            s += str(node.val)
            dfs(node.left, s)
            dfs(node.right, s)
        dfs(root, '')
        print(result_arr)
        return sum([int(i, 2) for i in result_arr])


solution = Solution()
t = TreeNode(1)
t.left = TreeNode(0)
t.left.left = TreeNode(0)
t.left.right = TreeNode(1)
t.right = TreeNode(1)
t.right.left = TreeNode(0)
t.right.right = TreeNode(1)

print(solution.sumRootToLeaf(t))