"""Created by sgoswami on 7/18/17."""

"""Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be 
segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not 
contain duplicate words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code"."""


class Solution(object):
    def wordBreak(self, s, wordDict):
        """
        :type s: str
        :type wordDict: List[str]
        :rtype: bool
        """
        memo = [False for _ in range(len(s) + 1)]
        memo[0] = True
        for i in range(1, len(s) + 1):
            for w in wordDict:
                if memo[i - len(w)] and s[i - len(w):i] == w:
                    memo[i] = True
        return memo[-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.wordBreak('applepieapple', ['apple', 'pie']))
