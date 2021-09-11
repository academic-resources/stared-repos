// Suppose we want to write a function that calculates the sume of all numbers from 1 up to ( and including ) some number n.
function addUpTo(n) {
  let total = 0
  for (let i = 1; i <= n; i++) {
    total += i
  }
  return total
}

function addUpToFormula(n) {
  return n * (n + 1) / 2
}

console.log(addUpTo(5))
console.log(addUpToFormula(5))

// What does better mean?
// - Faster
// - Less memory-intensive?
// - Readable?

sample = 1000000000
t1 = Date.now()
addUpTo(sample)
t2 = Date.now()
console.log(`Time elapsed for addUpTo: ${(t2 - t1)/ 1000} seconds.`)
t1 = Date.now()
addUpToFormula(sample)
t2 = Date.now()
console.log(`Time elapsed for addUpToFormula: ${(t2 - t1)/ 1000} seconds.`)

// The Problem with Time
// - Different machines will record different times
// - The Same machine will record different times
// - For fast algorithms, speed measurements may not be precise enough?

// If not time, then what?
// - Rather than counding seconds, whare are so variable...
// - Let's count the Number of simple operations the computer has to perform

// addUpToFormula has 3 operations (*, +, /)
// addUpTo has n operations
// - as n grows, more operations, roughly 5n + 2

