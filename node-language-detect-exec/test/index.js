var fs     = require('fs');
var exec   = require('../');
var path   = require('path');
var assert = require('assert');

describe('language-detect-exec', function () {
  describe('language exists', function () {
    it('should execute the file', function (done) {
      var file = path.join(__dirname, 'fixtures', 'CoffeeScript.coffee');

      return exec(file, function (err, stdout, stderr) {
        assert.ok(!stderr);
        assert.equal(stdout, 'Hello, world!\n');

        return done(err);
      });
    });
  });

  describe('unknown language', function () {
    it('should return an error', function (done) {
      var file = path.join(__dirname, 'fixtures', 'FairyLand.fl');

      return exec(file, function (err) {
        assert.ok(err);

        return done();
      });
    });
  });

  describe('file missing', function () {
    it('should return an error', function (done) {
      var file = path.join(__dirname, 'fixtures', 'MadeUp.mu');

      return exec(file, function (err) {
        assert.ok(err);

        return done();
      });
    });
  });

  describe('arguments', function () {
    it('should pass through command line arguments', function (done) {
      var file  = path.join(__dirname, 'fixtures', 'C++.cpp');
      var value = Math.random();

      return exec(file, value, function (err, stdout, stderr) {
        assert.ok(!stderr);
        assert.equal(stdout, value);

        return done(err);
      });
    });
  });

  describe('options', function () {
    it('should execute with an options object', function (done) {
      var cwd  = path.join(__dirname, '..');
      var file = path.join(__dirname, 'fixtures', 'JavaScript.js');

      return exec(file, {
        cwd: cwd
      }, function (err, stdout, stderr) {
        assert.ok(!stderr);
        assert.equal(stdout, cwd + '\n');

        return done(err);
      });
    });
  });
});
