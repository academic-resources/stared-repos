// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

/**
 * @param {string} string
 * @return {boolean}
 */
function isValid(string) {
  let stack = []
  let containers = {
    "(" : ")",
    "{" : "}",
    "[" : "]" 
  }
  for (let char of string) {
    (char in containers) && stack.push(char)
    if ((char === ")" || char === "}" || char === "]")
    && (char !== containers[stack.pop()]))
      return false
  }
  return stack.length === 0
};

console.log(isValid("()"))     // => true
console.log(isValid("()[]{}")) // => true
console.log(isValid("(]"))     // => false
console.log(isValid("([)]"))   // => flase
console.log(isValid("{[]}"))   // => true
console.log(isValid("})]"))    // => false

function isValidMap(string) {
  let stack = []
  let containers = new Map([["(", ")"], ["{", "}"], ["[", "]"]])
  for (let char of string) {
    (containers.has(char)) && stack.push(char)
    if ((char === ")" || char === "}" || char === "]")
    && (char !== containers.get(stack.pop())))
      return false
  }
  return stack.length === 0
};