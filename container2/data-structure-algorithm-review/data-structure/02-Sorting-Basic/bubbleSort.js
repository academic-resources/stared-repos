/**
 * Created by xliu on 6/17/2017.
 */

var swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return arr;
}
var bubbleSort = function(arr){
    var len = arr.length;
    for( var i = 0 ; i < len - 1; i++){
        for(var j = 0; j < len - 1 - i; j++){
            if(arr[j] > arr[j+1]){
                arr = swap(arr, j, j+1);
            }
        }
    }
    return arr;
}

