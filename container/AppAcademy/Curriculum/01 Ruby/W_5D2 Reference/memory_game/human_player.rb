require_relative "board.rb"

class HumanPlayer
  
  attr_reader :previous_guess :next_guess :position

    def initialize
      @previous_guess
      @next_guess
      @position
    end

    
    def make_first_guess
        @previous_guess = self.prompt
    end

    def make_second_guess
        @next_guess = self.prompt
    end

    def prompt
        puts "Please enter an x-coordinate for your guess: "
        guess_x = gets.chomp.to_i
        puts "Please enter a y-coordinate for your guess: "
        guess_y = gets.chomp.to_i
        @position = [guess_y, guess_x]
    end


 

end