/******************************** countConstruct *****************************
 *
 *  - Write a function `countConstruct(target, wordBank)` that accepts a target
 *      string and an array of strings
 *
 *  - The function should return the - number of ways - that the `target` can be
 *      constructed by concatenating elements of the `wordBank` array
 *
 *  - You may reuse elements of  `wordBank` as many times as needed
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
 *****************************************************************************/

// 1. Create the function
const countConstruct = (target, wordBank, memo = {}) => {
    // 3. Create base cases
    if (target in memo) return memo[target];
    if (target === '') return 1;

    let totalCount = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const numWaysForRest = countConstruct(target.slice(word.length), wordBank, memo);
            totalCount += numWaysForRest;
        };
    }

    memo[target] = totalCount;
    return totalCount;
};




// 2. Create test inputs and outputs
console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));                  // 1
console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']));                  // 2
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk']));           // 0
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])); // 4
console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
    'eeeeeee'
])); // 0
