const Queue = require('./queue');

class BinarySearchTree{
    constructor(){
        this.root = null;
        this.size = 0;

    }

    insert(item){
        this.root = this.insertHelper(this.root, item);
        this.size ++;
    }
    insertHelper(root, item){
        if(root === null){
            root = new Node(item);
            return root;
        }
        if(item < root.val){
            root.left = this.insertHelper(root.left, item);
        }else{
            root.right  = this.insertHelper(root.right, item);
        }
        return root;

    }
    contains(item){
        return this.containsHelper(this.root, item);

    }
    containsHelper(root, item){
        if(root === null){
            return false;
        }
        if (item < root.val){
            return this.containsHelper(root.left, item);
        }else if(item > root.val){
            return this.containsHelper(root.right, item);
        }else{
            return true;
        }

    }
    remove(item){

    }
    balance(){

    }
    preOrder(){
        return this.preOrderhelper(this.root);

    }
    preOrderhelper(root){
        if(root === null){
            return;
        }
        console.log(root.val);
        this.preOrderhelper(root.left);
        this.preOrderhelper(root.right);

    }
    postOrder(){
        this.postOrderHelper(this.root);

    }
    postOrderHelper(root){
        if(root === null){
            return;
        }
        this.postOrderHelper(root.left);
        this.preOrderhelper(root.right);
        console.log(root.val);
    }
    inorder(){
        this.inorderHelper(this.root);

    }
    inorderHelper(root){
        if(root === null){
            return;
        }
        this.inorderHelper(root.left);
        console.log(root.val);
        this.inorderHelper(root.right);

    }
    levelOrderTraversal(){
        const queue = new Queue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()){
            const item = queue.dequeue();
            console.log(item.val);
            if(item.left !== null){
                queue.enqueue(item.left);
            }
            if(item.right !== null){
                queue.enqueue(item.right);
            }
        }
    }
}
class Node{
    constructor(item){
        this.val = item;
        this.left = null;
        this.right = null;
    }
}

module.exports = BinarySearchTree;