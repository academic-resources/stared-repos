"""Created by sgoswami on 9/1/17."""
"""Follow up for problem "Populating Next Right Pointers in Each Node".

What if the given tree could be any binary tree? Would your previous solution still work?
For example,
Given the following binary tree,
         1
       /  \
      2    3
     / \    \
    4   5    7
After calling your function, the tree should look like:
         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \    \
    4-> 5 -> 7 -> NULL"""
import collections


# Definition for binary tree with next pointer.
# class TreeLinkNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
#         self.next = None

class Solution:
    # @param root, a tree link node
    # @return nothing
    def connect(self, root):
        if not root:
            return
        queue = collections.deque()
        queue.appendleft(root)
        queue.appendleft('#')
        curr_list = []
        while len(queue) > 0:
            curr = queue.pop()
            if curr == '#':
                if len(queue) > 0:
                    queue.appendleft('#')
                    count = 1
                    while count < len(curr_list):
                        curr_list[count-1].next = curr_list[count]
                        count += 1
                    curr_list[-1].next = None
                    curr_list = []
                    continue
            else:
                if curr.left:
                    curr_list.append(curr.left)
                    queue.appendleft(curr.left)
                if curr.right:
                    curr_list.append(curr.right)
                    queue.appendleft(curr.right)
