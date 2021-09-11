var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Iterate over any object, calling the callback function on every iteration.
 *
 * @param {Object}   obj
 * @param {Function} fn
 * @param {*}        context
 */
module.exports = function (obj, fn, context) {
  // Iterate over array-like objects numerically.
  if (obj != null && obj.length === +obj.length) {
    for (var i = 0; i < obj.length; i++) {
      fn.call(context, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      // Use the Object prototype directly in case the object we are iterating
      // over does not inherit from `Object.prototype`.
      if (hasOwn.call(obj, key)) {
        fn.call(context, obj[key], key, obj);
      }
    }
  }
};
