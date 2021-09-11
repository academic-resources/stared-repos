"""Created by sgoswami on 3/23/17 as part of leetcode"""
"""Given a string s, find the longest palindromic substring in s. You may assume that the maximum
length of s is 1000.
Input: 'babad'
Output: 'bab'
Input: 'cbbd'
Output: 'bb'
"""


class Solution(object):
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        longest = ''
        for i in range(2 * len(s)):
            left = i // 2
            right = i // 2 + i % 2
            while left >= 0 and right < len(s) and s[left] == s[right]:
                sub = s[left:right + 1]
                if len(sub) > len(longest):
                    longest = sub
                left -= 1
                right += 1
        return longest


if __name__ == '__main__':
    solution = Solution()
    print(solution.longestPalindrome('babad'))
