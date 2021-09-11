/* global describe, it */

var map    = require('./');
var expect = require('chai').expect;

describe('map', function () {
  it('should map over strings', function () {
    var result = map('test', function (letter, index, string) {
      expect(index).to.be.a('number');
      expect(letter).to.equal('test'.charAt(index));
      expect(string).to.equal('test');

      return index + 1;
    });

    expect(result).to.equal('1234');
  });

  it('should map over arrays', function () {
    var input = ['t', 'e', 's', 't'];

    var result = map(input, function (letter, index, array) {
      expect(index).to.be.a('number');
      expect(letter).to.equal('test'.charAt(index));
      expect(array).to.equal(input);

      return String.fromCharCode(letter.charCodeAt(0) + 1);
    });

    expect(result).to.deep.equal(['u', 'f', 't', 'u']);
  });

  it('should map over object properties', function () {
    var input = {
      this: 'that',
      something: 'else'
    };

    var result = map(input, function (value, key, object) {
      expect(key).to.be.a('string');
      expect(value).to.equal(input[key]);
      expect(object).to.equal(input);

      return 'welp';
    });

    expect(result).to.deep.equal({
      this: 'welp',
      something: 'welp'
    });
  });

  it('should be able to set the callback context', function () {
    var context = {};

    map('test', function () {
      expect(this).to.equal(context);
    }, context);
  });

  it('should ignore properties inherited on the prototype', function () {
    var parent = {
      test: 'property'
    };

    var child = Object.create(parent);
    child.property = 'test';

    map(child, function (value, key) {
      expect(key).to.not.equal('test');
      expect(value).to.not.equal('property');
    });
  });

  it('should not error with undefined value', function () {
    map(null /*, function () {} */);
  });
});
