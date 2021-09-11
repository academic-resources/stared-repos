"""Created by sgoswami on 4/12/17 as part of leetcode"""
"""A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.
Return a deep copy of the list."""


class RandomListNode(object):
    def __init__(self, x):
        self.label = x
        self.next = None
        self.random = None

from collections import OrderedDict


class Solution(object):
    def copyRandomList(self, head):
        """
        :type head: RandomListNode
        :rtype: RandomListNode
        """
        if head is None:
            return
        curr = head
        d = OrderedDict()

        while curr:
            d[curr] = RandomListNode(curr.label)
            curr = curr.next
        m = head
        while m:
            n = d[m]
            if m.random is not None:
                n.random = d[m.random]
            if m.next is not None:
                n.next = d[m.next]
            m = m.next
        return d[head]



