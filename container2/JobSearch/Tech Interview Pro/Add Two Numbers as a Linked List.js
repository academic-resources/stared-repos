// Hi, here's your problem today. This problem was recently asked by Microsoft:

// You are given two linked-lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// Example:
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.
// Here is the function signature as a starting point (in Python):

// # Definition for singly-linked list.
// class ListNode(object):
//   def __init__(self, x):
//     self.val = x
//     self.next = None

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

// class Solution:
//   def addTwoNumbers(self, l1, l2, c = 0):
//     # Fill this in.

function addTwoNumbers(l1, l2) {
  let currL1 = l1
  let currL2 = l2
  let currNode = new ListNode(0)
  let result = currNode
  let carryOver = 0

  while (currL1 || currL2) {
    currL1val = currL1 ? currL1.val : 0
    currL2val = currL2 ? currL2.val : 0
    currVal = currL1val + currL2val + carryOver

    carryOver = currVal / 10 | 0
    currNode.next = new ListNode(currVal % 10)
    currNode = currNode.next

    if (currL1) currL1 = currL1.next
    if (currL2) currL2 = currL2.next
  }

  return result.next
}

l1 = new ListNode(2)
l1.next = new ListNode(4)
l1.next.next = new ListNode(3)

l2 = new ListNode(5)
l2.next = new ListNode(6)
l2.next.next = new ListNode(4)

// result = Solution().addTwoNumbers(l1, l2)
// while result:
//   print result.val,
//   result = result.next
// # 7 0 8

result = addTwoNumbers(l1, l2)
while (result) {
  console.log(result.val)
  result = result.next
} // => 708