"""Implement a trie with insert, search, and startsWith methods."""
from collections import defaultdict


class Trie(object):

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = TrieNode()

    def insert(self, word):
        """
        Inserts a word into the trie.
        :type word: str
        :rtype: void
        """
        curr = self.root
        for w in word:
            node = curr.children.get(w)
            if not node:
                node = TrieNode()
                curr.children[w] = node
            curr = node
        curr.end_of_word = True

    def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        curr = self.root
        for w in word:
            node = curr.children.get(w)
            if not node:
                return False
            curr = node
        return curr.end_of_word

    def startsWith(self, prefix):
        """
        Returns if there is any word in the trie that starts with the given prefix.
        :type prefix: str
        :rtype: bool
        """
        curr = self.root
        for p in prefix:
            node = curr.children.get(p)
            if not node:
                return False
            curr = node
        return True


class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.end_of_word = False
