var midi = require('midi')

var input = new midi.input

input.openPort(1)

input.on('message', function(delta, data){
console.log(data)
  process.stdout.write(JSON.stringify({update: data}) + '\n')
})
