// isPalindrome
// Write a JavaScript function that takes a string and returns true if it's a palindrome, false if it's not. Use JavaScript.

// This solution takes less time and memory than rebuilding the string backward and comparing the two.

function isPalindrome (string) {
  var length = string.length;

  for (var i = 0; i < length/2; i++) {
    if (string[i] !== string[length - 1 - i]) {
      return false;
    }
  }

  return true;
}

// Time complexity: O(n).
// Space complexity: O(1).