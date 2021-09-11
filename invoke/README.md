# Invoke

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/invoke.svg)](https://greenkeeper.io/)

Functional utility for creating a function that will invoke the same method on every passed in object.

## Installation

```
npm install util-invoke --save
```

## Usage

```javascript
var children = [1, 2, 3, true];

children.map(invoke('toString', 10)); //=> ['1', '2', '3', 'true']
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/util-invoke.svg?style=flat
[npm-url]: https://npmjs.org/package/util-invoke
[travis-image]: https://img.shields.io/travis/blakeembrey/invoke.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/invoke
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/invoke.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/invoke?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
