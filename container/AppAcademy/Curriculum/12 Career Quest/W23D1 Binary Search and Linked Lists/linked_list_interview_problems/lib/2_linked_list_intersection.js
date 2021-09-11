// ============================================================================
// Interview Problem: Linked List Intersection
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Write a function linkedListIntersection that returns the node at which the 
// intersection of two linked lists begins, or null if there is no such 
// intersection.
//
// ---------- 
// Example 1:
// ----------
// 
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1,list2) should return D 
// as the node of intersection.
// 
//    A → B → C
//             ↘
//               D → E → F
//             ↗
//        X → Y
//
// ---------- 
// Example 2:
// ----------
//
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1, list2) should return null 
// as there is no point of intersection.
// 
//    A → B → C → D
//
//    X → Y → Z
// 
// -----------
// Let's code!
// -----------
function linkedListIntersection(list1, list2) {
  // TODO: Implement the hasCycle function!
  
  // const list1Length = list1.length
  // const list2Length = list2.length
  
  const list1Length = getLinkedListLength(list1.head);
  const list2Length = getLinkedListLength(list2.head);

  // console.log(list1Length)
  // console.log(list2Length)
  
  let diff = Math.abs(list1Length - list2Length)
  let long = list1Length >= list2Length ? list1.head : list2.head
  let short = list1Length >= list2Length ? list2.head : list1.head

  while (long && short) {
    // console.log("long==========================")
    // console.log(long)
    // console.log("short========")
    // console.log(short)
    if (diff > 0) {
      long = long.next
      diff--
      continue
    }
    if (long === short) return long
    long = long.next
    short = short.next

  }
  return null
}
function getLinkedListLength(listNode) {
  if (listNode.next === null) {
    return 1;
  } else {
    return getLinkedListLength(listNode.next) + 1;
  }
}


// ----------------------------------------
// Given: Singly Linked List - Do Not Edit!
// ----------------------------------------
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToTail(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
}

// --------------------------------------
// Helper For Testing Only - Do Not Edit!
// --------------------------------------
var stringify = function(list) {
  var result = [];
  while(list !== null) {
    result.push(list.value);
    list = list.next;
  }
  return result.join("");
}

exports.Node = Node;
exports.LinkedList = LinkedList;
exports.linkedListIntersection = linkedListIntersection;
exports.stringify = stringify;
