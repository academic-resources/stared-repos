import { connect } from 'react-redux'
import { fetchBenches } from '../actions/bench_action'
// import { updateFilter } from '../actions/filter_actions'
import { updateFilter } from '../actions/filter_actions'
import Search from './search'

const mstp = state => ({
  benches: Object.values(state.entities.benches)
})

const mdtp = dispatch => ({
  fetchBenches: () => dispatch(fetchBenches()),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
})

export default connect(
  mstp,
  mdtp
)(Search)
