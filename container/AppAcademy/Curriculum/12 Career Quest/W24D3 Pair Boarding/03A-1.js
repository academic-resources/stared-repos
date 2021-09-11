// myMap

// Implement the Array.prototype.map function in JavaScript.

// ES5 Solution
Array.prototype.myMap = function(fn) {
  var final = [];
  this.forEach(function (el) {
    final.push(fn(el));
  });

  return final;
};

// ES6 Solution
Array.prototype.myMap = function(fn) {
  const final = [];
  this.forEach((el) => {
    final.push(fn(el));
  });

  return final;
};

