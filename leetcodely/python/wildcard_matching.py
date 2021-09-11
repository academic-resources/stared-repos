"""Created by sgoswami on 4/17/17 as part of leetcode"""
"""Implement wildcard pattern matching with support for \'?\' and \'*\'"""
"""
'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).

The matching should cover the entire input string (not partial).

The function prototype should be:
bool isMatch(const char *s, const char *p)

Some examples:
isMatch("aa","a") → false
isMatch("aa","aa") → true
isMatch("aaa","aa") → false
isMatch("aa", "*") → true
isMatch("aa", "a*") → true
isMatch("ab", "?*") → true
isMatch("aab", "c*a*b") → false
"""


class Solution(object):
    def isMatch(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        memo = [[False for _ in range(len(p) + 1)] for _ in range(len(s) + 1)]
        memo[0][0] = True

        for i in range(1, len(memo[0])):
            if p[i - 1] == '*':
                memo[0][i] = memo[0][i - 1]

        for i in range(1, len(memo)):
            for j in range(1, len(memo[i])):
                if s[i - 1] == p[j - 1] or p[j - 1] == '?':
                    memo[i][j] = memo[i - 1][j - 1]
                elif p[j - 1] == '*':
                    memo[i][j] = memo[i - 1][j] or memo[i][j - 1]
        return memo[-1][-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.isMatch('aa', 'a'))
    print(solution.isMatch('aa', 'aa'))
    print(solution.isMatch('aaa', 'aa'))
    print(solution.isMatch('aa', 'a*'))
    print(solution.isMatch('aa', '.*'))
    print(solution.isMatch('ab', '?*'))
    print(solution.isMatch('aab', 'c*a*b'))
    print(solution.isMatch('xaabyc', 'xa*b?c'))

