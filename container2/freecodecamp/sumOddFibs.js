function sumFibs(num) {
  var sum = 0;
  var current = 1;
  var previous = 0;
  while (current <= num)
  {
    if (current % 2 !== 0)
    {
      sum += current;
    }
    
    current += previous;
    previous = current - previous;
  }

  return sum;
}

sumFibs(4);