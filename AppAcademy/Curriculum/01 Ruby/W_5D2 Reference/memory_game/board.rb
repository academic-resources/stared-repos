require_relative "card.rb"
require "byebug"

class Board
    
    def initialize
        @grid = Array.new(4) {Array.new(4)}
        # self.populate
    end

    def populate
        card_pairs = (1..8).to_a + (1..8).to_a
        shuffled_cards = card_pairs.shuffle

        @grid.each_with_index do |row, i1|
            row.each_with_index do |col, i2|
                random_card = Card.new(shuffled_cards.pop, true)
                @grid[i1][i2] = random_card
            end
        end
    end

    def render
      puts "  0 1 2 3"
      @grid.each_with_index do |row, i1|
        print i1.to_s + " "
        row.each_with_index do |col, i2|
          pos = @grid[i1][i2]
          if pos.face_down == true
            print "  "
          else
            print pos.to_s + " "
          end
        end
        print "\n"
      end
    end

    def won?
      @grid.flatten.all? { |card| card.face_down == false }
    end

    def reveal(guessed_pos)
      row, col = guessed_pos
      guess = @grid[row][col]
      if guess.face_down == true
        guess.reveal
        return guess.to_s
      end
    end

    def [](pos)
      x, y = pos
      @grid[x.to_i][y.to_i]
    end
end
