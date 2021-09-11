require_relative "mancala"
require "byebug"

class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @player_1_name = name1
    @player_2_name = name2
    @cups = Array.new(14) { Array.new }
    @cups = @cups.map.with_index do |cup, i|
      if (i == 6 || i == 13)
        cup
      else
        [:stone, :stone, :stone, :stone]
      end
    end
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
  end

  def valid_move?(start_pos)
    raise "Invalid starting cup" unless (start_pos <= 12 && start_pos >= 0)
    raise "Starting cup is empty" if empty_cup?(start_pos)
  end

  def make_move(start_pos, current_player_name)
    num_stones = cups[start_pos].count
    cups[start_pos] = []
    side = (current_player_name == @player_1_name ? 1 : 2)
    skip_cup = (side == 1) ? 13 : 6
    i = 1
    prev_cup = start_pos
    while i <= num_stones
      next_cup = (prev_cup + 1) % 14
      if next_cup == skip_cup
        prev_cup = skip_cup
        next_cup = (prev_cup + 1) % 14
      end
      cups[next_cup] << :stone
      prev_cup = next_cup
      i += 1
    end
    render
    next_turn(next_cup, current_player_name)
  end

  def next_turn(ending_cup_idx, current_player_name)
    # helper method to determine whether #make_move returns :switch, :prompt, or ending_cup_idx
    count = cups[ending_cup_idx].count
    return :prompt if ((ending_cup_idx == 6 && current_player_name == @player_1_name) ||
                       (ending_cup_idx == 13 && current_player_name != @player_1_name))
    return :switch if count == 1
    return ending_cup_idx
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    (0..5).to_a.all? { |i| cups[i].count == 0 } ||
    (7..12).to_a.all? { |i| cups[i].count == 0 }
  end

  def winner
    return :draw if cups[6].count == cups[13].count
    return @player_1_name if cups[6].count > cups[13].count
    @player_2_name
  end

  def empty_cup?(pos)
    pos = pos <= 6 ? pos - 1 : pos
    cups[pos].empty?
  end
end
