// One Away: There are three types of edits that can be performed on
// strings: insert a character, remove a character, or replace a
// character. Given two strings, write a function to check if they
// are one edit (or zero edits) away.
// EXAMPLE
// pale, ple true
// pales, pale -> true
// pale, bale -> true
// pale, bae -> false

function one_away(w1, w2) {
  if (w1 === w2) return true

  const hash = {}

  let cant_find = 0
  let cant_find_idx

  w1.split('').forEach(letter => {
    hash[letter] = hash[letter] + 1 || 1
  })

  w2.split('').forEach((letter, idx) => {
    if (hash[letter]) {
      hash[letter] -= 1
    } else {
      cant_find += 1
      cant_find_idx = idx
    }
  })

  let left_over_letter

  let left_over_count = Object.keys(hash).reduce((acc, k) => {
    if (hash[k] > 0) left_over_letter = k
    return acc + hash[k]
  }, 0)

  let same_idx = w1.indexOf(left_over_letter) === cant_find_idx

  // insert
  if (left_over_count === 0 && cant_find === 1) return true
  // remove
  if (left_over_count === 1 && cant_find === 0) return true
  // change
  if (left_over_count === 1 && cant_find === 1 && same_idx) return true

  return false
}

console.log(one_away('pale', 'ple'))
console.log(one_away('pales', 'pale'))
console.log(one_away('pale', 'bale'))
console.log(one_away('pale', 'bae'))
console.log(one_away('richards', 'rickhard'))
console.log(one_away('richards', 'richarks'))
console.log(one_away('nochange', 'nochange'))
