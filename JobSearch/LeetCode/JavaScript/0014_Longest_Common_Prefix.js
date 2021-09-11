// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:

// All given inputs are in lowercase letters a-z.

/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function(strs) {
    if (!strs.length) return ""
    if (strs.length === 1) return strs[0]
    for (let char = 0; char < strs[0].length; char++) {
        for (let word = 1; word < strs.length; word++) {
            if (strs[word][char] !== strs[word - 1][char])
                return strs[0].substr(0, char)
        }
    }
    return strs[0]
};

// console.log(longestCommonPrefix(["flower","flow","flight"]))    // => "fl"
// console.log(longestCommonPrefix(["dog","racecar","car"]))       // => ""
// console.log(longestCommonPrefix(["America"]))                   // => "America"
// console.log(longestCommonPrefix(["do", 1]))                     // => ""
// console.log(longestCommonPrefix(["happy", "happy"]))            // => "happy"


var longestCommonPrefixSubstr = function(strs) {
    if (!strs.length) return ""
    
    let base = strs[0];
    for (let word = 1; word < strs.length; word++) {
        while (String(strs[word]).indexOf(base) !== 0 && base !== "") {
            base = base.substring(0, base.length - 1)
        }
    }
    return base
};


console.log("===============")
console.log(longestCommonPrefixSubstr(["flower","flow","flight"]))    // => "fl"
console.log(longestCommonPrefixSubstr(["dog","racecar","car"]))       // => ""
console.log(longestCommonPrefixSubstr(["America"]))                   // => "America"
console.log(longestCommonPrefixSubstr(["do", 1]))                     // => ""
console.log(longestCommonPrefixSubstr(["happy", "happy"]))            // => "happy"
console.log(longestCommonPrefixSubstr(["happy", "hap"]))              // => "hap"