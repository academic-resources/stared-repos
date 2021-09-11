require_relative './tie_breaker'

module PokerHands
  include TieBreaker

  RANKS = [
    :royal_flush,
    :straight_flush,
    :four_of_a_kind,
    :full_house,
    :flush,
    :straight,
    :three_of_a_kind,
    :two_pair,
    :one_pair,
    :high_card
  ]

  def rank
    RANKS.each do |rank|
      return rank if self.send("#{rank}?")
    end
  end

  def <=>(other_hand)
    if self == other_hand
      0
    elsif rank != other_hand.rank
      RANKS.reverse.index(rank) <=> RANKS.reverse.index(other_hand.rank)
    else
      tie_breaker(other_hand)
    end
  end

  protected
  def card_value_count(value)
    @cards.map(&:value).count(value)
  end

  def high_card
    @cards.sort.last
  end

  def cards_without(value)
    @cards.select { |card| card.value != value }
  end

  def has_a?(value_or_suit)
    @cards.any? do |card|
      card.value == value_or_suit || card.suit == value_or_suit
    end
  end

  def royal?
    Card.royal_values.all? { |value| @cards.map(&:value).include?(value) }
  end

  def set_card(n)
    cards.find { |card| card_value_count(card.value) == n }
  end

  private
  def royal_flush?
    royal? && straight_flush?
  end

  def straight_flush?
    straight? && flush?
  end

  def four_of_a_kind?
    @cards.any? { |card| card_value_count(card.value) == 4 }
  end

  def full_house?
    three_of_a_kind? && one_pair?
  end

  def flush?
    @cards.map(&:suit).uniq.length == 1
  end

  def straight?
    if has_a?(:ace) && has_a?(:two)
      straight = Card.values[0..3] + [:ace]
    else
      low_index = Card.values.index(@cards.first.value)
      straight = Card.values[low_index..(low_index + 4)]
    end

    @cards.map(&:value) == straight
  end

  def three_of_a_kind?
    @cards.any? { |card| card_value_count(card.value) == 3 }
  end

  def two_pair?
    pairs.count == 2
  end

  def one_pair?
    pairs.count == 1
  end

  def high_card?
    true
  end
end
