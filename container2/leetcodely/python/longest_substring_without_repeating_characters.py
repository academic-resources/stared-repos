"""Created by sgoswami on 3/23/17 as part of leetcode"""
import unittest

"""Given a string, find the length of the longest substring without repeating characters.
Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a
subsequence and not a substring.
Given bpfbhmipx the answer is 7."""


class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        index_map = {}
        j = 0
        max_len = 0
        for i in range(len(s)):
            if s[i] in index_map:
                j = max(j, index_map[s[i]] + 1)
            index_map[s[i]] = i
            max_len = max(i - j + 1, max_len)
        return max_len


class TestSolution(unittest.TestCase):

    def test_one(self):
        self.assertEqual(Solution().lengthOfLongestSubstring("abcabcbb"), 3)

    def test_two(self):
        self.assertEqual(Solution().lengthOfLongestSubstring("bbbbb"), 1)

    def test_three(self):
        self.assertEqual(Solution().lengthOfLongestSubstring("pwwkew"), 3)

    def test_four(self):
        self.assertEqual(Solution().lengthOfLongestSubstring(" "), 1)

    def test_five(self):
        self.assertEqual(Solution().lengthOfLongestSubstring("dvdf"), 3)


if __name__ == '__main__':
    unittest.main()
