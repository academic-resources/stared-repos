function eliminateDuplicates(arr)
{
  var seen = {};
  var out = [];
  var len = arr.length;
  var j = 0;
  for(var i = 0; i < len; i++) 
  {
    var item = arr[i];
    if(seen[item] !== 1) 
    {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}
  
function unite(arr1, arr2, arr3) 
{
  var flattened = [];
  for (var i = 0; i < arguments.length; i++)
  {
    flattened = flattened.concat(arguments[i]);
    console.log(flattened);
  }
  var uniqueArray = eliminateDuplicates(flattened);
  return uniqueArray;
}

unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);
