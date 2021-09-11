require "towers_of_hanoi"

describe TowersOfHanoi do
  subject(:game) { TowersOfHanoi.new }
 
  describe "#initialize" do

    it "should create an array of 3 empty arrays" do
      expect(game.towers.length).to eq(3)
    end
    
    it "should initialize first array with 4 numbers in descending order" do
      expect(game.towers.first).to eq([4, 3, 2, 1])
    end

  end

  describe "#move" do  
    let(:tower_1) { [4, 3, 2, 1] }
    let(:tower_2) { [] }

    it "should move the top piece of a tower" do
      game.move(tower_1, tower_2)
      expect(tower_1).to eq([4, 3, 2])
      expect(tower_2).to eq([1])
    end

  end
  
end



=begin

class TowersOfHanoi
- initializes 3 tower objects
- use doubles for towers when testing
- initialize left most tower with 4 numbers
   - in order of: 4, 3, 2, 1
- needs a game loop
   - ex. #won? until tower 3 has entire stack in order
- #move method
- prompt user with gets

initialize(towers)
@towers = towers (an array of tower objects)

example game state: (in the middle of the game)
[objectid: @stack[4,3]>, <objectid: @stack:[1]>, <objectid: @stack:[2]>]]
logical understanding:
            [[4,3], [1], [2]]

class Tower
- "First In Last Out" logic for array
- towers should be initialized as empty arrays 
- can only change whatever is on top (end of array)

<META> Rules
- a bigger number cannot be stacked on a smaller number
- Entire stack has to move from tower left to right
- Towers 1, 2, and 3 are ordered: left, midde, right

=end


# game "object" is an instance of TowerOfHanoi Class
# tower 1 "object" is an instance of Tower Class
# tower 2 "object" is an instance of Tower Class
# tower 3 "object" is an instance of Tower Class