/**

Given a string, return true if the string is a palindrome or false if
it is not.

**/

function palindromeOne(str) {
  // Reverse the string
  const reversed = str.split('').reverse().join('');

  // Return strict comparison of initial value and reversed value
  return reversed === str;
}


function palindromeTwo(str) {
  // Change string into array
  const arr = str.split('')

  // Use the 'every' array helper
  return arr.every((char, index) => {
    // Verify if the string's index matches its opposite index
    return char === str[str.length - index - 1];
  })
}
