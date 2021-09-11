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
function balancedParens(str) {
    // Here is an example of using a "Poor Man's Stack" to 
    // manage limited-time interviews and get to the meat of the 
    // interview problem quickly. 
    //
    // We are relying on arrays and on the developer following the
    // honor system here. They must treat the array as if it is
    // Stack.
    //
    // NEVER do this in an interview setting without confirming
    // with the interviewer that they know you are purposefully
    // taking a shortcut to avoid boring them with your Stack
    // implementation. 
    //
    // You must look at your interviewer here, gauge their affect
    // and the tonality of their voice, and make sure they appreciate 
    // this as a gesture and that they will not dock points for 
    // skipping something they originally wanted to test you on.
    //
    // Pulling this off is almost entirely a matter of how confidently
    // you appear when you do it. If you exude so much confidence that
    // the interivewer feels that implementing a proper OOP Stack class 
    // from scratch is a waste of everyone's time in the room, 
    // than you win.

    const stack = [];
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let i = 0; i < str.length; i++) {
        var char = str[i];

        if (pairs[char]) {
            stack.push(char);
        } else if (char === '}' || char === ']' || char === ')') {
            if (pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }

    // Return false if there are any unclosed brackets remaining in the stack
    return stack.length === 0;
};

exports.balancedParens = balancedParens;
