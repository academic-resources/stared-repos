/**************************** canConstruct *******************************************
 *
 *  - Write a function `canConstruct(target, wordBank)` that accepts a target string
 *      and an array of strings
 *
 *  - The function should return a boolean indicating whether or not the `target` can
 *      be constructed by concatenating elements of the `wordBank` array.
 *
 *  - You may reuse elements of `wordBank` as many times as needed
 *
 *  - Image 01 - What NOT to do - Do not take from the middle, creates false adjacents
 *  - Image 02 - Tree visualization of 4th input example below `enterapotentpot`
 *
 *  - m = target.length
 *  - n = wordBank.length
 *
 *  - Brute Force -
 *      - time = O(n^m * m) => O(n^m) - Exponential
 *      - space = O(m^2) - Polynomial
 *
 *  - Optimized -
 *      - time = O(n * m^2) - Polynomial
 *      - space = O(m^2) - Polynomial
 *
 *************************************************************************************/

// 1.  Create the function
const canConstruct = (target, wordBank, memo = {}) => {
    // 3. Define base case
    if (target in memo) return memo[target];
    if (target === '') return true;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            // If prefix exists, we can slice the suffix from this for our recursion
            const suffix = target.slice(word.length);
            if (canConstruct(suffix, wordBank, memo) === true) {
                memo[target] = true;
                return true;
            };
        }
    }
    memo[target] = false;
    return false;
};



// 2. Create test inputs and outputs
console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));      // true
console.log(canConstruct('', ['cat', 'dog', 'mouse']));                       // true
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 'skat', 'boar'])); // false
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'ot', 'pot'])); // false
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'eeeeeeeeeeeeee',
    'eeeeeeeeeeeeeee',
    'ee',
    'eeeeeeeeeeesdasdee',
    'eeeeeeeeeeeeaseee',
    'eeeeeeeeee',
    'eeeseee',
    'eee',
    'e',
    'eeeeeeedsadaeee',
    'eeeeeeeeeeeesdaseee',
    'eeeeeeeeeeeeedsad',
    'eeeeeeeeee'
])); // false
