class Card 
   SUIT_STRINGS = {
    :clubs    => "♣",
    :diamonds => "♦",
    :hearts   => "♥",
    :spades   => "♠"
  }

  VALUE_STRINGS = {
    :deuce => "2",
    :three => "3",
    :four  => "4",
    :five  => "5",
    :six   => "6",
    :seven => "7",
    :eight => "8",
    :nine  => "9",
    :ten   => "10",
    :jack  => "J",
    :queen => "Q",
    :king  => "K",
    :ace   => "A"
  }
  attr_accessor :suit, :value

  def initialize(suit, value)
    @suit = suit 
    @value = value 
  end

end



class Deck 
  attr_accessor :cards
  
  def self.new_deck 
    new_deck = Array.new(52) { Card.new(:spades, :three) }
  end

  def initialize(cards=Deck.new_deck)
    @cards = cards 
  end



end