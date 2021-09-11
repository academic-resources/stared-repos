/**
 * Created by xliu on 6/17/2017.
 */

var insertionAdvanced = function(arr){
    var len = arr.length;
    for(var i = 1; i < len; i++){
        var ele = arr[i];
        var j;
        for( j = i; j > 0 && arr[j-1] > ele ; j--){
            arr[j] = arr[j-1];
        }
        arr[j] = ele;
    }
    return arr;
}
