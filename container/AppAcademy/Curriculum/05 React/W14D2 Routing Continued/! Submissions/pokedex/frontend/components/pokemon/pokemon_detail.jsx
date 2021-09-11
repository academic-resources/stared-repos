import React from 'react'

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.pokemonId
    this.props.requestPokemon(id)
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.pokemonId
    if (id !== prevProps.match.params.pokemonId) {
      this.props.requestPokemon(id)
    }
  }

  render() {
    let chosen = this.props.pokemon.pokemon[this.props.match.params.pokemonId]
    if (!chosen) return null
    let dispMoves
    let items
    let { attack, defense, poke_type, moves, items_ids } = chosen
    dispMoves = moves.join(', ');

    items = items_ids.map(itemId => {
      debugger
      return <li key={itemId}>{this.props.pokemon.items[itemId]}</li>
    })
    
    // items = Object.values(this.props.pokemon.items).map{item => {

    // }}
    debugger
    return (
      <div>
        <h3>Type: {poke_type}</h3>
        <h3>Attack: {attack}</h3>
        <h3>Defense: {defense}</h3>
        <h3>Moves: {dispMoves}</h3>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default PokemonDetail