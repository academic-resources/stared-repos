var fs = require('fs')
var path = require('path')

var through = require('through2')
var wav = require('wav')
var speaker = require('speaker')

var freq = require('./stream')
var convert = require('./convert')

var rs = fs.createReadStream(path.resolve(process.cwd(), process.argv[2]))

var ws = new wav.Reader()

ws.on('format', function(format){
  console.log(format)
  var freqStream = freq(format.sampleRate)
  var cs = convert()
  ws.pipe(cs).pipe(freqStream)
  freqStream.on('data', function(nda){
    var hi = [0, undefined]
    console.log(nda.data.length)
    var lf = 0
    for(var x = 0; x < nda.data.length; x++){
      var a = 20 * (Math.log(nda.data[x]) / Math.log(10))
      var f = [lf, x * format.sampleRate / nda.data.length]
      lf = f[1]
      if(a > hi[0]) hi = [a, f] 
    }
    console.log(hi)
  })
  //ws.pipe(new speaker(format))
})

rs.pipe(ws)
