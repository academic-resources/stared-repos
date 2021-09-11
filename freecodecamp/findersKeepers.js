function find(arr, func) {
  var num = 0;
  var newArray  = arr.filter(func);
  return newArray[0];
}

find([1, 2, 3, 4], function(num){ return num % 2 === 0; });