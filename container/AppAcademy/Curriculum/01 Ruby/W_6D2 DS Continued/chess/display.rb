require_relative "./cursor.rb"
require_relative "./board.rb"
require "byebug"

class Display

    attr_accessor :board, :cursor

    def initialize()
        @board = Board.new
        @cursor = Cursor.new([0,0], @board)
    end

    def render
        # need to clear screen
        puts "  0  1  2  3  4  5  6  7 "
        # debugger
        @board.grid.each_with_index do |row, i|
            print "#{i} "
            row.each do |col|
                if col.is_a?(NullPiece)
                  print " _ "  
                else
                  print " #{col.inspect} "
                end
            end
            print "\n"
        end
    end

end


d = Display.new
d.render