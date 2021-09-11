require "stock_picker"

describe "StockPicker"  do

    subject(:picker) { StockPicker.new([ 1, 3, 2, 6, 5, 4]) }

    describe "#initialize" do

        it "initializes a stock picker" do
            expect(picker).to be_a(StockPicker)
        end

        it "initializes with prices" do
            expect(picker.prices).to eq([ 1, 3, 2, 6, 5, 4])
        end
            
    end

    describe "#buy_sell" do

        it "returns the day to buy" do
            expect(picker.buy_day).to eq(0)
        end

        it "returns the day to sell" do
            expect(picker.sell_day).to eq(3)
        end
    end

end