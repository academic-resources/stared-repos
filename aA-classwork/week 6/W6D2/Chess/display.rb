require_relative 'board'
require_relative 'cursor'
require 'colorize'

class Display
    attr_reader :cursor, :board
    def initialize(board=Board.new)
        @board = board
        @cursor = Cursor.new([0,0], @board)
        
    end

    def render
        system("clear")
        color = :black
        
        (0..7).each do |row|
            inner = []
            (0..7).each do |col|
                if cursor.cursor_pos == [row, col]
                    inner << board[[row, col]].symbol.colorize(background: :light_black)
                else 
                    inner << board[[row, col]].symbol.colorize(background: color)
                end
                color = color == :black ? :grey : :black
            end
            puts inner.join('')
            color = color == :black ? :grey : :black
        end
    end

    def play
        loop do
            system("clear")
            render
            @cursor.get_input
        end
    end
end

# self.board.rows.each { |row| p row }

# def render
#     system("clear")
#     puts "  #{(0...size).to_a.join(' ')}"
#     rows.each_with_index do |row, i|
#       puts "#{i} #{row.join(' ')}"
#     end
#   end
# load 'display.rb'
# disp = Display.new
# disp.play

# > [:black,
#  :light_black,
#  :red,
#  :light_red,
#  :green,
#  :light_green,
#  :yellow,
#  :light_yellow,
#  :blue,
#  :light_blue,
#  :magenta,
#  :light_magenta,
#  :cyan,
#  :light_cyan,
#  :white,
#  :light_white,
#  :default]