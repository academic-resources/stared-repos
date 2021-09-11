/**
 * Created by xliu on 7/19/2017.
 */
function MinHeap(arr, capacity) {
    this.capacity = capacity;
    this.data = new Array(capacity - 1);
    this.count = 0;

    for(var i = 0; i < arr.length; i++){
        this.data[i+1] = arr[i];
    }

    this.count = arr.length;

    for(var i = parseInt(this.count/2); i >= 1; i--){
        this.shiftDown(i);
    }
}

MinHeap.prototype = {
    shiftUp: function(k) {
        while( k > 1 && this.data[parseInt(k/2)] && this.data[parseInt(k/2)].largeThan(this.data[k])){
            this.swap(this.data, parseInt(k/2), k);
            k = parseInt(k/2);
        }
    },
    shiftDown: function(k){
        while( 2* k <= this.count) {
            var j = 2  * k;
            if (j + 1 <= this.count && this.data[j + 1] && this.data[j + 1].lessThan(this.data[j])){
                j++;
            }
            if(this.data[k] && this.data[k].lessOrEqual(this.data[j])) break;
            this.swap(this.data, k, j);
            k = j;
        }
    },
    insert: function (item) {
        if(this.count + 1 <= this.capacity) {
            this.data[this.count + 1] = item;
            this.shiftUp(++this.count);
        }
    },
    extractMin: function () {
        if(this.count > 0){
            var ret = this.data[1];
            this.swap(this.data, 1, this.count);
            this.count--;
            this.shiftDown(1);
            return ret;
        }
    },
    getMin: function () {
        if(this.count > 0) {
            return this.data[1];
        }
    },
    swap: function (arr, i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    },
    isEmpty: function () {
        return this.count === 0;
    }
}