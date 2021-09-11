// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Modify the definition of the Stack class provided to create an enhanced 
// version of a Stack data structure called MinMaxStack.
//
// A MinMaxStack has all of the same behavior as a Stack, but can also return
// the node with the minimum or maximum value in constant time.
//
// You may alter any of the original Stack's methods, including the 
// constructor.
//  
// Values of nodes of the MinMaxStack are always guaranteed to be numbers.
//
//
// ------------
// Constraints:
// ------------
//
// (1) All MinMaxStack methods must run in constant time, O(1).
//
//
// --------
// Example:
// --------
//
// const minMaxStack = new MinMaxStack();
//
// minMaxStack.push(10);
// minMaxStack.push(12);
// minMaxStack.push(8);
// minMaxStack.push(2);
// minMaxStack.push(20);
//
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 20
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 8
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 10
//
// minMaxStack.pop();
// console.log(minMaxStack.min());   => null
// console.log(minMaxStack.max());   => null
//
//
// -----------
// Let's code!
// -----------
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class MinMaxStack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
        this.maxValueStorage = [];
        this.minValueStorage = [];
    }

    push(val) {
        const newNode = new Node(val);

        if (!this.minValueStorage.length || newNode.value <= this.minValueStorage[this.minValueStorage.length - 1].value) {
            this.minValueStorage.push(newNode);
        }

        if (!this.maxValueStorage.length || newNode.value >= this.maxValueStorage[this.maxValueStorage.length - 1].value) {
            this.maxValueStorage.push(newNode);
        }

        if (!this.top) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            const temp = this.top;
            this.top = newNode;
            this.top.next = temp;
        }
        return ++this.length;
    }

    pop() {
        if (!this.top) {
            return null;
        }

        if (this.top.value === this.maxValueStorage[this.maxValueStorage.length - 1].value) {
            this.maxValueStorage.pop();
        }

        if (this.top.value === this.minValueStorage[this.minValueStorage.length - 1].value) {
            this.minValueStorage.pop();
        }

        const temp = this.top;
        if (this.top === this.bottom) {
            this.bottom = null;
        }
        this.top = this.top.next;
        this.length--;
        return temp;
    }

    size() {
        return this.length;
    }

    min() {
        return this.minValueStorage[this.minValueStorage.length - 1] || null;
    }

    max() {
        return this.maxValueStorage[this.maxValueStorage.length - 1] || null;
    }
};


exports.Node = Node;
exports.MinMaxStack = MinMaxStack;
