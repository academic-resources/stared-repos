@pokemons.each do |pokemon|
  json.set! pokemon.id do
    json.extract! pokemon, :id, :name
    json.image_url asset_path(pokemon.image_url)
  end
end
