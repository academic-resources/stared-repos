// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

// Example 1:

// Input: "III"
// Output: 3
// Example 2:

// Input: "IV"
// Output: 4
// Example 3:

// Input: "IX"
// Output: 9
// Example 4:

// Input: "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 5:

// Input: "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

/**
 * @param {string} s
 * @return {number}
 */

var romanToInt = function(s) {
    let values = {
      "I" : 1,
      "V" : 5,
      "X" : 10,
      "L" : 50,
      "C" : 100,
      "D" : 500,
      "M" : 1000,
    }

    let result = 0

    for (let i = 0; i < s.length; i++) {
      let currValue = s[i] in values ? values[s[i]] : 0
      let nextValue = s[i + 1] ? s[i + 1] in values ? values[s[i + 1]] : 0 : 0
      if (nextValue > currValue) {
        result += nextValue - currValue
        i++
      } else {
        result += currValue
      }
    }

    return result
};

console.log(romanToInt("I"))          //=> 1
console.log(romanToInt("V"))          //=> 5
console.log(romanToInt(""))           //=> 0
console.log(romanToInt("III"))        //=> 3
console.log(romanToInt("IV"))         //=> 4
console.log(romanToInt("IX"))         //=> 9
console.log(romanToInt("LVIII"))      //=> 58
console.log(romanToInt("MCMXCIV"))    //=> 1994
console.log(romanToInt("IIIV"))       //=> 6
console.log(romanToInt("IIIVX"))      //=> 16

var romanToInt2 = function(s) {
  let values = {
    "I" : 1,
    "V" : 5,
    "X" : 10,
    "L" : 50,
    "C" : 100,
    "D" : 500,
    "M" : 1000,
  }

  let result = 0
  let lastValue = 0

  for (let i = 0; i < s.length; i++) {
    let char = s[i]
    let value = char in values ? values[char] : 0
    result += value
    if (value > lastValue) result -= lastValue * 2
    // result = value > lastValue ? result + value - lastValue * 2 : result + value
    lastValue = value
  }

  return result
};

console.log("================")
console.log(romanToInt2("I"))          //=> 1
console.log(romanToInt2("V"))          //=> 5
console.log(romanToInt2(""))           //=> 0
console.log(romanToInt2("III"))        //=> 3
console.log(romanToInt2("IV"))         //=> 4
console.log(romanToInt2("IX"))         //=> 9
console.log(romanToInt2("LVIII"))      //=> 58
console.log(romanToInt2("MCMXCIV"))    //=> 1994
console.log(romanToInt2("IIIV"))       //=> 6
console.log(romanToInt2("IIIVX"))      //=> 6
