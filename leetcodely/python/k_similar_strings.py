"""Strings A and B are K-similar (for some non-negative integer K) if we can swap the positions of two letters in A
exactly K times so that the resulting string equals B.
Given two anagrams A and B, return the smallest K for which A and B are K-similar.
Example 1:
Input: A = "ab", B = "ba"
Output: 1

Example 2:
Input: A = "abc", B = "bca"
Output: 2

Example 3:
Input: A = "abac", B = "baca"
Output: 2
"""
from collections import deque


class Solution(object):
    def kSimilarity(self, A, B):
        """
        :type A: str
        :type B: str
        :rtype: int
        """
        queue = deque()
        queue.appendleft(A)
        while len(queue) > 0:
            pass
