json.board do
  json.partial! "api/boards/board", board: @board
end
json.set! "lists" do
  @board.lists.each do |list|
    json.set! list.id do
      json.partial! "api/lists/list", list: list
    end
  end
end
json.set! "cards" do
  @board.cards.each do |card|
    json.set! card.id do
      json.partial! "api/cards/card", card: card
    end
  end
end
