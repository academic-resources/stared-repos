var melody = [ 1, -1, 2, -3, 2, -1, 2 ];
var zs = [ 1, 2, 4, 3 ];
var qs = [ 1, 2, 4, 1/4 ];
return function (t) {
  var m = melody[Math.floor(t * 4 % melody.length)];
  var z = zs[Math.floor(t) % zs.length];
  var q = qs[Math.floor(t) % qs.length];
  return sin(400) * 0.25 + sin(100) * 0.25
    + sin(401 + sin(Math.pow(2, Math.floor(sin(1/400)*10) / 100)/12)) * 0.25
    + sin(104 * Math.pow(2,m/z)) * q
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
