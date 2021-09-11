var $ = exports
$.westerns = require('westerns')
$.oz = require('oscillators')
$.amod = require('amod')
$.env = require('nvelope')
$.jsync = require('jsynth-sync')
$.zerone = require('../../zerone')
$.jdelay = require('jdelay')
$.chrono = require('../../jigger')
$.meffisto = require('../../meffisto')
$.zerone = require('../../zerone')
$.beatmath = require('beatmath')
$.teoria = require('teoria')
$.fract = function(v){
  return v - Math.floor(v)
}
$.quant = function(v, q){
  return Math.floor(v/q)*q  
}
$.alog = function(c, r, t, f){ return c + r * ((Math.log((1.0001 + $.oz.sine(t, f)) * 50) / Math.log(10))/2-2) }
$.iir = function(d, c){
  d = d || 7
  c = c || 2
  var fb = 1
  var delays = new Array(c)
  delays = delays.map(function(e){
    return new Array(d)
  })
  return function(s, f){
    f = f ||  fb
    return delays.reduce(function(aa, delay){
      var sample = delay.reduce(function(a, e){ return a + (e * f)}, aa) / d 
      delay.push(sample)
      delay.shift()
      return sample 
    }, s) / d
  }
}

