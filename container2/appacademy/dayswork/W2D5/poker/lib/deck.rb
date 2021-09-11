class Deck
  VALUES = [:ace, :two, :three, :four, :five, :six, :seven, :eight, :nine,
            :ten, :jack, :queen, :king]

  SUITS = [:clubs, :hearts, :diamonds, :spades]

  attr_reader :cards

  def initialize
    @cards = create_cards
    shuffle_cards
  end

  def shuffle_cards
    @cards.shuffle!
  end

  def values
    VALUES
  end

  def suits
    SUITS
  end

  def deal(num)
    temp = cards.take(cards.count - num)
    hand = @cards - temp
    @cards = temp
    hand
  end

  private

  def create_cards
    pairs = VALUES.product(SUITS)
    pairs.map do |pair|
      value, suit = pair
      Card.new(suit, value)
    end
  end
end
