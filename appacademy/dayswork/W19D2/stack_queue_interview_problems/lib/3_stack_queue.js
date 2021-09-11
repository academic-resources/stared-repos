// ============================================================================
// Interview Problem: StackQueue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement your preferred Stack implementation, including the methods:
//
//   - Push
//   - Pop
//   - Size
//
// Then, implement a Queue by instantiating two Stack instances for storage.
//
// The StackQueue implementation should include the following methods:
//
//   - Enqueue
//   - Dequeue
//   - Size
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

class StackQueue {
  constructor() {
    this.inStack = new Stack()
    this.outStack = new Stack()
    this.front = null
    this.back = null
  }

  enqueue(value) {
    const node = new Node(value)
    if (!this.front) {
      this.front = node
      this.back = node
    } else {
      this.back.next = node
      this.back = node
    }

    this.inStack.push(node)
    return this.size()
  }

  dequeue() {
    if (!this.front) {
      return null
    } else if (this.size() === 1) {
      this.front = null
      this.back = null
    } else {
      this.front = this.front.next
    }

    if (this.outStack.size() === 0) {
      this.moveToOutStack()
    }
    return this.outStack.pop()
  }

  size() {
    return this.inStack.size() + this.outStack.size()
  }

  moveToInStack() {
    while (this.outStack.size()) {
      const node = this.outStack.pop()
      this.inStack.push(node)
    }
  }

  moveToOutStack() {
    while (this.inStack.size()) {
      const node = this.inStack.pop()
      this.outStack.push(node)
    }
  }
}

exports.Node = Node
exports.Stack = Stack
exports.StackQueue = StackQueue
