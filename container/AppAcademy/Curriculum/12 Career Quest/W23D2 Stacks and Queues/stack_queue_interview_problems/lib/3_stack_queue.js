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
    // TODO: Implement the Node class!
    constructor(val) {
        this.value = val
        this.next = null
    }
}

class Stack {
    // TODO: Implement the Stack class!
    constructor() {
        this.top = null
        this.bottom = null
        this.length = 0
    }

    push(node) {
        
        if (this.length) {
            let oldTop = this.top
            this.top = node
            node.next = oldTop
        } else {
            this.top = node
            this.bottom = node
        }
        return ++this.length
    }

    pop() {
        let popped = this.top
        if(!popped) return null
        if (this.length === 1) this.bottom = null
        this.top = this.top.next
        this.length--
        return popped
    }

    size() {
        return this.length
    }
}

class StackQueue {
    // TODO: Implement the StackQueue class!
    constructor() {
        this.front = null
        this.back = null
        this.inStack = new Stack
        this.outStack = new Stack
    }

    enqueue(val) {
        let queued = new Node(val)
        if (this.inStack.length) {
            this.back.next = queued
        } else {
            this.front = queued
        }
        this.back = queued
        // only push copy of node -- want pointer to be null
        this.inStack.push(new Node (queued.value))
        return this.size()
    }

    dequeue() {
        if (!this.front) return null
        if (this.size() === 1) this.back = null
        this.front = this.front.next

        //reverse inStack order so front is on top of outStack
        if (this.outStack.size() === 0) {
            while (this.inStack.size() > 0) {
                this.outStack.push(this.inStack.pop())
            }
        }

        let popped = this.outStack.pop()
        return popped
    }

    size() {
        return this.inStack.length + this.outStack.length
    }
};

exports.Node = Node;
exports.Stack = Stack;
exports.StackQueue = StackQueue;
