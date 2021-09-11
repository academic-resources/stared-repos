export const fetchAllPokemon = () => {
  return $.ajax({
    method: "GET",
    url: "/api/pokemon"
  })
}

export const fetchPokemonById = id => {
  return $.ajax({
    method: "GET",
    url: `/api/pokemon/${id}`
  })
}

export const sendPokemonInfo = pokemon => {
  pokemon.attack = parseInt(pokemon.attack)
  pokemon.defense = parseInt(pokemon.defense)
  // debugger
  return $.ajax({
    method: "POST",
    url: "api/pokemon",
    data: { pokemon }
  })
}
