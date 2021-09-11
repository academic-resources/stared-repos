require_relative "piece"
require "byebug"

class Pawn < Piece
 
  def initialize(color, board, pos)
    super
    @symbol = " ♟ "
    @moved = false
    @dir = color == :black ? 1 : -1
  end

  def moves
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

  def move_dirs
    # debugger
    available_moves = []
    row_ahead = pos[0] + @dir
    piece_ahead = board[[row_ahead, pos[1]]]
    if piece_ahead.is_a?(NullPiece)
      available_moves << [1 * @dir, 0]
    end
    
    piece_2_ahead = board[[row_ahead + 1, pos[1]]]
    if piece_2_ahead.is_a?(NullPiece)
      available_moves << [2 * @dir, 0] unless has_moved?
    end

    pos_right = [row_ahead, pos[1] - @dir]
    piece_right = board[pos_right]
    if opponent_piece?(piece_right)
      available_moves << [@dir, -@dir]
    end
    
    pos_left = [row_ahead, pos[1] + @dir]
    piece_left = board[pos_left]
    if opponent_piece?(piece_left)
      available_moves << [@dir, @dir]
    end
    available_moves
  end

  def has_moved?
    @moved = true unless self.pos[0] == home_row
  end

  def home_row
    color == :black ? 1 : 6
  end

end