"""Given an integer, write a function to determine if it is a power of three."""


class Solution(object):
    def isPowerOfThree(self, n):
        """
        :type n: int
        :rtype: bool
        """
        if n <= 0 or n > 1162261467:
            return False
        return 1162261467 % n == 0


if __name__ == '__main__':
    solution = Solution()
    print(solution.isPowerOfThree(45))
