/**

Write a function that accepts a positive number 'N'
The function should console.log() a step shape with 'N' levels
using the # character. Make sure the step has spaces on the right
hand side.

Example:

steps(3)
'#  '
'## '
'###'

**/

function stepsOne(n) {
  // From 0 to n
  for (let row = 0; row < n; row++) {
      // Create an empty string, 'stair'
      let stair = '';

      // From 0 to n
      for (let column = 0; column < n; column++) {
        // If the current column is equal to or less than the current row
        if (column <= row) {
          // Add a # to 'stair'
          stair += '#';
        } else {
          // Add a space to stair
          stair += ' ';
        }
      }
      // Console log 'stair'
      console.log(stair);
  }
}


function stepsTwo(n, row = 0, stair = '') {
  if (n === row) {
    return;
  }

  if (n === stair.length) {
    console.log(stair);
    return stepsTwo(n, row + 1);
  }

  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += '';
  }

  stepsTwo(n, row, stair);
}
