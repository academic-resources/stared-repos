var convert = require('buffer-converter')
var through = require('through2')

module.exports = function(){
  return through.obj(function(data, enc, cb){
    data = convert.toArrayBuffer(data)
    this.push(data)
    cb()
  })
}
