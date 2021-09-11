class Player
  attr_reader :name, :hand, :pot

  def initialize(name, pot, deck)
    @name = name
    @hand = []
    @pot = pot
    @deck = deck
  end

  def receive_cards(num)
    raise "Invalid number of cards" if num == 4
    raise "5 cards must be dealt on initial deal" unless (num == 5 && hand.empty?)
    @hand += @deck.deal(num)
  end
end
