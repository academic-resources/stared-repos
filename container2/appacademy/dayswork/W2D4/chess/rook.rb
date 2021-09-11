require_relative "piece"
require_relative "slideable"

class Rook < Piece
    
include Slideable


  def initialize(color, board, pos)
    super
    @symbol = " ♜ "
  end

  def move_dirs
    LINEAR_DIRS
  end
end