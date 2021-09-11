/**
 * Created by xliu on 6/17/2017.
 */
var swap = function(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}
var insertion = function(dataArr){
    var arr = dataArr, len = arr.length;
    for(var i = 0;  i < len; i++){
        for(var j = i; j > 0 && arr[j] < arr[j-1]; j--){
            swap(arr, j, j-1);
        }
    }
    return arr;
}