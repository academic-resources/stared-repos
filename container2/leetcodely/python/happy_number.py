"""Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by
the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it
loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Example: 19 is a happy number

12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1"""


class Solution:
    def isHappy(self, n):
        """
        :type n: int
        :rtype: bool
        """
        check = set()
        while 1:
            total = 0
            for c in str(n):
                total += int(c) ** 2
            if total == 1:
                return True
            elif total in check:
                return False
            else:
                check.add(total)
            n = total


if __name__ == '__main__':
    solution = Solution()
    print(solution.isHappy(19))
