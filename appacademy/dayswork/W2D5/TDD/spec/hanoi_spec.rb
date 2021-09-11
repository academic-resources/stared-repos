require "hanoi"

describe "Hanoi" do

    subject(:hanoi) { Hanoi.new(4)}

    describe "initialize" do

        it "initializes a hanoi" do
            expect(hanoi).to be_a(Hanoi)
        end

        it "takes in a number of disks" do
            expect(hanoi.num_disks).to eq(4)
        end

        it "has 4 disks of decreasing size on the first peg"  do
            expect(hanoi.peg1).to eq([4,3,2,1])
        end

        it "has 0 disks on the 2nd and 3rd pegs"  do
            expect(hanoi.peg2).to eq([])
            expect(hanoi.peg3).to eq([])
        end


    end

    describe "#move" do 
        it "take a two item array as input" do 
            expect(hanoi).to receive(:move).with([1,2])
            hanoi.move([1,2])
        end

        context "when the move is valid" do 
            it "makes a valid move and returns true" do 
                result = hanoi.move([1,2])
                expect(hanoi.peg1).to eq([4,3,2])
                expect(hanoi.peg2).to eq([1])
                expect(result).to be true
            end
        end

        context "when the move is invalid" do 
            it "does not make the move and returns false" do 
                hanoi.move([1,2])
                result = hanoi.move([1,2])
                expect(hanoi.peg1).to eq([4,3,2])
                expect(hanoi.peg2).to eq([1])
                expect(result).to be false
            end
        end
    end

    describe "#won?"  do
        subject(:hanoi) { Hanoi.new(3) }

        it "returns true when won" do 
            hanoi.move([1,2])
            hanoi.move([1,3])
            hanoi.move([2,3])
            hanoi.move([1,2])
            hanoi.move([3,1])
            hanoi.move([3,2])
            hanoi.move([1,2])
            expect(hanoi.won?).to be true
        end

        it "returns false when not won" do 
            hanoi.move([1,2])
            expect(hanoi.won?).to be false
        end

    end


end