"""Given a 2D grid, each cell is either a wall 'W', an enemy 'E' or empty '0' (the number zero), return the maximum
enemies you can kill using one bomb. The bomb kills all the enemies in the same row and column from the planted point
until it hits the wall since the wall is too strong to be destroyed.
Note that you can only put the bomb at an empty cell."""


class Solution:
    def maxKilledEnemies(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        max_kills = 0
        for i in range(len(grid)):
            for j in range(len(grid[i])):
                if grid[i][j] == '0':
                    kills = self.total_kills(i, j, grid)
                    max_kills = max(max_kills, kills)
        return max_kills

    def total_kills(self, row, col, grid):
        count = 0
        i = col
        while i >= 0:
            if grid[row][i] == 'E':
                count += 1
            elif grid[row][i] == 'W':
                break
            i -= 1
        i = col
        while i < len(grid[0]):
            if grid[row][i] == 'E':
                count += 1
            elif grid[row][i] == 'W':
                break
            i += 1
        i = row
        while i >= 0:
            if grid[i][col] == 'E':
                count += 1
            elif grid[i][col] == 'W':
                break
            i -= 1
        i = row
        while i < len(grid):
            if grid[i][col] == 'E':
                count += 1
            elif grid[i][col] == 'W':
                break
            i += 1
        return count


if __name__ == '__main__':
    solution = Solution()
    print(solution.maxKilledEnemies([["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]))
