# Language Command

[![NPM version](https://img.shields.io/npm/v/language-command.svg?style=flat)](https://npmjs.org/package/language-command)
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-language-command.svg)](https://greenkeeper.io/)

Look up the command for executing a program in any language. Uses the programming language names from [language-map](https://github.com/blakeembrey/language-map/blob/master/languages.json) and will always generate a command that cleans up after itself (leaves no temporary files) when executed.

## Installation

```
npm install language-command --save
```

## Usage

```javascript
var command = require('language-command');

command('JavaScript', 'test.js', '"test"');
//=> "node test.js \"test\""
```

## Notes

* Windows support is likely non-existant. If anyone can help make the repository work across OSes, it'd be greatly appreciated.
* Should it be possible to set paths to executables?
* The test directory uses underscores instead of spaces because some command line compilers had trouble with spaces.

## License

MIT
