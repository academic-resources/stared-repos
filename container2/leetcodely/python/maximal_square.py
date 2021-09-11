"""Created by sgoswami on 9/3/17."""
"""Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

For example, given the following matrix:

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0


Return 4."""


class Solution(object):
    def maximalSquare(self, matrix):
        """
        :type matrix: List[List[str]]
        :rtype: int
        """
        # if len(matrix) == 0:
        #     return 0
        # memo = [[0 for _ in range(len(matrix) + 1)] for _ in range(len(matrix) + 1)]
        # max_size = 0
        # for i in range(1, len(memo)):
        #     for j in range(1, len(memo[i])):
        #         if matrix[i-1][j-1] == '1':
        #             memo[i][j] = min(memo[i - 1][j - 1], memo[i - 1][j], memo[i][j - 1]) + 1
        #             max_size = max(memo[i][j], max_size)
        # return max_size * max_size
        if len(matrix) == 0:
            return 0
        memo = [[0 for _ in range(len(matrix) + 1)] for i in range(len(matrix) + 1)]
        max_size = 0
        for i in range(1, len(matrix)):
            for j in range(1, len(matrix[i])):
                if matrix[i-1][j-1] == '1':
                    memo[i][j] = min(memo[i - 1][j - 1], memo[i - 1][j], memo[i][j - 1]) + 1
                    max_size = max(max_size, memo[i][j])
        return max_size * max_size


if __name__ == '__main__':
    solution = Solution()
    print(solution.maximalSquare([['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'],
                                  ['1', '0', '0', '1', '0']]))
