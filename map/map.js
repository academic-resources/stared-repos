/**
 * Map values of one object, array or string to another.
 *
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context
 * @return {Object}
 */
module.exports = function (obj, fn, context) {
  if (obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    var array = [];

    for (var i = 0; i < obj.length; i++) {
      array.push(fn.call(context, obj[i], i, obj));
    }

    return array;
  }

  if (typeof obj === 'string') {
    var string = '';

    for (var i = 0; i < obj.length; i++) {
      string += fn.call(context, obj.charAt(i), i, obj);
    }

    return string;
  }

  var result = {};

  Object.keys(obj).forEach(function (key) {
    result[key] = fn.call(context, obj[key], key, obj);
  });

  return result;
};
