# Problem 1:  Contains Duplicate

from collections import OrderedDict

class Solution(object):

    def containsDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        # Given an array of integers, find if the array contains any duplicates.        
        unique_list = list(OrderedDict.fromkeys(nums))
        # get set of submitted list
        print(str(unique_list) + "  |  " + str(nums))
        # if set = nums, return false
        # it should return false if every element is distinct.
        # can also use length (typical)
        if unique_list == nums:
            return False
        # else return true
        # Your function should return true if any value appears at least twice in the array
        else:
            return True
        
        
# Problem 2:  Add Two Numbers

# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):

    def length(self, head: ListNode):
        length = 0
        current_head = head
        while current_head is not None:
            length += 1
            current_head = current_head.next

        return length

    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        print(str(l1) + "  |  " + str(l2))
        # You are given two non-empty linked lists representing two non-negative integers.
        # The digits are stored in reverse order and each of their nodes contain a single digit.
        # Add the two numbers and return it as a linked list.
        # You may assume the two numbers do not contain any leading zero, except the number 0 itself.
        l1_string = ''
        l2_string = ''
        l1_length = length(l1)
        l2_length = length(l2)
        # for each item in both lists
        for x in range(0, l1_length):
            l1_string += str(x)
        for x in range(0, l2_length):
            l2_string += str(x)

        # append as string (two strings total)
        l1_string = l1_string[::-1]
        l2_string = l2_string[::-1]

        # convert both strings to ints
        l1_int = int(l1_string)
        l2_int = int(l2_string)

        # sum ints
        total = l1_int + l2_int
        # convert sum to list
        total_list = map(int, str(total))

        # TODO:  also wants it reversed
        return total_list
