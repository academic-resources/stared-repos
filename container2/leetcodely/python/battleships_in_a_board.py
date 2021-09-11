"""Created by sgoswami on 4/14/17 as part of leetcode"""
"""Given an 2D board, count how many battleships are in it. The battleships are represented with 'X's, 
empty slots are represented with '.'s. You may assume the following rules:

You receive a valid board, made of only battleships or empty slots.
Battleships can only be placed horizontally or vertically. In other words, they can only be made of the
 shape 1xN (1 row, N columns) or Nx1 (N rows, 1 column), where N can be of any size.
At least one horizontal or vertical cell separates between two battleships - there are no adjacent battleships."""


class Solution(object):

    def countBattleships(self, board):
        """
        :type board: List[List[str]]
        :rtype: int
        """
        checker = [[0 for _ in item] for item in board]
        count = 0
        for i, v in enumerate(board):
            for j, w in enumerate(board[i]):
                if board[i][j] == 'X' and checker[i][j] == 0:
                    count += 1
                    self.helper(board, checker, i, j)

        return count

    def helper(self, board, grid, row, col):
        grid[row][col] = 1
        if row + 1 < len(board) and grid[row + 1][col] == 0 and board[row + 1][col] == 'X':
            self.helper(board, grid, row + 1, col)
        if col + 1 < len(board[row]) and grid[row][col + 1] == 0 and board[row][col +1] == 'X':
            self.helper(board, grid, row, col + 1)
        if row - 1 >= 0 and grid[row - 1][col] == 0 and board[row -1][col] == 'X':
            self.helper(board, grid, row - 1, col)
        if col - 1 >= 0 and grid[row][col - 1] == 0 and board[row][col - 1] == 'X':
            self.helper(board, grid, row, col - 1)
        return
if __name__ == '__main__':
    s = Solution()
    board = [['X', '.', '.', 'X'], ['.', '.', '.', 'X'], ['.', '.', '.', 'X']]
    c = s.countBattleships(board)
    print(c)