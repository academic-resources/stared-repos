const longestPalindrome = function(s) {
  if (s.length < 2) return s

  let longest = ''

  // single center
  for (let i = 0; i < s.length; i++) {
    let extend = 1
    let found = s[i]
    while (i - extend >= 0 && i + extend < s.length) {
      if (s[i - extend] === s[i + extend]) {
        found = s[i - extend] + found + s[i + extend]
        extend++
      } else {
        break
      }
    }
    if (found.length > longest.length) {
      longest = found
    }
  }

  // double center
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) {
      let extend = 1
      let found = s[i] + s[i + 1]
      while (i - extend >= 0 && i + extend + 1 < s.length) {
        if (s[i - extend] === s[i + extend + 1]) {
          found = s[i - extend] + found + s[i + extend + 1]
          extend++
        } else {
          break
        }
      }
      if (found.length > longest.length) {
        longest = found
      }
    }
  }

  return longest
}

// const longestPalindrome = function(s) {
//   if (s.length < 2) return s

//   let longest = ''
//   const memo = {}

//   for (let i = 0; i < s.length; i++) {
//     for (let j = s.length - 1; j >= i; j--) {
//       if (s[i] === s[j] && j - i + 1 > longest.length) {
//         let segment = s.slice(i, j + 1)
//         if (isPalen(segment, memo)) {
//           longest = segment
//         }
//       }
//     }
//   }

//   return longest
// }

// function isPalen(str, memo) {
//   if (str.length === 0) return true

//   if (str in memo) return memo[str]

//   if (str[0] === str[str.length - 1]) {
//     memo[str] = true && isPalen(str.slice(1, str.length - 1), memo)
//     return memo[str]
//   }

//   memo[str] = false
//   return false
// }

console.log(longestPalindrome('cbbd'))

console.log(
  longestPalindrome(
    'bsnetpqmwhqjunkooftuosgkmkxpmvuehtlpwpktltwlvpdaycnhewdbdrhluyjldecezujgxixehsmjjuyerpllrvzqskizkulqzowzfvqcdsllvgupndbaiuzihcxklvxbodpnrymwobhlvllybdlfabfvnizjpriapuzszdhohfgezayokrivbgbgingspoxsridokhwekawchjdcpylvefubulvxneuizglrjktfcdirwnpqztdpsicslzaeiaibrepifxpxfkczwoumkkuaqkbjhxvasxflmrctponwwenvmtdaqaavubyrzbqjbjxpejmucwunanxwpomqyondyjuzxmzpevxqmbkrwcpdiiph'
  )
)

console.log(
  longestPalindrome(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  )
)
