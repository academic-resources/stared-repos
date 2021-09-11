require "byebug"

class Board
  attr_accessor :cups

  def self.fresh_cups
    board = Array.new(14) {[]}
    board.each_index do |i|
      if (i >= 0 && i < 6) || (i > 6 && i < 13)
        board[i] = [:stone, :stone, :stone, :stone]
      end
    end
  end

  def initialize(name1, name2)
    @name1 = name1
    @name2 = name2
    @cups = Board.fresh_cups
    @store1 = @cups[6]
    @store2 = @cups[13]
  end

  def place_stones
    [:stone, :stone, :stone, :stone]
  end

  def valid_move?(start_pos)
    unless (0..5).include?(start_pos) || (7..12).include?(start_pos)
      raise "Invalid starting cup" 
      return false
    end
    if cups[start_pos].empty?
      raise "Starting cup is empty" 
      return false
    end
    true
  end

  def make_move(start_pos, current_player_name)
    stones = cups[start_pos]
    cups[start_pos] = []
    new_pos = start_pos + 1
    new_pos = 0 if new_pos > 13
    until stones.empty?
      new_pos += 1 if current_player_name == @name1 && new_pos == 13
      new_pos += 1 if current_player_name == @name2 && new_pos == 6
      new_pos = 0 if new_pos > 13
      cups[new_pos] << :stone 
      stones = stones.drop(1)
      new_pos += 1 unless stones.empty? || @cups[new_pos] == 1
    end
    render
    next_turn(new_pos)
  end

  def next_turn(ending_cup_idx)
    return :prompt if ending_cup_idx == 6 || ending_cup_idx == 13
    return :switch if cups[ending_cup_idx].count == 1
    return ending_cup_idx if !cups[ending_cup_idx].empty?
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    @cups[0..5].all?(&:empty?) || @cups[7..12].all?(&:empty?)
  end

  def winner
    return :draw if @cups[13].count == @cups[6].count
    @cups[6].count > @cups[13].count ? @name1 : @name2
  end
end

