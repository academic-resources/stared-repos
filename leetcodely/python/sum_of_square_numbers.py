"""Created by sgoswami on 8/8/17."""
"""Given a non-negative integer c, your task is to decide whether there're two integers a and b 
such that a2 + b2 = c."""
import math


class Solution(object):
    def judgeSquareSum(self, c):
        """
        :type c: int
        :rtype: bool
        """
        if c < 0:
            return False
        start, end = 0, round(math.sqrt(c))
        while start <= end:
            curr = start * start + end * end
            if curr < c:
                start += 1
            elif curr > c:
                end -= 1
            else:
                return True
        return False


if __name__ == '__main__':
    solution = Solution()
    print(solution.judgeSquareSum(25))