import { connect } from 'react-redux'
import { selectAllPokemon } from '../../reducers/selectors'
import PokemonIndex from './pokemon_index'
import { requestAllPokemon } from '../../actions/pokemon_actions'

const mstp = state => {
  return {
    pokemon: selectAllPokemon(state)
  }
}

const mdtp = dispatch => {
  return {
    requestAllPokemon: () => dispatch(requestAllPokemon())
  }
}

export default connect(
  mstp,
  mdtp
)(PokemonIndex)
