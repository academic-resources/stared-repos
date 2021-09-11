// Hi, here's your problem today. This problem was recently asked by Google:

// Given a singly-linked list, reverse the list. This can be done iteratively or recursively. Can you get both solutions?

// Example:
// Input: 4 -> 3 -> 2 -> 1 -> 0 -> NULL
// Output: 0 -> 1 -> 2 -> 3 -> 4 -> NULL
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

//   # Function to print the list
//   def printList(self):
//     node = self
//     output = '' 
//     while node != None:
//       output += str(node.val)
//       output += " "
//       node = node.next
//     print(output)

  function printList(node) {
    let output = ''
    while (node !== null) {
      output += node.val
      output += " "
      node = node .next
    }
    return output
  }

//   # Iterative Solution
//   def reverseIteratively(self, head):
//     # Implement this.

function reverseIteratively(head) {
  let currNode = head
  let next = null
  let prev = null

  while (currNode.next) {
    next = currNode.next
    currNode.next = prev
    prev = currNode
    currNode = next
  }
  currNode.next = prev
  return currNode
}

//   # Recursive Solution      
//   def reverseRecursively(self, head):
//     # Implement this.

function reverseRecursively(head) {
  if (!(head && head.next)) return head
  console.log(head.val)
  console.log(head.next.val)
  console.log('=============building frame')
  let newHeadNode = reverseRecursively(head.next)
  console.log(newHeadNode.val)
  head.next.next = head
  console.log(head.next.next.val)
  console.log(head.next.val)
  // console.log(head.val)
  head.next = null
  console.log('--down a stack')
  return newHeadNode
}

// # Test Program
// # Initialize the test list: 
testHead = new ListNode(4)
node1 = new ListNode(3)
testHead.next = node1
node2 = new ListNode(2)
node1.next = node2
node3 = new ListNode(1)
node2.next = node3
testTail = new ListNode(0)
node3.next = testTail

// print("Initial list: ")
// testHead.printList()

console.log(printList(testHead))
reversedList = reverseIteratively(testHead)
console.log(printList(reversedList))
reversedList = reverseRecursively(reversedList)
console.log(printList(reversedList))


// # 4 3 2 1 0
// testHead.reverseIteratively(testHead)
// #testHead.reverseRecursively(testHead)
// print("List after reversal: ")
// testTail.printList()
// # 0 1 2 3 4