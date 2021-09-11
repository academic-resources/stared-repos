//MEMOIZATION
// Runtime: O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

console.log("Regular Factorial")
console.log("=================")
console.log(factorial(6));       // => 720, requires 6 calls
console.log(factorial(6));       // => 720, requires 6 calls
console.log(factorial(5));       // => 120, requires 5 calls
console.log(factorial(7));       // => 5040, requires 7 calls
// console.log(factorial(100));
console.log("=================")


// Memoized version kind of ugly but useful for successive calls.
let memo = {}

function memoFactorial(n) {
    // if we have calculated memoFactorial(n) previously, fetch the stored result in memo
    if (n in memo) {
      console.log('fetching memo for', n)
      return memo[n]
    }

    if (n === 1) return 1;

    // otherwise, we have not calculated memoFactorial(n) previously, so calculate it now,
    // but store the result in case we need it again in the future
    
    let ans = n * memoFactorial(n - 1)
    console.log('storing memo for', n)
    memo[n] = ans
    return ans
    
    
    // memo[n] = n * memoFactorial(n - 1);
    // return memo[n]
}


console.log("Memo Factorial")
console.log("=================")
console.log(memoFactorial(6));       // => 720, requires 6 calls
console.log(memoFactorial(6));       // => 720, requires 1 call
console.log(memoFactorial(5));       // => 120, requires 1 call
console.log(memoFactorial(7));       // => 5040, requires 2 calls
// console.log(memoFactorial(100));       // => BIG NUMBER
console.log("Memo:");   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }
console.log(memo);   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }
console.log("=================")


function fib(n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
// O(2^n)
console.log("Regular Fib")
console.log("=================")
console.log(fib(6));     // => 8
console.log(fib(40));    // => 102334155 (take a long time)
// console.log(fib(50));    // => Takes LOONG TIME
console.log("=================")



// memo is passed around by reference between functions
function fastFib(n, memo = {}) {
  // if the arg is in the memo, fetch the val and return it
  if (n in memo) return memo[n];
  if (n === 1 || n === 2) return 1;

  // if the arg is not in the memo, calculate it recursively, but save it in the memo for the future
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}
// O(n)
console.log("Regular Fib")
console.log("=================")
console.log(fastFib(6));     // => 8
console.log(fastFib(50));    // => 12586269025 INSTANT!
console.log(fastFib(100));    // => 354224848179262000000 ROUNDED
console.log("=================")


// Take away:
// Understand conceptually why the code is inefficient before optimizing
// In the case of fib, recognize the repetition of trees in fib

// Memoization is really formulaic.
// It is always the case of using an object to store data, specificially:
// - the exact argument as the key and the solution as values


// Inefficient example of memoization
function badFib(n, memo = {}) {
  if (n === 1 || n === 2) return 1

  let lastFib
  let secondLastFib

  if ((n - 1) in memo) {
    lastFib = memo[n - 1]
  } else {
    lastFib = fib(n - 1, memo)
    memo[n - 1] = lastFib
  }

  if ((n - 2) in memo) {
    secondLastFib = memo[n - 2]
  } else {
    secondLastFib = fib(n - 2, memo)
    memo[n - 2] = secondLastFib
  }

  return lastFib + secondLastFib
}
// O(2^n)
console.log("Inefficient Fib")
console.log("=================")
console.log(badFib(6));     // => 8
console.log(badFib(40));     // => 102334155 Still LONG
console.log("=================")