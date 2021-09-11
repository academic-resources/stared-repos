# Game doesn't work, but specs pass.  Were we to complete it?

class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def play
    until game_over
      take_turn
    end
    game_over_message
    reset_game
  end

  def take_turn
    show_sequence
    require_sequence
    round_success_message
    self.sequence_length += 1
  end

  def show_sequence
    add_random_color
  end

  def require_sequence
    print "Copy the sequence "
    guess = gets.chomp
    if seq.last != guess
      reset_game
    end
  end

  def add_random_color
    self.seq << COLORS.sample
  end

  def round_success_message
    puts "Correct"
  end

  def game_over_message
    puts "Game over"
  end

  def reset_game
    self.sequence_length = 1
    self.game_over = false
    self.seq = []
  end
end
