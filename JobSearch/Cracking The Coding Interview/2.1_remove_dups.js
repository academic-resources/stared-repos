// I AM ENOUGH

class Node {
  constructor(val) {
    this.value = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = this.tail = null
    this.length = 0
  }

  addToTail(val) {
    if (!this.head) {
      this.head = new Node(val)
      this.tail = this.head
    } else {
      let newTail = new Node(val)
      this.tail.next = newTail
      this.tail = newTail
    }
    return ++this.length
  }

  removeTail() {
    if (!this.head) return null
    if (this.head === this.tail) {
      this.head = this.tail = null
      return null
    }
    let tail = this.tail
    let currNode = this.head
    while (currNode.next !== tail) {
      currNode = currNode.next
    }
    currNode.next = null
    this.tail = currNode
    this.length--
    return tail
  }

  remove(index) {
    if (index > this.length - 1 || index < 0) return null
    if (index === this.length - 1) this.removeTail()
    let currNode = this.head

    for (let i = 0; i < index - 1; i++) {
      currNode = currNode.next
    }
    let removed = currNode.next
    currNode.next = currNode.next.next
    removed.next = null
    this.length--

    return removed
  }

  show() {
    if (!this.head) return null
    let list = [this.head.value]
    let currNode = this.head
    while (currNode.next) {
      currNode = currNode.next
      list.push(currNode.value)
    } 
    return list
  }

  removeDuplicates() {
    if (!this.head) return null

    let uniqueNodes = new Set()
    let previous
    let currNode = this.head

    while (currNode !== null) {
      if (uniqueNodes.has(currNode.value)) {
        previous.next = currNode.next
      } else {
        uniqueNodes.add(currNode.value)
        previous = currNode
      }
      currNode = currNode.next
    }

    return this.show()
  }

  removeDuplicatesNoBuffer() {
    let currNode = this.head
    
    while (currNode !== null) {
      let trackNode = currNode
      while (trackNode.next !== null) {
        if (currNode.value === trackNode.next.value) {
          trackNode.next = trackNode.next.next
        } else {
          trackNode = trackNode.next
        }
      }
      currNode = currNode.next
    }
    return this.show()
  }
} 



const LL = new LinkedList

LL.addToTail(1)
LL.addToTail(2)
LL.addToTail(3)
LL.addToTail(3)
LL.addToTail(3)
LL.addToTail(4)
LL.addToTail(5)
LL.addToTail(6)
// console.log(LL)
console.log(LL.show())
LL.removeTail()
// console.log(LL)
console.log(LL.show())
console.log(LL.remove(1))
console.log(LL)
console.log('===============')
console.log(LL.show())
console.log(LL.removeDuplicates())
console.log('===============')
LL.addToTail(7)
LL.addToTail(7)
LL.addToTail(7)
console.log(LL.show())
console.log(LL.removeDuplicatesNoBuffer())