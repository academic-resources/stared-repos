import React from 'react'
import { Link, Route } from 'react-router-dom'
import ItemDetailContainer from '../items/item_detail_container'

class PokemonDetail extends React.Component {
  componentDidMount() {
    this.props.requestSinglePokemon(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id)
      this.props.requestSinglePokemon(this.props.id)
  }

  render() {
    const { pokemon, items } = this.props
    const itemsLIs = items.map(i => (
      <li key={i.id}>
        <Link to={`/pokemon/${pokemon.id}/items/${i.id}`}>{i.name}</Link>
      </li>
    ))
    return (
      <div>
        <img src={pokemon.image_url} />
        <h1>Name: {pokemon.name}</h1>
        <h1>Type: {pokemon.poke_type}</h1>
        <h1>Moves: {pokemon.moves}</h1>
        <h1>Attack: {pokemon.attack}</h1>
        <h1>Defense: {pokemon.defense}</h1>
        <h1>Items</h1>
        <h1>==========================</h1>
        <ul>{itemsLIs}</ul>
        <Route
          path="/pokemon/:pokemonId/items/:itemId"
          component={ItemDetailContainer}
        />
      </div>
    )
  }
}

export default PokemonDetail
