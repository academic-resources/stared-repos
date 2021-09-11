require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end


describe Dessert do
  let(:chef) { double("chef") }
  subject(:brownie) { Dessert.new("brownie", 50, ingredients = []) }
  
  describe "#initialize" do
    it "sets a type" do
      expect(brownie.type).to eq("brownie")
    end
    
    it "sets a quantity" do
      expect(brownie.quantity).to eq(50)
    end
    
    it "starts ingredients as an empty array" do
      expect(brownie.ingredients).to be_empty
    end
    
    it "raises an argument error when given a non-integer quantity" do
      expect { Dessert.new("brownie", "fifty", ingredients = []) }.to raise_error(ArgumentError)
    end
  end
  
  describe "#add_ingredient" do
    it "adds an ingredient to the ingredients array" do
      expect(brownie.ingredients).to_not include('chocolate')
      brownie.add_ingredient('chocolate')
      expect(brownie.ingredients).to include('chocolate')
    end
  end
  
  describe "#mix!" do
    it "shuffles the ingredient array" do
      brownie.add_ingredient('eggs')
      brownie.add_ingredient('chocolate')
      brownie.add_ingredient('vegetable oil')
      brownie.add_ingredient('flour')
      brownie.mix!
      expect(brownie.ingredients).to contain_exactly('chocolate', 'eggs', 'flour', 'vegetable oil')
    end
  end
  
  describe "#eat" do
    it "subtracts an amount from the quantity" do
      brownie.eat(5)
      expect(brownie.quantity).to eq(45)
    end
    
    context "when eating more than quantity" do
      subject(:brownie) { Dessert.new("brownie", 5, ingredients = []) }
      it "raises an error if the amount is greater than the quantity" do
        expect { brownie.eat(6) }.to raise_error(RuntimeError, "not enough left!")
      end
    end
  end
  
  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      allow(chef).to receive(:titleized)
    end
  end
  
  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      expect(chef).to receive(:bake).with(brownie)
      brownie.make_more
    end
  end
end
