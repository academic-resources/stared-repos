"""Created by sgoswami on 8/22/17."""
import heapq

"""Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity."""
from python.ds.heap import MinHeap


class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = ListNode(item)


class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        heap, count = MinHeap(), 0
        if not lists or len(lists) == 0:
            return None
        for item in lists:
            while item:
                count += 1
                heap.push(item.val)
                item = item.next
        head = curr = ListNode(0)
        while count > 0:
            item = heap.pop()
            p = ListNode(item)
            curr.next = p
            curr = curr.next
            count -= 1
        return head.next
