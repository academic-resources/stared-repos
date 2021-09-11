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

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
        this.value = val
        this.next = null
    }
}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        const newNode = new Node(val)

        // if there is no head node, set the new node as the head
        if (!this.head) {
            this.head = newNode
        // else set it next to the tail
        } else {
            this.tail.next = newNode
        }
        this.tail = newNode
        this.length++
        return this //linkedList
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        if (!this.head) return undefined
        
        // start at the head and interate until the node does not have a next
        let current = this.head
        let newTail = current

        //identifies the node before the tail and the tail itself
        while (current.next) {
            newTail = current
            current = current.next
        }
        this.tail = newTail //node before is new tail
        this.tail.next = null //tail node is null
        this.length--

        if (!this.length) {
            this.head = null
            this.tail = null
        }

        return current
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        const newNode = new Node(val)

        // if there is no head node, set the new node as the head
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
        return this //linkedList
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if (!this.head) return undefined
        
        // start at the head and interate until the node does not have a next
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

    // TODO: Implement the contains method here
    contains(target) {
        let current = this.head
        while (current) {
            if (current.value === target) return true
            current = current.next
        }
        return false
    }

    // TODO: Implement the get method here
    get(index) {
        if (index < 0 || index >= this.length) return null
        let node = this.head
        for (let i = 0; i < index; i++) node = node.next
        return node
    }

    // TODO: Implement the set method here
    set(index, val) {
        let node = this.get(index)
        if (node) {
            node.value = val
            return true
        }
        return false
    }

    // TODO: Implement the insert method here
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

    // TODO: Implement the remove method here
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

    // TODO: Implement the size method here
    size() {
        return this.length
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
