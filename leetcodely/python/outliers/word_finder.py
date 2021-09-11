"""
Given a 2D grid of letters and a word find all the possible paths that can be used to form the word.
Directions: horizontal, vertical or diagonal to any coordinate with a distance of 1.
Constraint: Each path has to be a unique set of coordinates.

Example: Given the following grid,

S T A R
A R T Y
X K C S
T R A P

And the word,
START
The answer is 4

Paths (row, col):
path1:    0 0   0 1   1 0   1 1    1 2
path2:    0 0   0 1   0 2   1 1    1 2
path3:    0 0   0 1   1 0   0 3    1 2
path4:    2 3   1 2   0 2   1 1    0 1

"""


class WordFinder:
    def __init__(self):
        self.neighbors = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

    def find_all_paths(self, grid, word):
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[i])):
                if grid[i][j] == word[0]:
                    visited = [[False for _ in range(len(grid[0]))] for _ in range(len(grid))]
                    result = []
                    self.helper(grid, i, j, visited, word, 0, result, [])
                    count += len(result)
        return count

    def helper(self, grid, row, col, visited, word, index, result, curr):
        if index == len(word) - 1:
            result.append(curr[:])
            curr = []
        adjacent = []
        for item in self.neighbors:
            adjacent.append([row + item[0], col + item[1]])
        for adj in adjacent:
            if 0 <= adj[0] < len(grid) and 0 <= adj[1] < len(grid[0]):
                if not visited[adj[0]][adj[1]]:
                    if index + 1 < len(word) and grid[adj[0]][adj[1]] == word[index + 1]:
                        visited[adj[0]][adj[1]] = True
                        curr.append(grid[adj[0]][adj[1]])
                        self.helper(grid, adj[0], adj[1], visited, word, index + 1, result, curr)
                        visited[adj[0]][adj[1]] = False


if __name__ == '__main__':
    word_finder = WordFinder()
    print(word_finder.find_all_paths(
        [['s', 't', 'a', 'r'], ['a', 'r', 't', 'y'], ['x', 'k', 'c', 's'], ['t', 'r', 'a', 'p']],
        "start"))
