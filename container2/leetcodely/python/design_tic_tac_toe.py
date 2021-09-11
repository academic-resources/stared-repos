"""Created by sgoswami on 4/15/17 as part of leetcode"""
"""Design a Tic-tac-toe game that is played between two players on a n x n grid.
You may assume the following rules:
A move is guaranteed to be valid and is placed on an empty block.
Once a winning condition is reached, no more moves is allowed.
A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game."""


class TicTacToe(object):
    def __init__(self, n):
        """
        Initialize your data structure here.
        :type n: int
        """
        self.size = n
        self.board = [['_' for _ in range(n)] for _ in range(n)]

    def move(self, row, col, player):
        """
        Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins.
        :type row: int
        :type col: int
        :type player: int
        :rtype: int
        """
        char = 'X' if player == 1 else '0'
        self.board[row][col] = char
        if self.row_check(char, col) or self.col_check(char, row) or self.right_diagonal_check(
                char) or self.left_diagonal_check(char):
            return player
        return 0

    def row_check(self, char, col):
        for i in range(self.size):
            if self.board[i][col] != char:
                return False
        return True

    def col_check(self, char, row):
        for i in range(self.size):
            if self.board[row][i] != char:
                return False
        return True

    def right_diagonal_check(self, char):
        j = 0
        for i in range(self.size):
                if self.board[i][j] != char:
                    return False
                j += 1
        return True

    def left_diagonal_check(self, char):
        i = self.size -1
        for j in range(self.size):
            if self.board[i][j] != char:
                return False
            i -= 1
        return True

if __name__ == '__main__':
    t = TicTacToe(2)
    #t.move(2)
    print(t.move(0,1,1))
    print(t.move(1,1,2))
    print(t.move(1,0,1))




# Your TicTacToe object will be instantiated and called as such:
# obj = TicTacToe(n)
# param_1 = obj.move(row,col,player)