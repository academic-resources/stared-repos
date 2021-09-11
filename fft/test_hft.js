Buffer = require('buffer/')

var hft = require('./hft')

var ndarray = require('ndarray')
var c = 32 
var a = ndarray(new Int32Array(c))
a.set(0,1)
for(var i = 0; i < c; i++){
  if(!(i === 3)) continue
  a.set(i, 1)
}
var b = ndarray(new Int32Array(c))
hft(a, b)
console.log( Array.prototype.join.call(b.data, ''))

hft(b,a)
//console.log( Array.prototype.join.call(a.data, ''))
var aa = ndarray(new Float32Array([1, 0, 1, 0, 1, 0, 1, 0]), [8,1])

var bb = ndarray(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]), [8,1])

hft(aa, bb)
//console.log(bb)
