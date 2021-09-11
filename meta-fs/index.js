var Fs = require('fs')
var Path = require('path')

/*
 * mimick mkdir -p
 */
function mkdir_p(path, perm, callback) {
  path = Path.resolve(process.cwd(), path)
  Fs.mkdir(path, perm, function(err) {
    if (!err) { callback() ; return }
    if (err.code === 'ENOENT') {
      mkdir_p(Path.dirname(path), perm, function(err) {
        if (err) {
          callback(err)
        } else {
          mkdir_p(path, perm, callback)
        }
      })
    } else if (err.code === 'EEXIST') {
      Fs.stat(path, function(sterr, stat) {
        if (sterr || !stat.isDirectory()) {
          callback(sterr)
        } else if (stat.mode != perm) {
          Fs.chmod(path, perm, callback)
        } else {
          callback()
        }
      })
    } else {
      callback(err)
    }
  })
}

/*
 * mimick find
 */

function match_stub_fn(path, stat, depth, cb) { cb() }

function find(path, options, callback) {

  // defaults
  options = options || {}
  var match_fn = options.match_fn || match_stub_fn
  var dir_fn = options.dir_fn || match_stub_fn
  var serial = !!options.serial

  // cache highly used functions
  var normalize = Path.normalize
  var join = Path.join
  var stat = options.follow ? Fs.stat : Fs.lstat
  var readdir = Fs.readdir

  // base path
  var base = Path.resolve(process.cwd(), path)

  // collect seen inodes
  var inos = {}

  // recursive walk helper
  function walk(path, depth, cb) {
    // stat, resolving symlinks
    stat(path, function (err, st) {
      // stat failed? step out.
      if (err) { cb(err) ; return }
      // prevent endless loops in follow mode
      // N.B. this is to cope with symlinks pointing to '.'
      if (options.follow) {
        // inode seen? step out
        var inode = st.ino
        if (inos[inode]) { cb() ; return }
        // mark inode as seen
        inos[inode] = true
      }
      // call matcher
      match_fn.call(options, path, st, depth, function (err) {
        // `true` error means stop going deeper
        if (err && err !== true) { cb(err) ; return }
        // path is not directory? we re done.
        if (!st.isDirectory()) { cb() ; return }
        // path is directory. read files
        readdir(path, function (err, files) {
          if (err) { cb(err) ; return }
          // recursively iterate over files
          // cache `files` length
          var len = files.length
          // set starting index
          // N.B. for serial execution iterations start by calling
          // `collect`, hence it's called one time more,
          // hence lesser starting index
          var collected = serial ? 0 : 1
          function collect() {
            if (collected >= len) {
              // notify of directory is processed
              dir_fn.call(options, path, st, depth, cb)
            // if we iterate sequentially, start new iteration
            } else if (serial) {
              walk(join(path, files[collected]), depth + 1, collect)
            }
            collected++
          }
          // parallell execution and no files? fire callback
          // sequential execution? start the first iteration
          if (len === 0 || serial) {
            collect()
          // parallel execution? spawn concurrent walkers
          } else {
            for (var i = 0; i < len; i++) {
              walk(join(path, files[i]), depth + 1, collect)
            }
          }
        })
      })
    })
  }

  // walk the tree
  walk(base, 0, callback)

}

/*
 * mimick rm -fr
 */
function remove(path, callback) {

  // cache highly used functions
  var unlink = Fs.unlink
  var rmdir = Fs.rmdir

  path = Path.resolve(process.cwd(), path)
  find(path, {
    //follow: false,
    match_fn: function(path, stat, depth, cb) {
      if (!stat.isDirectory()) {
        unlink(path, cb)
      } else {
        cb()
      }
    },
    dir_fn: function (path, stat, depth, cb) {
      rmdir(path, cb)
    },
  }, function (err) {
    if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) { err = null }
    callback(err)
  })

}

/*
 * mimick cp -a
 */
function copy(src, dst, callback) {

  // cache highly used functions
  var join = Path.join
  var dirname = Path.dirname
  var basename = Path.basename
  var read = Fs.readFile
  var write = Fs.writeFile
  var readlink = Fs.readlink
  var symlink = Fs.symlink
  var chmod = Fs.chmod
  var chown = Fs.chown

  // expand paths
  var src_orig = Path.normalize(src)
  src = Path.resolve(process.cwd(), src)
  dst = Path.resolve(process.cwd(), dst)

  // dots are special cases. E.g. copy . /foo should copy content of current directory
  // while copy ../foo /bar should copy file/directory ../foo as whole
  if (src_orig == '.') {
    skip += '/'
  }
  //var skip_len = dirname(src).length + 1
  var skip_len = src.length + 1

  // walk over the source
  find(src, {
    // for each source file
    match_fn: function (path, stat, depth, cb) {
      // compose target path
      var new_path = join(dst, path.substring(skip_len))
      //console.log('?' + path)
      //console.log('!' + new_path)
      //cb() ; return
      //p(path, stat)
      // helper to set target owner and mode to source's ones
      function set_perms(err) {
        if (err) { cb(err) ; return }
        chmod(new_path, stat.mode, function (err) {
          if (err) { cb(err) ; return }
          chown(new_path, stat.uid, stat.gid, function (err) {
            // FIXME: err is unknown is there were no rights to chown
            //if (err) { cb(err) ; return }
            cb()
          })
        })
      }
      // create target
      // directory
      if (stat.isDirectory()) {
        mkdir_p(new_path, stat.mode, set_perms)
      // file
      } else if (stat.isFile()) {
        // TODO: stream it
        read(path, function (err, data) {
          write(new_path, data, set_perms)
        })
      // symlink
      } else if (stat.isSymbolicLink()) {
        readlink(path, function (err, realpath) {
          if (err) { cb(err) ; return }
          symlink(realpath, new_path, set_perms)
        })
      // special nodes not supported
      // Fs.mknod() is missing
      // FIXME: ^^^
      } else {
        cb({path: path, code: 'ENOTSUPP'})
      }
    },
  }, callback)

}

/*
 * mimick ln -s
 */
function link(target, path, callback) {
  path = Path.resolve(process.cwd(), path)
  mkdir_p(Path.dirname(path), '0755', function (err) {
    if (err) { callback(err) ; return }
    Fs.symlink(target, path, callback)
  })
}

// export augmented Fs
Fs.mkdir_p = mkdir_p
Fs.find = find
Fs.remove = remove
Fs.copy = copy
Fs.link = link

module.exports = Fs
