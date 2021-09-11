var fs     = require('fs');
var exec   = require('../');
var path   = require('path');
var assert = require('assert');

describe('language-exec', function () {
  describe('language exists', function () {
    it('should execute the file', function (done) {
      var file = path.join(__dirname, 'fixtures', 'CoffeeScript.coffee');

      return exec('CoffeeScript', file, function (err, stdout, stderr) {
        assert.ok(!stderr);
        assert.equal(stdout, 'Hello, world!\n');

        return done(err);
      });
    });
  });

  describe('language missing', function () {
    it('should give an error', function (done) {
      var file = path.join(__dirname, 'test.fl');

      return exec('FairyLand', file, function (err) {
        assert.ok(err);

        return done();
      });
    });
  });

  describe('file missing', function () {
    it('language should throw an error', function (done) {
      var file = path.join(__dirname, 'test.js');

      return exec('JavaScript', file, function (err) {
        assert.ok(err);

        return done();
      });
    });
  });

  describe('arguments', function () {
    it('should pass through command line arguments', function (done) {
      var file  = path.join(__dirname, 'fixtures', 'C.c');
      var value = Math.random();

      return exec('C', file, value, function (err, stdout, stderr) {
        assert.ok(!stderr);
        assert.equal(stdout, value);

        return done(err);
      });
    });
  });
});
