import { BinaryTreeBase } from './binaryTreeBase.mjs';

class Node(data) {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

export class MaxHeap extends BinaryTreeBase {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    addNode(data) {
        //adds Node
    }


};
