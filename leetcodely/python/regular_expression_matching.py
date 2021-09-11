"""Created by sgoswami on 7/9/17."""
"""Implement regular expression matching with support for '.' and '*'.
'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

The function prototype should be:
bool isMatch(const char *s, const char *p)

Some examples:
isMatch("aa","a") ? false
isMatch("aa","aa") ? true
isMatch("aaa","aa") ? false
isMatch("aa", "a*") ? true
isMatch("aa", ".*") ? true
isMatch("ab", ".*") ? true
isMatch("aab", "c*a*b") ? true"""


class Solution(object):

    def isMatch(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        memo = [[False for _ in range(len(p)+1)] for _ in range(len(s)+1)]
        memo[0][0] = True

        for i in range(1, len(memo[0])):
            if p[i-1] == '*':
                memo[0][i] = memo[0][i-2]
        for i in range(1, len(memo)):
            memo[i][0] = False

        for i in range(1, len(memo)):
            for j in range(1, len(memo[i])):
                if s[i-1] == p[j-1] or p[j - 1] == '.':
                    memo[i][j] = memo[i-1][j-1]
                elif p[j-1] == '*':
                    memo[i][j] = memo[i][j-2]
                    if p[j-2] == s[i-1] or p[j-2] == '.':
                        memo[i][j] = memo[i][j] or memo[i-1][j]
                else:
                    memo[i][j] = False
        return memo[-1][-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.isMatch('aa', 'a'))
    print(solution.isMatch('aa', 'aa'))
    print(solution.isMatch('aaa', 'aa'))
    print(solution.isMatch('aa', 'a*'))
    print(solution.isMatch('aa', '.*'))
    print(solution.isMatch('ab', '.*'))
    print(solution.isMatch('aab', 'c*a*b'))
    print(solution.isMatch('xaabyc', 'xa*b.c'))
