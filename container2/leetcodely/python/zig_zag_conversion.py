"""Created by sgoswami on 3/23/17 as part of leetcode"""
"""The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to
display this pattern in a fixed font for better legibility).
P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: 'PAHNAPLSIIGYIR'
Write the code that will take a string and make this conversion given a number of rows:
string convert(string text, int nRows)"""

class Solution(object):
    def convert(self, s, numRows):
        """
        :type s: str
        :type numRows: int
        :rtype: str
        """