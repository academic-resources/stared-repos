const letters = 'abcdefghijklmnopqrstuvwxyz'
const allLettersHash = {}
for (let letter of letters) {
  allLettersHash[letter] = true
}

function numValidWords(words, puzzles) {
  return puzzles.map(puzzle => checkPuzzle(words, puzzle))
}

function checkPuzzle(words, puzzle) {
  const badLetterHash = Object.assign({}, allLettersHash)
  for (let letter of puzzle) {
    delete badLetterHash[letter]
  }

  const first = puzzle[0]

  let goodWords = words.filter(word => {
    if (word.indexOf(first) === -1) return false
    for (let index = 0; index < word.length; index++) {
      if (badLetterHash[word[index]]) return false
    }
    return true
  })
  return goodWords.length
}

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
