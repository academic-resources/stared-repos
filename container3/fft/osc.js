var oz = require('../../oscillators')
var argv = require('minimist')(process.argv.slice(2))

var str = ''

for(var i = 0; i < argv.s; i++){
  var s = oz.square(i / argv.s, argv.f)
  if(s < 0) s=0
  str += s
}
console.log(str)
