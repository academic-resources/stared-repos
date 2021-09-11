const num = 33;
const numericalString = '33';

Number.isNaN(num);
// Determine whether the passed value is NaN

Number.isFinite(num);
// Determine whether the passed value is a finite number

Number.isInteger(num);
// Determine whether the passed value is an Integer

Number.isSafeInteger(num);
// Determine whether the passed value is an Integer

Number.parseFloat(numericalString);
// parses an argument and returns a floating point number

Number.parseInt(numericalString, 10);
// parses a string argument and returns an integer of the specified radix or base
