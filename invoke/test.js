/* global describe, it */
var invoke = require('./');
var expect = require('chai').expect;

describe('invoke', function () {
  it('should invoke the method', function () {
    var result = [1, 2, 3, true].map(invoke('toString', 10));

    expect(result).to.deep.equal(['1', '2', '3', 'true']);
  });
});
