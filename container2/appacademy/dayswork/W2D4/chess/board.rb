require_relative "piece"
require_relative "nullpiece"
require_relative "bishop"
require_relative "rook"
require_relative "queen"
require_relative "king"
require_relative "knight"
require_relative "pawn"


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

    def piece_from_name(str)
      case str.downcase
      when "rook"
        Proc.new { |*args| Rook.new(*args) }
      when "knight"
        Proc.new { |*args| Knight.new(*args) }
      when "bishop"
        Proc.new { |*args| Bishop.new(*args) }
      when "queen"
        Proc.new { |*args| Queen.new(*args) }
      when "king"
        Proc.new { |*args| King.new(*args) }
      when "pawn"
        Proc.new { |*args| Pawn.new(*args) }
      end
    end

    def populate_board
      row_first = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

      row_first.each_with_index do |name, i|
        self[[0, i]] = piece_from_name(name).call(:black, self, [0, i])
      end

      (0..7).each { |i| self[[1, i]] = piece_from_name("pawn").call(:black, self, [1, i]) }
      (0..7).each { |i| self[[6, i]] = piece_from_name("pawn").call(:white, self, [6, i]) }

      row_first.each_with_index do |name, i|
        self[[7, i]] = piece_from_name(name).call(:white, self, [7, i])
      end

      grid.each_with_index do |row, i|
        row.each_with_index do |col, j|
          if i > 1 && i < 6
            grid[i][j] = NullPiece.instance
          end
        end
      end
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

    def in_check?(color)
      king_pos = nil
      grid.each do |row|
        row.each do |piece|
          if piece.is_a?(King) && piece.color == color
            king_pos = piece.pos
          end
        end
      end
      
      opponents_pieces = []
      grid.each do |row|
        row.each do |piece|
          if piece.color != color && !piece.is_a?(NullPiece)
            opponents_pieces << piece
          end
        end
      end

      attack_moves = []
      opponents_pieces.each do |piece|
        attack_moves += piece.moves
      end
      attack_moves.any? { |pos| pos == king_pos }
    end


    def checkmate?(color)
      return false unless in_check?(color)
      our_pieces = []
      grid.each do |row|
        row.each do |piece|
          if piece.color == color && !piece.is_a?(NullPiece)
            our_pieces << piece
          end
        end
      end
      debugger
      our_pieces.none? { |pc| pc.valid_moves? }
    end

    def dupe
      copy_board = Board.new
      grid.each_with_index do |row, i|
        row.each_with_index do |pc, j|
          if grid[i][j].is_a?(NullPiece)
            copy_board[[i, j]] = NullPiece.instance
          else
            copy_board[[i, j]] = grid[i][j].dup
            copy_board[[i, j]].board = copy_board
          end
        end
      end
      copy_board
    end

end

