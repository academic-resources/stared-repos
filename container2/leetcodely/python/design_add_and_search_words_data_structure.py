"""Design a data structure that supports the following two operations:
void addWord(word)
bool search(word)
search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means
 it can represent any one letter."""

"""
Time complexity of add : O(M) where M is length of the word
Space complexity : O(N * M) where N is no of Keys and M is average length of each key

Time complexity Search : O(M) for defined words
and O(N*26^M) for undefined words with dots.
"""


class Trie:
    def __init__(self):
        self.child = {}
        self.is_end = False


class WordDictionary(object):
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.trie_node = Trie()

    def addWord(self, word):
        """
        Adds a word into the data structure.
        :type word: str
        :rtype: void
        """
        curr = self.trie_node
        for i, v in enumerate(word):
            if v not in curr.child:
                curr.child[v] = Trie()
            curr = curr.child[v]
        curr.is_end = True

    def search(self, word):
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        :type word: str
        :rtype: bool
        """
        def _search(_word, index, curr):
            if index == len(_word):
                if not curr.is_end:
                    return False
                else:
                    return True
            if _word[index] == ".":
                for char in curr.child.keys():
                    if _search(_word,  index+1, curr.child[char]):
                        return True
            else:
                if _word[index] in curr.child and _search(_word, index+1, curr.child[_word[index]]):
                    return True
            return False

        return _search(word, 0, self.trie_node)


if __name__ == '__main__':
    wordDictionary = WordDictionary()
    wordDictionary.addWord('bad')
    print(wordDictionary.search('.ad'))