class Piece

  COLORS = :black, :white
  PIECES = "♕"

  attr_accessor :color, :board, :pos


  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos
    @totem = nil
  end

  def move_dirs
  end

  def to_s
    @totem
  end

  def set_pos(pos)
    self.pos = pos
  end
  # def queen   #Remove later
  #  PIECES
  # end
end






