class TowersOfHanoi

  attr_accessor :towers

  def initialize
    @towers = Array.new(3) { [] }
    @towers[0] = [4, 3, 2, 1]
  end

  def move(first_tower, second_tower)
    piece = towers[first_tower].last.pop
    towers[second_tower].push(piece)
  end

end