/**
 * Created by xliu on 6/17/2017.
 */

var swap = function(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

var shellSort = function(arr){
    var len = arr.length, inc = Math.round(len /2);
    // while(inc > 1){
    //     var i = 0;
    //     while(i < inc){
    //         var j = i;
    //         while(j < len){
    //             if(arr[j] > arr[j + inc]){
    //                 arr = swap(arr, j, j + inc);
    //             }
    //             j += inc;
    //         }
    //         i++;
    //     }
    //     inc = Math.round(inc/2);
    // }

    var h = 1;
    while( h < len/3){
        h = 3 * h + 1;
    }

    while(h >= 1){
        for(var i = h; i < len; i++){
            var e = arr[i];
            var j;
            for(j = i; j >= h && e < arr[j - h]; j -= h ){
                arr[j] = arr[j-h];
            }
            arr[j] = e;
        }

        h /= 3;
    }
    return arr;
}