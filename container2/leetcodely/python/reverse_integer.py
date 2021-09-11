"""Given a 32-bit signed integer, reverse digits of an integer."""


class Solution(object):
    def reverse(self, x):
        """
        :type x: int
        :rtype: int
        """

        if str(x)[0] == '-':
            res = -int(str(x)[1:][::-1])
        else:
            res = int(str(x)[::-1])

        if (-1 << 31) < res < (1 << 31):
            return res
        else:
            return 0


if __name__ == '__main__':
    solution = Solution()
    print(solution.reverse(-123))
