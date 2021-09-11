var __slice = Array.prototype.slice;

/**
 * Automatically invoke a predefined method on every passed in object.
 *
 * @param  {String}   method
 * @return {Function}
 */
module.exports = function (method /*, ...args */) {
  var args = __slice.call(arguments, 1);

  return function (obj /*, ...args */) {
    return obj[method].apply(obj, args.concat(__slice.call(arguments, 1)));
  };
};
