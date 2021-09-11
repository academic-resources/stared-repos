// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
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

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  addToTail(val) {
    const newNode = new Node(val)

    if (!this.tail) {
      this.tail = newNode
      this.head = this.tail
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++
    return this
  }

  removeTail() {
    if (!this.tail) return undefined
    let oneBeforeTail = this.head
    let currentTail = this.head.next
    if (!currentTail) {
      this.head = null
      this.tail = null
      this.length = 0
      return oneBeforeTail
    }
    while (currentTail.next) {
      oneBeforeTail = currentTail
      currentTail = currentTail.next
    }
    this.tail = oneBeforeTail
    this.tail.next = null
    this.length--
    return currentTail
  }

  addToHead(val) {
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length++
    return this
  }

  removeHead() {
    if (!this.head) return undefined
    const currentHead = this.head
    this.head = currentHead.next
    this.length--
    if (this.length === 0) {
      this.tail = null
    }
    return currentHead
  }

  contains(target) {
    let node = this.head
    while (node) {
      if (node.value === target) return true
      node = node.next
    }
    return false
  }

  get(index) {
    if (index < 0 || index >= this.length) return null
    let counter = 0
    let current = this.head
    while (counter !== index) {
      current = current.next
      counter++
    }
    return current
  }

  set(index, val) {
    const node = this.get(index)
    if (node) {
      node.value = val
      return true
    }
    return false
  }

  insert(index, val) {
    if (index < 0 || index >= this.length) return false
    if (index === 0) {
      const newHead = this.addToHead(val)
      return newHead ? true : false
    }

    const newNode = new Node(val)
    const prev = this.get(index - 1)
    const temp = prev.next
    prev.next = newNode
    newNode.next = temp
    this.length++
    return true
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === 0) return this.removeHead()
    const previousNode = this.get(index - 1)
    const node = previousNode.next
    previousNode.next = node.next
    this.length--
    return node
  }

  size() {
    return this.length
  }
}

exports.Node = Node
exports.LinkedList = LinkedList
