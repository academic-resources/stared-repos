import { connect } from 'react-redux';
import { fetchBenches } from '../../actions/bench_actions'
import Search from './search'

const msp = state => ({
  benches: Object.values(state.entities.benches)
})

const mdp = dispatch => ({
  fetchBenches: () => dispatch(fetchBenches())
})

export default connect(msp, mdp)(Search);