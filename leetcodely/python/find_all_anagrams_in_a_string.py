"""Created by sgoswami on 9/13/17."""
"""Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be 
larger than 20,100.

The order of output does not matter."""
import collections


class Solution(object):
    def findAnagrams(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: List[int]
        """
        if not s or not p:
            return []
        p_map = dict(collections.Counter(p))
        results = []
        for i in range(len(s)):
            if s[i] in p_map:
                checker = dict(collections.Counter(s[i:i+len(p)]))
                if checker == p_map:
                    results.append(i)
        return results

if __name__ == '__main__':
    solution = Solution()
    print(solution.findAnagrams('cbaebabacd', 'abc'))
