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

function iterateAcrossLinkedListBackwardsWithArrays(linkedList) {
    // TODO: Implement the iterateAcrossLinkedListBackwards function here
    let stack = []
    let currentNode = linkedList.head
    while (currentNode) {
        stack.push(String(currentNode.value))
        currentNode = currentNode.next
    }
    let reverseStack = []
    while (stack.length) {
        reverseStack.push(stack.pop())
    }
    let result = reverseStack.join(' -> ')
    return result
}

function iterateAcrossLinkedListBackwards(linkedList) {
    if (!linkedList.length) return ''

    const stack = new Stack
    let currentNode = linkedList.head
    for (let i = 0; i < linkedList.length; i++) {
        stack.push(currentNode.value)
        currentNode = currentNode.next
    }
    
    let result = String(stack.top.value)
    let currentStackNode = stack.top.next
    for (let i = 0; i < stack.length - 1; i++) {
        result += ' -> ' + String(currentStackNode.value)
        currentStackNode = currentStackNode.next
    }
    return result
}

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
        let pushed = new Node(val)
        if (this.length) {
            pushed.next = this.top
        } else {
            this.bottom = pushed
        }
        this.top = pushed
        return ++this.length
    }

    pop() {
        let popped = this.top
        if (!popped) return null
        if (this.length === 1) this.bottom = null
        this.top = this.top.next
        length--
        return popped.value
    }
    
    size() {
        return this.length
    }
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards;
