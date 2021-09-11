class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
};

class CircularLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    /*
    * Adds a Node to the start of the list
    */
    prependNode(data) {
        let newNode = new Node(data);
        if(this.length === 0) {
            this.head = newNode;
            newNode.next = newNode;
        } else {
            let curNode = this.head;
            while(curNode.next !== this.head) {
                curNode = curNode.next;
            }

            curNode.next = newNode;
            newNode.next = this.head;
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
            newNode.next = this.head;
        } else {
            let curNode = this.head;
            while(curNode.next != this.head) {
                curNode = curNode.next;
            }

            curNode.next = newNode;

            newNode.next = this.head;
        }

        this.length++;
    }

    /*
    * Deletes a node
    */
    deleteNode(data) {
        console.log("start Delete");
        if(this.length === 0) {
            console.log("if Empty");
            return;
        }
        else if (this.length === 1) {
            console.log("if 1 length");
            if(this.head.data !== data) {
                return;
            }
            this.head = null;
        } else {
            let curNode = this.head;
            console.log("if multi");

            while(curNode.next != this.head && curNode.next.data != data) {
                console.count("iter");
                if(curNode.next.data = data) {
                    if(curNode.next === this.head) {
                        this.head = curNode.next.next;
                    }
                    curNode.next = curNode.next.next;
                    break;
                }

                curNode = curNode.next;
            }
        }

        this.length--;
    }

    /*
    * Finds first node with suppplied data and returns it
    */
    findNode(data) {
        let curNode = this.head;

        while(curNode.data !== data) {
            if(curNode.next === this.head) {
                return false;
            } else {
                curNode = curNode.next;
            }
        }
        return curNode;
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


let cLL = new CircularLinkedList();

cLL.prependNode(2);
cLL.appendNode(3);
cLL.prependNode(1);
cLL.appendNode(4);

console.log(cLL.head);

// cLL.printList();

// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(cLL)));
