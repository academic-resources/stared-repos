require_relative "piece"
require_relative "slideable"

class Bishop < Piece
    
include Slideable
  
  def initialize(color, board, pos)
    super
    @totem = "♗"
  end

  def move_dirs
    DIAGONAL_DIRS
  end
end