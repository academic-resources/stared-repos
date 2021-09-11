from collections import defaultdict


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def add(self, word):
        curr = self.root
        for letter in word:
            node = curr.children.get(letter)
            if not node:
                node = TrieNode()
                curr.children[letter] = node
            curr = node
        curr.end_of_word = True

    def search(self, word):
        curr = self.root
        for w in word:
            node = curr.children.get(w)
            if not node:
                return False
            curr = node
        return curr.end_of_word

    def all_words_beginning_with_prefix(self, prefix):
        curr = self.root
        for letter in prefix:
            node = curr.children.get(letter)
            if curr is None:
                raise KeyError("Prefix not in Trie")
            curr = node
        result = []

        def _find(n, p):
            if n.end_of_word:
                result.append(p)
            for k, v in n.children.items():
                _find(v, p + k)

        _find(curr, prefix)
        return result


class TrieNode:
    def __init__(self):
        self.children = {}
        self.end_of_word = False


if __name__ == '__main__':
    trie = Trie()
    trie.add('foobar')
    trie.add('foo')
    trie.add('bar')
    trie.add('foob')
    trie.add('foof')

    print(list(trie.all_words_beginning_with_prefix('foo')))
