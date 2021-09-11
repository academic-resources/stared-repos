require "card"
require "deck"

describe "Deck" do
  subject(:deck) { Deck.new }
  describe "#initialize" do
    it "initializes a deck" do
      expect(deck).to be_a(Deck)
      expect(deck.cards.count).to eq(52)
      expect(deck.cards[0]).to be_a(Card)

      pristine = deck.values.product(deck.suits)
      expect(deck.cards).to_not eq(pristine)
    end
  end

  describe "#deal" do
    it "deals the specified number of cards" do
      deal = deck.deal(5)
      expect(deal.count).to eq(5)
      expect(deal[0]).to be_a(Card)
      expect(deck.cards.count).to eq(47)
    end
  end
end
