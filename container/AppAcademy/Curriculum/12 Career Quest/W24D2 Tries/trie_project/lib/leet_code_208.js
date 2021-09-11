class Node {
	constructor() {
		this.children = {}
		this.isTerminal = false
	}
}

class Trie {
	constructor() {
		this.root = new Node()
	}

	insert(word) {
		let node = this.root

		for (let i = 0; i < word.length; i++) {
			let letter = word[i]

			if(!(letter in node.children)) {
				node.children[letter] = new Node()
			}
			node = node.children[letter]
		}
		node.isTerminal = true
	}

	search(word) {
		let node = this.root
		
		for (let i = 0; i < word.length; i++) {
			let letter = word[i]

			if (!(letter in node.children)) return false

			node = node.children[letter]
		}
		return node.isTerminal
  }
  
  startsWith(word) {
		let node = this.root
		
		for (let i = 0; i < word.length; i++) {
			let letter = word[i]

			if (!(letter in node.children)) return false

			node = node.children[letter]
		}
		return true
  }
}
