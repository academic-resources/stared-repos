"""Created by sgoswami on 8/1/17."""
"""This is a follow up of Shortest Word Distance. The only difference is now you are given the list of words and your 
method will be called repeatedly many times with different parameters. How would you optimize it?
Design a class which receives a list of words in the constructor, and implements a method that takes two words 
word1 and word2 and return the shortest distance between these two words in the list.
For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = “coding”, word2 = “practice”, return 3.
Given word1 = "makes", word2 = "coding", return 1."""

#TODO: Times out

import sys


class WordDistance(object):
    def __init__(self, words):
        """
        :type words: List[str]
        """
        self.index_map = {}
        for i, v in enumerate(words):
            self.index_map.setdefault(v, []).append(i)

    def shortest(self, word1, word2):
        """
        :type word1: str
        :type word2: str
        :rtype: int
        """
        if word1 == word2:
            return self.shortest_distance_in_list(self.index_map[word1])
        else:
            return self.shortest_distance_between_lists(self.index_map[word1], self.index_map[word2])

    def shortest_distance_in_list(self, lst):
        curr = sys.maxsize
        for i in range(1, len(lst)):
            curr = min(curr, lst[i] - lst[i-1])
        return curr

    def shortest_distance_between_lists(self, lst1, lst2):
        i, j = 0, 0
        curr = sys.maxsize
        while i < len(lst1) and j < len(lst2):
            curr = min(curr, abs(lst1[i] - lst2[j]))
            if lst1[i] < lst2[j] and i < len(lst1):
                i += 1
            elif lst1[i] > lst2[j] and j < len(lst2):
                j += 1
        return curr


if __name__ == '__main__':
    word_distance = WordDistance(["practice", "makes", "perfect", "coding", "makes"])
    print(word_distance.shortest('practice', 'coding'))
