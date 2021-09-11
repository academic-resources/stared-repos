"""Created by sgoswami on 10/24/17."""

"""Given a string, find the length of the longest substring T that contains at most k distinct characters.
For example, Given s = “eceba” and k = 2,
T is "ece" which its length is 3."""

class Solution(object):
    def lengthOfLongestSubstringKDistinct(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: int
        """
        char_count = {}
        start, end = 0, 1
        max_len, curr_unique_count = 0, 1
        while end < len(s):
            if s[end] in char_count:
                char_count[s[end]] += 1
            else:
                char_count[s[end]] = 1
                curr_unique_count += 1

            if curr_unique_count <= k:
                curr_substring = s[start:end + 1]
                max_len = max(len(curr_substring), max_len)
            else:
                char_count[s[start]] -= 1
                curr_unique_count -= 1
                start += 1
            end += 1
        return max_len

if __name__ == '__main__':
    solution = Solution()
    print(solution.lengthOfLongestSubstringKDistinct('eceba', 2))






