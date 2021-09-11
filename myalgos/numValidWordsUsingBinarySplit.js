const letters = 'abcdefghijklmnopqrstuvwxyz'

function numValidWords(words, puzzles) {
  return puzzles.map(puzzle => checkPuzzle(words, puzzle))
}

function checkPuzzle(words, puzzle) {
  let count = 0
  const memo = {}
  words.forEach(word => {
    if (isValid(word, puzzle, memo)) {
      count++
    }
  })

  return count
}

function isValid(word, puzzle, memo) {
  if (word.length === 0) return true
  if (memo[word]) return memo[word]

  if (word.length === 1) {
    if (puzzle.indexOf(word[0]) >= 0) {
      memo[word] = true
    } else {
      memo[word] = false
    }
    return memo[word]
  }

  let mid = Math.floor(word.length / 2)
  let left = word.slice(0, mid)
  let right = word.slice(mid)
  memo[word] = isValid(left, puzzle, memo) && isValid(right, puzzle, memo)
  return memo[word]
}

//////////////////////////////

const words = []
const puzzles = []

for (let index = 0; index < 200000; index++) {
  words.push(makeWord())
}

for (let index = 0; index < 10; index++) {
  puzzles.push(makePuzzle())
}

function makeWord() {
  let randomLength = Math.floor(Math.random() * 6) + 7
  let word = ''
  for (let index = 0; index < randomLength; index++) {
    let randomLetter = Math.floor(Math.random() * 26)
    word += letters[randomLetter]
  }
  return word
}

function makePuzzle() {
  let puzzle = ''
  for (let index = 0; index < 7; index++) {
    let randomLetter = Math.floor(Math.random() * 26)
    puzzle += letters[randomLetter]
  }
  return puzzle
}

console.time('runtime')

console.log(numValidWords(words, puzzles))

console.timeEnd('runtime')
