class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
};

class DoubleLinkedList  {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    /*
    * Adds a Node to the start of the list
    */
    prependNode(data) {
        let newNode = new Node(data);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.head;
            newNode.prev = this.head.prev;
            this.head.prev.next = newNode;
            this.head.next.prev = newNode;

            this.head = newNode;
        }

        this.length++;
    }

    /*
    * Adds a node to the end of the List
    */
    appendNode(data) {
        let newNode = new Node(data);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            let curNode = this.head;
            while(curNode.next !== this.head) {
                curNode = curNode.next;
            }
            newNode.next = this.head;
            newNode.prev = curNode;
            curNode.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    /*
    * Returns next node if parameter given is a valid node
    */
    getNextNode(node) {
        return ((node instanceof Node) ? node.next : false);
    }

    /*
    * Returns whether the Linked List is empty or not
    */
    isEmpty() {
        return this.length === 0;
    }

    /*
    * Prints the Linked List
    */
    printList() {
        let curNode = this.head;

        while(curNode.next !== this.head || curNode.next !== null) {
            console.log(curNode);
            curNode = curNode.next;
        }
    }
};

let dLL = new DoubleLinkedList();
dLL.prependNode(1);
dLL.prependNode(2);
// dLL.prependNode(3);
// dLL.prependNode(4);
// dLL.prependNode(5);
// dLL.prependNode(6);

dLL.printList();
console.log(dLL.head);

console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(dLL)));
