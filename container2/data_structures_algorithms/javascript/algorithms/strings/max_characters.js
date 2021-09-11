/**

Given a string, return the character that is most commonly used
in the string.

**/

function maxCharacters(str) {
  const chars = {};
  let maxChar = "";
  let max = 0;

  // Iterate over every character and add it to the 'chars' object
  // The key is character, the value is the count of how many
  // times it appears
  for (let char of str) {
    chars[char] = chars[char] + 1 || 1;
  }

  // Iterate over the values and set 'max' to the highest count and the
  // most frequent character to 'maxChar'
  for (let char in chars) {
    if (chars[char] > max) {
      max = chars[char];
      maxChar = char;
    }
  }

  return maxChar;
}
