// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
  constructor(val) {
    this.value = val
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
    const newNode = new Node(val)
    if (!this.top) {
      this.top = newNode
      this.bottom = newNode
    } else {
      let oldTop = this.top
      this.top = newNode
      newNode.next = oldTop
    }
    return ++this.length
  }

  pop() {
    const popped = this.top
    if (!popped) return null
    if (this.length === 1) this.bottom = null
    this.top = this.top.next
    this.length--
    return popped.value
  }

  size() {
    return this.length
  }
}

exports.Node = Node;
exports.Stack = Stack;
