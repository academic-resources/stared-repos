Array.prototype.uniq = function () {
  const uniqArray = [];
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (!uniqArray.includes(element)) {
      uniqArray.push(element);
    }
  }
  return uniqArray;
}

Array.prototype.twoSum = function () {
  const twoSumArray = [];
  for (let i = 0; i < this.length - 1; i++) {
    const element1 = this[i];
    for (let j = i + 1; j < this.length; j++) {
      const element2 = this[j];
        if (element1 + element2 == 0) {
          twoSumArray.push([i,j]);
        }
    }
  }
  return twoSumArray;
}

Array.prototype.transpose = function () {
  const innerArrays = function () { return Array.from({ length: this.length })};
  const transposeArray = Array.from({length: this[0].length}, innerArrays);

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      const el = this[i][j];
      transposeArray[j][i] = el
    }
  }
  return transposeArray;
}
// Thanks Mashu