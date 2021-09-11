//// Created by leananepari on 04/24/19. ////

// You have an array of logs.  Each log is a space delimited string of words.

// For each log, the first word in each log is an alphanumeric identifier.  Then, either:

// Each word after the identifier will consist only of lowercase letters, or;
// Each word after the identifier will consist only of digits.
// We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

// Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

// Return the final order of the logs.

// Example 1:

// Input: ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
// Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]

/**
 * @param {string[]} logs
 * @return {string[]}
 */
const reorderLogFiles = (logs) => {
  let digits = [];
  let letters = [];
  let obj = {};
  let output = [];
  
  for (let i = 0; i < logs.length; i++) {
    let arr = logs[i].split(' ');
    if (isDigit(arr) === true) {
        digits.push(logs[i]);
    } else {
        if (obj.hasOwnProperty(arr.slice(1).join(' '))) {
            let sortElems = [obj[arr.slice(1).join(' ')], arr[0]].sort();
            obj[arr.slice(1).join(' ')] = sortElems;
        } else {
            obj[arr.slice(1).join(' ')] = arr[0];
        }
        letters.push(arr.slice(1).join(' '));
    }
  }
  
  let sorted = letters.sort();
  
  for (let i = 0; i < sorted.length; i++) {
      let joined = '';
      if (Array.isArray(obj[sorted[i]])) {
        joined = obj[sorted[i]][0] + ' ' + sorted[i];
        obj[sorted[i]].splice(0, 1)
        output.push(joined);
      } else {
          joined = obj[sorted[i]] + ' ' + sorted[i];
          output.push(joined);
      }
  }
  
  for (let i = 0; i < digits.length; i++) {
      output.push(digits[i]);
  }
  
  function isDigit(arr) {
      for (let i = 1; i < 2; i++) {
          if (isNaN(parseInt(arr[i]))) {
              return false;
          } else {
              return true;
          }
      }
  }
  return output;
};