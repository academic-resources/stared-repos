"""Given a matrix of size n X m find the number of unique paths that start from 0,0 of the matrix and end
at n-1,m-1 if you can only move RIGHT and DOWN."""


class Solution:
    def numPaths(self, n, m):
        memo = [[0 for _ in range(m)] for _ in range(n)]

        for i in range(len(memo)):
            memo[i][0] = 1

        for i in range(len(memo[0])):
            memo[0][i] = 1

        for i in range(1, len(memo)):
            for j in range(1, len(memo[0])):
                memo[i][j] = memo[i-1][j] + memo[i][j-1]

        return memo[-1][-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.numPaths(2, 3))