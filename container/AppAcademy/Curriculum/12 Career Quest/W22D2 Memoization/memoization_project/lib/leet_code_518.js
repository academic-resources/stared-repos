// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

// /**
//  * @param {number} amount
//  * @param {number[]} coins
//  * @return {number}
//  */
var change = function(amount, coins, memo = {}) {
  // since coins are changing, it needs be included into memo
  let key = amount + '-' + coins
  if (key in memo) return memo[key]
  //if amount is 0, then return 1 way to give back change (0 cents back)
  if (amount === 0) return 1

  let total = 0
  let currentCoin = coins[coins.length - 1]
  for (let qty = 0; qty * currentCoin <= amount; qty ++) {
    total += change(amount - qty * currentCoin, coins.slice(0, -1), memo)
  }
  memo[key] = total
  return memo[key]
}

console.log(change(500,[3,5,7,8,9,10,11]))