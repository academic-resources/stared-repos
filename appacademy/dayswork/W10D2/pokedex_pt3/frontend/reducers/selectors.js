export const selectAllPokemon = state => {
  return Object.values(state.entities.pokemon)
}

export const selectPokemonItem = (state, id) => {
  return state.entities.items[id] || {}
}
