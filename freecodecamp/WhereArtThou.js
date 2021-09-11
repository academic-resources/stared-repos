function where(collection, source) 
{
  var arr = [];
  var addToArr = false;
  //iterating through the collection
  for (var i =0; i<collection.length; i++)
  {
    // For all names in source
    for (var name in source)
    {
      // if the name isn't found in collection OR the keys don't match
      if (!collection[i].hasOwnProperty(name) || collection[i][name] !== source[name])
      {
        addToArr = false;
        break;
      }
      addToArr = true;
    }
    if (addToArr === true)
    {
      arr.push(collection[i]);
    }
  }
  
  return arr;
}

where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

