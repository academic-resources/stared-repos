"""Given a string, determine if a permutation of the string could form a palindrome.
For example,
"code" -> False, "aab" -> True, "carerac" -> True."""


class Solution:
    def canPermutePalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """
        check = set()
        for c in s:
            if c in check:
                check.remove(c)
            else:
                check.add(c)
        return len(check) <= 1
