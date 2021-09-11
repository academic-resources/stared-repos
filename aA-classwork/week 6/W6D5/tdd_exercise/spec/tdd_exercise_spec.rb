require "tdd_exercise"

describe '#my_uniq' do
  let(:arr) {[1,2,2,3,3,4,5]}
  
  it 'raises an error if arg is not an array' do
      expect { my_uniq('str')}.to raise_error(ArgumentError)
  end

  it 'removes duplicates from an array' do
      expect(my_uniq(arr)).to eq([1,2,3,4,5])
  end

  it 'returns an array' do
      expect(my_uniq(arr)).to be_a(Array)
  end

  it 'does not call ruby #uniq' do 
      expect(arr).to_not receive(:uniq)
      my_uniq(arr)
  end
end

describe '#two_sum' do
  let(:arr) { [1,0,-1,3,2,-3] }

  it 'raises an error if arg is not an array' do
    expect { two_sum('str')}.to raise_error(ArgumentError)
  end

  it 'returns an array of indexes of pairs that sum to zero' do
    expect(two_sum(arr)).to eq( [[0,2], [3,5]] )
  end

  it 'return two uniq indexes' do
    expect(two_sum(arr)).to_not eq( [[0,2], [1,1], [3,5]] )
  end
end

describe '#my_transpose' do
    let(:arr) {[[0,1,2],[3,4,5],[6,7,8]]}

    it 'does not call ruby #transpose' do 
      expect(arr).to_not receive(:transpose)
      my_transpose(arr)
    end

    it 'returns a transposed array' do
        expect(my_transpose(arr)).to eq([[0,3,6],[1,4,7],[2,5,8]])
    end
end

describe '#pick_stocks' do
  let(:arr) { [1,2,5,1] }

  it 'returns indexes of the most profitable pair' do
    expect( pick_stocks(arr) ).to eq( [0,2] )
  end 

  let(:arr_1) { [5,1,2] }
  it 'wont let you sell stock before buying' do
    expect( pick_stocks(arr_1) ).to_not eq( [0,1] )
  end

  let(:arr_2) { [5,4,3,2,1] }
  it 'will return nil if there are no profitable days' do
    expect( pick_stocks(arr_2) ).to be_nil
  end

end

describe '#towers_of_hanoi' do
  subject(:game) { Towers_of_Hanoi.new }

  describe '#initialize' do
    it 'initializes three rods as arrays' do
      expect(game.rods).to be_a(Array)
      expect(game.rods.size).to eq(3)
    end

    it 'starts with all disks on rod1' do
      expect(game.rods[0]).to eq([1,2,3])
      expect(game.rods[1]).to be_empty
      expect(game.rods[2]).to be_empty
      
    end
  end

  describe '#move_disk' do
    subject(:move_test) { Towers_of_Hanoi.new }
  
    context 'when rod is valid' do
      it 'moves the disk to the rod' do
        move_test.rods = [[1],[2],[3]]
        move_test.move_disk(0, 1)
        expect(move_test.rods[0]).to eq([])
        expect(move_test.rods[1]).to eq([1,2])
        expect(move_test.rods[2]).to eq([3])
      end
    end

    context 'when rod is invalid' do
      it 'raises an error that says \'not a valid move\'' do
        move_test.rods = [[1],[2],[3]]
        expect { move_test.move_disk(2, 1) }.to raise_error('not valid move')
      end
    end

  end

  describe "#won" do
    subject(:almost_won_game) { Towers_of_Hanoi.new }
    
    it 'checks to see if stack has been rebuilt on another rod' do
      almost_won_game.rods = [[],[2,3],[1]]

      expect( almost_won_game.won? ).to be false
      almost_won_game.move_disk(2, 1)
      expect( almost_won_game.won? ).to be true
    end
  end

end

