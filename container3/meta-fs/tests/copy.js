var Fs = require('../')
var Path = require('path')
var ok  = require('assert').ok
var equal  = require('assert').equal

require('vows').describe('copy')
.addBatch({
  'copyying foo to fuu:': {
    topic: function () {
      Fs.copy('sandbox/foo', 'sandbox/fuu', this.callback)
    },
    'creates directory fuu': function (err) {
      ok(!err)
      ok(Fs.statSync('sandbox/fuu').isDirectory())
    },
    'creates file fuu/bar/baz/file': function (err) {
      ok(!err)
      ok(Fs.statSync('sandbox/fuu/bar/baz/file').isFile())
    },
    'creates symlink fuu/bar/baz/link': function (err) {
      ok(!err)
      ok(Fs.lstatSync('sandbox/fuu/bar/baz/link').isSymbolicLink())
    },
    'creates symlink fuu/bar/baz/link pointing to directory': function (err) {
      ok(!err)
      ok(Fs.statSync('sandbox/fuu/bar/baz/link').isDirectory())
    },
    'counters:': {
      topic: function () {
        var next = this.callback
        var r = {
          total: 0,
          count: 0,
          dirs: 0,
          syms: 0,
        }
        Fs.find('sandbox', {
          match_fn: function (path, stat, depth, cb) {
            r.total++
            if (path.match(/ile$/)) {
              r.count++
            }
            if (stat.isSymbolicLink()) {
              r.syms++
            }
            cb()
          },
          dir_fn: function (path, stat, depth, cb) {
            r.dirs++
            cb()
          }
        }, function(err) {
          next(err, r)
        })
      },
      ' are doubled': function (err, result) {
        ok(!err)
        equal(result.total, 21)
        equal(result.count, 7)
        equal(result.dirs, 7)
        equal(result.syms, 7)
      },
    },
  },
})
.export(module)
