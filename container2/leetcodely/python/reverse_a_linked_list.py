"""Created by sgoswami on 4/12/17 as part of leetcode"""
"""Reverse a singly linked list."""


# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if not head or not head.next:
            return head
        p = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return p

    def reverseListInteratively(self, head):
        prev, curr, nxt = None, None, head
        while head:
            curr = nxt
            nxt = nxt.next
            curr.next = prev
            prev = curr