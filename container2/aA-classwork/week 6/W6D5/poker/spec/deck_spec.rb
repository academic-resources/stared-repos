require "deck"

describe Deck do

    subject(:deck) {Deck.new}

    describe "#initialize"


    it "should create an array of 52 unique card instances" do
        expect(deck.cards.uniq.count).to eq(52)
        deck.cards.each do |card|
            expect(card).to be_a(Card)
        end
    end


end