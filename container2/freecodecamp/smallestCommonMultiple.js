function smallestCommons(arr) {
  var maxElement = Math.max(arr[0], arr[1]);
  console.log("The maxElement is " + maxElement);
  var minElement = Math.min(arr[1], arr[0]);
  console.log("The minElement is " + minElement);
  var scm = maxElement;
  for (var i = maxElement; i >= minElement; i--)
  {
    console.log("Started for loop. The value of i is " + i);
    if (scm % i === 0)
    {
      console.log(i + " divides evenly into " + scm);
      continue;
    }
    while (scm % i !== 0)
    {
      console.log(i + " does NOT divide evenly into " + scm);
      if (i % 2 === 0)
      {
        scm = scm * 2;
      }
      else scm *= i;
      console.log("The new scm is " + scm);
    }
  }
  console.log("Returning a value of " + scm);
  return scm;
}


smallestCommons([1,13]);