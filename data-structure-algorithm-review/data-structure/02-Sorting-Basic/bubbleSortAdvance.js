/**
 * Created by xliu on 6/17/2017.
 */
var swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return arr;
}

var bubbleSortAdvanced = function (arr) {

    var swapped = false, len = arr.length;

    do{
        swapped = false;

        for(var i = 1; i < len; i++){
            if(arr[i - 1] > arr[i]){
                arr = swap(arr, i - 1, i);
                swapped = true;
            }
        }
    }while(swapped);

    return arr;
}