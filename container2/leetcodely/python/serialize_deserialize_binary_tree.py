"""Created by sgoswami on 8/13/17."""
"""Serialization is the process of converting a data structure or object into a sequence of bits so that it can be 
stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the 
same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your 
serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a 
string and this string can be deserialized to the original tree structure."""


# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def add(self, item):
        self.root = self.add_helper(item, self.root)

    def add_helper(self, item, node):
        if not node:
            return TreeNode(item)
        if item < node.val:
            node.left = self.add_helper(item, node.left)
        else:
            node.right = self.add_helper(item, node.right)
        return node


class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        data = []
        self.serialize_helper(root, data)
        return ''.join(data)

    def serialize_helper(self, root, data):
        if not root:
            data.append('#,')
            return
        data.append(str(root.val))
        data.append(',')
        self.serialize_helper(root.left, data)
        self.serialize_helper(root.right, data)

    def deserialize(self, data):
        """Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        data_list = data.split(',')
        itr = iter(data_list)
        return self.deserialize_helper(data_list, itr)

    def deserialize_helper(self, data, itr):
        try:
            item = next(itr)
        except StopIteration:
            return
        if item == '#':
            return None
        root = TreeNode(item)
        root.left = self.deserialize_helper(data, itr)
        root.right = self.deserialize_helper(data, itr)
        return root

if __name__ == '__main__':
    bst = BST()
    bst.add(9)
    bst.add(11)
    bst.add(5)
    bst.add(3)
    bst.add(7)
    bst.add(15)
    codec = Codec()
    data = codec.serialize(bst.root)
    print(data)
    root = codec.deserialize(data)
    print(root.val)
