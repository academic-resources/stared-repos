// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */


function addTwoNumbers(l1, l2) {
  let currL1 = l1
  let currL2 = l2
  let currNode = new ListNode(0)
  let result = currNode
  let carryOver = 0
  
  while (currL1 || currL2) {
    l1Val = currL1 ? currL1.val : 0
    l2Val = currL2 ? currL2.val : 0
    let currVal = l1Val + l2Val + carryOver

    carryOver = currVal / 10 | 0
    currNode.next = new ListNode(currVal % 10)
    currNode = currNode.next

    if (currL1) currL1 = currL1.next
    if (currL2) currL2 = currL2.next

  }

  if (carryOver) currNode.next = new ListNode(carryOver)

  return result.next
};