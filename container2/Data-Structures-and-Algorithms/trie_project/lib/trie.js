class Node {
  constructor() {
    this.children = {};
    this.isTerminal = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insertRecur(word, root = this.root) {
    let letter = word[0];
    if (!(letter in root.children)) {
      root.children[letter] = new Node();
    }
    if (word.length === 1) {
      root.children[letter].isTerminal = true;
    } else {
      this.insertRecur(word.slice(1), root.children[letter]);
    }
  }

  insertIter(word) {
    let root = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in root.children)) {
        root.children[word[i]] = new Node();
      }
      if (i === word.length - 1) {
        root.children[word[i]].isTerminal = true;
      }
      root = root.children[word[i]];
    }
  }

  searchRecur(word, root = this.root) {
    if (!word.length) {
      if (root.isTerminal) {
        return true;
      } else {
        return false;
      }
    }
    let letter = word[0];
    if (letter in root.children) {
      return this.searchRecur(word.slice(1), root.children[letter]);
    } else {
      return false;
    }
  }

  searchIter(word) {
    let root = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in root.children)) return false;
      root = root.children[word[i]];
    }
    if (root.isTerminal) {
      return true;
    } else {
      return false;
    }
  }

  wordsWithPrefix(prefix, root = this.root) {
    if (!prefix.length) {
      let res = [];
      if (root.isTerminal) res.push('');
      for (let letter in root.children) {
        let child = root.children[letter];
        let suffixes = this.wordsWithPrefix(prefix, child);
        let words = suffixes.map(suffix => letter + suffix);
        res.push(...words);
      }
      return res;
    } else {
      let letter = prefix[0];
      let child = root.children[letter];
      if (child === undefined) {
        return [];
      } else {
        let suffixes = this.wordsWithPrefix(prefix.slice(1), child);
        let words = suffixes.map(suffix => letter + suffix);
        return words;
      }
    }
  }
}

module.exports = {
  Node,
  Trie
};
