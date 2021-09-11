"""Created by sgoswami on 10/4/17."""
"""Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1."""

class Solution(object):
    def firstUniqChar(self, s):
        """
        :type s: str
        :rtype: int
        """
        frequency = {}
        for c in s:
            if c not in frequency:
                frequency[c] = 1
            else:
                frequency[c] += 1

        for i in range(len(s)):
            if frequency[s[i]] == 1:
                return i
        return -1
