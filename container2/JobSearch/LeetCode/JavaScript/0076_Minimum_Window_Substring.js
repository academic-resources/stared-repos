// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

// Example:

// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC"
// Note:

// If there is no such window in S that covers all characters in T, return the empty string "".
// If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */


function minWindow(s, t) {
  if (!s.length || !t.length) return ""
  
  const tChars = {}
  for (let char = 0; char < t.length; char++) {
    if (tChars[t[char]]) tChars[t[char]]++
    else tChars[t[char]] = 1
  }
  
  let right = left = 0
  let tLength = t.length
  let minWinLength = Infinity
  let minWin = ""

  while (s[right]) {
    let rightChar = s[right]
    if (rightChar in tChars && --tChars[rightChar] >= 0) tLength--;

    while (tLength === 0) {
      let currLength = right - left + 1
      if (currLength < minWinLength) {
        minWin = s.slice(left, right + 1)
        minWinLength = currLength
      }

      let leftChar = s[left];
      if (leftChar in tChars && ++tChars[leftChar] > 0) tLength++;

      left++
    }
    right++
  }
  return minWin
}


var minWindowSolution = function(s, t) {
  if (s.includes(t)) return t;
  
  const lookupObj = {};
  for (let i = 0; i < t.length; i++) {
    if (lookupObj[t[i]] !== undefined) lookupObj[t[i]]++
    else lookupObj[t[i]] = 1;
  }
  
  let right = 0;
  let left = 0;
  let counter = t.length; 
  let minLength = Infinity;
  let minString = "";
  while (s[right]) {
    let rightChar = s[right];
    if (lookupObj[rightChar] !== undefined) {
      lookupObj[rightChar]--;
      if (lookupObj[rightChar] >= 0) counter--;
    }
    while (counter === 0) {
      if (right - left + 1 < minLength) {
        minString = s.slice(left, right + 1);
        minLength = right - left + 1;
      }
      let leftChar = s[left];
      if (lookupObj[leftChar] !== undefined) {
        lookupObj[leftChar]++;
        if (lookupObj[leftChar] === 1) counter++;
      }
      left++;
    }
    right++;
  }
  return minString;
};

console.log(minWindow("ADOBECODEBANC", "ABC"))  //=> BANC
console.log(minWindow("ADOBECODEBANC", ""))     //=> ""
console.log(minWindow("", ""))                  //=> ""


