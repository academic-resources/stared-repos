"""Created by sgoswami on 10/7/17."""
"""Serialization is the process of converting a data structure or object into a sequence of bits so that it can be 
stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the 
same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your 
serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be 
serialized to a string and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible."""


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.
        :type root: TreeNode
        :rtype: str
        """
        tree_list = []

        def _serialize(node):
            if not node:
                tree_list.append('#')
                return
            tree_list.append(node.val)
            _serialize(node.left)
            _serialize(node.right)
        _serialize(root)
        return ','.join(map(str, tree_list))

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        :type data: str
        :rtype: TreeNode
        """
        tree_list = data.split(',')
        itr = iter(tree_list)

        def _deserialize(it):
            v = next(it, None)
            if not v or v == '#':
                return None
            p = TreeNode(v)
            p.left = _deserialize(it)
            p.right = _deserialize(it)
            return p
        return _deserialize(itr)


