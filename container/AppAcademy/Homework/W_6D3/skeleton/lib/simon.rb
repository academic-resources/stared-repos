class Simon
  COLORS = %w(red blue green yellow)
  SHORTEST_WAIT = 0.15
  WINNING_SCORE = 20

  attr_accessor :sequence_length, :game_over, :seq


  def initialize(sequence_length = 1, game_over = false, seq = [])
    @sequence_length = sequence_length
    @game_over = game_over
    @seq = seq
  end

  def play
    system("clear")
    puts "Let's play Simon!... kind of... Starting with: "
    sleep(1)
    while self.game_over == false
      take_turn
    end
    game_over_message
    reset_game
  end

  def take_turn
    show_sequence
    require_sequence
    self.game_won?
    unless self.game_over == true
      round_success_message
      self.sequence_length += 1
    end
  end

  def show_sequence
    add_random_color
    seq.each { |color| print "#{color} "; wait(1) }
    wait(2)
    system("clear")
  end

  def wait(seconds)
    current_wait = seconds / sequence_length.to_f
    current_wait >= SHORTEST_WAIT ? current_wait : current_wait = SHORTEST_WAIT
    sleep(current_wait)
  end

  def require_sequence
    puts "What is the Sequence??"
    guess = gets.chomp
    self.game_over = true unless guess.split == seq.map(&:to_s)
  end

  def add_random_color
    seq << COLORS.sample
  end

  def round_success_message
    system("clear")
    puts "Very good!  How about another Color!"
    sleep(1)
  end

  def game_won?
    self.game_over = true if self.sequence_length == WINNING_SCORE
  end
  
  def game_over_message
    system("clear")
    if self.game_won?
      puts "YOU WON!! with a sequence of:\n #{@seq.map(&:to_s)}" 
    else
      puts "Aw, too bad!  You lost on Round: #{@sequence_length} with a sequence of:\n #{@seq.map(&:to_s)}"
    end
  end

  def reset_game
    self.sequence_length = 1
    self.game_over = false
    self.seq = []
    puts "Play again: y?"
    response = gets.chomp
    self.play if response == "y"
  end
end

if __FILE__ == $PROGRAM_NAME
  game = Simon.new
  game.play
end
