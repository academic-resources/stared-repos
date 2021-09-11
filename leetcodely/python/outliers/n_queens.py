"""Given nxn board place n queens on this board so that they don't attack each other. Find ONE placement of
queens which do not attack each other. """


class Solution:

    def findNQueens(self, n: int) -> list:
        grid = [[0 for _ in range(n)] for _ in range(n)]
        solved = self.helper(n, 0, grid)
        if solved:
            return grid
        else:
            return None

    def helper(self, n, row, grid):
        if n == row:
            return True
        for col in range(n):
            if self.is_safe(row, col, grid):
                grid[row][col] = 1
                if self.helper(n, row + 1, grid):
                    return True
                else:
                    grid[row][col] = 0
        return False

    def is_safe(self, row, col, grid):
        for i in range(len(grid)):
            if grid[row][i] == 1 or grid[i][col] == 1:
                return False
        i = 1
        while row - i >= 0 and col - i >= 0:
            if grid[row - i][col - i] == 1:
                return False
            i += 1
        i = 1
        while row + i < len(grid) and col + i < len(grid):
            if grid[row + i][col + i] == 1:
                return False
            i += 1
        return True


if __name__ == '__main__':
    solution = Solution()
    print(solution.findNQueens(4))
