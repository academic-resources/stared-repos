require_relative "../chess/piece"
require_relative "../chess/nullpiece"
require_relative "../chess/bishop"
require_relative "../chess/rook"
require_relative "../chess/queen"
require_relative "../chess/king"
require_relative "../chess/knight"
require_relative "../chess/board"
require_relative "../chess/pawn"
require_relative "../chess/cursor"
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
row_7 = row_0.reverse

row_0.each_with_index do |name, i|
  board[[0, i]] = piece_from_name(name).call(:black, board, [0, i])
end

(0..7).each { |i| board[[1, i]] = piece_from_name("pawn").call(:black, board, [0, i]) }
(0..7).each { |i| board[[6, i]] = piece_from_name("pawn").call(:red, board, [0, i]) }

row_7.each_with_index do |name, i|
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
