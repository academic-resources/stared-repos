 /**
 * Created by xliu on 6/29/2017.
 */
var heapSort = function(arr, MaxHeap){
    var len = arr.length;
    var maxHeap = new MaxHeap(len);
    for(var i = 0; i < len; i++){
        maxHeap.insert(arr[i]);
    }

    for(var i = len-1; i >=0; i--){
        arr[i] = maxHeap.extractMax();
    }

    return arr;
}


var heapSortV2 = function(arr, MaxHeapV2){
    var maxheap = new MaxHeapV2(arr), n = arr.length;

    for(var i = n-1; i >= 0; i--){
        arr[i] = maxheap.extractMax();
    }

    return arr;
}

var heapSort3 = function(arr){
    //heapify
    var n = arr.length;
    for(var i = (n-1 - 1)/2; i >= 0; i--){
        __shiftDown(arr, n, i);
    }

    for(var i = n - 1; i > 0; i-- ){
        swap(arr, 0, i);
        __shiftDown(arr, i, 0);
    }
}

function __shiftDown(arr, n, k){
    while(2 * k + 1 < n){
        var j = 2 * k + 1;
        if(j + 1 < n && arr[j + 1] > arr[j]){
            j++;
        }

        if(arr[k] >= arr[j]){
            break;
        }
        swap(arr, k, j);
        k = j;
    }
}

Object.prototype.swap = function(arr, i, j){
    var tmp  = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}