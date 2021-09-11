require 'yaml'
require_relative 'board'

class MinesweeperGame
  LAYOUTS = {
    small: { grid_size: 9, num_bombs: 10 },
    medium: { grid_size: 16, num_bombs: 40 },
    large: { grid_size: 32, num_bombs: 160 } # whoa.
  }.freeze

  def initialize(size)
    layout = LAYOUTS[size]
    @board = Board.new(layout[:grid_size], layout[:num_bombs])
  end

  def play
    until @board.won? || @board.lost?
      puts @board.render

      action, pos = get_move
      perform_move(action, pos)
    end

    if @board.won?
      puts "You win!"
    elsif @board.lost?
      puts "**Bomb hit!**"
      puts @board.reveal
    end
  end

  private

  def get_move
    action_type, row_s, col_s = gets.chomp.split(",")

    [action_type, [row_s.to_i, col_s.to_i]]
  end

  def perform_move(action_type, pos)
    tile = @board[pos]

    case action_type
    when "f"
      tile.toggle_flag
    when "e"
      tile.explore
    when "s"
      # won't quit on save, just hit ctr-c to do that.
      save
    end
  end

  def save
    puts "Enter filename to save at:"
    filename = gets.chomp

    File.write(filename, YAML.dump(self))
  end
end

if $PROGRAM_NAME == __FILE__
  # running as script

  case ARGV.count
  when 0
    MinesweeperGame.new(:small).play
  when 1
    # resume game, using first argument
    YAML.load_file(ARGV.shift).play
  end
end
