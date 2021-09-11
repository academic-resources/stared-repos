require_relative "board"
require_relative "card"

class Game

    attr_accessor :board, :previous_guess

    def initialize
        @board = Board.new
        @board.populate
        @previous_guess = nil
    end

    
    def play
        until @board.won? do
            system("clear")
            @board.render
            puts 'Enter your guess: (ex: 0,3)'
            pos = gets.chomp
            make_guess(pos)
        end
    end
    
    def make_guess(pos)
        if @previous_guess == nil
            @previous_guess = @board[pos]
            @board[pos].reveal
        else
            if @board[pos].face_value == @previous_guess.face_value
                @board[pos].reveal
                @previous_guess.reveal
            else
                @board[pos].reveal
                @board.render
                sleep(2)
                @board[pos].hide
                @previous_guess.hide
            end
            @previous_guess = nil
        end
    end

end

new_game = Game.new
new_game.play

