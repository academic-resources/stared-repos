
class Player

  def initialize(name)
    @name = name
    @score = 0
  end

  def guess
    gets.chomp.downcase
  end

  def alert_invalid_guess
    puts "Invalid guess!"
    guess
  end

end