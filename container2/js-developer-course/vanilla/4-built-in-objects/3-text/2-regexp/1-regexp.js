/*
RegExp constructor creates a regular expression object for matching
text with a pattern
 */

// SYNTAX
// /pattern/flags; // literal notation
// myRegExp new RegExp(pattern[, flags]);
// RegExp(pattern[, flags]);
/*
Use constructor function when you know the regular expression's pattern
will be changing, or you don't know the pattern and are getting it from another
source, as constructor of regexp object provides runtime compilation.
Literal notation provides compilation when expression is evaluated and will remain
constant
 */

/*
flags:
g (global match)
i (ignore case)
m (multiline)
s (dotAll)
u (unicode)
y (sticky)
 */

// PROTOTYPE

// RegExp.length
// get RegExp[@@species]
// RegExp.lastIndex: index at which to start next match

// METHODS
// Does not have methods of its own
// However it does inherit some through prototype chain

/*
+ constructor
+ flags
+ dotAll
+ global
+ ignoreCase
+ multiline
+ source
+ sticky
+ unicode
+ exec
+ test
+ some reserved Symbols...
+ toString
 */

// EXAMPLES

// 	Change data format
let re = /(\w+)\s(\w+)/;
let str = 'John Smith';
let newStr = str.replace(re, '$2, $1');
console.log(newStr); // Smith, John

// Split lines with different line endings | ends of line | line breaks
let text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end';
let lines = text.split(/\r\n|\r|\n/);
console.log(lines); // logs [ 'Some text', 'And some more', 'And yet', 'This is the end' ]
