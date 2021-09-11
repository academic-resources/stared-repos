/**
 * Created by xliu on 6/26/2017.
 */
var quickSort = function(arr){
    quickSortSub(arr, 0, arr.length -1);
    return arr;
}

var quickSortSub = function(arr, lft, rht){
    if(lft >= rht) return;
    var p = partition(arr, lft, rht);
    quickSortSub(arr, lft, p-1);
    quickSortSub(arr, p + 1, rht);
}

var partition = function(arr, lft, rht){

    swap(arr, lft, parseInt(Math.random() * arr.length %(rht - lft + 1) + lft));
    var v = arr[lft];
    var j = lft;
    for(var i = lft; i <= rht; i++){
        if(arr[i] < v){
            swap(arr, ++j, i);
        }
    }

    swap(arr, lft,j);
    return j;
}

var swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] =  tmp;
}