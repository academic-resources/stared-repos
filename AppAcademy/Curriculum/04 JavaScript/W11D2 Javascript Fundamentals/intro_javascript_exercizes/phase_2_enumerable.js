Array.prototype.myEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const el = this[i];
    callback(el);
  }
}

Array.prototype.myMap = function (modify) {
  const mappedArray = [];
  this.myEach(function (el) { mappedArray.push(modify(el)) });
  return mappedArray;
}

Array.prototype.myReduce = function (accum, currentVal) {
  if currentVal == undefined {

  }
  
  this.myEach()
  // return 
}