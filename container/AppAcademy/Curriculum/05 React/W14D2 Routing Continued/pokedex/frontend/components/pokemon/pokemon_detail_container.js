import { connect } from 'react-redux'
import PokemonDetail from './pokemon_detail'

const msp = (state, ownProps) => {
  return {
    pokemon: state.entities
  }
}

const mdp = dispatch => {
  return {
    requestPokemon: id => dispatch(requestPokemon(id))
  }
}

export default connect(msp, mdp)(PokemonDetail)