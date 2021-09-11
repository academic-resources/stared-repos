"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        def _helper(p, lst):
            if not p:
                return
            lst.append(p.val)
            for child in p.children:
                _helper(child, lst)

        res = []
        _helper(root, res)
        return res
