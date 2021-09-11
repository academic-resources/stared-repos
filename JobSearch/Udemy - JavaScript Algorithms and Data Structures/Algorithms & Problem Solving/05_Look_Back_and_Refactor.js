// Congrats on solving it, but you're not done!

// Refactoring Questions:
//   - Can you check the result?
//   - Can you derive the result differently?
//   - Can you understand it at a glance?
//   - Can you use the result or method for some other problem?
//   - Can you improve the performance of your solution?
//   - Can you think of other ways to refactor?
//   - How have other people solved this problem?


// Given:
function charCount(str) {
  var obj = {}
  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase()
    if (/[a-z0-9]/.test(char)) {
      if (obj[char] > 0) {
        obj[char]++
      } else {
        obj[char] = 1;1
      }
    }
  }
  return obj
}

console.log(charCount("Hello everybody! 5 x here"))

// Refactor:
function charCountRefactor(str) {
  var obj = {}
  for (var char of str) {
    char = char.toLowerCase()
    // if (/[a-z0-9]/.test(char)) {
    if (isAlphaNumeric(char)) {
      obj[char] = ++obj[char] || 1
    }
  }
  return obj
}


console.log(charCountRefactor("Hello everybody! 5 x here"))

// Better Refactor:
function charCountRefactorBetter(str) {
  var obj = {}
  for (var char of str) {
    char = char.toLowerCase()
    if (isAlphaNumeric(char)) {
      obj[char] = ++obj[char] || 1
    }
  }
  return obj
}

function isAlphaNumeric(char) {
  var code = char.charCodeAt(0)
  if (!(code > 47 && code < 58) &&
      !(code > 64 && code < 91) &&
      !(code > 96 && code < 123)) {
    return false
  }
  return true
}

console.log(charCountRefactorBetter("Hello everybody! 5 x here"))