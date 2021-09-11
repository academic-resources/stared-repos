return function (t) {
  return sin(1 + Math.pow(sin(sin(1/20)/2)/50,2));
  function sin (x) { return Math.sin(2 * Math.PI * (t % 1000 + 2000) * x) }
}
