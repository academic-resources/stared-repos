require "colorize"

class Piece

  attr_accessor :color, :board, :pos, :symbol

  def initialize(color, board, pos)
    @color = color
    # puts "My position is #{pos}"
    @board = board
    @pos = pos
    @symbol = nil
  end

  def inspect
    "#{color} #{pos} #{self.to_s}"
  end

  def move_dirs
  end

  def opponent_piece?(piece)
    return false if piece.nil?
    !piece.is_a?(NullPiece) && piece.color != self.color
  end

  def to_s
    @symbol.colorize(color)
  end

  def set_pos(pos)
    self.pos = pos
  end

  def valid_moves?
    moves.none? do |move|
      debugger
      move_into_check(move)
    end
  end

  def move_into_check(move)
    dupe = board.dupe
    dupe.move_piece(pos, move)
    dupe.in_check?(color)
  end

end








