// 1. Create function

const canSum = (targetSum, numbers, memo = {}) => {
    // 4. Check if dependent variable is in memo
    if (targetSum in memo) return memo[targetSum];

    // 3. Handle base case
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;


    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSum(remainder, numbers, memo)) {
            memo[targetSum] = true;
            return true;
        }
    }

    memo[targetSum] = false;
    return false;
};


// 2. Create test input/outputs
console.log(canSum(7, [2, 3]));         // True
console.log(canSum(7, [5, 4, 3, 7]));   // True
console.log(canSum(7, [2, 4]));         // False
console.log(canSum(8, [2, 3, 5]));      // True
console.log(canSum(300, [7, 14]));      // False
