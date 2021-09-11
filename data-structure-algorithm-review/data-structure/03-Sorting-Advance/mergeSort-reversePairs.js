/**
 * Created by xliu on 6/27/2017.
 */
//使用mergesort的分治算法的思想解决 这个问题 leetcode 315
//[4, 5, 8, 9, 1, 10, 2, 3]

//arr1 --> [4, 5, 8, 9]  arr2-->[1, 10, 2, 3]
//merge 进行时：
// newArr first element 1 put into the new array [1] pairs 4
// [4, 5] [8, 9], [1, 10], [2, 3] pairs 0
// [4, 5, 8, 9], [1, 2, 3, 10] pairs 2
// [1, 2, 3, 4, 5, 8, 9, 10] pairs 4 + 4 + 4
// in all, 4 + 4 + 4 + 2

function reversePair(arr){
    var pairs = reversePairSub(arr, 0, arr.length-1, 0);
    return pairs;
}

function reversePairSub(arr, l, r, pairs){
    if(l >= r) return 0;

    var mid = parseInt((l + r)/2);
    pairs += reversePairSub(arr, l, mid, pairs);
    pairs += reversePairSub(arr, mid+1, r, pairs);
    pairs += reverseMerge(arr, l, mid, r);
    return pairs;
}

function reverseMerge(arr, l, mid, r){
    var tmpArr = new Array(r - l + 1),
        pairs = 0;
    for(var i = l; i <= r; i++){
        tmpArr[i-l] = arr[i];
    }

    var i = l, j = mid + 1;
    for(var k = l; k <= r ; k++){
        if(i > mid){
            arr[k] = tmpArr[j-l];
            j++;
        }else if ( j > r){
            arr[k] = tmpArr[i-l];
            i++;
        }else if(tmpArr[i-l] > tmpArr[j-l]){
            arr[k] = tmpArr[j-l];
            pairs += mid - i +1;
            j++;
        }else{
            arr[k] = tmpArr[i-l];
            i++;
        }
    }

    return pairs;
}