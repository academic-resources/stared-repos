import { BinaryTreeBase } from './binaryTreeBase.mjs';

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

export class BinaryTree extends BinaryTreeBase {
    constructor() {
        this.length = 0;
        this.root = null;
    }

    addNode(data) {
        let newNode = new Node(data);
        if(this.root === null) {
            this.root = newNode;
        } else {
            if(!this.traverseList(this.root, newNode)){
                console.error(`Value already stored: ${data}`);
                return;
            }
        }
        this.length++;
    }

    traverseList(curNode, newNode) {
        if (newNode.data === curNode.data) {
            return false;
        }

        if(newNode.data > curNode.data) {
            if(curNode.right === null) {
                curNode.right = newNode;
                return true;
            } else {
                return this.traverseList(curNode.right, newNode);
            }
        } else {
            if(curNode.left === null) {
                curNode.left = newNode;
                return true;
            } else {
                return this.traverseList(curNode.left, newNode);
            }
        }
    }

    printTree() {
        this.traversePrintTree(this.root);
    }

    traversePrintTree(curNode) {
        console.log(curNode);
        if(curNode.left !== null) {
            this.traversePrintTree(curNode.left);
        }
        if(curNode.right !== null) {
            this.traversePrintTree(curNode.right);
        }
    }

    deleteNode(data) {
        let curNode = this.root;
        let prevNode;

        while(curNode.data !== data && curNode !== null) {
            prevNode = curNode;
            if(data > curNode.data) {
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
        }

        if(curNode === null) {
            console.log('No such value in Tree');
            return;
        } else {
            if(curNode.left !== null && curNode.right !== null) {
                //both children
            }
            else if (curNode.left !== null) {
                //left node has a value
            }
            else if (curNode.right !== null) {
                //right node has a value
            } else {

                //no values
            }
        }


        // find node (if exists)
        // if no children, just delete it
        // if one child, set parent link to child
        // if 2 children, lowest on rightmost (i.e. 1 right, then left to leaf)
    }
};


let bT = new BinaryTree();

// adding Nodes
bT.addNode(8);
bT.addNode(4);
bT.addNode(12);
bT.addNode(2);
bT.addNode(6);
bT.addNode(10);
bT.addNode(14);
bT.addNode(3);

// check correct Length
console.log(bT.length);

// adding duplicate Nodes
bT.addNode(10);
bT.addNode(4);
bT.addNode(3);

// Display Nodes
bT.printTree();
