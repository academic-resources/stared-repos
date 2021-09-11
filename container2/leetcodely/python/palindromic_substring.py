"""Created by sgoswami on 8/3/17."""
"""Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist
 of same characters."""
#TODO: Not passing all test cases


class Solution(object):
    def countSubstrings(self, s):
        """
        :type s: str
        :rtype: int
        """
        ans = 0
        for i in range(2*len(s)):
            left = i//2
            right = i//2 + i % 2
            while left >= 0 and right < len(s) and s[left] == s[right]:
                ans += 1
                left -= 1
                right += 1
        return ans


if __name__ == '__main__':
    solution = Solution()
    print(solution.countSubstrings('fdsklf'))