require_relative 'card'
require 'byebug'

class Board

    LETTERS = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'].sample(16)

    def initialize
        @grid = Array.new(4) {Array.new(4)}
    end

    attr_accessor :grid

    def populate
        i = 0
        @grid.each do |arr|
            arr.each_with_index do |ele, idx|
                arr[idx] = Card.new(LETTERS[i])
                i += 1
            end
        end
    end

    def render
        @grid.each do |arr|
            values = arr.map do |card|
                card.display
            end
            p values
        end
    end

    def won?
        # debugger
        @grid.all? do |arr|
            arr.all? {|card| !card.face_down}
        end
    end

    def reveal(guessed_pos)
        @grid[guessed_pos].reveal if @grid[guessed_pos].face_down
    end

    def [](pos)
        @grid[pos[0].to_i][pos[2].to_i]
    end


end



