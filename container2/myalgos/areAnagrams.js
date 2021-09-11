function areAnagrams(s, t) {
  if (s.length != t.length) {
    return false
  }

  let letters = {}

  for (let c of s) {
    letters[c] = letters[c] + 1 || 1
  }

  for (let c of t) {
    if (letters[c] === undefined) return false
    letters[c] -= 1
  }

  for (let c in letters) {
    if (letters[c] !== 0) return false
  }

  return true
}

console.log(areAnagrams('abc', 'cba'))
console.log(areAnagrams('abcd', 'cba'))
