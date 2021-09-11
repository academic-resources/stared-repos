// ============================================================================
// Interview Problem: Balanced Parentheses
// ============================================================================
//
// -------
// Prompt:
// -------
//
// You are building a linter for your company's new custom text editor to keep
// the code smells out of your (anticipated) massive codebase! Part of your 
// technical design includes writing a function that checks that all of the 
// parentheses in your engineers' code are balanced.
//
// Given a string of text, write a function that returns true if the 
// parentheses are balanced, and false if they are not.
//
// Note: Your code should ignore all non-bracket characters in the input 
//       string.
//
// ------
// Bonus: 
// ------
//  
// Though you may want to start by writing a function that simply handles
// parentheses as an MVP, to build a truly impactful product you must handle 
// ALL bracket types, including:
//
//         - Parentheses:     ()
//         - Square Brackets: []
//         - Curly Brackets:  {}
//
// Update your original balancedParens function to handle all bracket types.
//
// ------------
// Constraints:
// ------------ 
//
// (1) Your function must run in linear time, O(n).
// (2) Your function must consume (at maximum) linear space, O(n).
//
// ---------------------------
// Example 1: Parentheses Only
// ---------------------------
//
// balancedParens('(');          => false
// balancedParens('()');         => true
// balancedParens(')(');         => false
// balancedParens(')()())');     => false
// balancedParens('((()()))');   => true
//
// -----------------------------
// Example 2: Parentheses + Text
// -----------------------------
//
// balancedParens('var x = Math.floor(2.5)');             => true
// balancedParens('var y = (((x + 5)/6) + 2*(x + 10))');  => true
// balancedParens('var z = ()(x + 5)/6) + 2*(x + 10))');  => false
//
// -----------------------
// Example 3: All Brackets
// -----------------------
//
// balancedParens('()[]{}');     => true
// balancedParens('[{()}]');     => true
// balancedParens('[{])({)[}');  => false
//
// ------------------------------
// Example 4: All Brackets + Text
// ------------------------------
//
// balancedParens('const roundDown = function(num) { return Math.floor(num) };');      => true
// balancedParens('{ array: [1, 2, [3, 4], 5], timesTwoMethod: (num) => num * 2; }');  => true 
// balancedParens('function printThirdElement(array) { console.log(array[3]]] }');     => false 
//
// -----------
// Let's code!
// -----------
function firstApproachbalancedParens(str) {
  const opens = { '(': 1, '[': 1, '{': 1 }
  const closes = { ')': -1, ']': -1, '}': -1 }

  let balance = 0
  for (let charIdx = 0; charIdx < str.length; charIdx++) {
    if (balance < 0) return false
    let char = str[charIdx]
    if (opens[char]) balance += opens[char]
    if (closes[char]) balance += closes[char]
  }
  return !balance
}

function balancedParens(str) {
  let nest = new Stack
  const opens = { '(': 'p', '[': 'b', '{': 'c', }
  const closes = { ')': 'p', ']': 'b', '}': 'c', }
  for (let charIdx = 0; charIdx < str.length; charIdx++) {
    let char = str[charIdx]
    if (opens[char]) nest.push(opens[char])
    if (closes[char]) {
      if (!nest.top) {
        return false
      } else {
        if (closes[char] !== nest.top.value) return false
        if (closes[char]) nest.pop(closes[char])
      }
    }
  }
  return nest.length ? false : true
}

class Node {
  constructor(val) {
    this.value = val
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }

  push(val) {
    const newNode = new Node(val)
    if (!this.top) {
      this.top = newNode
      this.bottom = newNode
    } else {
      let oldTop = this.top
      this.top = newNode
      newNode.next = oldTop
    }
    return ++this.length
  }

  pop() {
    const popped = this.top
    if (!popped) return null
    if (this.length === 1) this.bottom = null
    this.top = this.top.next
    this.length--
    return popped.value
  }

  size() {
    return this.length
  }
}

console.log(balancedParens("(())"))

exports.balancedParens = balancedParens;
