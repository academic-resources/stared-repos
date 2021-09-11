/**

Given two strings, check to see if they are anagrams of each other.
Only consider characters, not spaces or punctuation. Capital letters
are the same as lower case.

**/


function anagramOne(stringOne, stringTwo) {
  const charMapOne = buildCharMap(stringOne);
  const charMapTwo = buildCharMap(stringTwo);

  // If there is an unequal amount of keys, return false
  if (Object.keys(charMapOne).length !== Object.keys(charMapTwo).length) {
    return false;
  }

  // Compare each value for each key of the maps
  for (let char in charMapOne) {
    if (charMapOne[char] !== charMapTwo[char]) {
      return false;
    }
  }

  return true;
}


// Helper function for anagramOne to reduce repetitive code
function buildCharMap(str) {
  // Create an empty map
  const charMap = {};

  // Iterate over the string and map each character to 'charMap',
  // replacing any non-chars and setting them to lower case
  for (let char of str.replace(/[^\w]/g, "").toLowerCase()) {
      charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
}


function anagramTwo(stringOne, stringTwo) {
  return cleanString(stringOne) === cleanString(stringTwo);
}


// Helper function for anagramTwo to reduce repetitive code
function cleanString(str) {
  return str
    .replace(/[^\w]/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");
}
