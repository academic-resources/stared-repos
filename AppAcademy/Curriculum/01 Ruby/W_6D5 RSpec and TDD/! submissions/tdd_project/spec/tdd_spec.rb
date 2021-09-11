require "tdd"


describe Array do 

  describe "#my_uniq" do   
    let(:arr) { [1, 2, 1, 3, 3] }
    let(:not_arr) { "not array" }

    it "should remove duplicate elements" do   
      expect(arr.my_uniq).to eq([1, 2, 3])
    end 

    it "should raise an error if doesn't return an array" do
      expect do
        (Array).to receive(:my_uniq).and_return(Array)
      end.to raise_error(NoMethodError)
    end
    
    it "should raise an error if it doesn't receive an array" do 
      expect{ :not_arr.my_uniq }.to raise_error(NoMethodError)
    end
    
  end

  describe "#two_sum" do

    let(:arr) { [-1, 0, 2, -2, 1] }
    it "should find pairs of elements that sum to 0" do
      expect(arr.two_sum).to eq([[0, 4], [2, 3]])
    end
    
    let(:arr_2) { [5, 0, 2, -1, -5, 1] }
    it "should prioritize smaller first elements the front of the array" do
      expect(arr_2.two_sum).to eq([[0, 4], [3, 5]])
    end

  end

  describe "#my_transpose" do
    let(:rows) { [[0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8]] }
    it "should returned the rows transposed into collumns" do
      expect(rows.my_transpose).to eq([[0, 3, 6],
                                       [1, 4, 7],
                                       [2, 5, 8]])
    end
    
  end

  describe "#stock_picker" do
    let(:daily_stock_price) { [6, 1, 3, 20, 6, 8] }

    it "should return an array pair representing days (indexes) with the most gain" do 
      expect(daily_stock_price.stock_picker).to eq([1, 3])
    end
  end

end
