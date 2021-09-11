require_relative "piece"
require_relative "nullpiece"
require_relative "bishop"
require_relative "rook"
require_relative "queen"
require_relative "king"
require_relative "knight"

require "byebug"


class Board

    attr_accessor :grid

    def self.create_board
      Array.new(8) { Array.new(8) }
      
    end

    def initialize
        @grid = Board.create_board
        populate_board
    end

    def populate_board
      row_0 = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
      row_7 = row_0.reverse

      grid.each_with_index do |row, i|
          grid[0][0] = Rook.new("black", self, [0,0])

        row.each_with_index do |col, j|
          if i <= 1 || i >= 6
            grid[i][j] = Bishop.new("black", self, [i, j])
          else
            grid[i][j] = NullPiece.instance
          end
        end
      end
      grid 
    end

    def move_piece(start_pos, end_pos)
      # debugger
      start_piece = self[start_pos]
      start_piece.set_pos(end_pos)
      # on board?
      # raise "That's not a position on the board" unless on_board?(start_pos)
      # raise "That's not a position on the board" unless on_board?(end_pos)
      # something there?
      raise "There's no piece at that position" if start_piece.is_a?(NullPiece)
      # valid move
      # raise "Not a valid move" unless valid_move?(start_pos, end_pos)
      self[end_pos] = start_piece
      self[start_pos] = NullPiece.instance
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


# b = Board.new
# # b.render
# b.move_piece([0,0],[4,4])