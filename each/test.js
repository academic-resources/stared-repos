/* global describe, it */

var each   = require('./');
var assert = require('assert');

describe('Each', function () {
  it('should iterate over strings', function () {
    each('test', function (letter, index, string) {
      assert(typeof index === 'number');
      assert(letter === 'test'.charAt(index));
      assert(string === 'test');
    });
  });

  it('should iterate over arrays', function () {
    each(['t', 'e', 's', 't'], function (letter, index, array) {
      assert(typeof index === 'number');
      assert(letter === 'test'.charAt(index));
      assert.deepEqual(array, ['t', 'e', 's', 't']);
    });
  });

  it('should iterate over object properties', function () {
    var obj = {
      this: 'that',
      something: 'else'
    };

    each(obj, function (value, key, object) {
      assert(typeof key === 'string');
      assert(obj[key] === value);
      assert(obj === object);
    });
  });

  it('should be able to set the callback context', function () {
    var context = {};

    each('test', function () {
      assert(this === context);
    }, context);
  });

  it('should ignore properties inherited on the prototype', function () {
    var parent = {
      test: 'property'
    };

    var child = Object.create(parent);
    child.property = 'test';

    each(child, function (value, key) {
      assert(key !== 'test');
      assert(value !== 'property');
    });
  });

  it('should not fail with undefined value', function () {
    each(null /*, function () {} */);
  });
});
