Array.prototype.uniq = function() {
    const uniqArray = [];
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        if (!uniqArray.includes(element)) {
            uniqArray.push(element);
        }
    }
    return uniqArray;
}

Array.prototype.twoSum = function() {
    const pairsArray = [];
    for (let startIndex = 0; startIndex < this.length; startIndex++) {
        const ele_1 = this[startIndex];
        for (let endIndex = startIndex + 1; endIndex < this.length; endIndex++) {
            const ele_2 = this[endIndex];
            if (ele_1 + ele_2 === 0) {
                pairsArray.push([startIndex, endIndex])
            }
        }
    }
    return pairsArray;
}

Array.prototype.transpose = function() {
    const output = [];
    
    for (let row = 0; row < this.length; row++) {
        const subArray = [];
        for (let col = 0; col < this.length; col++) {
            subArray.push(this[col][row])
        }
        output.push(subArray)
    }
    return output
}


Array.prototype.transpose2 = function () {
    
    const output = Array.from({ length: this.length }, () => [])
    
    for (let row = 0; row < self.length; row++) {
        for (let col = 0; col < self.length; col++) {
            output[col][row] = self[row][col]
        }
    }
    return output
}

