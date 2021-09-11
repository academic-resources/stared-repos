"""Created by sgoswami on 6/9/17."""


class Solution(object):
    def solveNQueens(self, n):
        """
        :type n: int
        :rtype: List[List[str]]
        """
        result = []
        grid = [['.' for _ in range(n)] for _ in range(n)]
        self.helper(n, 0, grid, result)
        return result

    def helper(self, n, row, grid, result):
        if n == row:
            g = grid[:]
            result.append(["".join(item) for item in g])
            return
        for col in range(n):
            if self.is_safe(row, col, grid):
                grid[row][col] = 'Q'
                self.helper(n, row + 1, grid, result)
                grid[row][col] = '.'

    def is_safe(self, row, col, board):
        for i in range(len(board)):
            if board[row][i] == 'Q' or board[i][col] == 'Q':
                return False
        i = 0
        while row - i >= 0 and col - i >= 0:
            if board[row - i][col - i] == 'Q':
                return False
            i += 1
        i = 0
        while row + i < len(board) and col + i < len(board):
            if board[row + i][col - i] == 'Q':
                return False
            i += 1
        i = 1
        while row + i < len(board) and col - i >= 0:
            if board[row + i][col - i] == 'Q':
                return False
            i += 1
        i = 1
        while row - i >= 0 and col + i < len(board):
            if board[row - i][col + i] == 'Q':
                return False
            i += 1
        return True


if __name__ == '__main__':
    solution = Solution()
    print(solution.solveNQueens(4))
