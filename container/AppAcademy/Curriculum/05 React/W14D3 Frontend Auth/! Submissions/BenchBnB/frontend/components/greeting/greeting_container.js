import { connect } from 'react-redux'
import Greeting from './greeting'
import { logout } from '../../actions/session_actions'

const msp = (state) => {
  const { users } = state.entities;
  const { id } = state.session;

  return {
    currentUser: users[id]
  }
}

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(msp, mdp)(Greeting)