json.extract! list, :id, :title, :board_id
json.cards list.cards.map { |c| c.id }