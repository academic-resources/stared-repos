require 'rspec'
require 'player'

describe Player do
  subject(:player) { Player.new(100) }

  describe '::buy_in' do
    it 'should create a player' do
      expect(Player.buy_in(100)).to be_a(Player)
    end

    it 'should set the players bankroll' do
      expect(Player.buy_in(100).bankroll).to eq(100)
    end
  end

  describe '#deal_in' do
    let(:hand) { double ('hand') }

    it 'should set the players hand' do
      player.deal_in(hand)
      expect(player.hand).to eq(hand)
    end
  end

  describe '#take_bet' do
    it 'should decrement the players bankroll by the bet amount on the first bet' do
      expect do
        player.take_bet(10)
      end.to change { player.bankroll }.by(-10)
    end

    it 'should decrement the players bankroll by the raise amount' do
      player.take_bet(10)
      expect do
        player.take_bet(20)
      end.to change { player.bankroll }.by(-10)
    end

    it 'should return the amount deducted' do
      expect(player.take_bet(10)).to eq(10)
    end

    it 'should raise an error if the bet is more than the bankroll' do
      expect do
        player.take_bet(1000)
      end.to raise_error 'not enough money'
    end
  end

  describe '#receive_winnings' do
    it 'should increment the players bankroll by the amount won' do
      expect do
        player.receive_winnings(10)
      end.to change { player.bankroll }.by(10)
    end
  end

  describe '#return_cards' do
    let(:hand) { double('hand') }
    let(:cards) { double('cards') }

    before(:each) do
      player.deal_in(hand)
      allow(hand).to receive(:cards).and_return(cards)
    end

    it 'should return the players cards' do
      expect(player.return_cards).to eq(cards)
    end

    it 'should set the players hand to nil' do
      player.return_cards
      expect(player.hand).to be(nil)
    end
  end

  describe '#fold' do
    it 'should set folded? to true' do
      player.fold
      expect(player).to be_folded
    end
  end

  describe '#unfold' do
    it 'should set folded? to false' do
      player.unfold
      expect(player).to_not be_folded
    end
  end

  describe '#folded?' do
    let(:player) { Player.new(1000) }

    it 'should return true if player is folded' do
      player.fold
      expect(player).to be_folded
    end

    it 'should return false otherwise' do
      expect(player).to_not be_folded
    end
  end
end
