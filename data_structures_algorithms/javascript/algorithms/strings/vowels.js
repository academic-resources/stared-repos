/**

Write a function that returns the number of vowels used in a
string.

**/


function vowelsOne(str) {
  let count = 0;
  const vowels = 'aeiou';

  for (let char of str.toLowerCase()) {
      if (vowels.includes(char)) {
        count++;
      }
  }

  return count;
}


function vowelsTwo(str) {
  const matches = str.match(/[aeiou]/gi);

  return matches ? matches.length : 0;
}
