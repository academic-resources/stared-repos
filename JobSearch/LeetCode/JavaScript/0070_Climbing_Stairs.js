// You are climbing a stair case. It takes n steps to reach to the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Note: Given n will be a positive integer.

// Example 1:

// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

/**
 * @param {number} n
 * @return {number}
 */

// Rercusion with memo T(n) S(n)
function climbStairs(n, memo = {}) {
  if (n in memo) return memo[n]
  if (n <= 1) return 1
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo)
  return memo[n]
}

console.log(climbStairs(0))
console.log(climbStairs(1))
console.log(climbStairs(2))
console.log(climbStairs(3))
console.log(climbStairs(4))
console.log(climbStairs(5))


// a la Alvin Zablan -- Tabulation
function climbStairsZablan(n) {
  let table = new Array(n + 1)
  table[0] = 1
  table[1] = 1

  for (let i = 2; i < table.length; i++) {
    table[i] = table[i - 1] + table[i - 2]
  }
  return table[table.length - 1]
}

console.log("============")
console.log(climbStairsZablan(0))
console.log(climbStairsZablan(1))
console.log(climbStairsZablan(2))
console.log(climbStairsZablan(3))
console.log(climbStairsZablan(4))
console.log(climbStairsZablan(5))


// T(n) S(1)
function climbStairsDP(n) {
    if (n === 1) return 1
    let prev = 1
    let curr = 2
    for (let i = 3; i <= n; i++) {
        let next = prev + curr
        prev = curr
        curr = next
    }
    return curr
}

console.log("============")
console.log(climbStairsDP(0))
console.log(climbStairsDP(1))
console.log(climbStairsDP(2))
console.log(climbStairsDP(3))
console.log(climbStairsDP(4))
console.log(climbStairsDP(5))


// Fibonacci Formula
// Algorithm

// We can find nth fibonacci number using this formula:
// F(n) = 1/√5 * [((1 + √5) / 2) ^ (n + 1)) - ((1 - √5) / 2) ^ (n + 1))]

// For the given problem, the Fibonacci sequence is defined by:
// F(0) = 1, F(1) = 1, F(2) = 2
// F(n + 2) = F(n + 1) + F(n)

// A standard method of trying to solve such recursion formulas is assume;
// F(n) of the form F(n) = a^n 

// Then, of course:
// F(n + 1) = a^(n + 1)
// and:
// F(n + 2) = a^(n + 2) 

// so the equation becomes:
// a^(n + 2) = a^(n + 1) + a^n 

// If we divide the entire equation by a^n we arrive at:
// a^2 = a + 1 
// or the quadratic equation:
// a^2 - a - 1 = 0

// Then solve quadratically to get:


// O(log(n))
function climbStairsFibAlg(n) {
    let sqrt5 = Math.sqrt(5);
    let fibn = Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1);
    return fibn / sqrt5
}

var climbStairsOneLiner = (n) => (((1+5**.5)/2)**(n+1)-((1-5**.5)/2)**(n+1))/5**.5