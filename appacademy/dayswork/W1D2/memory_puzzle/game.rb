require 'byebug'
require_relative "card.rb"
require_relative "board.rb"

class Game

  def initialize
    @board = Board.new
    @board.populate
    @previous_guess = nil
  end 
  
  def play
    # debugger
    while !@board.won?
      @board.render
      card = make_a_guess
      
      card.reveal #place the card face up
      @board.render

      # !@previous_guess ? (@previous_guess = card) : check_for_match
      if !@previous_guess
        @previous_guess = card
      else
        check_for_match(card)
      end
    end
    puts "You won!"
  end
  
  def make_a_guess
    while true
      puts "Please enter the position of the card you'd like to flip (e.g. '2,3')"
      guess = gets.chomp.split(",").map(&:to_i)
      card = @board[guess]
      return card if card.face_down #Exit while loop if player selects a card that is valid (aka facedown) and has NOT already been flipped and matched in previous turn. 
    end  
  end
  
  def check_for_match(card)
    if !(@previous_guess == card) # this line uses == method from Card class, not Ruby's built-in method
      puts "Try again"
      sleep(2)
      @previous_guess.hide
      card.hide
    else
      puts "It's a match!"
      sleep(2)
    end
    @previous_guess = nil
  end
  
end