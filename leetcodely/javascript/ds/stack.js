class Stack{
    constructor(){
        this.top = null;
        this.size = 0;
    }
    push(item){
        const p = new Node(item);
        this.size ++;
        if(this.top === null){
            this.top = p;
            return;
        }
        p.next = this.top;
        this.top = p;

    }
    pop(){
        if(this.size === 0){
            throw "Can't pop off an empty stack."
        }
        const item = this.top;
        this.top = this.top.next;
        this.size --;
        return item.val;
    }
    peek(){
        return this.top.val;

    }
    isEmpty(){
        return this.top === null;
    }
}

class Node{
    constructor(item){
        this.val = item;
        this.next = null;
    }
}

module.exports = Stack;