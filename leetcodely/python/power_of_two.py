"""Given an integer, write a function to determine if it is a power of two."""


class Solution(object):
    def isPowerOfTwo(self, n):
        """
        :type n: int
        :rtype: bool
        """
        if n == 1:
            return True
        num = 1
        while num < n:
            num *= 2
        if n / num == 1:
            return True
        return False


if __name__ == '__main__':
    solution = Solution()
    print(solution.isPowerOfTwo(4))
