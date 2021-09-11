require_relative "piece"

class Pawn < Piece
    
  def initialize(color, board, pos)
    super
    @totem = "♙"
  end

  def move_dirs
    # KING_DIF
  end
end