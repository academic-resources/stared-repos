""" Given a binary tree, find the length of the longest consecutive sequence path.
The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child
connections. The longest consecutive path need to be from parent to child (cannot be the reverse). """

class Solution(object):
    def longestConsecutive(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root:
            return 0
        return self.dfs(root, root.val + 1, 1, 1)

    def dfs(self, root, target, curr_val, max_val):
        if not root:
            return max_val
        if root.val == target:
            curr_val += 1
            max_val = max(curr_val, max_val)
        else:
            curr_val = 1
        return max(self.dfs(root.left, root.val + 1, curr_val, max_val), self.dfs(root.right, root.val + 1, curr_val, max_val))



