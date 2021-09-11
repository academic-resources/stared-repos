require_relative "piece"
require_relative "nullpiece"
require_relative "bishop"
require_relative "rook"
require_relative "queen"
require_relative "king"
require_relative "knight"
require_relative "board"
require_relative "pawn"
require_relative "cursor"
require "colorize"

def piece_from_name(str)
  case str.downcase
  when "rook"
    Proc.new { |*args| Rook.new(*args) }
  when "knight"
    Proc.new { |*args| Knight.new(*args) }
  when "bishop"
    Proc.new { |*args| Bishop.new(*args) }
  when "queen"
    Proc.new { |*args| Queen.new(*args) }
  when "king"
    Proc.new { |*args| King.new(*args) }
  when "pawn"
    Proc.new { |*args| Pawn.new(*args) }
  end
end

board = Board.new
cursor = Cursor.new([0, 0], board)

row_0 = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

row_0.each_with_index do |name, i|
  board[[0, i]] = piece_from_name(name).call(:black, board, [0, i])
end

(0..7).each { |i| board[[1, i]] = piece_from_name("pawn").call(:black, board, [0, i]) }
(0..7).each { |i| board[[6, i]] = piece_from_name("pawn").call(:red, board, [0, i]) }

row_0.each_with_index do |name, i|
  board[[7, i]] = piece_from_name(name).call(:red, board, [0, i])
end

board.grid.each_with_index do |row, i|
  row.each_with_index do |col, j|
    cx, cy = cursor.cursor_pos
    on_cursor_pos = i == cx && j == cy
    bg = on_cursor_pos ? :light_red : ((i + j).even? ? :light_yellow : :light_green)
    if col.is_a?(NullPiece)
      print "   ".colorize(:background => bg)
    else
      print " #{col.to_s} ".colorize(:color => col.color, :background => bg)
    end
  end
  print "\n"
end