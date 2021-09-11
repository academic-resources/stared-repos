Array.prototype.bubbleSort = function () {
  let dupe = this
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < dupe.length - 1; i++) {
      if (dupe[i] > dupe[i + 1]) {
        let temp = dupe[i];
        dupe[i] = dupe[i + 1];
        dupe[i + 1] = temp;
        sorted = false;
      }
    }
  }
  return dupe;
}

String.prototype.substrings = function () {
  const substrings = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      substrings.push(this.substring(i, j));
    }
  }
  return substrings;
}

