/*Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
*/

const longestPalindrome = s => {
    let arr = [...s];
    let longest ="";
    for(let i=0; i< arr.length * 2; i++){
        let left = Math.floor(i/2);
        let right = Math.floor(i/2) + i%2;
        while(left >=0 && right < arr.length && arr[left] === arr[right]){
            let sub = arr.slice(left, right +1);
            if(sub.length >= longest.length){
                longest = sub;
            }
            left --;
            right ++;
        }
    }
    return longest.join("");

};
const s = "cbbd";
console.log(longestPalindrome(s));