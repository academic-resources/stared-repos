// Different versions of JavaScript or environments treat variables differently
const PI = 3.141592653589793
// PI = "modified!"
console.log(PI)

// Depending on environment, PI = 3.414..., 'modified!,' or errors out


// Use strict mode if need to be safe
function f1(x) {
  "use strict"
  // var arguments = []
}

f1("x")  // SyntaxError: Unexpected eval or arguments in strict mode


// Placement of the hidden paramater 'use strict' is scope dependent
"use strict"
function f2(x) {
  var arguments = []
}

f2("x") // no error => returns undefined


// Things to Remember
// - Decide which versions of JavaScript your application supports
// - Be sure that any JavaScript features you use are supported by all environmets where your application runs
// - Always test strict code in environments that perform the strict mode checks
// - Beware of concatenating scripts that differ in their expectations about strict mode