var nda = require('ndarray')
var fft = require('ndarray-fft')
var mag = require('ndarray-complex').mag
var oz = require('oscillators')
var hft = require('./hft')

var sr = 256
var range = sr / 2

var ab = new Float32Array(sr)
var out = new Float32Array(sr)

// square wave encoding of signal [0,1] via signed 8 bit integer [-127, 127] for use in FFT
for(var x = 0; x < sr; x++){
  
  // writing square wave data to a mixed signal
  // this could be done numbers of ways, as in integers, floats, etc
  // but I am trying to simulate a signal of switches
  // a purely bitwise signal

  // the array below contains the frequencies we want "on"
  // an OR op is used to accumulate the signal, which is otherwise zero
  var signal = [1,2,3,5,6,9,13,24].map(function(e,i){
    // square wave function returns 1 or -1
    var s = oz.square(x / sr, e)
    if(s < 0) s = 0 // set to zero for bitwise op 
    return s
  }).reduce(function(a, e){ 
    return a ^ e // if any frequency is on, the signal is 1, otherwise 0
  }, 0) 

  // translate signal into greatest signed 8bit difference for FFT
  ab[x] = signal //=== 0 ? -1 : 1 //? 127 : -127
  console.log(ab[x])
}

ab = nda(ab, [sr, 1])
out = nda(out, [sr, 1])

// nadarray the signal and output
// will it !blend?
//fft(-1, ab, out)
for(var i = 0; i < ab.data.length; i++){
  var d = ab.data[i]
  console.log(d)
  if(d > 4) ab.data[i] = 1
  else ab.data[i] = -1
  //console.log(ab.data[i])
}

fft (1, ab, out)

mag(ab, ab, out)

// run over frequency data (the first half of the output buffer, or, samplerate / 2, right?

for(var i = 0; i < ab.data.length / 2; i++){
  var freq = i 
  var d = out.data[i]
  console.log(freq, d)
  //,  Math.log(d) / Math.log(10)) 
}

