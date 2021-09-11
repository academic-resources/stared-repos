class Card

    VALID_SUITS = [ :clubs, :hearts, :spades, :diamonds ]
    VALID_VALUES = [ :ace, :two, :three, :four, :five, :six, :seven, :eight, :nine, :ten, :jack, :queen, :king ]

    attr_reader :value, :suit

    def initialize(value, suit)
        @value = value
        @suit = suit
    end

    def self.valid_suits
      VALID_SUITS
    end

    def self.valid_values
      VALID_VALUES
    end

end