/**
 * Created by xliu on 6/27/2017.
 */
var quickSortV2 = function(arr){
    quickSortV2Sub(arr, 0, arr.length - 1);
    return arr;
};

var quickSortV2Sub = function(arr, lft, rht){
    if(rht - lft < 16) {
        insertionAdvance2(arr, lft, rht);
        return;
    }

    var p = partition2(arr, lft, rht);
    quickSortV2Sub(arr, lft, p-1);
    quickSortV2Sub(arr, p+1, rht);

}

var partition2 = function(arr, lft, rht){
    swap(arr, lft, parseInt(Math.random() * arr.length %(rht - lft + 1) + lft));
    var v = arr[lft];
    var i = lft + 1, j = rht;
    while(true){
        while(i <= rht && arr[i] < v) i++;
        while(j >= lft && arr[j] > v ) j--;
        if(i > j) break;
        swap(arr, i, j);
    }

    swap(arr, lft, j);

    return j;

}
