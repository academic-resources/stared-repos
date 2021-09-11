require "player"
describe Player do
  let(:deck) { double("deck") }
  subject(:player) { Player.new("Charlie", 100, deck) }
  describe "#initialize" do
    it "takes and sets a player name and pot" do
      expect(player).to be_a(Player)
      expect(player.name).to eq("Charlie")
      expect(player.pot).to eq(100)
    end

    it "starts with an empty hand" do
      expect(player.hand).to be_empty
    end
  end
  describe "#receive_cards" do
    let(:card) { double("card") }
    it "receives five cards at start" do
      allow(deck).to receive(:deal).with(5).and_return([
        card,
        card,
        card,
        card,
        card,
      ])
      player.receive_cards(5)
      expect(player.hand.count).to eq(5)
    end
  end
end
