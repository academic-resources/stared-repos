import { connect } from "react-redux"
import { requestSinglePokemon } from "../../actions/pokemon_actions"
import PokemonDetail from "./pokemon_detail"
import { getItems } from "../../reducers/selectors"

const mstp = (state = {}, ownProps) => {
  // debugger
  // if (!state.entities) return undefined
  let poke_id = ownProps.match.params.id
  return {
    pokemon: state.entities.pokemon[poke_id] || {},
    items: getItems(state) || [],
    loading: state.loading.detailLoading
  }
}

const mdtp = dispatch => ({
  requestSinglePokemon: id => dispatch(requestSinglePokemon(id))
})

export default connect(
  mstp,
  mdtp
)(PokemonDetail)
