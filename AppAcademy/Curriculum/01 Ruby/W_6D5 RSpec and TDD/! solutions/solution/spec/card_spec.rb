require 'rspec'
require 'card'

describe Card do
  describe '#initialize' do
    subject(:card) { Card.new(:spades, :ten) }

    it 'sets up a card correctly' do
      expect(card.suit).to eq(:spades)
      expect(card.value).to eq(:ten)
    end

    it 'raises an error with an invalid suit' do
      expect do
        Card.new(:test, :ten)
      end.to raise_error
    end

    it 'raises an error with an invalid value' do
      expect do
        Card.new(:spades, :test)
      end.to raise_error
    end
  end

  describe '#<=>' do
    it 'should return 0 when cards are the same' do
      expect(Card.new(:spades, :ten) <=> Card.new(:spades, :ten)).to eq(0)
    end

    it 'should return 1 when card has higher value' do
      expect(Card.new(:spades, :ace) <=> Card.new(:spades, :ten)).to eq(1)
    end

    it 'should return 1 when card has same value but higher suit' do
      expect(Card.new(:spades, :ace) <=> Card.new(:hearts, :ace)).to eq(1)
    end

    it 'should return -1 when card has lower value' do
      expect(Card.new(:spades, :ten) <=> Card.new(:spades, :ace)).to eq(-1)
    end

    it 'should return -1 when card has same value but lower suit' do
      expect(Card.new(:hearts, :ace) <=> Card.new(:spades, :ace)).to eq(-1)
    end
  end
end
