function smallestCommons(arr) {
  for (i = Math.max(...arr); i >= Math.min(...arr); i--) { arr.push(i); }

  var lcm = arr[2], a = 0, b = 0, t = 0;

  for (i = 3; i < arr.length; i++) {
    a = lcm, b = arr[i];
    while (a % b) { a = a % b; t = a; a = b; b = t; }
    lcm = lcm / b * arr[i];
  }

  return lcm;
}