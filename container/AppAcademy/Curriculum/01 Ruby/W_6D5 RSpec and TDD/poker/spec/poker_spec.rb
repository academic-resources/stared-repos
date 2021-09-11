require "poker"

describe Card do

  describe "#initialize" do 
    let(:card_1) { Card.new(:spades, "A") }
    it "should initialize with a suit" do 
      expect(card_1.suit).to eq(:spades)
    end

    it "should initialize with a value" do 
      expect(card_1.value).to eq("A")
    end 

  end

end

describe Deck do 
  subject(:our_deck) { Deck.new }

  describe "#initialize" do 

    it "should initialize an array of 52 cards" do 
      expect(Deck.new_deck.length).to eq(52)
      all_cards = our_deck.cards.all? { |card| card.is_a?(Card) }
      expect(all_cards).to be(true)
    end

    it "should contain all unique cards" do
      unique = (0...our_deck.cards.length).each do |i1|
        (i1 + 1..our_deck.cards.length).each do |i2|
          (our_deck.cards[i1].value == our_deck.cards[i2].value && 
           our_deck.cards[i1].suit == our_deck.cards[i2].suit) ? false : true
        end
      end
      expect(unique).to be(true)
      
    end

  end



end

=begin
DECK class 
- should have 52 cards 
- should have shuffle?

CARD class
- should have a suit 
- should have a value 


=end
