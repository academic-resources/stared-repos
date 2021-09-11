"""You're given a singly linked list, return the node at which the loop starts. If there's no loop in the linked
list return null"""


class Solution:
    def findStartOfLoop(self, head):
        slow = fast = head
        while slow and fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                break
        slow = head
        while slow and fast:
            slow = slow.next
            fast = fast.next
            if slow == fast:
                return slow
        return None
