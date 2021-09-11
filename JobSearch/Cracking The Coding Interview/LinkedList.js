// I AM ENOUGH

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

      if (!this.head) {
          this.head = newNode
      } else {
          this.tail.next = newNode
      }
      this.tail = newNode
      this.length++
  }

  removeTail() {
      if (!this.head) return undefined
      
      let current = this.head
      let newTail = current

      while (current.next) {
          newTail = current
          current = current.next
      }
      this.length--

      if (!this.length) {
          this.head = null
          this.tail = null
      }

      return current
  }

  addToHead(val) {
      const newNode = new Node(val)

      if (!this.head) {
          this.head = newNode
          this.tail = newNode
      } else {
          newNode.next = this.head
          this.head = newNode
      }
      this.length++
  }

  removeHead() {
      if (!this.head) return undefined
      
      const current = this.head
      let newHead = current.next

      this.head = newHead
      this.length--

      if (!this.length) {
          this.head = null
          this.tail = null
      }

      return current
  }

  contains(target) {
      let current = this.head
      while (current) {
          if (current.value === target) return true
          current = current.next
      }
      return false
  }

  get(index) {
      if (index < 0 || index >= this.length) return null
      let node = this.head
      for (let i = 0; i < index; i++) node = node.next
      return node
  }

  set(index, val) {
      let node = this.get(index)
      if (node) {
          node.value = val
          return true
      }
      return false
  }

  insert(index, val) {
      if (index < 0 || index >= this.length) return false
      if (index === 0) return !!this.addToHead(val)
      if (index === this.length) return !!this.addToTail(val)
      
      const newNode = new Node(val)
      let prevNode = this.get(index - 1)
      let currentNode = prevNode.next

      prevNode.next = newNode
      newNode.next = currentNode
      this.length++
      return true
  }

  remove(index) {
      if (index < 0 || index >= this.length) return undefined
      if (index === 0) return !!this.removeHead()
      if (index === this.length) return !!this.removeTail()

      let prevNode = this.get(index - 1)
      let currentNode = prevNode.next

      prevNode.next = currentNode.next
      this.length--
      return currentNode
  }

  size() {
      return this.length
  }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
