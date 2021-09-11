require_relative "player.rb"

class Game
  attr_reader :dictionary, :fragment
  def initialize(player_1, player_2)
    @player_1 = Player.new(player_1)
    @player_2 = Player.new(player_2)
    @fragment = ""
    @dictionary = Set.new 

    f = File.open("./dictionary.txt", "r") do |f|
        f.each_line do |line|
        @dictionary << line.chomp
      end  
      f.close
    end

  end



  def play_round

    
    until valid_play?(current_player.guess)
      fragment += guess
    end
    
    if dictionary.include?(fragment)  # Is a word, player scored!
      #current player gets a point closer to losing
      #round ends
    else
      next_player!
    end

  end


  def current_player(player)
    current = player
  end



  def previous_player(player)
    previous = player
  end



  def next_player!

  end

  

  def take_turn(player)

  end



  def valid_play?(string)

  end

end
