/**
 * Created by xliu on 6/30/2017.
 */
var binarySearch = function(arr, val){
    var l = 0, r = arr.length;

    while( l <= r ){
        var mid = parseInt(l + ( r - l )/2);
        if(arr[mid] === val)
            return mid;
        if(arr[mid] < val){
            l = mid + 1;
        }else{
            r = mid - 1;
        }
    }

    return -1;

}