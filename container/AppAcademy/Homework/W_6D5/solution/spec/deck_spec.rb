require 'rspec'
require 'deck'

describe Deck do
  describe "::all_cards" do
    subject(:all_cards) { Deck.all_cards }
    
    it "should generate 52 cards" do
      expect(all_cards.count).to eq(52)
    end

    it "returns all cards without duplicates" do
      expect(
        all_cards.map { |card| [card.suit, card.value] }.uniq.count
      ).to eq(all_cards.count)
    end
  end

  let(:cards) do
    [ double("card", :suit => :spades, :value => :king),
      double("card", :suit => :spades, :value => :queen),
      double("card", :suit => :spades, :value => :jack) ]
  end

  describe "#initialize" do
    it "by default fills itself with 52 cards" do
      deck = Deck.new
      expect(deck.count).to eq(52)
    end

    it "can be initialized with an array of cards" do
      deck = Deck.new(cards)
      expect(deck.count).to eq(3)
    end
  end

  let(:deck) do
    Deck.new(cards.dup)
  end

  it "should not expose its cards" do
    expect(deck).not_to respond_to(:cards)
  end

  describe "#take" do
    # **use the front of the cards array as the top**
    it "takes cards off the top of the deck" do
      expect(deck.take(1)).to eq(cards[0..0])
      expect(deck.take(2)).to eq(cards[1..2])
    end

    it "removes cards from deck on take" do
      deck.take(2)
      expect(deck.count).to eq(1)
    end

    it "doesn't allow you to take more cards than are in the deck" do
      expect do
        deck.take(4)
      end.to raise_error("not enough cards")
    end
  end

  describe "#return" do
    let(:more_cards) do
      [ double("card", :suit => :hearts, :value => :four),
        double("card", :suit => :hearts, :value => :five),
        double("card", :suit => :hearts, :value => :six) ]
    end

    it "should return cards to the deck" do
      deck.return(more_cards)
      expect(deck.count).to eq(6)
    end

    it "should not destroy the passed array" do
      more_cards_dup = more_cards.dup
      deck.return(more_cards_dup)
      expect(more_cards_dup).to eq(more_cards)
    end

    it "should add new cards to the bottom of the deck" do
      deck.return(more_cards)
      deck.take(3) # toss 3 cards away

      expect(deck.take(1)).to eq(more_cards[0..0])
      expect(deck.take(1)).to eq(more_cards[1..1])
      expect(deck.take(1)).to eq(more_cards[2..2])
    end
  end

  describe '#shuffle' do
    it 'should shuffle the cards' do
      cards = deck.take(3)
      deck.return(cards)

      not_shuffled = (1..5).all? do
        deck.shuffle
        shuffled_cards = deck.take(3)
        deck.return(shuffled_cards)

        (0..2).all? { |i| shuffled_cards[i] == cards[i] }
      end

      expect(not_shuffled).to be(false)
    end
  end

  describe '#deal_hand' do
    let(:deck) { Deck.new }

    it 'should return a new hand' do
      hand = deck.deal_hand
      expect(hand).to be_a(Hand)
      expect(hand.cards.count).to eq(5)
    end

    it 'should take cards from the deck' do
      expect do
        deck.deal_hand
      end.to change{ deck.count }.by(-5)
    end
  end
end
