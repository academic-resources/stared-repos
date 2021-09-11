// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Iterate over a Singly Linked List of primitives backwards. When finished,
// return a string representing the original linked list's values backwards
// in the following format:
//
//                             'A -> B -> C -> D'
//
// ------------
// Constraints:
// ------------
//
// (1) Your function must be iterative, not recursive.
// (2) Your function must consume O(n) space.
// (3) Employee either a Stack, Queue, or some combination of the two in your
//     solution. (Implement any data structures you need, as you need them.)
//
//
// -----------
// Let's code!
// -----------

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }

  push(val) {
    let node

    if (typeof val === 'object') {
      node = new Node(val.value)
    } else {
      node = new Node(val)
    }

    if (!this.top) {
      this.top = node
      this.bottom = node
    } else {
      const temp = this.top
      this.top = node
      this.top.next = temp
    }
    return ++this.length
  }

  pop() {
    if (!this.top) {
      return null
    }

    const temp = this.top
    if (this.top === this.bottom) {
      this.bottom = null
    }
    this.top = this.top.next
    this.length--

    return temp
  }

  size() {
    return this.length
  }
}

function iterateAcrossLinkedListBackwards(linkedList) {
  if (!linkedList.length) return ''
  const stack = new Stack()

  let node = linkedList.head
  stack.push(node)

  while (node.next) {
    node = node.next
    stack.push(node)
  }

  let output = []

  while (stack.size()) {
    output.push(stack.pop().value)
  }

  return output
    .map(e => {
      if (e === null) return 'null'
      if (e === undefined) return 'undefined'
      if (e === false) return 'false'
      return e
    })
    .join(' -> ')
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards
