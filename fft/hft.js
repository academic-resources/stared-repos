module.exports = hft


function hft(signal, transform){
  if(signal.size === 1) return true
  var size = signal.size / 2
  var x = signal.hi(size) // first half
  var y = signal.lo(size) // second half
  //console.log(x.offset, x.shape, y.offset, y.shape)
  var a = transform.hi(size)
  var b = transform.lo(size)
  for(var i = 0; i < size; i++){
    var xi = x.get(i) 
    var yi = y.get(i)
    var xy = xi ^ yi
    var yx = xi
    b.set(i, xy)
    a.set(i, yx)
  }
  hft(a, x)
  hft(b, y)
}
