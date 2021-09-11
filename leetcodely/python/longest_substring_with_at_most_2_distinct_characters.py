"""Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.
"""
from collections import OrderedDict


class Solution(object):
    def lengthOfLongestSubstringTwoDistinct(self, s):
        """
        :type s: str
        :rtype: int
        """
        max_len = 0
        d = OrderedDict()
        j = 0
        for i in range(len(s)):
            d[s[i]] = d.get(s[i], 0) + 1
            while len(d) > 2:
                if d[s[j]] == 1:
                    d.pop(s[j])
                else:
                    d[s[j]] -= 1
                j += 1
            curr = s[j:i + 1]
            max_len = max(len(curr), max_len)

        return max_len


if __name__ == '__main__':
    solution = Solution()
    print(solution.lengthOfLongestSubstringTwoDistinct("ccaabbb"))
