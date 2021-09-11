function canMakePalendrome(phrase) {
  let letters = {}

  for (let c of phrase) {
    letters[c] = letters[c] + 1 || 1
  }

  let oddCount = 0

  const keys = Object.keys(letters)

  for (let index = 0; index < keys.length; index++) {
    const letter = keys[index]
    if (letters[letter] % 2 !== 0) {
      oddCount++
      if (oddCount > 1 || (oddCount > 0 && phrase.length % 2 === 0)) {
        return false
      }
    }
  }

  return true
}

console.log(canMakePalendrome('aabb'))
console.log(canMakePalendrome('aab'))
console.log(canMakePalendrome('aabc'))
