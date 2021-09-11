require_relative "piece"
require_relative "stepable"

class Knight < Piece
    
include Stepable


  def initialize(color, board, pos)
    super
    @totem = "♘"
  end

  def move_dirs
    KNIGHT_DIF
  end
end