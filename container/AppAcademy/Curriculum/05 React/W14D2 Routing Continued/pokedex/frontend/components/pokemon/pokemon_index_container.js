import { connect } from 'react-redux'
import { selectAllPokemon } from '../../reducers/selectors.js'
import PokemonIndex from './pokemon_index'
import { requestAllPokemon } from '../../actions/pokemon_actions'

const msp = (state) => {
  return {
    pokemon: selectAllPokemon(state),
  }
}

const mdp = (dispatch) => {
  return {
    requestAllPokemon: () => dispatch(requestAllPokemon()),
  }
}
export default connect(msp, mdp)(PokemonIndex)