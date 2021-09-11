function isNumber(arg)
{
  if (typeof arg === 'number')
  {
    return true;
  }
  else return false;
}

function add() 
{
  function isNumber(arg)
{
  if (typeof arg === 'number')
  {
    return true;
  }
  else return false;
}

function add() 
{
  if (arguments.length === 2)
  { 
    if (isNumber(arguments[0]) && isNumber(arguments[1]))
    {
      return arguments[0] + arguments[1];
    }
    else return undefined;
  }
  else if (arguments.length === 1)
  {
    var x = arguments[0];
    if (!isNumber(x))
    {
      return undefined;
    }
    else return function(y)
    {
      if (isNumber(y))
      {
        return x + y;
      }
      else return undefined;
    };
  }
}

add(2,3);

var sumTwoAnd = add(2);
console.log(sumTwoAnd(7));
console.log(add(2,3));
console.log(add(15,4));
var a = add("http://bit.ly/IqT6zt");
console.log(a);
console.log(add(2, "3"));
console.log(add(2)([3]));