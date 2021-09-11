export const selectAllPokemon = (state = []) => {
  return Object.values(state.entities.pokemon)
}

export const getItems = (state = []) => {
  const itemArray = Object.keys(state.entities.items)
  let items = []
  itemArray.forEach((key) => items.push(state.entities.items[key]))
  return items
}