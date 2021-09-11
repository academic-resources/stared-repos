class Node {
    // Nodes have two variables, the data the node contains and a pointer to the next Node
    constructor(data) {
        this.data = data;
        this.next = null;
    }
};

class SingleLinkedList {
    // Setup the basic list
    constructor() {
        this.length = 0;
        this.head = null;
    }

    /*
    * Add a node to the start of the list
    */
    prependNode(data) {
        let newNode = new Node(data);
        if(this.length === 0) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    /*
    * Add a node to the end of the list
    */
    appendNode(data) {
        let newNode = new Node(data);

        if(this.length === 0) {
            this.head = newNode;
            this.length++;
            return;
        } else {
            let curNode = this.head;

            while(curNode.next !== null) {
                curNode = curNode.next;
            }

            curNode.next = newNode;
            this.length++;
        }
    }

    /*
    * Delete single instace
    */
    deleteNode(data) {
        if(this.length === 0) return false;
        let curNode = this.head;
        if(curNode.data === data) {
            this.head = this.head.next;
            curNode.next = null;
            this.length--;
            return true;
        }
        while(curNode.next !== null) {
            if(curNode.next.data === data) {
                let deleteNode = curNode.next;
                curNode.next = curNode.next.next;
                deleteNode.next = null;
                this.length--;
                return true;
            } else {
                curNode = curNode.next;
            }
        }
        return false;
    }

    /*
    * Deletes all node matching the data given
    */
    deleteAllNodes(data) {
        // BUG: error when trying to remove final element
        if(this.length === 0) return false;
        let deleted = false;
        let curNode = this.head;
        while(this.head.data === data) {
            this.head = this.head.next;
            curNode.next = null;
            curNode = this.head;
            deleted = true;
            this.length--;
        }
        while(curNode.next !== null) {
            if(curNode.next.data === data){
                let deleteNode = curNode.next;
                curNode.next = curNode.next.next;
                deleteNode.next = null;
                this.length--;
                deleted = true;
                curNode = curNode.next;
            } else {
                curNode = curNode.next;
            }
        }
        return deleted;
    }

    /*
    * Find a node with the given data
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
    * Iterate through the list and print all of the data
    */
    printList() {
        let curNode = this.head;
        while(curNode !== null) {
            console.log(curNode.data);
            curNode = curNode.next;
        }
    }
};


let sLL = new SingleLinkedList();

// sLL.appendNode(1);
// sLL.appendNode(2);
// sLL.appendNode(1);
// sLL.appendNode(3);
// // sLL.deleteNode(1);
//
// sLL.prependNode(2);
// sLL.appendNode(3);
// sLL.prependNode(1);
// sLL.appendNode(3);
// sLL.deleteNode(3);
// sLL.deleteAllNodes(3);

sLL.printList();

//console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(sLL)));
