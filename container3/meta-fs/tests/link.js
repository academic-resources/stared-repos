var Fs = require('../')
var Path = require('path')
var ok  = require('assert').ok
var equal  = require('assert').equal

require('vows').describe('link')
.addBatch({
  'works:': {
    topic: function () {
      Fs.link('/etc/passwd', 'sandbox/p', this.callback)
    },
    'symlinks /etc/passwd': function (err, result) {
      ok(!err)
      ok(Fs.lstatSync('sandbox/p').isSymbolicLink())
    },
    'sandbox/p is readable': function (err, result) {
      ok(!err)
      var p = Fs.readFileSync('sandbox/p', 'utf8')
      ok(p.match(/^root:/))
    },
    'errors if destination exists:': {
      topic: function () {
        Fs.link('/etc/passwd', 'sandbox/p', this.callback)
      },
      'symlinks /etc/passwd': function (err, result) {
        ok(err)
        equal(err.code, 'EEXIST')
      },
    },
  },
})
.export(module)
