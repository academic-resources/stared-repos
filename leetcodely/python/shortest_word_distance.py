"""Created by sgoswami on 7/30/17."""

"""Given a list of words and two words word1 and word2, return the shortest distance between these two words in the
 list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = “coding”, word2 = “practice”, return 3.
Given word1 = "makes", word2 = "coding", return 1."""
import sys


class Solution(object):
    def shortestDistance(self, words, word1, word2):
        """
        :type words: List[str]
        :type word1: str
        :type word2: str
        :rtype: int
        """
        index_map = {}
        for i, v in enumerate(words):
            index_map.setdefault(v, []).append(i)

        word1_list = index_map[word1]
        word2_list = index_map[word2]
        return self.min_distance_between_two_sorted_lists(word1_list, word2_list)

    def min_distance_between_two_sorted_lists(self, arr1, arr2):
        a, b = 0, 0
        curr_min = sys.maxsize
        while a < len(arr1) and b < len(arr2):
            curr_min = min(abs(arr1[a] - arr2[b]), curr_min)
            if arr1[a] < arr2[b] and a < len(arr1):
                a += 1
            elif arr1[a] > arr2[b] and b < len(arr2):
                b += 1
        return curr_min


if __name__ == '__main__':
    solution = Solution()
    print(solution.shortestDistance(["practice", "makes", "perfect", "coding", "makes"], 'practice', 'coding'))
