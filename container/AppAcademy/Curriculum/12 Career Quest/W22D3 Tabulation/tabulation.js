function tabulatedFib(n) {
  // create a blank array of length `n`
  let table = new Array(n);

  // seed the first two values
  table[0] = 0;               
  table[1] = 1;

  // complete the table by moving from left to right,
  // following the fibonacci pattern
  for (let i = 2; i <= n; i++) {
      table[i] = table[i - 1] + table[i - 2];
  }

  return table[n];
}


//optimized tabulation with O(n) time but with O(1) space.
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let secondLast = 0
  let last = 1;

  for (let i = 2; i <= n; i++) {
      let temp = last;
      last = last + secondLast;
      secondLast = temp;
  }

  return last;
}

//LeetCode 139. Word Break
// /**
//  * @param {string} s
//  * @param {string[]} wordDict
//  * @return {boolean}
//  */
function wordBreak(s, wordDict) {
  let table = new Array(s.length + 1).fill(false)
  table[0] = true

  for (let i = 0; i < table.length; i ++) {
    if (table[i] === false) continue

    for ( let j = i + 1; j < table.length; j++) {
      let word = s.slice(i, j)
      if (wordDict.includes(word)) {
        table[j] = true
      }
    }
  }
  return table[table.length - 1]
};

// General recipe
// - How big should I make my table?  (usually based off the size of the input)
// - What does my table represent? (think about what values that should be stored in the array, usually the return value)
// - Think about the initial value to seed into the table
// - Think about how that initial value can lead to further entries down the line
// - In the end, return the final value in your table