require "card"

describe Card do
    subject(:card) {Card.new(:seven, :clubs)}

    describe '#initialize' do
        it 'initializes a card value' do
           expect(card.value).to eq(:seven) 
        end

        it 'initializes a card suit' do
            expect(card.suit).to eq(:clubs)
        end
    end

    describe '#valid_card?' do
      subject(:invalid_card) { Card.new(:beer, :cats) }

        it 'returns true if the suit and value are valid' do
          expect(Card.valid_suits).to include(card.suit)
          expect(Card.valid_values).to include(card.value)
        end

        it 'returns false if the suit and value are invalid' do
          expect(Card.valid_suits).to_not include(invalid_card.suit)
          expect(Card.valid_values).to_not include(invalid_card.value)
        end
    end
end
