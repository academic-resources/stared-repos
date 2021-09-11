function drop(arr, func) {
  // Drop them elements.
  // set up arrays for storing elements
  var newArray = [];
  var tempArray = [];
  // fill array with all the elements that pass the test 
  tempArray = arr.filter(func);
  // find the first element that passes the test
  // grab the elements of arr from the first the passes the test through the end
  if (arr.indexOf(tempArray[0]) >= 0)
  {
    newArray = arr.slice(arr.indexOf(tempArray[0]));
  }
  return newArray;
}

drop([1, 2, 3, 4], function(n) {return n > 5;});