require "array"

describe Array do

    subject(:arr) { [1, 2, 1, 3, 3] }

    describe "#my_uniq" do

        it "should remove duplicates from the array" do
            result = arr.my_uniq
            expect(result).to match_array([1,2,3])
        end
    end

    describe "#two_sum" do 
        subject(:arr) { [1,2,3,4,5,-2,-3] }
        let(:result) { arr.two_sum }

        it "should return the correct indices in the right order" do
            expect(result).to eq([[1,5], [2,6]])
        end

    end

    describe "#my_transpose" do
        subject(:arr) {
            [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ]
        }
        let(:transposed) {
            [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ]
        }
        it "transposes an array" do
            result = arr.my_transpose
            expect(result).to eq(transposed)
        end
    end

end