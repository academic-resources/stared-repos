/* global describe, it */

var filter = require('./');
var expect = require('chai').expect;

describe('filter', function () {
  it('should filter over strings', function () {
    var result = filter('test', function (letter, index, string) {
      expect(index).to.be.a('number');
      expect(letter).to.equal('test'.charAt(index));
      expect(string).to.equal('test');

      return index % 2;
    });

    expect(result).to.equal('et');
  });

  it('should filter over arrays', function () {
    var input = ['t', 'e', 's', 't'];

    var result = filter(input, function (letter, index, array) {
      expect(index).to.be.a('number');
      expect(letter).to.equal('test'.charAt(index));
      expect(array).to.equal(input);

      return index % 2;
    });

    expect(result).to.deep.equal(['e', 't']);
  });

  it('should filter over object properties', function () {
    var input = {
      this: 'that',
      something: 'else'
    };

    var result = filter(input, function (value, key, object) {
      expect(key).to.be.a('string');
      expect(value).to.equal(input[key]);
      expect(object).to.equal(input);

      return key === 'this';
    });

    expect(result).to.deep.equal({
      this: 'that'
    });
  });

  it('should be able to set the callback context', function () {
    var context = {};

    filter('test', function () {
      expect(this).to.equal(context);
    }, context);
  });

  it('should ignore properties inherited on the prototype', function () {
    var parent = {
      test: 'property'
    };

    var child = Object.create(parent);
    child.property = 'test';

    filter(child, function (value, key) {
      expect(key).to.not.equal('test');
      expect(value).to.not.equal('property');
    });
  });

  it('should not error with undefined value', function () {
    filter(null /*, function () {} */);
  });

  it('should filter based on truthiness by default', function () {
    expect(filter({ a: 0, b: 1, c: 2 })).to.deep.equal({ b: 1, c: 2 });
  });
});
