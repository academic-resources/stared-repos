var exec    = require('child_process').exec;
var path    = require('path');
var extend  = require('xtend');
var command = require('language-command');

/**
 * Execute a file in a particular programming language.
 *
 * @param {String}   language
 * @param {String}   file
 * @param {Array}    args
 * @param {Object}   opts
 * @param {Function} done
 */
module.exports = function (language, file, args, opts, done) {
  // Support for skipping arguments and options.
  if (typeof args === 'function') {
    done = args;
    args = null;
    opts = null;
  }

  // Support for skipping options.
  if (typeof opts === 'function') {
    done = opts;
    opts = null;
  }

  // Reverse options and arguments.
  if (typeof args === 'object' && !Array.isArray(args)) {
    opts = args;
    args = null;
  }

  var cmd = command(language, file, args);

  // Pass back the language unsupported error in an async fashion.
  if (cmd == null) {
    return done(new Error('Language not supported'));
  }

  return exec(cmd, extend({
    cwd: path.dirname(file)
  }, opts), done);
};
