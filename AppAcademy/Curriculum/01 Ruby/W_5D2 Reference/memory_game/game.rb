require_relative "board.rb"
require "byebug"

class Game

    def initialize
        @player_1 = HumanPlayer.new
        @player_2 = HumanPlayer.new
        @board = Board.new
        @board.populate
        # @previous_guess
    end

    attr_reader :board, :previous_guess

    def play
        until self.over
            @board.render
            self.player_move
            sleep(2)
            system("clear")
        end
        puts "Congratulations!  Don't do drugs!"
        sleep(2)
    end

    def over
        @board.won?
    end

    def player_move(player) # Player Object
        guess_1 = player.make_first_guess
        self.refresh
        guess_2 = player.make_second_guess
        self.refresh
        if @board[guess_1] == @board[guess_2]
            puts "Match!"
        else
            puts "No Match!"
            @board[guess_1].hide
            @board[guess_2].hide
        end
    end

    def show_card(pos)
        guess = @board.reveal(pos)
        return pos
    end

    def refresh
        system("clear")
        @board.render
    end
    
end