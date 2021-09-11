var Fs = require('../')
var Path = require('path')
var ok  = require('assert').ok
var equal  = require('assert').equal

require('vows').describe('find')
.addBatch({
  'is sane:': {
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
    'counts right all files': function (err, result) {
      ok(!err)
      equal(result.total, 12)
    },
    'counts right all *.js files': function (err, result) {
      ok(!err)
      equal(result.count, 4)
    },
    'counts right all directories': function (err, result) {
      ok(!err)
      equal(result.dirs, 4)
    },
    'counts right all symlinks': function (err, result) {
      ok(!err)
      equal(result.syms, 4)
    },
    'behaves like /bin/find': function (err, total) {
      ok('TODO')
    },
  },
})
.export(module)
