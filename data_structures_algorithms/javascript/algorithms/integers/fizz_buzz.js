/**

Write a program that console logs the numbers from 1 to n.
For multiples of '3' print 'fizz', multiples of '5' print 'buzz',
and for multiples of '15' print 'fizzbuzz'

**/

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      // Is the number a multiple of 3 and 5?
      console.log('fizzbuzz');
    } else if (i % 5 === 0) {
      // Is this number a multiple of 5?
      console.log('buzz');
    } else if (i % 3 === 0) {
      // Is this number a multiple of 3?
      console.log('fizz');
    } else {
      console.log(i);
    }
  }
}
