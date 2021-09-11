require "rspec"
require "dessert"

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! 
Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef", :name => "harry") }
  subject(:dessert) { Dessert.new("cherry", 10, chef) }

  describe "#initialize" do
    it "sets a type" do
      expect(dessert.type).to eq("cherry")
    end

    it "sets a quantity" do
      expect(dessert.quantity).to eq(10)
    end

    it "starts ingredients as an empty array" do
      expect(dessert.ingredients).to be_empty
    end

    it "raises an argument error when given a non-integer quantity" do
      expect { Dessert.new("foo", "num", chef) }.to raise_error(ArgumentError)
    end
  end

  describe "#add_ingredient" do
    before(:each) { dessert.add_ingredient("foo") }
    it "adds an ingredient to the ingredients array" do
      expect(dessert.ingredients).to include("foo")
    end
  end

  describe "#mix!" do
    before(:each) do
      dessert.add_ingredient("a")
      dessert.add_ingredient("b")
      dessert.add_ingredient("c")
      dessert.add_ingredient("d")
      dessert.add_ingredient("e")
      dessert.mix!
    end
    it "shuffles the ingredient array" do
      expect(dessert.ingredients.join("")).to_not eq ("abcde")
    end
  end

  describe "#eat" do
    before(:each) { dessert.eat(1) }
    it "subtracts an amount from the quantity" do
      expect(dessert.quantity).to eq(9)
    end

    it "raises an error if the amount is greater than the quantity" do
      expect { dessert.eat(999) }.to raise_error("not enough left!")
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      allow(chef).to receive(:titleize).and_return("Chef Harry the Great Baker")
      expect(dessert.serve).to start_with("Chef Harry the Great Baker")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      allow(chef).to receive(:bake)
      expect(chef).to receive(:bake)
      dessert.make_more
    end
  end
end
