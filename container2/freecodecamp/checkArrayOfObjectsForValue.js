function every(collection, pre) {
  // Is everyone being true?
  var flag = true;
  for (var i = 0; i < collection.length; i++)
  {
    if (collection[i].hasOwnProperty(pre))
    {
      if (collection[i][pre])
        continue;
      else flag = false;
    }
    else flag = false;
  }
  return flag;
}

every([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");