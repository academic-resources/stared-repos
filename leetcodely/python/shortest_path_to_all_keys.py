"""We are given a 2-dimensional grid. "." is an empty cell, "#" is a wall, "@" is the starting point, ("a", "b", ...)
are keys, and ("A", "B", ...) are locks.

We start at the starting point, and one move consists of walking one space in one of the 4 cardinal directions.
We cannot walk outside the grid, or walk into a wall.  If we walk over a key, we pick it up.  We can't walk over a
lock unless we have the corresponding key.

For some 1 <= K <= 6, there is exactly one lowercase and one uppercase letter of the first K letters of the English
alphabet in the grid.  This means that there is exactly one key for each lock, and one lock for each key; and also that
the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys.  If it's impossible, return -1."""
import re
from collections import deque


class Solution(object):
    def shortestPathAllKeys(self, grid):
        """
        :type grid: List[str]
        :rtype: int
        """
        g = [list(item) for item in grid]
        total = set()
        queue = deque()

        for i in range(len(grid)):
            for j in range(len(grid[j])):
                if grid[i][j] == 'a' or grid[i][j] == 'b' or grid[i][j] == 'c' or grid[i][j] == 'd' or grid[i][
                    j] == 'e' or grid[i][j] == 'f':
                    total.add(grid[i][j])

        for i in range(len(grid)):
            for j in range(len(grid[j])):
                if grid[i][j] == '@':
                    queue.appendleft((i, j))
                    break

        while len(queue) > 0:
            pass


if __name__ == '__main__':
    solution = Solution()
    print(solution.shortestPathAllKeys(["@.a.#", "###.#", "b.A.B"]))
