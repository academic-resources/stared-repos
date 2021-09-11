/**
 * Created by xliu on 6/19/2017.
 */

var merge = function(arr, lft, mid, rht){
    var tmpArr = new Array(rht-lft+1);
    for(var i = lft; i <= rht; i++)
        tmpArr[i-lft] = arr[i];

    var i = lft, j = mid + 1;
    for(var k = lft; k <= rht; k++){
        if(i > mid){
            arr[k] = tmpArr[j-lft];
            j++;
        }else if ( j > rht){
            arr[k] = tmpArr[i-lft];
            i++;
        }else if (tmpArr[i-lft] < tmpArr[j-lft]){
            arr[k] = tmpArr[i-lft];
            i++;
        }else {
            arr[k] = tmpArr[j - lft];
            j++;
        }
    }

}

var mergeSortSub = function(arr, lft, rht){
    if(lft >= rht) return ;

    var mid = parseInt((lft + rht) / 2);
    mergeSortSub(arr, lft, mid);
    mergeSortSub(arr, mid+1, rht);
    if(arr[mid] > arr[mid + 1])
        merge(arr, lft, mid, rht);
}

var mergeSortSubV1 = function(arr, lft, rht){
    if(rht - lft  < 16) {
        insertionAdvance2(arr, lft, rht);
        return;
    }

    var mid = parseInt((lft + rht) / 2);
    mergeSortSubV1(arr, lft, mid);
    mergeSortSubV1(arr, mid+1, rht);
    if(arr[mid] > arr[mid + 1])
        merge(arr, lft, mid, rht);
}

var mergeSort = function (arr) {
    mergeSortSub(arr, 0, arr.length - 1);
    return arr;
}
var mergeSortV1 = function (arr) {
    mergeSortSubV1(arr, 0, arr.length - 1);
    return arr;
}


var insertionAdvance2 = function(arr, lft, rht){
    for(var i = lft + 1; i <= rht; i++){
        var e = arr[i];
        var j;
        for( j = i; j > lft && arr[j-1] > e; j--){
            arr[j] = arr[j-1];
        }
        arr[j] = e;
    }
}

var mergeSortBU = function(arr){
    var len = arr.length;
    for(var sz = 1; sz <= len; sz += sz){
        for(var j = 0; j + sz < len; j += sz + sz){
            if(sz < 16){
                insertionAdvance2(arr, j, Math.min(j + sz + sz - 1, len -1 ));
            }else if(arr[j + sz - 1] > arr[j + sz]){
                merge(arr, j, j + sz - 1, Math.min(j + sz + sz - 1, len - 1));
            }
        }
    }
    return arr;
}