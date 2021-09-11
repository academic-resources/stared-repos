"""Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
"""


class Solution(object):

    def numIslands(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        def dfs(grid, r, c):
            grid[r][c] = '0'
            for (dx, dy) in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nx, ny = r + dx, c + dy
                if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]) and grid[nx][ny] == '1':
                    dfs(grid, nx, ny)
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[i])):
                if grid[i][j] == '1':
                    dfs(grid, i, j)
                    count += 1
        return count


if __name__ == '__main__':
    grid = [['1', '1', '0', '0', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '1', '0', '0'],
            ['0', '0', '0', '1', '1']
            ]
    s = Solution()
    print(s.numIslands(grid))
