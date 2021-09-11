require_relative "piece"
require_relative "stepable"

class Knight < Piece
    
include Stepable


  def initialize(color, board, pos)
    super
    @symbol = " ♞ "
  end

  def move_dirs
    KNIGHT_DIF
  end
end