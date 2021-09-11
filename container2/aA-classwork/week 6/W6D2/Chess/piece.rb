require 'singleton'
require 'colorize'

class Piece
    attr_reader :board, :color, :name
    attr_accessor :pos
    def initialize(color,board,pos)
        @color = color
        @board = board
        @pos = pos
    end

    # def initialize(name)
    #     @name = name
    # end

    def symbol
        '  ♕  '.colorize(color)
    end

    def to_s
        self.symbol
    end

    def empty?
        false
    end

    def valid_moves
        moves.select { |move| !move_into_check?(move) }
    end

    def pos=(pos)
        @pos = pos
    end

    def move_into_check?(end_pos)
        dupe = @board.dupe
        dupe.move_piece!(pos, end_pos)
        dupe.in_check?(color)
    end

end



class NullPiece < Piece
    include Singleton
    def initialize()
        
    end

    def symbol
        "     "
    end

    def moves
        []
    end

    def empty?
        true
    end

end
