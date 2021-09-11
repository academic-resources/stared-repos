json.pokemon do
  json.extract! @pokemon, :id, :name, :attack, :defense, :moves, :poke_type, :image_url
  json.items_ids @pokemon.item_ids
end

json.items do
  @pokemon.items.each do |item|
    json.set! item.id do
      json.extract! item, :id, :name, :pokemon_id, :price, :happiness, :image_url
    end
  end
end
 webpack webpack-cli react react-dom react-router-dom redux react-redux redux-logger @babel/core @babel/preset-env @babel/preset-react babel-loader lodash