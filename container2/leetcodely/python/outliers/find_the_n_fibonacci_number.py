class Solution:
    def findFibonacci(self, n):
        memo = [0 for _ in range(n)]
        memo[1] = 1
        for i in range(2, len(memo)):
            memo[i] = memo[i-1] + memo[i-2]
        return memo[-1]
