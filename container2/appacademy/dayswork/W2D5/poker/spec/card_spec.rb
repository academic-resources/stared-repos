require "card"

describe "Card" do
  subject(:card) { Card.new(:spades, :queen) }

  describe "#initialize" do
    it "initializes a card correctly" do
      expect(card).to be_a(Card)
      expect(card.suit).to eq(:spades)
      expect(card.value).to eq(:queen)
    end
  end
end
