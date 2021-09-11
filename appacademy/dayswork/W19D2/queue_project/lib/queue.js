// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
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
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.front = null
    this.back = null
    this.length = 0
  }

  enqueue(value) {
    const node = new Node(value)
    if (this.back) this.back.next = node
    this.back = node
    this.length++
    if (this.length === 1) this.front = this.back
    return this.length
  }

  dequeue() {
    if (this.length === 0) return null
    const nodeVal = this.front.value
    this.length--

    if (this.length === 1) {
      this.front = this.back
    } else if (this.length === 0) {
      this.front = null
      this.back = null
    } else {
      this.front = this.front.next
    }

    return nodeVal
  }

  size() {
    return this.length
  }
}

exports.Node = Node
exports.Queue = Queue
