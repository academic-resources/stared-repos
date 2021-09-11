class SinglyLinkedList{

    constructor(){
        this.head = null;
        this.size = 0;
    }

    insert(item){
        this.size ++;
        let p = new Node(item);
        if(this.head === null){
            this.head = p;
        }
        else{
           p.next = this.head;
           this.head = p;
        }
    }
    insertAt(item, index){
        if(index > this.size){
            throw "Wrong index";
        }
        let p = new Node(item);
        if(index === 0){
            p.next = this.head;
            this.head = p;
            return;
        }
        let curr = this.head;
        while(curr !== null){
            if(index === 0){
                if(curr.next === null){
                    curr.next = p;
                    return;
                }
                else if(curr.next.next === null){
                    curr.next = p;
                }else{
                    curr.next.next = p.next;
                    curr.next = p;

                }
                return;
            }
            curr = curr.next;
            index --;
        }

    }
    remove(item){
        let curr, prev;
        prev = curr = this.head;
        if(item === curr.val){
            this.head = this.head.next;
            this.size --;
            return;
        }
        while(curr !== null){
            if (curr.val === item){
                prev.next = curr.next;
                this.size --;
                return;
            }
            prev = curr;
            curr = curr.next;

        }
        throw "Item doesn't exist in list."
    }
    length(){
        return this.size;
    }

    isEmpty(){
        return this.size === 0;
    }
    stringify(){
        let curr = this.head;
        const out = [];
        while(curr !== null){
            if(curr.next === null){
                out.push(curr.val);
            }else{
                out.push(curr.val);
                out.push("->")
            }
            curr = curr.next;
        }
        return out.join("");
    }
}

class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

module.exports = SinglyLinkedList;