Higher level filesystem utilities
=====

[![Build Status](https://secure.travis-ci.org/dvv/meta-fs.png)](http://travis-ci.org/dvv/meta-fs)

Usage
-----

    // import augmented 'fs' module
    var Fs = require('meta-fs')

    // print everything under /etc
    Fs.find('/etc', {
      match_fn: function (path, stat, depth, cb) {
        console.log('FOUND', path)
        // you can stop walking by passing an error to `cb`
        cb(depth > 3 and true or nil)
      }
    }, function (err) {
      console.log('DONE', err)
    })


    // remove /home/foo completely
    Fs.remove('/home/foo', console.log)


    // make nested directories
    Fs.mkdir_p('/home/foo/bar/baz', console.log)


    // copy source file/directory
    Fs.copy('/home/foo/bar/baz', '/tmp/wow', console.log)


    // make symlink
    Fs.link('/etc/passwd', '/tmp/passes', console.log)


License
-------

[MIT](meta-fs/license.txt)
