/**
 * Created by xliu on 6/13/2017.
 */

    var swap = function(dataArr, i, j){
        var tmp = dataArr[i];
        dataArr[i] = dataArr[j];
        dataArr[j] = tmp;
        return dataArr;
    };

    var selection = function(dataArr){
        var i = 0, len = dataArr.length, minIndex = 0, arr = dataArr;
        while( i < len){
            minIndex = i;
            var j = i + 1;
            while(j < len){
                if(arr[j] < arr[minIndex]){
                    minIndex = j;
                }
                j++;
            }
            arr = swap(arr, i, minIndex);
            i++;
        }
        return arr;
    };
    var print = function(arr){
        var str = "";
        arr.forEach(function(i){
            str += i + " ";
        });

        console.log(str);
    };

