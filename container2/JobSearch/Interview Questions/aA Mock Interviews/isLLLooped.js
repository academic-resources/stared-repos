/**
 * Definition for singly-linked list.
 function ListNode(val) {
     this.val = val;
     this.next = null;
 }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function isCycle(node) {
  let tortoise = node
  let hare
  if (node.next) {
    hare = node.next
  } else {
    return false
  }

  while (hare.next) {
    if (tortoise.val === hare.val) return true
    tortoise = tortoise.next
    hare = hare.next.next
  }

  return false
}

function isCycle2(node) {
  let visited = new Set()
  
  while (node.next) {
    if (visited.has(node.val)) return true
    visited.add(node.val)
    node = node.next
  }

  return false
}


const hasCycle = (head) => {
  if (head === null || head.next === null) return false;

  let slowPointer = head;
  let fastPointer = head.next;

  while (slowPointer !== fastPointer) {
    if (fastPointer === null || fastPointer.next === null) {
      return false;
    } else {
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next.next;
    }
  }
  return true;
};

let head = new ListNode("A")
head.next = new ListNode("B")
head.next.next = new ListNode("C")
head.next.next.next = new ListNode("D")
head.next.next.next.next = new ListNode("E")
head.next.next.next.next.next = head.next

let head2 = new ListNode("A")
// head2.next = head2

console.log(isCycle(head))
console.log(isCycle(head2))
console.log(isCycle2(head))
console.log(isCycle2(head2))
console.log(hasCycle(head))
console.log(hasCycle(head2))