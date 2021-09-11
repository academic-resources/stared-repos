var through = require('through2')
var nda = require('ndarray')
var fft = require('ndarray-fft')
var mag = require('ndarray-complex').mag

module.exports = function(sampleRate){
  return through.obj(function(data, enc, cb){
    console.log(data)
    var f32 = new Float32Array(data)
    var ndin = nda(f32, [f32.length, 1])
    var out = new Float32Array(data.byteLength / 4)
    var ndout = nda(out, [f32.length, 1])
    fft(1, ndin, ndout)
    mag(ndin, ndin, ndout)
    this.push(ndout)
    cb()
  })
}

