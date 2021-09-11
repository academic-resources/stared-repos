function steamroller(arr) {
  // I'm a steamroller, baby
  var newArray = [];
  var flatten = function(arg)
  {
    if (Array.isArray(arg))
    {
      for (var i in arg)
      {
        flatten(arg[i]);
      }
    }
    else newArray.push(arg);
  };
  arr.forEach(flatten);
  return newArray;
}

steamroller([1, [2], [3, [[4]]]]);
