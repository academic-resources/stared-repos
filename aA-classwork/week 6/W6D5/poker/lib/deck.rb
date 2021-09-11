require_relative "card"

class Deck

  def self.all_cards
    cards = []

    Card.valid_suits.each do |suit|
      Card.valid_values.each do |val|
        cards << Card.new(val, suit)
      end
    end

    cards
  end

  attr_reader :cards

  def initialize
    @cards = Deck.all_cards
  end

end