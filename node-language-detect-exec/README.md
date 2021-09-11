# Language Detect Exec


[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-language-detect-exec.svg)](https://greenkeeper.io/)

Automatically execute a file in a known programming language based on the filename from [language-command](https://github.com/blakeembrey/node-language-command).

## Installation

```
npm install language-detect-exec --save
```

## Usage

```javascript
var exec = require('language-detect-exec');

exec('test.js', function (err, stdout, stderr) {
  console.log(stdout);
});
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/language-detect-exec.svg?style=flat
[npm-url]: https://npmjs.org/package/language-detect-exec
[travis-image]: https://img.shields.io/travis/blakeembrey/node-language-detect-exec.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/node-language-detect-exec
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/node-language-detect-exec.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/node-language-detect-exec?branch=master
