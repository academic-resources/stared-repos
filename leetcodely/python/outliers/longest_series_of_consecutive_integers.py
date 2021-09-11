# You've a mxn grid of integers. Find the number which has the longest series of adjacent repetitions.
# In case more than one such number exists, return the higher.(Added this part to the problem definition to make it a
# little more interesting)
# A diagonal repeat is not considered adjacent.(Added this assumption to keep things simple, it can easily be removed)
#
# Example 2 1 1 3
#         2 1 1 2
#         2 2 3 5
# In the above example the number is 2 and the number of repetitions is 4
# Example 2 3 3 2
#         2 3 3 2
#         2 2 3 5
# In this example the answer is 3, both 2 and 3 have 4 adjacent occurences, but 3 is higher than 2, so the answer is 3.

import collections
import unittest


class Solution:
    def __init__(self):
        self.neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        self.maxer = [-1, -1]

    def dfs(self, grid: [list]) -> int:

        def helper(row, col, num, visited, counter):
            visited[row][col] = True
            counter.append(1)

            for neighbor in self.neighbors:
                row, col = row + neighbor[0], col + neighbor[1]
                if 0 <= row < len(grid) and 0 <= col < len(grid[row]) and grid[row][col] == num and not visited[row][
                    col]:
                    helper(row, col, num, visited, counter)

        for i in range(len(grid)):
            for j in range(len(grid[i])):
                vis = [[False for _ in range(len(grid[i]))] for i in range(len(grid))]
                lst = []
                helper(i, j, grid[i][j], vis, lst)
                if len(lst) > self.maxer[1]:
                    self.maxer[0], self.maxer[1] = grid[i][j], len(lst)
                if len(lst) == self.maxer[1]:
                    if self.maxer[0] < grid[i][j]:
                        self.maxer[0] = grid[i][j]
        return self.maxer[0]

    def bfs(self, grid: [list]) -> int:

        def bfs(queue, visited, num, counter):
            while len(queue) > 0:
                row, col = queue.pop()
                visited[row][col] = True
                counter.append(1)
                for neighbor in self.neighbors:
                    row, col = row + neighbor[0], col + neighbor[1]
                    if 0 <= row < len(grid) and 0 <= col < len(grid[row]) and grid[row][col] == num and not \
                    visited[row][col]:
                        queue.appendleft((row, col))

        for i in range(len(grid)):
            for j in range(len(grid[i])):
                visited = [[False for _ in range(len(grid[i]))] for i in range(len(grid))]
                lst = []
                queue = collections.deque()
                queue.appendleft((i, j))
                bfs(queue, visited, grid[i][j], lst)

                if len(lst) > self.maxer[1]:
                    self.maxer[0], self.maxer[1] = grid[i][j], len(lst)
                if len(lst) == self.maxer[1]:
                    if self.maxer[0] < grid[i][j]:
                        self.maxer[0] = grid[i][j]
        return self.maxer[0]


class TestSolution(unittest.TestCase):

    def setUp(self) -> None:
        self.grid = [[2, 3, 3, 1], [2, 3, 3, 2], [2, 2, 3, 5]]
        self.solution = Solution()

    def test_dfs(self):
        self.assertEqual(self.solution.dfs(self.grid), 3)

    def test_bfs(self):
        self.assertEqual(self.solution.bfs(self.grid), 3)


if __name__ == '__main__':
    unittest.main()
