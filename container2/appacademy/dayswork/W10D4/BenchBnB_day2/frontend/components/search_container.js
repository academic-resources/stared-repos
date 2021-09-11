import { connect } from 'react-redux'
import { fetchBenches } from '../actions/bench_action'
import Search from './search'

const mstp = state => ({
  benches: Object.values(state.entities.benches)
})

const mdtp = dispatch => ({
  fetchBenches: () => dispatch(fetchBenches())
})

export default connect(
  mstp,
  mdtp
)(Search)
