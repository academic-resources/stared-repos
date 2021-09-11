class Solution(object):
    def countNumbersWithUniqueDigits(self, n):
        """
        :type n: int
        :rtype: int
        """
        if n == 0:
            return 1
        if n == 1:
            return 10
        ans, base = 10, 9
        for i in range(1, n):
            base *= (10 - i)
            ans += base
        return ans

if __name__ == '__main__':
    solution = Solution()
    print(solution.countNumbersWithUniqueDigits(2))