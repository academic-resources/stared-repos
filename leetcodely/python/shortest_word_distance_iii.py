"""Created by sgoswami on 8/1/17."""
"""This is a follow up of Shortest Word Distance. The only difference is now word1 could be the same as word2.
Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.
word1 and word2 may be the same and they represent two individual words in the list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].
Given word1 = “makes”, word2 = “coding”, return 1.
Given word1 = "makes", word2 = "makes", return 3."""
import sys

class Solution(object):
    def shortestWordDistance(self, words, word1, word2):
        """
        :type words: List[str]
        :type word1: str
        :type word2: str
        :rtype: int
        """
        index_map = {}
        for i, v in enumerate(words):
            index_map.setdefault(v, []).append(i)

        if word1 == word2:
            lst1 = index_map[word1]
            return self.min_distance_in_a_sorted_list(lst1)
        else:
            lst1 = index_map[word1]
            lst2 = index_map[word2]
            return self.min_distance_between_two_sorted_lists(lst1, lst2)

    def min_distance_in_a_sorted_list(self, lst):
        curr = sys.maxsize
        for i in range(1, len(lst)):
            curr = min(curr, lst[i] - lst[i-1])
        return curr

    def min_distance_between_two_sorted_lists(self, lst1, lst2):
        curr, i, j = sys.maxsize, 0, 0
        while i < len(lst1) and j < len(lst2):
            curr = min(abs(lst1[i] - lst2[j]), curr)
            if lst1[i] < lst2[j] and i < len(lst1):
                i += 1
            elif lst1[i] > lst2[j] and j < len(lst2):
                j += 1
        return curr

if __name__ == '__main__':
    solution = Solution()
    print(solution.shortestWordDistance(["practice", "makes", "perfect", "coding", "makes"], 'makes', 'makes'))
