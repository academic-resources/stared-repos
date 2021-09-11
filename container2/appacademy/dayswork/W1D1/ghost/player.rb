class Player

    def initialize(name)
        @name = name
    end

    def guess
        print "Make a guess "
        gets.chomp
    end

    def alert_invalid_guess
        puts "Invalid guess"
    end

end