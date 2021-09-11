function countUpAndDown(n) {
  // console.log("Going up!")
  for (let i = 0; i < n; i++) {
    // console.log(i)
  }
  // console.log("At the top!\nGoing down...")
  for (let j = n - 1; j >= 0; j--) {
    // console.log(j)
  }
  // console.log("Back down. Bye!")
}

// countUpAndDown(6)

function printAllPairs(n) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      // console.log(i, j)
    }
  }
}

// printAllPairs(10)

sample = 100000
t1 = Date.now()
countUpAndDown(sample)
t2 = Date.now()
console.log(`Time elapsed for countUpAndDown: ${(t2 - t1)/ 1000} seconds.`)
t1 = Date.now()
printAllPairs(sample)
t2 = Date.now()
console.log(`Time elapsed for printAllPairs: ${(t2 - t1)/ 1000} seconds.`)


// printAllPairs is O(n^2)