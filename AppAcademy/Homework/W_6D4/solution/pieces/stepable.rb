module Stepable
  def moves
    move_diffs.each_with_object([]) do |(dx, dy), moves|
      cur_x, cur_y = pos
      pos = [cur_x + dx, cur_y + dy]

      next unless board.valid_pos?(pos)

      if board.empty?(pos)
        moves << pos
      elsif board[pos].color != color
        moves << pos
      end
    end
  end

  private

  def move_diffs
    # subclass implements this
    raise NotImplementedError
  end
end
