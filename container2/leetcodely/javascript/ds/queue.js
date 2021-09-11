class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;

    }
    offer(item){
        const p = new Node(item);
        this.size ++;
        if(this.head === null){
           this.head = p;
           this.tail = p;
           return;
        }
        this.tail.next = p;
        this.tail = p;

    }
    poll(){
        if(this.size === 0){
            throw TypeError("Can't deque off an empty queue.");
        }
        this.size --;
        const item = this.head;
        this.head = this.head.next;
        return item.val;

    }
    peek(){
        if(this.size === 0){
            throw TypeError("Empty Queue.")
        }
        return this.head.val;
    }
    isEmpty(){
        return this.head === null;

    }
    stringify(){
        let out = [];
        let curr = this.head;
        while(curr !== null){
            if(curr === this.tail){
                out.push(curr.val);
            }else{
                out.push(curr.val);
                out.push("->");
            }
            curr = curr.next;
        }
        return out.join("")
    }
}
class Node{
    constructor(item){
        this.val = item;
        this.next = null;
    }


}

module.exports = Queue;