import { connect } from 'react-redux'
import { fetchSearchGiphys } from '../actions/giphy_actions'
import GiphysSearch from './giphys_search'

const mapStateToProps = state => ({
  giphys: state.giphys
})

const mapDispatchToProps = dispatch => {
  return {
    fetchSearchGiphys: searchTerm => dispatch(fetchSearchGiphys(searchTerm))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiphysSearch)
