/**

Given a string, return true if the string is a palindrome or false if
it is not.

**/

function reverseInt(num) {
  // Change the integer into a string, then to an array, reverse,
  // and join it back into a string again
  const reversed = num.toString().split('').reverse().join('');

  // Return reversed as an integer with 'Math.sign' converting
  // it into a negative number, if needed
  return parseInt(reversed) * Math.sign(num);
}
