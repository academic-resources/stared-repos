function isUniqueChars(str) {
  const chars = {}
  for (let i = 0; i < str.length; i++) {
    let val = str[i]
    if (chars[val]) {
      return false
    }
    chars[val] = true
  }
  return true
}

console.log(isUniqueChars('aba'))
console.log(isUniqueChars('abcd'))
