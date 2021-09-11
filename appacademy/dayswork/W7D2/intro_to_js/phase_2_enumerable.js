Array.prototype.myEach = function(cb) {
    for (let index = 0; index < this.length; index++) {
        cb(this[index]);
    }
}

Array.prototype.myMap = function(cb) {
    const mapped = []
    function myEachCallback(element) { 
        mapped.push( cb(element) )
    }
    this.myEach(myEachCallback)
    return mapped
}

Array.prototype.myReduce = function(cb, initial = this[0]) {
    let acc = initial
    function myEachCallback(element) {
        acc = cb(acc, element)
    }
    this.myEach(myEachCallback)
    return acc
}

function double(n) {
    return n * 2 
}

function reduceCB(acc, el) {
    return acc + el
}

arr = [1,2,3,4]
// console.log(arr.myReduce(reduceCB, 10));
