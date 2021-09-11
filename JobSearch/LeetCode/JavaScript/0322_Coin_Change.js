// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:

// Input: coins = [1, 2, 5], amount = 11
// Output: 3 
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Note:
// You may assume that you have an infinite number of each kind of coin.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

function coinChange(coins, amount = -1, memo = {}) {
  if (amount in memo) return memo[amount]
  if (amount < 0) return -1
  if (amount === 0) return 0
  
  let minCt = Infinity
  for (let coin of coins) {
      let currCt = coinChange(coins, amount - coin, memo)
      if (currCt >= 0 && currCt < minCt) minCt = currCt + 1
  }
  memo[amount] = minCt === Infinity ? -1 : minCt
  return memo[amount]
}

console.log(coinChange([1, 2, 5], 11))
console.log(coinChange([1, 2], 11))
console.log(coinChange([2], 3))
console.log(coinChange([], 3))
console.log(coinChange([3]))


function coinChangeMemoArray(coins, amount, count = new Array(amount)) {
  if (count[amount - 1]) return count[amount - 1]
  if (amount < 0) return -1
  if (amount === 0) return 0

  let minCt = Infinity
  for (let coin of coins) {
      let res = coinChange(coins, amount - coin, count)
      if (res >= 0 && res < minCt) minCt = 1 + res
  }
  count[amount - 1] = (minCt === Infinity) ? -1 : minCt
  return count[amount - 1]
}

console.log("=============")
console.log(coinChangeMemoArray([1, 2, 5], 11))
console.log(coinChangeMemoArray([1, 2], 11))
console.log(coinChangeMemoArray([2], 3))
console.log(coinChangeMemoArray([], 3))
// console.log(coinChange([3]))


function coinChangeDP(coins, amount) {     
  let values = new Array(amount + 1).fill(Infinity)
  values[0] = 0
  for (let val = 1; val <= amount; val++) {
    for (let c = 0; c < coins.length; c++) {
      if (coins[c] <= val) {
        values[val] = Math.min(values[val], values[val - coins[c]] + 1)
      }
    }
  }
  return values[amount] > amount ? -1 : values[amount]
}

console.log("================")
console.log(coinChangeDP([1, 2, 5], 11))
console.log(coinChangeDP([1, 2], 11))
console.log(coinChangeDP([2], 3))
console.log(coinChangeDP([], 3))
// console.log(coinChangeDP([3]))