"""Created by sgoswami on 8/13/17."""
"""Given a binary tree, return all root-to-leaf paths."""

from python.ds.binary_search_tree import BinarySearchTree

# Definition for a binary tree node.


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def binaryTreePaths(self, root):
        """
        :type root: TreeNode
        :rtype: List[str]
        """
        answer = []

        def do_path(node, path):
            if not root:
                return None

            if not node.left and not node.right:
                path.append(str(node.val))
                s = '->'.join(path)
                answer.append(s)
                path.pop()
                return

            if node.left:
                path.append(str(node.val))
                do_path(node.left, path)
                path.pop()

            if node.right:
                path.append(str(node.val))
                do_path(node.right, path)
                path.pop()

        do_path(root, [])
        return answer


if __name__ == '__main__':
    bst = BinarySearchTree()
    bst.insert(12)
    bst.insert(9)
    bst.insert(13)
    bst.insert(4)
    bst.insert(10)
    bst.insert(17)
    solution = Solution()
    print(solution.binaryTreePaths(bst.root))

