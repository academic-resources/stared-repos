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
        system("clear")

        @board.grid.each_with_index do |row, i|
            row.each_with_index do |col, j|
                cx, cy = cursor.cursor_pos
                on_cursor_pos = i == cx && j == cy
                bg = on_cursor_pos ? :light_red : ((i + j).even? ? :light_yellow : :light_green)
                if col.is_a?(NullPiece)
                  print "   ".colorize(:background => bg)  
                else
                  print " #{col.to_s} ".colorize(:color => :black, :background => bg)  
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
d.test
# d.board.move_piece([0,0],[4,4])
# print d.board[[4,4]].moves
# print d.board[[1,4]].moves
