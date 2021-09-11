"""Created by sgoswami on 7/9/17."""
"""A message containing letters from A-Z is being encoded to numbers using the following mapping:
'A' -> 1
'B' -> 2
...
'Z' -> 26
Given an encoded message containing digits, determine the total number of ways to decode it.
For example,
Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).
The number of ways decoding "12" is 2."""


class Solution(object):
    def numDecodings(self, s):
        """
        :type s: str
        :rtype: int
        """

        if s == '' or s == '0':
            return 0
        elif len(s) == 1:
            return 1
        memo = [0 for _ in range(len(s) + 1)]
        memo[0] = 1
        memo[1] = 1 if s[0] != '0' else 0
        for i in range(2, len(s)+1):
            single = int(s[i-1:i])
            double = int(s[i-2:i])
            if 0 < single <= 9:
                memo[i] += memo[i-1]
            if 9 < double <= 26:
                memo[i] += memo[i-2]
        return memo[-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.numDecodings('1221'))
