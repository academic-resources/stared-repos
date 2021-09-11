/**
 * Created by xliu on 6/28/2017.
 */

function IndexMaxHeap(capacity){
    this.count = 0;
    this.data = new Array(capacity + 1);
    this.indexes = new Array(capacity + 1);
    this.reverse = new Array(capacity + 1);
    for(var i = 0; i <= capacity; i++){
        this.reverse[i] = 0
    }
    this.capacity = capacity;
}

IndexMaxHeap.prototype.size = function(){
    return this.count;
}

IndexMaxHeap.prototype.isEmpty = function(){
    return this.count === 0;
}

IndexMaxHeap.prototype.shiftUp = function(k){
    while(k > 1 && this.data[this.indexes[parseInt(k/2)]] < this.data[this.indexes[k]]){
        this.swap(this.indexes, parseInt(k/2), k);
        this.reverse[this.indexes[parseInt(k/2)]] = parseInt(k/2);
        this.reverse[this.indexes[k]] = k;
        k = parseInt(k/2);
    }
}

IndexMaxHeap.prototype.insert = function(i, val){
    if(this.count + 1 < this.capacity && i + 1 >= 1 && i + 1 <= this.capacity){
        i += 1;
        this.data[i] = val;
        this.indexes[this.count + 1] = i;
        this.reverse[i] = this.count + 1;
        this.count ++;
        this.shiftUp(this.count);
    }
}

IndexMaxHeap.prototype.print = function(){
    for(var i = 0; i <= this.count; i++){
        console.log(" " + this.data[i + 1]);
    }
}

IndexMaxHeap.prototype.swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

IndexMaxHeap.prototype.extractMax = function(){

    var ret = this.indexes[1];
    this.swap(this.indexes, 1, this.count);
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = 0
    this.count--;
    this.shiftDown(1);
    return ret;
}

IndexMaxHeap.prototype.shiftDown = function(k){
    while(2*k <= this.count){
        var j = 2 * k;//在次轮循环的， data[k]和data【j】 交换位置
        if(j + 1 <= this.count && this.data[this.indexes[j+1]] > this.data[this.indexes[j]])
            j +=1;
        if (this.data[this.indexes[k]] >= this.data[this.indexes[j]])
            break;
        this.swap(this.indexes, k, j);
        this.reverse[this.indexes[k]] = k;
        this.reverse[this.indexes[j]] = j;
        k = j;
    }
}



IndexMaxHeap.prototype.extractMaxIndex = function(){
    var ret = this.indexes[1] - 1;
    this.swap(this.indexes, 1, this.count);
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = 0
    this.count--;
    this.shiftDown(1);
    return ret;
}

IndexMaxHeap.prototype.contains = function (i) {
    return this.reverse[i+1] != 0;
}
IndexMaxHeap.prototype.getItem = function(i){
    if(this.contains(i)){
        return this.data[i+1];
    }
}

IndexMaxHeap.prototype.change = function(i, newItem){

    if(this.contains(i)){
        i += 1;
        this.data[i] = newItem;
        //找到Indexes{j], j表示data[i]在堆中的位置
        //之后shiftup（j), 再shiftdown(j)

        // for( var j = 1;  j <= this.count; j++){
        //     if(this.indexes[j] == i){
        //         this.shiftUp(j);
        //         this.shiftDown(j);
        //         return;
        //     }
        // }

        var j = this.reverse[i];
        this.shiftUp(j);
        this.shiftDown(j);
    }
}

//reverse[i] 表示索引i在indexes(堆)中的位置
// indexes[i] = j
//  reverse[j] = i
//  indexes[reverse[i]] = i
// reverse[indexes[i]] = i

