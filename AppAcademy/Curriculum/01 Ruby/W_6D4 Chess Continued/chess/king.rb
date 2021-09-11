require_relative "piece"
require_relative "stepable"

class King < Piece
    
include Stepable

  def initialize(color, board, pos)
    super
    @symbol = " ♚ "
  end

  def move_dirs
    KING_DIF
  end
end