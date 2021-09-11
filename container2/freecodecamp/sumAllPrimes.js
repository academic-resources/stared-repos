function isPrime(value)
{
  for (var i = 2; i < value; i++)
  {
    if (value % i === 0)
    {
      return false;
    }
  }
  return value > 1;
}

function sumPrimes(num) {
  var sum = 2;
  if (num === 2)
  {
    return 2;
  }
  
  for (var i = 3; i <= num; i++)
  {
    if (isPrime(i))
      sum += i;
    else continue;
  }
  return sum;
}

sumPrimes(10);
