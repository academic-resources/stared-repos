import { connect } from "react-redux"
import { selectAllPokemon } from "../../reducers/selectors"
import { requestAllPokemon } from "../../actions/pokemon_actions"
import PokemonIndex from "./pokemon_index"

const mstp = state => ({
  pokemon: selectAllPokemon(state),
  loading: state.loading.indexLoading
})

const mdtp = dispatch => ({
  requestAllPokemon: () => dispatch(requestAllPokemon())
})

export default connect(
  mstp,
  mdtp
)(PokemonIndex)
