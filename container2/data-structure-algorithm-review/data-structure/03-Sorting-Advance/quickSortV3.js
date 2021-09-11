/**
 * Created by xliu on 6/27/2017.
 */
var quickSortV3 = function(arr){
    quickSortV3Sub(arr, 0, arr.length - 1);
    return arr;
}

var quickSortV3Sub = function(arr, l, r){
    if(r - l <= 15) {
        insertionAdvance2(arr, l, r);
        return;
    }

    //partition
    swap(arr, l, parseInt(Math.random() * arr.length %(r - l + 1) + l));
    var v = arr[l];
    var lt = l;// from arr[l+ 1... lf] < v
    var gt = r + 1; // from arr[gt....r] > v
    var i = lt + 1; // from arr[lt + 1....i ] == v

    while(i < gt){
        if(arr[i] > v){
            swap(arr, i, --gt); //
        }else if (arr[i] < v){
            swap(arr, i++, ++lt); //++lt points to a value that equals to v, then swap the arr[i](> v) with arr[++lt], increase i
            // so arr[l... ++lt] < v, arr[++lt ... i] == v
        }else{
            i++;
        }
    }
    swap(arr, l, lt);
    quickSortV3Sub(arr, l, lt - 1);
    quickSortV3Sub(arr, gt, r);
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

var swap = function(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] =  tmp;
}