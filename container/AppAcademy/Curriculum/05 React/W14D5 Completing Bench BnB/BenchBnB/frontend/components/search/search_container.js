import { connect } from 'react-redux';
import { fetchBenches } from '../../actions/bench_actions'
import { updateBounds } from '../../actions/filter_actions'
import Search from './search'

const msp = state => ({
  benches: Object.values(state.entities.benches),
  bounds: state.ui.filters.bounds
})

const mdp = dispatch => ({
  fetchBenches: (filters) => dispatch(fetchBenches(filters)),
  updateBounds: (bounds) => dispatch(updateBounds(bounds))
})

export default connect(msp, mdp)(Search);