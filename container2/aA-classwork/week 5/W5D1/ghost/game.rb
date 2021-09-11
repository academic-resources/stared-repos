require_relative './player.rb'

class Game

    

    def initialize(names)
        @players = []
        names.each do |name| 
            @players << Player.new(name)
        end
        @current_player = @players[0]
        @previous_player = nil
        @fragment = ""
        @dictionary = {}
        File.open("dictionary.txt").each do |line|
            @dictionary[line] = true
        end
    end

    
    def run
        while players.length > 1
            play_round
        end
    end

    def play_round
        @players.each do |player|
            if !take_turn(player)
                @players[@current_player] += 1
                @fragment = ''
            else
                @next_player!
            end
        end
    end

    def current_player
        @players[@current_player]
    end

    def previous_player
        @previous_player != '' ? @players[@previous_player]: nil
    end

    def next_player!
        if more_than_one_player
        idx = @players.keys.index(@current_player)
        found = false
        while !found
            candidate = @
        end
        end
    end

    def take_turn(player)
        valid = false
        while !valid
            letter = player.guess
            if valid_play?(letter)
                valid = true
            else
                player.alert_invalid_guess
            end
        end
        @fragment += letter
        if @dictionary.has_key?(@fragment)
            puts 'oops!' 
            return false
        end
        true
    end

    def valid_play?(letter)
        in_alphabet = ("a".."z").to_a.include?(letter.downcase)
        return false if !in_alphabet
        proposed_fragment = @fragment + letter.downcase
        @dictionary.keys.any? { |key| key.include?(proposed_fragment) }
    end

end


gm = Game.new(["rich", "jm"])
p gm.valid_play?("x")