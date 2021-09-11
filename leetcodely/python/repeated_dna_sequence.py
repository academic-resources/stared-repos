"""Created by sgoswami on 8/22/17."""
"""All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". 
When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.
Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.
For example,
Given s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",

Return:
["AAAAACCCCC", "CCCCCAAAAA"]."""
import collections


class Solution(object):
    def findRepeatedDnaSequences(self, s):
        """
        :type s: str
        :rtype: List[str]
        """
        if not s or len(s) < 10:
            return []
        sequence_map = collections.Counter([s[i:i+10] for i in range(len(s))])
        return [k for k, v in sequence_map.items() if v > 1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.findRepeatedDnaSequences("AAAAAAAAAAA"))