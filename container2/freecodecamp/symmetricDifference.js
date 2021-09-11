function sym(args) { 
  var combinedArray = Array.prototype.slice.call(arguments);
  
  var getDiff = function(arr1, arr2) {
    function filterFunction(arr1, arr2) {
      return arr1.filter(function(item) {
        return arr2.indexOf(item) == -1;
      });
    }
    return filterFunction(arr1, arr2).concat(filterFunction(arr2, arr1));
  };
  
  var symArray = combinedArray.reduce(getDiff, []);
  
  function uniq(foo) {
    var seen = {};
    console.log(seen);
    return foo.filter(function(item) {
        console.log(seen);
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
  
  var uniqueArray = uniq(symArray);
  return uniqueArray;
}

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);