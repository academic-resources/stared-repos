/**
 * Created by xliu on 6/17/2017.
 */

var Helper = function(){
    var helper = {};
    //生成有n个元素的随机数组， 每个元素的随机范围为【rangeL， rangeR】
    helper.generateRandomArray = function(n, rangeL, rangeR){
        var arr = new Array(n);
        for(var i = 0; i < n; i++){
            arr[i] = Math.random() * n + rangeL;
        }
        return arr;
    };

    return helper;
};

var Tester = function(){
    var test = {};

    test.isSorted = function(sort, arr, n){
        for(var i = 0; i < n -1; i++){
            if(arr[i] > arr[i + 1]){
                return false;
            }
        }
        return true;
    }

    test.testSort = function(sortName, sort, arr,  n){
        const CLOCKS_PER_SECOND = 60;
        var testStart = Date.now();
        var sorted = sort(arr);
        var testEnd = Date.now();
        console.log(test.isSorted(sorted, arr, n));
        console.log(sortName + " : " + (testEnd - testStart)/ CLOCKS_PER_SECOND + "  ");
    };

    test.testSortV2 = function (sortName, sort, arr, BS) {
        const CLOCKS_PER_SECOND = 60;
        var testStart = Date.now();
        var sorted = sort(arr, BS);
        var testEnd = Date.now();
        console.log(test.isSorted(sorted, arr, arr.length));
        console.log(sortName + " : " + (testEnd - testStart)/ CLOCKS_PER_SECOND + "  ");
    }

    return test;
}