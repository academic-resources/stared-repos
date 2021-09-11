require "byebug"

module Stepable
KNIGHT_DIF = [
    [1,2], [1,-2], [-1,2], [-1,-2],
    [2,1], [2,-1], [-2,1], [-2,-1]
]
KING_DIF =  [[1,0], [-1,0], [0, 1], [0,-1], 
            [-1,1], [-1,-1], [1,-1], [1,1]]
        
  def moves
    # debugger
    possible_moves = []
    move_dirs.each do |dif|
      dx, dy = dif # flipped logic
      possible_moves += check_pos(pos, dx, dy)
    end
    possible_moves
  end
  
  def check_pos(p, dx, dy)
    new_pos = [p.first + dx, p.last + dy]
    return [] if !board.valid_pos?(new_pos)
    if board[new_pos].is_a?(NullPiece)
      [new_pos]
    elsif board[new_pos].color == color
      []
    else
      [new_pos]
    end
  end

end