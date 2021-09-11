/**
 * The default callback function will filter based on truthiness of value.
 *
 * @param  {*}       value
 * @return {Boolean}
 */
var defaultFn = function (value) {
  return !!value;
};

/**
 * Filer values of an object, array or string.
 *
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context
 * @return {Object}
 */
module.exports = function (obj, fn, context) {
  var v;

  if (obj == null) {
    return obj;
  }

  // Set the default filter function.
  fn = fn || defaultFn;

  if (Array.isArray(obj)) {
    var array = [];

    for (var i = 0; i < obj.length; i++) {
      v = obj[i];

      fn.call(context, v, i, obj) && array.push(v);
    }

    return array;
  }

  if (typeof obj === 'string') {
    var string = '';

    for (var i = 0; i < obj.length; i++) {
      v = obj.charAt(i);

      fn.call(context, v, i, obj) && (string += v);
    }

    return string;
  }

  var result = {};

  Object.keys(obj).forEach(function (key) {
    v = obj[key];

    fn.call(context, v, key, obj) && (result[key] = v);
  });

  return result;
};
