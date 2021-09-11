# Each

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/each.svg)](https://greenkeeper.io/)

Iterate over an object, array or string.

## Installation

```
npm install util-each --save
```

## Usage

```javascript
var each = require('util-each');

// Iterate over objects.
each({
  a: 0,
  b: 1,
  c: 2
}, function (value, key, obj) {
  console.log([value, key, obj]);
  //=> [0, 'a', { a: 0, b: 1, c: 2 }]
  //=> [1, 'b', { a: 0, b: 1, c: 2 }]
  //=> [2, 'c', { a: 0, b: 1, c: 2 }]
});

// Iterate over arrays.
each(['a', 'b', 'c'], function (value, key, obj) {
  console.log([value, key, obj]);
  //=> ['a', 0, ['a', 'b', 'c']]
  //=> ['b', 1, ['a', 'b', 'c']]
  //=> ['c', 2, ['a', 'b', 'c']]
});

// Iterate over strings.
each('abc', function (value, key, obj) {
  console.log([value, key, obj]);
  //=> ['a', 0, 'abc']
  //=> ['b', 1, 'abc']
  //=> ['c', 2, 'abc']
});
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/util-each.svg?style=flat
[npm-url]: https://npmjs.org/package/util-each
[travis-image]: https://img.shields.io/travis/blakeembrey/each.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/each
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/each.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/each?branch=master
