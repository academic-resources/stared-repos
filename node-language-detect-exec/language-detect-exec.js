var exec   = require('language-exec');
var detect = require('language-detect');

/**
 * Execute any file in a known programming language.
 *
 * @param {String}   filename
 * @param {String}   args
 * @param {Object}   opts
 * @param {Function} done
 */
module.exports = function (filename) {
  var args     = Array.prototype.slice.call(arguments);
  var language = detect.filename(filename);

  return exec.apply(null, [language].concat(args));
};
