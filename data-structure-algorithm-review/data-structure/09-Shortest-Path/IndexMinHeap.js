function IndexMinHeap(arr, capacity) {
    this.capacity = capacity;
    this.data = new Array(this.capacity + 1);
    this.indexes = new Array(this.capacity + 1);
    this.reverse = new Array(this.capacity + 1);

    for(var i = 0; i <= this.capacity; i++) {
        this.reverse[i] = 0;
    }

    this.count = 0;
}

IndexMinHeap.prototype = {
    size: function () {
        return this.count;
    },
    isEmpty: function() {
        return this.count === 0;
    },
    insert: function(index, item) {
        if (this.count + 1 <= this.capacity && index + 1 >= 1 && index + 1 <= this.capacity) {
            index++;
            this.data[index] = item;
            this.indexes[this.count + 1] = index;
            this.reverse[index] = this.count + 1;
            this.count++;
            this.shiftUp(this.count);
        }
    },
    extractMinIndex: function () {
        if(this.count > 0) {
            var ret = this.indexes[1] - 1;
            this.swap( this.indexes, 1, this.count);
            this.reverse[this.indexes[this.count]] = 0;
            this.reverse[this.indexes[1]] = 1;
            this.count --;
            this.shiftDown(1);
            return ret;
        }
    },
    getMinIndex: function () {
        if (this.count > 0) {
            return this.indexes[1] - 1;
        }
    },
    shiftUp: function(k){
        while( k > 1 && this.data[this.indexes[parseInt(k/2)]] > this.data[this.indexes[k]]) {
            this.swap(this.indexes, parseInt(k/2), k);
            this.reverse[this.indexes[parseInt(k/2)]] = parseInt(k/2);
            this.reverse[this.indexes[k]] = k;
            k = parseInt(k/2);
        }
    },
    shiftDown: function (k) {
        while( 2 * k <= this.count) {
            var j = 2 * k;
            if(j + 1 <= this.count && this.data[this.indexes[j]] > this.data[this.indexes[j+1]]) j += 1;
            if(this.data[this.indexes[k]] <= this.data[this.indexes[j]]) break;

            this.swap(this.indexes, k , j);
            this.reverse[this.indexes[k]] = k;
            this.reverse[this.indexes[j]] = j;
            k = j;
        }
    },
    extractMin: function () {
        var item = this.data[this.indexes[1]];
        this.swap(this.indexes, 1, this.count);
        this.reverse[this.indexes[1]] = 1;
        this.reverse[this.indexes[this.count]] = 0;
        this.count--;
        this.shiftDown(1);
        return item;
    },
    swap: function (arr, i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    },
    contain: function (index) {
        return this.reverse[index + 1] !== 0;
    },
    change: function (index, item) {
        if(this.contain(index)) {
            this.indexes[++index] = item;
            this.shiftUp(this.reverse[index]);
            this.shiftDown(this.reverse[index]);
        }
    }
}