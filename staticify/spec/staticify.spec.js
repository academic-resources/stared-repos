var browserify = require('browserify');
var staticify = require('../index');

describe('staticify', function() {
  it('should work for jpgs and css', function() {

    var finished = false,
        b = browserify(['./spec/fixtures/root.js']).transform(staticify);

    b.bundle({}, function(err, result) {
      expect(err).toBeFalsy();
      expect(result).toBeTruthy();
      expect(result.indexOf('data:image/jpeg;base64') > -1).toBe(true);
      expect(result.indexOf('.myclass') > -1).toBe(true);
      expect(result.indexOf('hello world') > -1).toBe(true);
      finished = true;
    });

    waitsFor(function() {
      return finished;
    });

  });
});
