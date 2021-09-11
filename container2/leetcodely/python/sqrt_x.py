"""Implement int sqrt(int x).
Compute and return the square root of x."""


class Solution:
    def mySqrt(self, x):
        """
        :type x: int
        :rtype: int
        """
        low, high = 1, x
        while low < high:
            mid = low + (high - low) // 2
            if mid * mid > x:
                high = mid - 1
            elif mid * mid < x:
                low = mid
            else:
                return mid
        return low


if __name__ == '__main__':
    solution = Solution()
    print(solution.mySqrt(9))
