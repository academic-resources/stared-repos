"""Implement atoi to convert a string to an integer.
Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself
 what are the possible input cases.
Notes: It is intended for this problem to be specified vaguely (ie, no given input specs).
You are responsible to gather all the input requirements up front."""
import sys


class Solution:
    def myAtoi(self, str):
        """
        :type str: str
        :rtype: int
        """
        if len(str) == 0:
            raise ValueError('Empty string')
        cleaned = str.strip()
        if cleaned[0] == '-':
            sign = -1
            cleaned = cleaned[1:]
        elif cleaned[0] == '+':
            sign = 1
            cleaned = cleaned[1:]
        else:
            sign = 1
        cleaned = cleaned[::-1]
        num = 0
        place = 1

        for c in cleaned:
            if not c.isdigit():
                raise ValueError('NaN')
            if -sys.maxsize < num + int(c) * place < sys.maxsize:
                num += int(c) * place
                place *= 10
        return num * sign


if __name__ == '__main__':
    solution = Solution()
    print(solution.myAtoi('-34'))
