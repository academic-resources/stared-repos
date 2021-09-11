//// Created by leananepari on 04/25/19. ////

// Given a list of strings words representing an English Dictionary, find the longest word in words that can be built one character at a time by other words in words. If there is more than one possible answer, return the longest word with the smallest lexicographical order.

// If there is no answer, return the empty string.

// Example 1:
// Input: 
// words = ["w","wo","wor","worl", "world"]
// Output: "world"
// Explanation: 
// The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".


// /**
//  * @param {string[]} words
//  * @return {string}
//  */
const longestWord = (words) => {
  let trie = new Trie();
  
  words.sort()
  
  for (let i = 0; i < words.length; i++) {
      trie.insert(words[i]);
  }
  
  
  const longest = (node) => {
    let result = '';
    
    const check = (node) => {
        if (node['true']) {
            if (node['true'].length > result.length) {
                result = node['true'];
            } else if (result.length === node['true'].length) {
                var arr = [result, node['true']].sort();
                result = arr[0];
            } 
            
            for (let key in node) {
              if (key !== 'true') {
                  check(node[key])
              }  
            }
        } 
    }
    check(node);
    return result;
}
  
  let savedWords = [];

  for (let key in trie.root) {
    let result = longest(trie.root[key]);
    if (result.length !== 0) {
        savedWords.push(result);
    }
  }
  let largest = '';
  for (let i = 0; i < savedWords.length; i++) {
      if (savedWords[i].length > largest.length) {
          largest = savedWords[i];
      }
  }
  return largest;  
};


class Trie {
  constructor() {
      this.root = {}
  }
  
  insert(word) {
      let root = this.root;
      
      for (let i = 0; i < word.length; i++) {
          if (!root[word[i]]) {
              root[word[i]] = {};
          }
          root = root[word[i]];
      }
      
      root['true'] = word;
  }
}