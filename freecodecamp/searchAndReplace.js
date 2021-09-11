function myReplace(str, before, after) {
  var newArray = str.split(" ");
  var indexOfReplace = newArray.indexOf(before);
  if (indexOfReplace !== -1)
  {
  		if (before[0] === before[0].toUpperCase()) 
        { 
          after = after.replace(after[0], after[0].toUpperCase()); 
        }
        newArray.splice(indexOfReplace, 1, after); 
        str = newArray.join(" ");
  }
  
  return str;
}

var msg = myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");