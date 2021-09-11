# Map

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/map.svg)](https://greenkeeper.io/)

Map over an object, array or string and keep the result as the same type.

## Installation

```
npm install util-map --save
```

## Usage

```javascript
var map = require('util-map');

// Map over objects.
map({
  a: 0,
  b: 1,
  c: 2
}, function (value, key, obj) {
  return value + 10;
});
//=> { a: 10, b: 11, c: 12 }

// Map over arrays.
map(['a', 'b', 'c'], function (value, key, obj) {
  return String.fromCharCode(value.charCodeAt(0) + 1);
});
// => ['b', 'c', 'd']

// Map over strings.
map('abc', function (value, key, obj) {
  return key + 1;
});
//=> '123'
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/util-map.svg?style=flat
[npm-url]: https://npmjs.org/package/util-map
[travis-image]: https://img.shields.io/travis/blakeembrey/map.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/map
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/map.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/map?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
