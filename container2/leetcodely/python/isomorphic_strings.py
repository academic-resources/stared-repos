"""Created by sgoswami on 7/31/17."""
"""Given two strings s and t, determine if they are isomorphic.
Two strings are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters. 
No two characters may map to the same character but a character may map to itself.

For example,
Given "egg", "add", return true.
Given "foo", "bar", return false.
Given "paper", "title", return true."""


class Solution(object):
    def isIsomorphic(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        # every char should be mapped to another unique char
        # the mapped char should map back to the original char
        if len(s) != len(t):
            return False
        d1, d2 = {}, {}
        for i in range(len(s)):
            if s[i] in d1 and d1[s[i]] != t[i] or t[i] in d2 and d2[t[i]] != s[i]:
                return False
            d1[s[i]] = t[i]
            d2[t[i]] = s[i]
        return True

if __name__ == '__main__':
    solution = Solution()
    print(solution.isIsomorphic('egg', 'add'))

