json.pokemon do
  json.extract! @pokemon, :id, :name, :attack, :defense, :poke_type, :image_url
  json.items_ids do
    json.array! @pokemon.items.ids
  end
  json.moves do
    json.array! @pokemon.moves
  end
end

json.items do
  @pokemon.items.each do |item|
    json.set! item.id do
      json.extract! item, :id, :name, :pokemon_id, :price, :happiness, :image_url
    end
  end
end
