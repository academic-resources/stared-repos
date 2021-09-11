class TrieNode {
  constructor() {
      this.children = {};
      this.isTerminal = false;
  }
}

let root = new TrieNode();
root.children['z'] = new TrieNode();
root.children['a'] = new TrieNode();
root.children['a'].isTerminal = true
root.children['b'] = new TrieNode();
console.log(root)

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, root=this.root) {
        // take the first letter of the word
        let letter = word[0];

        // if the current root doesn't have an outgoing edge for the given letter 
        //      then we must create a new edge for the letter and point it to a new destination node
        if (!(letter in root.children)) {
            root.children[letter] = new TrieNode();
        }

        // if there are no other characters in the word, then mark the destination node as terminal
        if (word.length === 1) {
            root.children[letter].isTerminal = true;
        } else {    // otherwise, we have remaining characters so recursively insert them into the destination node
            this.insert(word.slice(1), root.children[letter]);
        }
	}
	
	search(word, root=this.root) {
        if (word.length === 0) {
            if (root.isTerminal) {
                // the word is recognized if it is empty and the current node is terminal
                return true;
            } else {
                // the word is not recognized if it is empty and the current node is nonterminal
                return false;
            }
        } 
        
        // take the first letter of the string
        let letter = word[0];

        // if there is an edge for this letter
        if (letter in root.children) {
            // then recursively check the subtree rooted at the edge's destination with the remaining characters
            return this.search(word.slice(1), root.children[letter]);
        } else {
            // otherwise the edge does not exist, so this word is not recognized
            return false;
        }
	}
	
	print(root=this.root) {
		for (let letter in root.children) {
			console.log(letter)
			if (root.children[letter].isTerminal) console.log('-')
			this.print(root.children[letter])
		}
	}
}



let trie = new Trie()

trie.insert("zebra")
trie.insert("apple")
trie.insert("apples")
trie.insert("apply")
trie.insert("applies")
console.log(trie)
console.log(trie.search("apple"))
console.log(trie.search("apple", root))
console.log(trie.search("a", root))

trie.print()

// Time Complexity Analysis
// Both Trie#insert and Trie#search require O(m) time where m is the length of the target word. Notice that the complexity is not dependent on the number of words stored in the trie, rather it depends on how long the given word is. This makes sense because we only travel a single path from root to terminal node and this path size is at most the length of the the word.

// Space Complexity Analysis
// The space of a trie will vary greatly depending on how often prefixes are shared among entries. Say we have n words and the maximum length of any word is m. The worst-case trie will have no overlapping prefixes and so it will have O(n*m) characters to store.

// When should we use Tries?
// A trie is useful in scenarios where we have a dictionary of words and need efficient look up to check if a given word is contained in the dictionary. Compared to using a hash-based data structure, such as an Object or a Set, a Trie is guaranteed to be worst-case O(m) where m is the length of the word. Hash-based structures may be worst-cast O(n) where n is the number of entires in the dictionaries due to hash collisions.