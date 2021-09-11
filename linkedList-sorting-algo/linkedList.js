class Node {
    constructor(val, next = null, previous = null) {
        this.value = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addHead(val) {
        let newHead = new Node(val);

        if (!this.head) {
            this.head, this.tail = newHead;
        }

        newHead.next = this.head;
        this.head = newHead;
        this.length++;
        return this;
    }

    removeHead() {
        if (!this.head) {
            return undefined;
        }
        if (this.length === 1) {
            this.head, this.tail = null;
        }
        let removed = this.head;

        this.head = this.head.next;
        this.length--;

        return removed;


    }

    addTail(val) {
        let newNode = new Node(val);
        if (this.head === null && this.tail === null) {
            this.head = newNode;
            this.tail = newNode
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    removeTail() {
        let beforeTail = this.get(this.length - 2);
        if (this.length === 0) {
            return undefined;
        }

        this.length--;
        if (this.length === 1) {
            beforeTail.next = null;
        }
        if (this.length === 0) {
            let removed = this.tail
            this.head = null;
            this.tail = null;
            return removed;

        }

        let removed = this.tail;
        this.tail = beforeTail;
        this.tail.next = null
        return removed;
    }

    contains(target) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === target) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    set(index, val) {
        if (this.get(index) !== null) {
            this.get(index).value = val;
            return true;
        } else {
            return false;
        }
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;
        let counter = 0;
        let current = this.head;
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }

    insertAt(index, val) {
        let newNode = new Node(val)
        if (this.get(index) !== undefined) {
            if (index === 0) {
                this.addHead(val);
            }
            else if (index === this.length - 1) {
                this.addTail(val)
            }

            let nextIndex = this.get(index);
            let previousIndex = this.get(index - 1);
            if (previousIndex) {
                previousIndex.next = newNode;
            }
            newNode.next = nextIndex;
            this.length++;
            return true;
        }
        return false;
    }

    remove(index) {
        if (this.get(index) !== undefined) {
            if (index === 0) {
                return this.removeHead();
            }
            else if (index === this.length - 1) {
                return this.removeTail();
            }

            let previousNode = this.get(index - 1);
            let currentNode = this.get(index);
            let nextNode = this.get(index + 1);

            previousNode.next = nextNode;

            this.length--;
            return currentNode;
        }
        return undefined;
    }

    swap(index1, index2) {
        //if in boundary
        if ((this.get(index1) !== null) && (this.get(index2) !== null)) {
            let temp = this.get(index1).value
            this.get(index1).value = this.get(index2).value
            this.get(index2).value = temp;

            return true;
        }

        return false;
    }

    printValues() {
        let current = this.head;
        let arr = [];
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        console.log(...arr);
    }

    size() {
        return this.length;
    }


}

let list = new LinkedList()

module.exports = {
    LinkedList,
    Node
}
