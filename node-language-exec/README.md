# Language Exec

[![NPM version](https://img.shields.io/npm/v/language-command.svg?style=flat)](https://npmjs.org/package/language-command)
[![Build status](https://img.shields.io/travis/blakeembrey/node-language-command.svg?style=flat)](https://travis-ci.org/blakeembrey/node-language-command)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/node-language-command.svg?style=flat)](https://coveralls.io/r/blakeembrey/node-language-command?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-language-exec.svg)](https://greenkeeper.io/)

Execute a file in any programming language based on [language-command](https://github.com/blakeembrey/node-language-command).

## Installation

```
npm install language-exec --save
```

## Usage

```javascript
var exec = require('language-exec');

exec('JavaScript', 'test.js', function (err, stdout, stderr) {
  console.log(stdout);
});
```

## License

MIT
