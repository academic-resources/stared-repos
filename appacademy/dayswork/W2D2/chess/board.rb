require_relative "./piece.rb"
require "byebug"

class Board

    attr_accessor :grid

    def self.create_board
      chess_board = Array.new(8) { Array.new(8) }
      chess_board.each_with_index do |row, i|
        row.each_with_index do |col, j|
          if i <= 1 || i >= 6
            chess_board[i][j] = Piece.new
          else
            chess_board[i][j] = NullPiece.new
          end
        end
      end
      chess_board 
    end

    def initialize
        @grid = Board.create_board
    end

    def move_piece(start_pos, end_pos)
      # debugger
      start_piece = self[start_pos]
      # on board?
      # raise "That's not a position on the board" unless on_board?(start_pos)
      # raise "That's not a position on the board" unless on_board?(end_pos)
      # something there?
      raise "There's no piece at that position" if start_piece.is_a?(NullPiece)
      # valid move
      # raise "Not a valid move" unless valid_move?(start_pos, end_pos)
      self[end_pos] = start_piece
      self[start_pos] = NullPiece.new
    end

    def valid_pos?(pos)
      x, y = pos
      x >= 0 && x <= 7 && y >= 0 && y <= 7
    end

    def [](pos)
      x, y = pos
      @grid[x][y]
    end

    def []=(pos, piece)
      x, y = pos
      @grid[x][y] = piece
    end

end


b = Board.new
# b.render
b.move_piece([0,0],[4,4])