var _        = require('lodash');
var os       = require('os');
var path     = require('path');
var crypto   = require('crypto');
var commands = require('./commands.json');

/**
 * Look up the command for executing a file in any language.
 *
 * @param  {String} language
 * @param  {String} file
 * @param  {Array}  args
 * @return {String}
 */
module.exports = function (language, file, args) {
  // Unsupported language.
  if (!commands[language]) {
    return;
  }

  // Render the language using EJS to enable support for inline JavaScript.
  return _.template(commands[language], {
    file:      file,
    tmpdir:    os.tmpdir(),
    tmpfile:   path.join(os.tmpdir(), crypto.randomBytes(32).toString('hex')),
    dirname:   path.dirname,
    extname:   path.extname,
    basename:  path.basename,
    type:      os.type(),
    arch:      os.arch(),
    platform:  os.platform(),
    sep:       path.sep,
    join:      path.join,
    delimiter: path.delimiter,
    args:      Array.isArray(args) ? args.map(JSON.stringify).join(' ') : args
  });
};
