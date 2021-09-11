class Solution:
    def regionsBySlashes(self, grid: [str]) -> int:
        memo = [[0 for _ in range(len(grid[0])*3)] for _ in range(len(grid)*3)]

        for i in range(0, len(grid)):
            for j in range(0, len(grid[i])):
                if grid[i][j] == '\\':
                    memo[i*3][j*3] = 1
                    memo[i*3+1][j*3+1] = 1
                    memo[i*3+2][j*3+2] = 1
                elif grid[i][j] == '/':
                    memo[i*3][j*3+2] = 1
                    memo[i*3+1][j*3+1] = 1
                    memo[i*3+2][j*3] = 1

        def dfs(grid, r, c):
            memo[r][c] = 1
            for (dx, dy) in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                (nx, ny) = (r + dx, c + dy)
                if 0 <= nx < row and 0 <= ny < col and grid[nx][ny] == 0:
                    dfs(grid, nx, ny)

        row, col = len(memo), len(memo[0])
        count = 0
        for x in range(row):
            for y in range(col):
                if memo[x][y] == 0:
                    dfs(memo, x, y)
                    count += 1
        return count


solution = Solution()
print(solution.regionsBySlashes([" /", "/ "]))



