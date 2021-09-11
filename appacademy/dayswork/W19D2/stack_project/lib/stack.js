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
    const node = new Node(val)
    node.next = this.top
    this.top = node
    this.length++
    if (this.length === 1) this.bottom = this.top
    if (this.length === 0) {
      this.bottom = null
      this.top = null
    }
    return this.length
  }

  pop() {
    if (this.length === 0) return null
    const node = this.top
    this.top = this.top.next
    this.length--
    if (this.length === 1) this.bottom = this.top
    if (this.length === 0) {
      this.bottom = null
      this.top = null
    }
    return node.value
  }

  size() {
    return this.length
  }
}

exports.Node = Node
exports.Stack = Stack
