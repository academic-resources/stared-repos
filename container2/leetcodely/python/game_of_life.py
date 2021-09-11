""" According to the Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton
devised by the British mathematician John Horton Conway in 1970."
Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its
eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia
article):

    Any live cell with fewer than two live neighbors dies, as if caused by under-population.
    Any live cell with two or three live neighbors lives on to the next generation.
    Any live cell with more than three live neighbors dies, as if by over-population..
    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

Write a function to compute the next state (after one update) of the board given its current state."""


class Solution(object):
    def gameOfLife(self, board):
        """
        :type board: List[List[int]]
        :rtype: void Do not return anything, modify board in-place instead.
        """
        dummy = [[0 for _ in range(len(board[0]))] for _ in range(len(board))]
        for i in range(len(board)):
            for j in range(len(board[i])):
                count = self.get_live_neighbors(i, j, len(board), len(board[0], board))
                if board[i] == 1:
                    if count < 2 or count > 3:
                        dummy[i][j] = 0
                    else:
                        dummy[i][j] = 1
                else:
                    if count == 3:
                        dummy[i][j] = 1
        return dummy

    def get_live_neighbors(self, r, c, row, col, grid):
        if r - 1 >= 0 and r + 1 < row and c - 1 >= 0 and c + 1 < col:
            return grid[r - 1][c - 1] + grid[r - 1][c] + grid[r - 1][c + 1] + grid[r][c + 1] + grid[r + 1][c + 1] + \
                   grid[r + 1][c] + \
                   grid[r + 1][c - 1] + grid[r][c - 1]
        elif r - 1 < 0 and r + 1 < row and c - 1 >= 0 and c + 1 < col:
            return grid[r][c + 1] + grid[r + 1][c + 1] + grid[r + 1][c] + grid[r + 1][c - 1] + grid[r][c - 1]
        elif r - 1 >= 0 and r + 1 >= row and c - 1 >= 0 and c + 1 < col:
            return grid[r - 1][c - 1] + grid[r - 1][c] + grid[r - 1][c + 1] + grid[r][c + 1] + grid[r][c - 1]
        elif r - 1 >= 0 and r + 1 < row and c - 1 < 0 and c + 1 < col:
            return grid[r - 1][c] + grid[r - 1][c + 1] + grid[r][c + 1] + grid[r + 1][c + 1] + grid[r + 1][c]
        elif r - 1 >= 0 and r + 1 < row and c - 1 < 0 and c + 1 >= col:
            return grid[r - 1][c - 1] + grid[r - 1][c] + grid[r + 1][c] + grid[r + 1][c - 1] + grid[r][c - 1]
        elif r - 1 < 0 and r + 1 < row and c - 1 < 0 and c + 1 < col:
            return grid[r][c + 1] + grid[r + 1][c + 1] + grid[r + 1][c]
        elif r - 1 >= 0 and r + 1 >= row and c - 1 >= 0 and c + 1 >= col:
            return grid[r - 1][c - 1] + grid[r - 1][c] + grid[r][c - 1]
        elif r - 1 < 0 and r + 1 >= row and c - 1 >= 0 and c + 1 < col:
            return grid[r][c + 1] + grid[r][c - 1]
        elif r - 1 >= 0 and r + 1 < row and c - 1 < 0 and c + 1 >= col:
            return grid[r - 1][c] + grid[r + 1][c]
        elif r - 1 < 0 and r + 1 >= row and c - 1 < 0 and c + 1 < col:
            return grid[r][c + 1]
        else:
            return 0








