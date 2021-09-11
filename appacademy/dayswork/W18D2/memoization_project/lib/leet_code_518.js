// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

const change = function(amount, coins) {
  let combos = []
  for (let i = 0; i <= amount; i++) {
    combos[i] = 0
  }
  combos[0] = 1

  for (let j = 0; j < coins.length; j++) {
    let coin = coins[j]
    for (let checkAmount = coin; checkAmount <= amount; checkAmount++) {
      let remainder = checkAmount - coin
      combos[checkAmount] += combos[remainder]
    }
  }

  return combos[amount]
}

console.log(change(100, [99, 1]))
