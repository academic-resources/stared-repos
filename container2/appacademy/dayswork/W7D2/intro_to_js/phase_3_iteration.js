Array.prototype.bubbleSort = function() {
    const n = this.length;
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let index = 0; index < this.length - 1; index++) {
            if (this[index] > this[index + 1]) {
                let temp = this[index];
                this[index] = this[index + 1];
                this[index + 1] = temp;
                sorted = false
            }
        }
    }
    return this
}

String.prototype.substrings = function() {
    const substrings = []
    for (let startIndex = 0; startIndex < this.length; startIndex++) {
        for (let endIndex = startIndex + 1; endIndex <= this.length; endIndex++) {
            substrings.push( this.slice(startIndex, endIndex))
        }
    }
    return substrings
}

// arr = [4,2,1,3,0,6,9,3]
// console.log( arr.bubbleSort() )

str = "abc"
// console.log(str.substrings());
