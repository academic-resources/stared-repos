function diff(arr1, arr2) {
  var newArr = [];
  // Looping through arr1 and checking if any of those elements are in arr2
  for (var i = 0; i < arr1.length; i++){
    if (arr2.indexOf(arr1[i]) === -1){
      // if the element isn't in arr2, add onto newArray
      newArr.push(arr1[i]);
    }
  }
  // Looping
  for (var j = 0; j < arr2.length; j++){
    if (arr1.indexOf(arr2[j]) === -1){
      newArr.push(arr2[j]);
    }
  }
  
  return newArr;
}
diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);