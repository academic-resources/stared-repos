/*********************************** howSum *******************************************
 *
 *    - Write a function `howSum(targetSum, numbers)` that takes in a targetSum and an
 *        array of numbers as arguments.
 *
 *    - The function should return an array containing any combinationg of elements that
 *        add up to exactly the targetSum.
 *      - If there are no combinations that add up to targetSum:
 *          - Return null
 *      - If there are multiple combinations possible:
 *          - Return any combination that works
 *
 *    - Note that this is very similar to canSum, except that instead of returning
 *        a boolean we return the pair of numbers in the array that sum to the targetSum
 *
 *    Arguments: targetSum: integer, numbers: array
 *    Returns:   numbers: array... When summed === targetSum
 *    Example 1: howSum(7, [5, 2]) => [5, 2]
 *    Example 2: howSum(7, [4, 2]) => null
 *    Example 3: howSum(0, [1, 2, 3]) => []
 ***************************************************************************************/

// 1. Create function
const howSum = (targetSum, numbers, memo = {}) => {
    // 3. Handle base cases
    // 4. Check if memoized
    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        // 5. Pass memo along to all recursive calls
        const remainderResult = howSum(remainder, numbers, memo);

        if (remainderResult !== null) {
            // 6. Store returns in memo
            memo[targetSum] = [...remainderResult, num];
            return memo[targetSum];
        }
    }

    memo[targetSum] = null;
    return null;
};


// 2. Create test inputs and commented expected outputs
/*
    m = target sum
    n = numbers.length

    -- Brute Force --
    time = O(n^m * m)
    space = O(m)

    -- Optimized --
    time = O(n * m^2)
    space = O(m^2)
*/
console.log(howSum(7, [2, 3]));           // [3, 2, 2]
console.log(howSum(7, [5, 3, 4, 7]));     // [4, 3]
console.log(howSum(7, [2, 4]));           // null
console.log(howSum(8, [2, 3, 5]));        // [2, 2, 2, 2]
console.log(howSum(300, [7, 14]));        // null
