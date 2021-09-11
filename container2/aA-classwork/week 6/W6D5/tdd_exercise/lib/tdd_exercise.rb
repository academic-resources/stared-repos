def my_uniq(arr)
    raise ArgumentError unless arr.is_a?(Array)
    unique = []
    arr.each do |ele|
        unique << ele unless unique.include?(ele)
    end
    unique
end

def two_sum(arr)
  raise ArgumentError unless arr.is_a?(Array)

  result = []

  (0...arr.length - 1).each do |idx_1|
    (idx_1 + 1...arr.length).each do |idx_2|
      result << [idx_1, idx_2] if arr[idx_1] + arr[idx_2] == 0
    end
  end

  result
end

def my_transpose(arr)
    raise ArgumentError unless arr.is_a?(Array)
    transposed = []
    (0...arr.length).each do |idx|
        inner = []
        arr.each do |ele|
            inner << ele[idx]
        end
        transposed << inner
    end
    transposed
end

def pick_stocks(arr)
  most_profitable_pair = nil
  greatest_profit = 0

  (0...arr.length - 1).each do |idx_1|
    (idx_1...arr.length).each do |idx_2|
      profit = arr[idx_2] - arr[idx_1]
      if profit > greatest_profit
        greatest_profit = profit 
        most_profitable_pair = [idx_1, idx_2]
      end
    end
  end

  most_profitable_pair
end

class Towers_of_Hanoi

  attr_accessor :rods

  def initialize
   @rods = [[1,2,3],[],[]]
  end

  def move_disk(start_rod, end_rod)
    if self.rods[end_rod].empty? || self.rods[end_rod].first > self.rods[start_rod].first
      self.rods[end_rod].unshift( self.rods[start_rod].shift ) 
    else
      raise "not valid move"
    end
  end

  def won?
    self.rods[1].length == 3 || self.rods[2].length == 3
  end

  def play
    until won?
      p self.rods
      begin 
        puts 'Enter a rod to move from:'
        start_rod = gets.chomp.to_i - 1
        raise 'Choose a number between 1 and 3' unless start_rod.between?(0,2)
        raise 'There are no disks here' if self.rods[start_rod].empty?
        puts "Enter a rod to move to:"
        end_rod = gets.chomp.to_i - 1
        raise 'Choose a number between 1 and 3' unless end_rod.between?(0,2)
        move_disk(start_rod, end_rod)
      rescue RuntimeError => e
        puts e.message
        retry
      end
    end
    puts "YOU WIN!"
  end

end

# p Towers_of_Hanoi.new.play
