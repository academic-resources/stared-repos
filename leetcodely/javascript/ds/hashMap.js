class HashMap{
    constructor(){
        this.store = [16];
        this.size = 0;
    }
    get(){
        const index = this.position(key);
        const list = this.store[index];


    }
    put(key,value){
        this.size ++;
        const p = new Node(key, value);
        const index = self.position(key);
        if(!this.store){
            this.store[index] = [p];
        }else{
            const list = this.store[index];
            list.push(p);
        }

    }
    position(key){

    }
}
class Node{
    constructor(key, value){
        this.key = key;
        this.value = value;

    }
    equals(other){
        return this.key === other.key;
    }
    update(value){
        this.value = value;
    }
}