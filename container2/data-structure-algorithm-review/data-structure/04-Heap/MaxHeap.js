/**
 * Created by xliu on 6/28/2017.
 */

function MaxHeap(capacity){
    this.count = 0;
    this.data = new Array(capacity - 1);
    this.capacity = capacity;
}

MaxHeap.prototype.size = function(){
    return this.count;
}

MaxHeap.prototype.isEmpty = function(){
    return this.count === 0;
}

MaxHeap.prototype.shiftUp = function(k){
    while(k > 1 && this.data[parseInt(k/2)] < this.data[k]){
        this.swap(this.data, parseInt(k/2), k);
        k = parseInt(k/2);
    }
}

MaxHeap.prototype.insert = function(val){
    if(this.count + 1 < this.capacity){
        this.data[this.count + 1] = val;
        this.count ++;
        this.shiftUp(this.count);
    }
}

MaxHeap.prototype.print = function(){
    for(var i = 0; i <= this.count; i++){
        console.log(" " + this.data[i + 1]);
    }
}

MaxHeap.prototype.swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

MaxHeap.prototype.extractMax = function(){

    var ret = this.data[1];
    this.swap(this.data, 1, this.count)
    this.count--;
    this.shiftDown(1);
    return ret;
}

MaxHeap.prototype.shiftDown = function(k){
    while(2*k <= this.count){
        var j = 2 * k;//在次轮循环的， data[k]和data【j】 交换位置
        if(j + 1 <= this.count && this.data[j+1] > this.data[j])
            j +=1;
        if (this.data[k] >= this.data[j])
            break;
        this.swap(this.data, k, j);
        k = j;
    }
}

var MaxHeapV2 = function(arr){
    var len = arr.length;
    this.data = new Array(len + 1);
    this.capacity = len;
    for(var i = 0; i < len; i++){
        this.data[i+1] = arr[i];
    }
    this.count = len;
    for(var i = parseInt(this.count / 2); i >= 1; i--)
        this.shiftDown(i)

}

MaxHeapV2.prototype = Object.create(MaxHeap.prototype);
MaxHeapV2.prototype.constructer = MaxHeapV2;

