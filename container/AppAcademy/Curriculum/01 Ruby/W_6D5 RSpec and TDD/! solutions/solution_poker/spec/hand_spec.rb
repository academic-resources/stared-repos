require 'rspec'
require 'hand'
require 'card'

describe Hand do
  # We're making Card instances here and throughout. In general, it's better
  # to use doubles for instances of any class other than the one currently
  # being tested. But the Hand class sorts the cards, which uses the Card#<=> 
  # method. If we used card doubles, we'd need to simulate the behavior of 
  # Card#<=>, which would be very cumbersome.
  let(:cards) {[
                Card.new(:spades, :ten),
                Card.new(:hearts, :five),
                Card.new(:hearts, :ace),
                Card.new(:diamonds, :two),
                Card.new(:hearts, :two)
              ]}

  subject(:hand) { Hand.new(cards) }

  describe '#initialize' do
    it 'accepts cards correctly' do
      expect(hand.cards).to match_array(cards)
    end

    it 'raises an error if not five cards' do
      expect do
        Hand.new(cards[0..3])
      end.to raise_error 'must have five cards'
    end
  end

  describe '#trade_cards' do
    let!(:take_cards) { hand.cards[0..1] }
    let!(:new_cards) { [Card.new(:spades, :five), Card.new(:clubs, :three)] }

    it 'discards specified cards' do
      hand.trade_cards(take_cards, new_cards)
      expect(hand.cards).to_not include(*take_cards)
    end

    it 'takes specified cards' do
      hand.trade_cards(take_cards, new_cards)
      expect(hand.cards).to include(*new_cards)
    end

    it 'raises an error if trade does not result in five cards' do
      expect do
        hand.trade_cards(hand.cards[0..0], new_cards)
      end.to raise_error 'must have five cards'
    end

    it 'raises an error if trade tries to discard unowned card' do
      expect do
        hand.trade_cards([Card.new(:hearts, :ten)], new_cards[0..0])
      end.to raise_error 'cannot discard unowned card'
    end
  end

  describe 'poker hands' do
    let(:royal_flush) do
      Hand.new([
        Card.new(:spades, :ace),
        Card.new(:spades, :king),
        Card.new(:spades, :queen),
        Card.new(:spades, :jack),
        Card.new(:spades, :ten)
      ])
    end

    let(:straight_flush) do
      Hand.new([
        Card.new(:spades, :eight),
        Card.new(:spades, :seven),
        Card.new(:spades, :six),
        Card.new(:spades, :five),
        Card.new(:spades, :four)
      ])
    end

    let(:four_of_a_kind) do
      Hand.new([
        Card.new(:spades, :ace),
        Card.new(:hearts, :ace),
        Card.new(:diamonds, :ace),
        Card.new(:clubs, :ace),
        Card.new(:spades, :ten)
      ])
    end

    let(:full_house) do
      Hand.new([
        Card.new(:spades, :ace),
        Card.new(:clubs, :ace),
        Card.new(:spades, :king),
        Card.new(:hearts, :king),
        Card.new(:diamonds, :king)
      ])
    end

    let(:flush) do
      Hand.new([
        Card.new(:spades, :four),
        Card.new(:spades, :seven),
        Card.new(:spades, :ace),
        Card.new(:spades, :two),
        Card.new(:spades, :eight)
      ])
    end

    let(:straight) do
      Hand.new([
        Card.new(:hearts, :king),
        Card.new(:hearts, :queen),
        Card.new(:diamonds, :jack),
        Card.new(:clubs, :ten),
        Card.new(:spades, :nine)
      ])
    end

    let(:three_of_a_kind) do
      Hand.new([
        Card.new(:spades, :three),
        Card.new(:diamonds, :three),
        Card.new(:hearts, :three),
        Card.new(:spades, :jack),
        Card.new(:spades, :ten)
      ])
    end

    let(:two_pair) do
      Hand.new([
        Card.new(:hearts, :king),
        Card.new(:diamonds, :king),
        Card.new(:spades, :queen),
        Card.new(:clubs, :queen),
        Card.new(:spades, :ten)
      ])
    end

    let(:one_pair) do
      Hand.new([
        Card.new(:spades, :ace),
        Card.new(:spades, :ace),
        Card.new(:hearts, :queen),
        Card.new(:diamonds, :jack),
        Card.new(:hearts, :ten)
      ])
    end

    let(:high_card) do
      Hand.new([
        Card.new(:spades, :two),
        Card.new(:hearts, :four),
        Card.new(:diamonds, :six),
        Card.new(:spades, :nine),
        Card.new(:spades, :ten)
      ])
    end

    let(:hand_ranks) do
      [
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
    end

    let!(:hands) do
      [
        royal_flush,
        straight_flush,
        four_of_a_kind,
        full_house,
        flush,
        straight,
        three_of_a_kind,
        two_pair,
        one_pair,
        high_card
      ]
    end

    describe 'rank' do
      it 'should correctly identify the hand rank' do
        hands.each_with_index do |hand, i|
          expect(hand.rank).to eq(hand_ranks[i])
        end
      end

      context 'when straight' do
        let(:ace_straight) do
          Hand.new([
            Card.new(:hearts, :ace),
            Card.new(:spades, :two),
            Card.new(:hearts, :three),
            Card.new(:hearts, :four),
            Card.new(:hearts, :five)
          ])
        end

        it 'should allow ace as the low card' do
          expect(ace_straight.rank).to eq(:straight)
        end
      end
    end

    describe '#<=>' do
      it 'returns 1 for a hand with a higher rank' do
        expect(royal_flush <=> straight_flush).to eq(1)
      end

      it 'returns -1 for a hand with a lower rank' do
        expect(straight_flush <=> royal_flush).to eq(-1)
      end

      it 'returns 0 for identical hands' do
        expect(straight_flush <=> straight_flush).to eq(0)
      end

      context 'when hands have the same rank (tie breaker)' do
        context 'when royal flush' do
          let(:hearts_royal_flush) do
            Hand.new([
              Card.new(:hearts, :ace),
              Card.new(:hearts, :king),
              Card.new(:hearts, :queen),
              Card.new(:hearts, :jack),
              Card.new(:hearts, :ten)
            ])
          end

          let(:spades_royal_flush) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:spades, :king),
              Card.new(:spades, :queen),
              Card.new(:spades, :jack),
              Card.new(:spades, :ten)
            ])
          end

          it 'compares based on suit' do
            expect(hearts_royal_flush <=> spades_royal_flush).to eq(-1)
            expect(spades_royal_flush <=> hearts_royal_flush).to eq(1)
          end
        end

        context 'straight flush' do
          let(:straight_flush_eight) do
            Hand.new([
              Card.new(:spades, :eight),
              Card.new(:spades, :seven),
              Card.new(:spades, :six),
              Card.new(:spades, :five),
              Card.new(:spades, :four)
            ])
          end

          let(:straight_flush_nine) do
            Hand.new([
              Card.new(:spades, :nine),
              Card.new(:spades, :eight),
              Card.new(:spades, :seven),
              Card.new(:spades, :six),
              Card.new(:spades, :five)
            ])
          end

          let(:hearts_flush_nine) do
            Hand.new([
              Card.new(:hearts, :nine),
              Card.new(:hearts, :eight),
              Card.new(:hearts, :seven),
              Card.new(:hearts, :six),
              Card.new(:hearts, :five)
            ])
          end

          it 'compares based on high card' do
            expect(straight_flush_nine <=> straight_flush_eight).to eq(1)
            expect(straight_flush_eight <=> straight_flush_nine).to eq(-1)
          end

          it 'compares based on suit when high card is the same' do
            expect(straight_flush_nine <=> hearts_flush_nine).to eq(1)
            expect(hearts_flush_nine <=> straight_flush_nine).to eq(-1)
          end
        end

        context 'when four of a kind' do
          let(:ace_four) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:hearts, :ace),
              Card.new(:diamonds, :ace),
              Card.new(:clubs, :ace),
              Card.new(:spades, :ten)
            ])
          end

          let(:king_four) do
            Hand.new([
              Card.new(:spades, :king),
              Card.new(:hearts, :king),
              Card.new(:diamonds, :king),
              Card.new(:clubs, :king),
              Card.new(:spades, :ten)
            ])
          end

          it 'compares based on four of a kind value' do
            expect(ace_four <=> king_four).to eq(1)
            expect(king_four <=> ace_four).to eq(-1)
          end

          let(:ace_with_two) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:hearts, :ace),
              Card.new(:diamonds, :ace),
              Card.new(:clubs, :ace),
              Card.new(:spades, :two)
            ])
          end

          it 'compares based on high card value if same four of a kind value' do
            expect(ace_four <=> ace_with_two).to eq(1)
            expect(ace_with_two <=> ace_four).to eq(-1)
          end

          let(:ace_with_two_hearts) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:hearts, :ace),
              Card.new(:diamonds, :ace),
              Card.new(:clubs, :ace),
              Card.new(:hearts, :two)
            ])
          end

          it 'compares based on high card suit if same high card value' do
            expect(ace_with_two <=> ace_with_two_hearts).to eq(1)
            expect(ace_with_two_hearts <=> ace_with_two).to eq(-1)
          end
        end

        context 'when two pair' do
          let(:two_pair_3_4) do
            Hand.new([
              Card.new(:spades, :three),
              Card.new(:hearts, :three),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :four),
              Card.new(:hearts, :ten)
            ])
          end

          let(:two_pair_4_5) do
            Hand.new([
              Card.new(:spades, :five),
              Card.new(:hearts, :five),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :four),
              Card.new(:hearts, :ten)
            ])
          end

          let(:pair_of_sixes) do
            Hand.new([
              Card.new(:spades, :six),
              Card.new(:hearts, :six),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :five),
              Card.new(:hearts, :ten)
            ])
          end

          it 'two pair beats one pair' do
            expect(two_pair_4_5 <=> pair_of_sixes).to eq(1)
          end

          it 'higher of two pairs wins' do
            expect(two_pair_4_5 <=> two_pair_3_4).to eq(1)
          end

        end

        context 'when one pair' do
          let(:ace_pair) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:spades, :ace),
              Card.new(:hearts, :queen),
              Card.new(:diamonds, :jack),
              Card.new(:hearts, :ten)
            ])
          end

          let(:king_pair) do
            Hand.new([
              Card.new(:spades, :king),
              Card.new(:spades, :king),
              Card.new(:hearts, :queen),
              Card.new(:diamonds, :jack),
              Card.new(:hearts, :ten)
            ])
          end

          let(:three_pair_jack_high) do
            Hand.new([
              Card.new(:spades, :three),
              Card.new(:hearts, :three),
              Card.new(:diamonds, :nine),
              Card.new(:hearts, :jack),
              Card.new(:hearts, :ten)
            ])
          end

          let(:three_pair_king_high) do
            Hand.new([
              Card.new(:spades, :three),
              Card.new(:hearts, :three),
              Card.new(:diamonds, :nine),
              Card.new(:hearts, :king),
              Card.new(:hearts, :ten)
            ])
          end

          let(:four_pair) do
            Hand.new([
              Card.new(:spades, :four),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :ace),
              Card.new(:hearts, :two),
              Card.new(:hearts, :three)
            ])
          end

          it 'should compare based on pair value' do
            expect(ace_pair <=> king_pair).to eq(1)
            expect(four_pair <=> three_pair_jack_high).to eq(1)
          end

          let(:ace_pair_king_high) do
            Hand.new([
              Card.new(:spades, :ace),
              Card.new(:spades, :ace),
              Card.new(:hearts, :king),
              Card.new(:diamonds, :jack),
              Card.new(:hearts, :ten)
            ])
          end

          it 'should compare based on high card if same pair value' do
            expect(ace_pair_king_high <=> ace_pair).to eq(1)
            expect(three_pair_king_high <=> three_pair_jack_high).to eq(1)
          end
        end

        context 'when high card' do
          let(:ten_high) do
            Hand.new([
              Card.new(:spades, :two),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :six),
              Card.new(:spades, :nine),
              Card.new(:spades, :ten)
            ])
          end

          let(:king_high) do
            Hand.new([
              Card.new(:spades, :two),
              Card.new(:hearts, :four),
              Card.new(:diamonds, :six),
              Card.new(:spades, :nine),
              Card.new(:spades, :king)
            ])
          end

          it 'should compare based on high card' do
            expect(king_high <=> ten_high).to eq(1)
            expect(ten_high <=> king_high).to eq(-1)
          end
        end
      end
    end

    describe '::winner' do
      it 'returns the winning hand' do
        high_hands = [flush, straight_flush, one_pair]
        expect(Hand.winner(high_hands)).to eq(straight_flush)

        low_hands = [one_pair, two_pair, three_of_a_kind]
        expect(Hand.winner(low_hands)).to eq(three_of_a_kind)
      end
    end
  end
end
