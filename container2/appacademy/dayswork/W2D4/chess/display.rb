require_relative "cursor"
require_relative "board"
require 'colorize'
require "byebug"

class Display

    attr_accessor :board, :cursor

    def initialize()
        @board = Board.new
        @cursor = Cursor.new([0,0], @board)
    end

    def render
        # system("clear")
        @board.grid.each_with_index do |row, i|
            row.each_with_index do |col, j|
                cx, cy = cursor.cursor_pos
                on_cursor_pos = i == cx && j == cy
                bg = on_cursor_pos ? :light_red : ((i + j).even? ? :cyan : :light_black)
                if col.is_a?(NullPiece)
                  print "   ".colorize(:background => bg)  
                else
                  print col.to_s.colorize(:background => bg)  
                end
            end
            print "\n"
        end
    end

    def test
        while true
            render
            puts "Enter move"
            input = cursor.get_input
        end
    end

end

d = Display.new
# d.test

d.board.move_piece([1,5],[2,5])
d.board.move_piece([6,4],[4,4])
d.board.move_piece([1,6],[3,6])
d.board.move_piece([7,3],[3,7])
d.render
# puts
# print d.board[[5,3]].moves
# puts
# puts
# print d.board[[2,3]].moves
# puts
# puts
# print d.board[[2,2]].moves
p d.board.in_check?(:black)
p d.board.checkmate?(:black)

# puts d.board.in_check?(:black)
# puts d.board.in_check?(:white)

# board_copy = d.board.dupe

# board_copy.move_piece([5,5],[3,5])

# p d.board.object_id
# p board_copy[[3,5]].board.object_id


# print d.board[[1,4]].moves
# puts String.colors   
