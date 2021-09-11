module TieBreaker
  def tie_breaker(other_hand)
    case rank
    when :royal_flush, :straight_flush, :straight, :flush, :high_card
      high_card <=> other_hand.high_card
    when :four_of_a_kind
      compare_set_then_high_card(4, other_hand)
    when :three_of_a_kind
      compare_set_then_high_card(3, other_hand)
    when :one_pair
      compare_set_then_high_card(2, other_hand)
    when :two_pair
      compare_two_pair(other_hand)
    when :full_house
      compare_full_house(other_hand)
    end
  end

  def compare_full_house(other_hand)
    three = set_card(3) <=> other_hand.set_card(3)
    if three == 0
      two = set_card(2) <=> other_hand.set_card(2)
      if two == 0
        high_card = cards_without(set_card(3).value) &
                    cards_without(set_card(2).value)
        other_high_card = other_hand.cards_without(set_card(3).value) &
                          other_hand.cards_without(set_card(2).value)
        high_card <=> other_high_card
      else
        two
      end
    else
      three
    end
  end

  def compare_two_pair(other_hand)
    high = high_pair[0] <=> other_hand.high_pair[0]
    if high == 0
      low = low_pair[0] <=> other_hand.low_pair[0]
      if low == 0
        high_card = cards.find do |card|
          card_value_count(card.value) != 2
        end
        other_high_card = other_hand.cards.find do |card|
          other_hand.card_value_count(card.value) != 2
        end

        high_card <=> other_high_card
      else
        low
      end
    else
      high
    end
  end

  def high_pair
    if pairs[1][0] < pairs[0][0]
      pairs[0]
    else
      pairs[1]
    end
  end

  def low_pair
    if pairs[0][0] < pairs[1][0]
      pairs[0]
    else
      pairs[1]
    end
  end

  def compare_set_then_high_card(n, other_hand)
    set_card, other_set_card = set_card(n), other_hand.set_card(n)
    if set_card == other_set_card
      cards_without(set_card.value).last <=>
      other_hand.cards_without(set_card.value).last
    else
      set_card <=> other_set_card
    end
  end

  protected
  def pairs
    pairs = []
    @cards.map(&:value).uniq.each do |value|
      if card_value_count(value) == 2
        pairs << @cards.select { |card| card.value == value }
      end
    end
    pairs
  end
end
