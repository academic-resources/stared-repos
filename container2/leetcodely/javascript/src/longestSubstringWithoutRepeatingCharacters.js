/*Given a string, find the length of the longest substring without repeating characters.*/

const lengthOfLongestSubstring = s => {
    let arr = [...s];
    const dict = {};
    let currLen = 0;
    let maxLen = 0;
    let start = 0;
    for(let i=0; i < arr.length; i++){
        if(arr[i] in dict) {
            start = dict[arr[i]] + 1;
        }
        currLen = i - start + 1;
        maxLen = Math.max(currLen, maxLen);
        dict[arr[i]] = i;
    }
    return maxLen;

};
s1 = "abba";
console.log(lengthOfLongestSubstring(s1));