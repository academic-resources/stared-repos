const fib = (n) => {
    // If n = 1 or 2, return 1
    if (n <= 2) return 1;
    // Otherwise, return fib(n-1) + fib(n - 2);
    return fib(n - 1) + fib(n - 2);
};

// console.log(fib(10));
// console.log(fib(3));


// Memoization
//  - JS Object, keys will be arg to fn, value will be return value

const fib_memo = (n, memo = {}) => {
    if (n in memo) return memo[n];

    if (n <= 2) return 1;

    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);
    return memo[n];
};

console.log(fib_memo(100));
