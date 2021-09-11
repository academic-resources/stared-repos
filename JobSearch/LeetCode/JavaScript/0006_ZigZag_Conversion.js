// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);
// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:

// P     I    N
// A   L S  I G
// Y A   H R
// P     I

// Input: s = "PAYPALISHIRING", numRows = 5
// Output: "PHASIYIRPLIANG"
// Explanation:

// P       H
// A     S I
// Y   I   R
// P L     I G
// A       N

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

var zigZagConvert = function(s, numRows) {
  if (numRows === 1) return s
  // initialize an empty result string
  let result = ""
  // numRows * 2 - 2 = total period
  let period = numRows * 2 - 2
  // 1st difference = initial period and 2nd difference = 0
  let diff1 = period, diff2 = 0
  // pass through the string numRows times which happens to invert the
      // 1st difference and 2nd difference
  for (let i = 0; i < numRows; i++) {
    // at each difference, concat character at that index into result string
    let currStrIdx = i
    let useFirst = diff2 === 0 ? true : diff1 === 0 ? false : true
    while (currStrIdx < s.length) {
      result += s[currStrIdx]
      if (useFirst) {
        currStrIdx += diff1
        useFirst = diff2 === 0 ? true : false
      } else {
        currStrIdx += diff2
        useFirst = diff1 === 0 ? false : true
      }
    }
    // after each pass, increment 1st difference by 2 and decrement 2nd by 2
    diff1 -= 2
    diff2 += 2
  }
      
  // return the result string
  return result
};

console.log(zigZagConvert("PAYPALISHIRING", 1)) // => "PAHNAPLSIIGYIR"
console.log(zigZagConvert("PAYPALISHIRING", 3)) // => "PAHNAPLSIIGYIR"
console.log(zigZagConvert("PAYPALISHIRING", 4)) // => "PINALSIGYAHRPI"
console.log(zigZagConvert("PAYPALISHIRING", 5)) // => "PHASIYIRPLIGAN"
console.log(zigZagConvert("A", 1))              // => "A"
console.log(zigZagConvert("AB", 2))             // => "AB"
console.log(zigZagConvert("ABC", 2))            // => "ACB"
console.log(zigZagConvert("ABC",  3))           // => "ABC"
console.log(zigZagConvert("ABC",  4))           // => "ABC"
console.log("====================")




var zigZagConvertClean = function(s, numRows) {
  if (numRows === 1) return s
  let result = ""
  let period = numRows * 2 - 2
  let diff1 = period, diff2 = 0
  for (let i = 0; i < numRows; i++) {
    let currStrIdx = i
    let useFirst = diff2 === 0 ? true : diff1 === 0 ? false : true
    while (currStrIdx < s.length) {
      result += s[currStrIdx]
      useFirst ? currStrIdx += diff1 : currStrIdx += diff2
      useFirst = diff2 === 0 ? true : diff1 === 0 ? false : !useFirst
    }
    diff1 -= 2
    diff2 += 2
  }
  return result
};

// console.log(zigZagConvertClean("PAYPALISHIRING", 1)) // => "PAHNAPLSIIGYIR"
console.log(zigZagConvertClean("PAYPALISHIRING", 3)) // => "PAHNAPLSIIGYIR"
// console.log(zigZagConvertClean("PAYPALISHIRING", 4)) // => "PINALSIGYAHRPI"
// console.log(zigZagConvertClean("PAYPALISHIRING", 5)) // => "PHASIYIRPLIGAN"
// console.log(zigZagConvertClean("A", 1))              // => "A"
// console.log(zigZagConvertClean("AB", 2))             // => "AB"
// console.log(zigZagConvertClean("ABC", 2))            // => "ACB"
// console.log(zigZagConvertClean("ABC",  3))           // => "ABC"
// console.log(zigZagConvertClean("ABC",  4))           // => "ABC"



// Clearest solution
var zigZagConvertClear = function(s, numRows) {
  if (numRows === 1) return s
  let result = ""
  let period = numRows * 2 - 2
  let diff1 = period, diff2 = 0
  for (let i = 0; i < numRows; i++) {
    let currStrIdx = i
    let useFirst
    while (currStrIdx < s.length) {
      useFirst = diff2 === 0 ? true : diff1 === 0 ? false : useFirst
      result += s[currStrIdx]
      useFirst ? currStrIdx += diff1 : currStrIdx += diff2
      useFirst = !useFirst
    }
    diff1 -= 2
    diff2 += 2
  }
  return result
};

console.log(zigZagConvertClear("PAYPALISHIRING", 3)) // => "PAHNAPLSIIGYIR"

// by Sporkyy on LeetCode
const zigZagConvertShort = (s, numRows) => {
  // 1. Make an array with the zigzag sequence
  const zigzag = [...new Array(numRows).keys()];
  console.log(zigzag)
  zigzag.push(...zigzag.slice(1, -1).reverse());
  console.log(zigzag)
  // 2. Make an array with as many strings as we need rows
  const rows = new Array(numRows).fill('');
  console.log(rows);
  // 3. Append the characters to the row strings in zigzag sequence
  [...s].forEach((c, i) => (rows[zigzag[i % zigzag.length]] += c));
  // 4. Join the row strings in the array together
  return rows.join('');
};

console.log(zigZagConvertShort("PAYPALISHIRING", 5)) // => "PAHNAPLSIIGYIR"