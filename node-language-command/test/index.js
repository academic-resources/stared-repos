var fs        = require('fs');
var command   = require('../');
var exec      = require('child_process').exec;
var path      = require('path');
var assert    = require('assert');

/**
 * Sanitize a test language file name into an array.
 *
 * @param  {String} filename
 * @return {Array}
 */
var sanitizeLanguage = function (filename) {
  return [path.basename(filename).split('.')[0].replace('_', ' '), filename];
};

/**
 * Language test directories.
 *
 * @type {String}
 */
var FIXTURE_DIR       = path.join(__dirname, 'fixtures');
var HELLO_WORLD_DIR   = path.join(FIXTURE_DIR, 'hello-world');
var CMD_LINE_ARGS_DIR = path.join(FIXTURE_DIR, 'command-line-arguments');

/**
 * Sanitized map of the "Hello, world!" examples.
 *
 * @type {Array}
 */
var HELLO_WORLD_TESTS = fs.readdirSync(HELLO_WORLD_DIR).map(function (f) {
  return path.join(HELLO_WORLD_DIR, f);
}).map(sanitizeLanguage);

/**
 * Sanitized map of the tests using command line arguments.
 *
 * @type {Array}
 */
 var CMD_LINE_ARGS_TESTS = fs.readdirSync(CMD_LINE_ARGS_DIR).map(function (f) {
  return path.join(CMD_LINE_ARGS_DIR, f);
}).map(sanitizeLanguage);

/**
 * Test the language command module.
 */
describe('language command', function () {
  describe('langauges', function () {
    /**
     * There are some really slow languages out there.
     */
    this.timeout(5000);

    /**
     * Test every language against a typical "Hello, world!" example.
     */
    describe('hello world', function () {
      HELLO_WORLD_TESTS.forEach(function (test) {
        var lang = test[0];
        var file = test[1];
        var cmd  = command(lang, file);

        it(lang, function (done) {
          return exec(cmd, function (err, stdout, stderr) {
            assert.ok(!stderr);
            assert.equal(stdout, 'Hello, world!\n');

            return done(err);
          });
        });
      });
    });

    /**
     * Test every language has the ability to pass in command line args.
     */
    describe('command line arguments', function () {
      CMD_LINE_ARGS_TESTS.forEach(function (test) {
        var lang = test[0];
        var file = test[1];
        var cmd  = command(lang, file, '"Test Argument"');

        it(lang, function (done) {
          return exec(cmd, function (err, stdout, stderr) {
            assert.ok(!stderr);
            assert.equal(stdout, 'Test Argument\n');

            return done(err);
          });
        });
      });
    });
  });

  /**
   * Run a simple test to ensure unknown languages return an expected response.
   */
  describe('unknown languages', function () {
    it('should return undefined', function () {
      assert.equal(command('Madeup', 'Madeup.madeup'), null);
    });
  });
});
