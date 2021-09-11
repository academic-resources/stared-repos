"""Created by sgoswami on 8/30/17."""
"""Implement pow(x, n)."""


class Solution(object):
    def myPow(self, x, n):
        """
        :type x: float
        :type n: int
        :rtype: float
        """
        if n == 0:
            return 1
        if n < 0:
            return 1 / self.myPow(x, -n)
        if n % 2 == 0:
            return self.myPow(x * x, n/2)
        else:
            return self.myPow(x, n - 1) * x

