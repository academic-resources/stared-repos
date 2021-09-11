function capitalizeOne(str) {
  // Make an empty array 'words'
  const words = [];

  // Split the input string by spaces
  // for each word in the array
  for (let word of str.split(' ')) {
    // Uppercase the first letter of each word
    // Join the first letter with the rest of the string
    // Push result into the 'words' array
    words.push(word[0].toUpperCase() + word.slice(1));
  }

  // Join 'words' into a string and return it
  return words.join(' ');

}


function capitalizeTwo(str) {
  // Create an empty string 'result'
  let result = '';

  // For each character in the string
  for (let i = 1; i < str.length; i++) {
    // If the character to the left is a space
    if (str[i -1] === ' ') {
      // Capitalize it and add it to 'result'
      result += str[i].toUpperCase();
    } else {
      // Else, add it to result
      result += str[i];
    }
  }

  return result;
}
